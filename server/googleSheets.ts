import { google, type sheets_v4 } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const DEFAULT_SHEET_TITLE = "Exam Records";

let cachedSheetsClient: sheets_v4.Sheets | null = null;

async function getSheetsClient(): Promise<sheets_v4.Sheets> {
  if (cachedSheetsClient) return cachedSheetsClient;

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  const privateKey = base64Key
    ? Buffer.from(base64Key, "base64").toString("utf8")
    : rawKey;

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets service account credentials");
  }

  const auth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/g, "\n"),
    SCOPES,
  );

  cachedSheetsClient = google.sheets({ version: "v4", auth });
  return cachedSheetsClient;
}

// Helper function to create header row
function createHeaderRow(): string[] {
  return [
    'Date',
    'Physician',
    'Patient ID',
    'Bed Number',
    'Purposes',
    // PLAX
    'PLAX AV/MV Structure',
    'PLAX Pericardial Effusion',
    'PLAX Aortic Root',
    'PLAX LA',
    'PLAX LVOT',
    'PLAX IVS',
    'PLAX LVESd',
    'PLAX LVPW',
    'PLAX LVEDd',
    'PLAX MR',
    'PLAX MS',
    'PLAX AR',
    'PLAX AS',
    // PSAX
    'PSAX AV Status',
    'PSAX MV Status',
    'PSAX LV Status',
    'PSAX RVOT Status',
    'PSAX LV FS%',
    'PSAX LV FS Level',
    'PSAX PV Color',
    'PSAX TV Color',
    'PSAX AV Color',
    'PSAX TR Vmax',
    'PSAX RVSP',
    // A4C
    'A4C LV Size',
    'A4C LV Contraction',
    'A4C Simpson EF',
    'A4C RV Size',
    'A4C RV Contraction',
    'A4C TAPSE',
    'A4C Septal Motion',
    'A4C MS',
    'A4C MR',
    'A4C TR',
    'A4C MV E',
    'A4C MV A',
    'A4C Decel Time',
    'A4C TR Vmax',
    'A4C RVSP',
    'A4C TDI Septal',
    'A4C TDI Lateral',
    'A4C E/e\' Ratio',
    // A2C
    'A2C LV Wall Motion',
    'A2C AV/LVOT Structure',
    'A2C LVOT Diameter',
    'A2C MR',
    'A2C AR',
    'A2C MS',
    'A2C AS',
    'A2C AV Vmax',
    'A2C AV Mean PG',
    'A2C AVA',
    // Subcostal
    'Subcostal ASD',
    'Subcostal VSD',
    'Subcostal Pericardial Effusion',
    'Subcostal IVC Diameter',
    'Subcostal IVC Collapse Ratio',
    'Subcostal Volume Status',
    'Subcostal RA/IVC Flow',
    // Summary
    'Summary LV Function',
    'Summary EF',
    'Summary FS',
    'Summary RV Function',
    'Summary TAPSE',
    'Summary Valvular',
    'Summary ASD/VSD',
    'Summary Aorta/LA',
    'Summary Pericardium',
    'Summary IVC/Volume',
    'Summary Notes'
  ];
}

