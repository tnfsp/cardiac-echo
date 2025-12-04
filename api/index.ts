import express from "express";
import { uploadExamReport } from "./googleSheets";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/upload-report", async (req, res) => {
  try {
    const { spreadsheetId, ...reportData } = req.body;
    const result = await uploadExamReport(reportData, spreadsheetId);
    res.json({
      success: true,
      spreadsheetUrl: result.spreadsheetUrl,
      spreadsheetId: result.spreadsheetId,
    });
  } catch (error: any) {
    console.error("Failed to upload report to Google Sheets:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to upload report",
    });
  }
});

export default app;
