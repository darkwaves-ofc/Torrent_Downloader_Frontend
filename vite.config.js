import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default function ({ mode }) {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],

    server: {
      port: 3050,
      host: false,
      proxy: {
        "/api": {
          target: env.VITE_APIURI,
        },
      },
    },
  });
}