// Helper function to create data row from report data
function createDataRow(reportData: any): string[] {
  return [
    reportData?.patient?.date || '',
    reportData?.patient?.physician || '',
    reportData?.patient?.patientId || '',
    reportData?.patient?.bedNumber || '',
    reportData?.patient?.purposes?.join(', ') || '',
    // PLAX
    reportData?.plax?.avMvStructure || '',
    reportData?.plax?.pericardialEffusion || '',
    reportData?.plax?.aorticRoot || '',
    reportData?.plax?.la || '',
    reportData?.plax?.lvot || '',
    reportData?.plax?.ivs || '',
    reportData?.plax?.lvesd || '',
    reportData?.plax?.lvpw || '',
    reportData?.plax?.lvedd || '',
    reportData?.plax?.mr || '',
    reportData?.plax?.ms || '',
    reportData?.plax?.ar || '',
    reportData?.plax?.as || '',
    // PSAX
    reportData?.psax?.avStatus || '',
    reportData?.psax?.mvStatus || '',
    reportData?.psax?.lvStatus || '',
    reportData?.psax?.rvotStatus || '',
    reportData?.psax?.lvFS || '',
    reportData?.psax?.lvFSLevel || '',
    reportData?.psax?.pvColor || '',
    reportData?.psax?.tvColor || '',
    reportData?.psax?.avColor || '',
    reportData?.psax?.trVmax || '',
    reportData?.psax?.rvsp || '',
    // A4C
    reportData?.a4c?.lvSize || '',
    reportData?.a4c?.lvContraction || '',
    reportData?.a4c?.simpsonEF || '',
    reportData?.a4c?.rvSize || '',
    reportData?.a4c?.rvContraction || '',
    reportData?.a4c?.tapse || '',
    reportData?.a4c?.septalMotion || '',
    reportData?.a4c?.ms || '',
    reportData?.a4c?.mr || '',
    reportData?.a4c?.tr || '',
    reportData?.a4c?.mvE || '',
    reportData?.a4c?.mvA || '',
    reportData?.a4c?.decelTime || '',
    reportData?.a4c?.trVmax || '',
    reportData?.a4c?.rvsp || '',
    reportData?.a4c?.tdiSept || '',
    reportData?.a4c?.tdiLat || '',
    reportData?.a4c?.eRatio || '',
    // A2C
    reportData?.a2c?.lvWallMotion || '',
    reportData?.a2c?.avLvotStructure || '',
    reportData?.a2c?.lvotDiameter || '',
    reportData?.a2c?.mr || '',
    reportData?.a2c?.ar || '',
    reportData?.a2c?.ms || '',
    reportData?.a2c?.as || '',
    reportData?.a2c?.avVmax || '',
    reportData?.a2c?.avMeanPG || '',
    reportData?.a2c?.avAVA || '',
    // Subcostal
    reportData?.subcostal?.asd || '',
    reportData?.subcostal?.vsd || '',
    reportData?.subcostal?.pericardialEffusion || '',
    reportData?.subcostal?.ivcDiameter || '',
    reportData?.subcostal?.ivcCollapseRatio || '',
    reportData?.subcostal?.volumeStatus || '',
    reportData?.subcostal?.raIvcFlow || '',
    // Summary
    reportData?.summary?.lvFunction || '',
    reportData?.summary?.ef || '',
    reportData?.summary?.fs || '',
    reportData?.summary?.rvFunction || '',
    reportData?.summary?.tapse || '',
    reportData?.summary?.valvular || '',
    reportData?.summary?.asdVsd || '',
    reportData?.summary?.aorta || '',
    reportData?.summary?.pericardium || '',
    reportData?.summary?.ivcVolume || '',
    reportData?.summary?.notes || ''
  ];
}

export async function uploadExamReport(reportData: any, existingSpreadsheetId?: string) {
  const sheets = await getSheetsClient();
  const providedSpreadsheetId =
    existingSpreadsheetId || process.env.GOOGLE_SHEETS_ID;

  let spreadsheetId = providedSpreadsheetId;
  let sheetId: number;
  let sheetTitle = DEFAULT_SHEET_TITLE;

  if (spreadsheetId) {
    // Use existing spreadsheet (either passed from client or env)
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet =
      spreadsheet.data.sheets?.find(
        (s) => s.properties?.title === DEFAULT_SHEET_TITLE,
      ) || spreadsheet.data.sheets?.[0];

    sheetId = sheet?.properties?.sheetId || 0;
    sheetTitle = sheet?.properties?.title || DEFAULT_SHEET_TITLE;

    // Append new data row
    const dataRow = createDataRow(reportData);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:A`,
      valueInputOption: "RAW",
      requestBody: {
        values: [dataRow],
      },
    });
  } else {
    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "Cardiac Exam Records",
        },
        sheets: [
          {
            properties: {
              title: DEFAULT_SHEET_TITLE,
            },
          },
        ],
      },
    });

    spreadsheetId = spreadsheet.data.spreadsheetId!;
    if (!spreadsheetId) {
      throw new Error("Failed to create spreadsheet");
    }

    sheetId = spreadsheet.data.sheets?.[0]?.properties?.sheetId || 0;

    // Write header row and first data row
    const headerRow = createHeaderRow();
    const dataRow = createDataRow(reportData);

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${DEFAULT_SHEET_TITLE}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [headerRow, dataRow],
      },
    });

    // Format the header row (bold, frozen)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                    fontSize: 11,
                  },
                  backgroundColor: {
                    red: 0.9,
                    green: 0.9,
                    blue: 0.9,
                  },
                },
              },
              fields: "userEnteredFormat(textFormat,backgroundColor)",
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1,
                },
              },
              fields: "gridProperties.frozenRowCount",
            },
          },
        ],
      },
    });
  }

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
}
