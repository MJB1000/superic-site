import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Serves api/subscribe.ts at /api/subscribe during `bun run dev`, so signup
 * forms work locally exactly as they do on Vercel. Reads BEEHIIV_API_KEY etc.
 * from .env.local (never committed). Not used in production builds.
 */
function devSubscribeApi(env: Record<string, string>): Plugin {
  return {
    name: "dev-subscribe-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/subscribe", async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const request = new Request("http://localhost/api/subscribe", {
            method: req.method,
            headers: { "content-type": req.headers["content-type"] ?? "application/json" },
            body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
          });
          const { handleSubscribe } = await server.ssrLoadModule("/api/subscribe.ts");
          const response: Response = await handleSubscribe(request, env);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch (error) {
          server.config.logger.error(`[dev-subscribe-api] ${String(error)}`);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "dev_handler_failed" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks: they change rarely, so browsers keep them cached across deploys.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          sanity: ["@sanity/client", "@sanity/image-url"],
        },
      },
    },
  },
  plugins: [react(), devSubscribeApi(loadEnv(mode, process.cwd(), ""))],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
