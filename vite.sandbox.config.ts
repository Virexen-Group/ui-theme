import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

function emailRenderer(): Plugin {
  return {
    name: 'virexen-sandbox-email-renderer',
    configureServer(server) {
      server.middlewares.use('/__sandbox/render-email', async (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'POST required' }));
          return;
        }
        try {
          let raw = '';
          for await (const chunk of req) {
            raw += chunk.toString();
            if (raw.length > 100_000) throw new Error('Preview payload too large');
          }
          const input = JSON.parse(raw);
          if (!input || typeof input !== 'object' || !input.template || !input.variables) {
            throw new Error('Template and variables are required');
          }
          // Load the real source through Vite's server-side module pipeline.
          // src/email.js and sanitize-html never enter the browser bundle.
          const { renderEmail } = await server.ssrLoadModule(fileURLToPath(new URL('./src/email.js', import.meta.url)));
          const result = renderEmail(input.template, input.variables, { to: input.to });
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
        }
      });
    }
  };
}

export default defineConfig({
  root: fileURLToPath(new URL('./sandbox', import.meta.url)),
  plugins: [vue(), emailRenderer()],
  server: { host: '127.0.0.1', port: 5173, strictPort: false },
  // Deliberately separate from library vite.config.ts and dist packaging.
});
