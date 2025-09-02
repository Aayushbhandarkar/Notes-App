import Note from '../models/Note.js';
import { validateNoteTitle, validateNoteContent } from '../utils/validators.js';

// @desc    Get all notes for user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  try {
    const { title, content, color } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    if (!validateNoteTitle(title)) {
      return res.status(400).json({ message: 'Title must be between 1 and 100 characters' });
    }

    if (!validateNoteContent(content)) {
      return res.status(400).json({ message: 'Content must be between 1 and 10000 characters' });
    }

    const note = await Note.create({
      title,
      content,
      color: color || '#ffffff',
      user: req.user._id
    });

    res.status(201).json({
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color, isPinned } = req.body;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (title && !validateNoteTitle(title)) {
      return res.status(400).json({ message: 'Title must be between 1 and 100 characters' });
    }

    if (content && !validateNoteContent(content)) {
      return res.status(400).json({ message: 'Content must be between 1 and 10000 characters' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, color, isPinned },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};