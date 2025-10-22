// jest.setup.js

// Mock des variables d'environnement Vite
globalThis.importMetaEnv = {
  VITE_API_URL: "http://localhost:5000",
};

// Si tu veux être sûr que ton code utilisant import.meta.env fonctionne
Object.defineProperty(global, "importMetaEnv", {
  value: { VITE_API_URL: "http://localhost:5000" },
});
