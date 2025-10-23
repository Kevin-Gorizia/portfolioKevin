import "@testing-library/jest-dom";

// Polyfill pour TextEncoder/TextDecoder
class TextEncoder {
  encode(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  }
}

class TextDecoder {
  decode(bytes) {
    let str = "";
    for (let i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return str;
  }
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock pour les requêtes réseau
global.fetch = jest.fn();

// Mock pour axios
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

// Supprime les console.error encombrants - VERSION AMÉLIORÉE
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Ignorer les warnings spécifiques à framer-motion
    if (
      typeof args[0] === "string" &&
      (args[0].includes("React does not recognize the") ||
        args[0].includes("whileInView") ||
        args[0].includes("initial") ||
        args[0].includes("animate") ||
        args[0].includes("transition") ||
        args[0].includes("Warning: ReactDOM.render is no longer supported"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
