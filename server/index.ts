// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";
// import { handleHealth, handleAnalyzeWallet, handleChatAnalysis } from "./routes/backend";

// export function createServer() {
//   const app = express();

//   // Middleware
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     res.json({ message: "Hello from Express server v2!" });
//   });

//   app.get("/api/demo", handleDemo);

//   // Backend API routes (sekarang dengan prefix /api)
//   app.get("/api/health", handleHealth);
//   app.get("/api/analyze/:address", handleAnalyzeWallet);
//   app.post("/api/chat", handleChatAnalysis);

//   return app;
// }


import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleHealth, handleAnalyzeWallet, handleChatAnalysis } from "./routes/backend";

// Fungsi ini tetap ada, bagus untuk keterbacaan
function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Backend API routes
  app.get("/api/health", handleHealth);
  app.get("/api/analyze/:address", handleAnalyzeWallet);
  app.post("/api/chat", handleChatAnalysis);

  return app;
}

// =======================================================
// PERUBAHAN KUNCI ADA DI SINI
// =======================================================
// Buat instance aplikasi dari fungsi factory
const app = createServer();

// Ekspor instance aplikasi sebagai default
// Inilah yang akan diambil dan dijalankan oleh Vercel
export default app;

