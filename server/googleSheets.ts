import { google } from 'googleapis';

type ConnectionSettings = {
  access_token: string;
  expires_at?: number;
};

let connectionSettings: ConnectionSettings | null;

function isCachedTokenValid(settings: ConnectionSettings | null) {
  if (!settings?.expires_at) return false;

  // Add a one-minute safety buffer to avoid using tokens that are about to expire
  return settings.expires_at - 60_000 > Date.now();
}

async function getAccessToken() {
  if (isCachedTokenValid(connectionSettings)) {
    return connectionSettings!.access_token;
  }

  const accessToken = await getAccessTokenFromEnv();

  if (!accessToken) {
    throw new Error('Google credentials not configured in environment variables');
  }

  return accessToken;
}

async function getAccessTokenFromEnv(): Promise<string | null> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountEmail && serviceAccountKey) {
    const jwtClient = new google.auth.JWT(
      serviceAccountEmail,
      undefined,
      serviceAccountKey.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const { access_token: accessToken, expiry_date: expiryDate } = await jwtClient.authorize();

    if (!accessToken) {
      throw new Error('Failed to authorize Google service account');
    }

    connectionSettings = {
      access_token: accessToken,
      expires_at: expiryDate || Date.now() + 50 * 60 * 1000 // default to ~50 minutes if missing
    };

    return accessToken;
  }

  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (refreshToken) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required when using GOOGLE_REFRESH_TOKEN');
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials?.access_token) {
      throw new Error('Failed to refresh Google OAuth token');
    }

    connectionSettings = {
      access_token: credentials.access_token,
      expires_at: credentials.expiry_date || Date.now() + 50 * 60 * 1000
    };

    return credentials.access_token;
  }

  return null;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
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
    reportData.patient.date || '',
    reportData.patient.physician || '',
    reportData.patient.patientId || '',
    reportData.patient.bedNumber || '',
    reportData.patient.purposes?.join(', ') || '',
    // PLAX
    reportData.plax.avMvStructure || '',
    reportData.plax.pericardialEffusion || '',
    reportData.plax.aorticRoot || '',
    reportData.plax.la || '',
    reportData.plax.lvot || '',
    reportData.plax.ivs || '',
    reportData.plax.lvesd || '',
    reportData.plax.lvpw || '',
    reportData.plax.lvedd || '',
    reportData.plax.mr || '',
    reportData.plax.ms || '',
    reportData.plax.ar || '',
    reportData.plax.as || '',
    // PSAX
    reportData.psax.avStatus || '',
    reportData.psax.mvStatus || '',
    reportData.psax.lvStatus || '',
    reportData.psax.rvotStatus || '',
    reportData.psax.lvFS || '',
    reportData.psax.lvFSLevel || '',
    reportData.psax.pvColor || '',
    reportData.psax.tvColor || '',
    reportData.psax.avColor || '',
    reportData.psax.trVmax || '',
    reportData.psax.rvsp || '',
    // A4C
    reportData.a4c.lvSize || '',
    reportData.a4c.lvContraction || '',
    reportData.a4c.simpsonEF || '',
    reportData.a4c.rvSize || '',
    reportData.a4c.rvContraction || '',
    reportData.a4c.tapse || '',
    reportData.a4c.septalMotion || '',
    reportData.a4c.ms || '',
    reportData.a4c.mr || '',
    reportData.a4c.tr || '',
    reportData.a4c.mvE || '',
    reportData.a4c.mvA || '',
    reportData.a4c.decelTime || '',
    reportData.a4c.trVmax || '',
    reportData.a4c.rvsp || '',
    reportData.a4c.tdiSept || '',
    reportData.a4c.tdiLat || '',
    reportData.a4c.eRatio || '',
    // A2C
    reportData.a2c.lvWallMotion || '',
    reportData.a2c.avLvotStructure || '',
    reportData.a2c.lvotDiameter || '',
    reportData.a2c.mr || '',
    reportData.a2c.ar || '',
    reportData.a2c.ms || '',
    reportData.a2c.as || '',
    reportData.a2c.avVmax || '',
    reportData.a2c.avMeanPG || '',
    reportData.a2c.avAVA || '',
    // Subcostal
    reportData.subcostal.asd || '',
    reportData.subcostal.vsd || '',
    reportData.subcostal.pericardialEffusion || '',
    reportData.subcostal.ivcDiameter || '',
    reportData.subcostal.ivcCollapseRatio || '',
    reportData.subcostal.volumeStatus || '',
    reportData.subcostal.raIvcFlow || '',
    // Summary
    reportData.summary.lvFunction || '',
    reportData.summary.ef || '',
    reportData.summary.fs || '',
    reportData.summary.rvFunction || '',
    reportData.summary.tapse || '',
    reportData.summary.valvular || '',
    reportData.summary.asdVsd || '',
    reportData.summary.aorta || '',
    reportData.summary.pericardium || '',
    reportData.summary.ivcVolume || '',
    reportData.summary.notes || ''
  ];
}

export async function uploadExamReport(reportData: any, existingSpreadsheetId?: string) {
  const sheets = await getUncachableGoogleSheetClient();
  
  let spreadsheetId: string;
  let sheetId: number;

  if (existingSpreadsheetId) {
    // Use existing spreadsheet
    spreadsheetId = existingSpreadsheetId;
    
    // Get the sheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId
    });
    
    sheetId = spreadsheet.data.sheets?.[0]?.properties?.sheetId || 0;
    
    // Append new data row
    const dataRow = createDataRow(reportData);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Exam Records!A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: [dataRow]
      }
    });
  } else {
    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `Cardiac Exam Records`
        },
        sheets: [{
          properties: {
            title: 'Exam Records'
          }
        }]
      }
    });

    spreadsheetId = spreadsheet.data.spreadsheetId!;
    if (!spreadsheetId) {
      throw new Error('Failed to create spreadsheet');
    }

    sheetId = spreadsheet.data.sheets?.[0]?.properties?.sheetId || 0;

    // Write header row and first data row
    const headerRow = createHeaderRow();
    const dataRow = createDataRow(reportData);
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Exam Records!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headerRow, dataRow]
      }
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
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                    fontSize: 11
                  },
                  backgroundColor: {
                    red: 0.9,
                    green: 0.9,
                    blue: 0.9
                  }
                }
              },
              fields: 'userEnteredFormat(textFormat,backgroundColor)'
            }
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1
                }
              },
              fields: 'gridProperties.frozenRowCount'
            }
          }
        ]
      }
    });
  }

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
  };
}
