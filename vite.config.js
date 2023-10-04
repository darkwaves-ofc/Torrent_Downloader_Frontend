import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default function ({ mode }) {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],

    server: {
      port: 9050,
      host: true,
      proxy: {
        "/api": {
          target: "http://localhost:9080/",
        },
      },
    },
  });
}
