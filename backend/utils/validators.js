import validator from 'validator';

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validateName = (name) => {
  return validator.isLength(name, { min: 2, max: 50 });
};

export const validatePassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
};

export const validateNoteTitle = (title) => {
  return validator.isLength(title, { min: 1, max: 100 });
};

export const validateNoteContent = (content) => {
  return validator.isLength(content, { min: 1, max: 10000 });
};