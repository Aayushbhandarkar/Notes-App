import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// === Silence specific warnings/errors ===
const suppressedWarnings = [
  'Provided button width is invalid',
  'Failed to load resource: the server responded with a status of 401'
];

const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (!suppressedWarnings.some(msg => args[0]?.includes(msg))) {
    originalWarn(...args);
  }
};

console.error = (...args) => {
  if (!suppressedWarnings.some(msg => args[0]?.includes(msg))) {
    originalError(...args);
  }
};
// =======================================

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
