import { fileURLToPath, URL } from "url";
import { writeFileSync } from "fs";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

/**
 * Vite plugin that writes env.json with real env-var values at build start.
 *
 * The @caffeineai/core-infrastructure package fetches /env.json at runtime to
 * get the backend canister ID and other config. When the Caffeine platform
 * injects env vars (CANISTER_ID_BACKEND, DFX_NETWORK, etc.) but the env.json
 * source file still contains the placeholder string "undefined", the runtime
 * fetch returns stale "undefined" values and the actor never initialises.
 *
 * This plugin writes env.json from live environment variables before Vite
 * bundles, so copy:env (run after vite build) always copies a correct file.
 */
function writeEnvJson() {
  return {
    name: "write-env-json",
    buildStart() {
      const canisterId = process.env.CANISTER_ID_BACKEND || "undefined";
      const backendHost = process.env.BACKEND_HOST || "undefined";
      const projectId = process.env.PROJECT_ID || "undefined";
      const iiDerivationOrigin =
        process.env.II_DERIVATION_ORIGIN || "undefined";

      const envJson = {
        backend_host: backendHost,
        backend_canister_id: canisterId,
        project_id: projectId,
        ii_derivation_origin: iiDerivationOrigin,
      };

      const envJsonPath = resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "env.json",
      );
      writeFileSync(envJsonPath, JSON.stringify(envJson, null, 2));
    },
  };
}

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    writeEnvJson(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
});
