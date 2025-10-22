import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignorer les fichiers build/dist et node_modules
  globalIgnores(["dist", "node_modules"]),

  // Règles globales pour JS/JSX/TS/TSX
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/react-in-jsx-scope": "off",
    },
  },

  // Config spécifique pour les fichiers de test (Jest/Vitest)
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        vi: "readonly", // pour Vitest
      },
    },
    rules: {
      // Si tu veux désactiver le warning de console.log dans les tests
      "no-console": "off",
    },
  },

  // Config TypeScript si besoin
  {
    files: ["**/*.{ts,tsx}"],
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],
    },
  },
]);
