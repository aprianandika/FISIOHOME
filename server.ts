/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Custom API or health check route (for debugging/status checks)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware setup for development, or static file server for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Handle production static files serving with customized exact MIME headers
    app.use(express.static(distPath, {
      dotfiles: 'ignore',
      etag: true,
      index: false,
      setHeaders: (res, filePath) => {
        const lowerPath = filePath.toLowerCase();
        if (lowerPath.endsWith('.js') || lowerPath.endsWith('.mjs')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (lowerPath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
        } else if (lowerPath.endsWith('.png')) {
          res.setHeader('Content-Type', 'image/png');
        } else if (lowerPath.endsWith('.jpg') || lowerPath.endsWith('.jpeg')) {
          res.setHeader('Content-Type', 'image/jpeg');
        } else if (lowerPath.endsWith('.svg')) {
          res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        }
      }
    }));

    // Serve SPA index file
    app.get('*', (req, res, next) => {
      const parsedPath = path.parse(req.path);
      if (parsedPath.ext && parsedPath.ext !== '.html') {
        res.status(404).send('Not Found');
        return;
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
