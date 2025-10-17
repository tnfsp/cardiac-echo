import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { uploadExamReport } from "./googleSheets";

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload exam report to Google Sheets
  app.post("/api/upload-report", async (req, res) => {
    try {
      const reportData = req.body;
      const result = await uploadExamReport(reportData);
      res.json({ 
        success: true, 
        spreadsheetUrl: result.spreadsheetUrl,
        spreadsheetId: result.spreadsheetId
      });
    } catch (error: any) {
      console.error("Failed to upload report to Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to upload report" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
