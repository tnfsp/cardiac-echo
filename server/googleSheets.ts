import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

export async function uploadExamReport(reportData: any) {
  const sheets = await getUncachableGoogleSheetClient();
  
  // Create a new spreadsheet for the report
  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: `Cardiac Exam - ${reportData.patient.patientId} - ${reportData.patient.date}`
      },
      sheets: [{
        properties: {
          title: 'Exam Report'
        }
      }]
    }
  });

  const spreadsheetId = spreadsheet.data.spreadsheetId;
  if (!spreadsheetId) {
    throw new Error('Failed to create spreadsheet');
  }

  // Get the actual sheet ID from the created spreadsheet
  const sheetId = spreadsheet.data.sheets?.[0]?.properties?.sheetId;
  if (sheetId === undefined) {
    throw new Error('Failed to get sheet ID');
  }

  // Prepare data rows
  const rows: any[][] = [
    ['Cardiac Ultrasound Examination Report'],
    [''],
    ['Patient Information'],
    ['Date', reportData.patient.date],
    ['Physician', reportData.patient.physician],
    ['Patient ID', reportData.patient.patientId],
    ['Bed Number', reportData.patient.bedNumber],
    ['Purposes', reportData.patient.purposes?.join(', ') || ''],
    [''],
    ['PLAX Measurements'],
    ['AV/MV Structure', reportData.plax.avMvStructure || ''],
    ['Pericardial Effusion', reportData.plax.pericardialEffusion || ''],
    ['Aortic Root', reportData.plax.aorticRoot || ''],
    ['LA', reportData.plax.la || ''],
    ['LVOT', reportData.plax.lvot || ''],
    ['IVS', reportData.plax.ivs || ''],
    ['LVESd', reportData.plax.lvesd || ''],
    ['LVPW', reportData.plax.lvpw || ''],
    ['LVEDd', reportData.plax.lvedd || ''],
    ['MR', reportData.plax.mr || ''],
    ['MS', reportData.plax.ms || ''],
    ['AR', reportData.plax.ar || ''],
    ['AS', reportData.plax.as || ''],
    [''],
    ['PSAX Measurements'],
    ['AV Status', reportData.psax.avStatus || ''],
    ['MV Status', reportData.psax.mvStatus || ''],
    ['LV Status', reportData.psax.lvStatus || ''],
    ['RVOT Status', reportData.psax.rvotStatus || ''],
    ['LV FS%', reportData.psax.lvFS || ''],
    ['LV FS Level', reportData.psax.lvFSLevel || ''],
    ['PV Color', reportData.psax.pvColor || ''],
    ['TV Color', reportData.psax.tvColor || ''],
    ['AV Color', reportData.psax.avColor || ''],
    ['TR Vmax', reportData.psax.trVmax || ''],
    ['RVSP', reportData.psax.rvsp || ''],
    [''],
    ['A4C Measurements'],
    ['LV Size', reportData.a4c.lvSize || ''],
    ['LV Contraction', reportData.a4c.lvContraction || ''],
    ['Simpson EF', reportData.a4c.simpsonEF || ''],
    ['RV Size', reportData.a4c.rvSize || ''],
    ['RV Contraction', reportData.a4c.rvContraction || ''],
    ['TAPSE', reportData.a4c.tapse || ''],
    ['Septal Motion', reportData.a4c.septalMotion || ''],
    ['MS', reportData.a4c.ms || ''],
    ['MR', reportData.a4c.mr || ''],
    ['TR', reportData.a4c.tr || ''],
    ['MV E', reportData.a4c.mvE || ''],
    ['MV A', reportData.a4c.mvA || ''],
    ['Decel Time', reportData.a4c.decelTime || ''],
    ['TR Vmax', reportData.a4c.trVmax || ''],
    ['RVSP', reportData.a4c.rvsp || ''],
    ['TDI Septal', reportData.a4c.tdiSept || ''],
    ['TDI Lateral', reportData.a4c.tdiLat || ''],
    ['E/e\' Ratio', reportData.a4c.eRatio || ''],
    [''],
    ['A2C/A3C/A5C Measurements'],
    ['LV Wall Motion', reportData.a2c.lvWallMotion || ''],
    ['AV/LVOT Structure', reportData.a2c.avLvotStructure || ''],
    ['LVOT Diameter', reportData.a2c.lvotDiameter || ''],
    ['MR', reportData.a2c.mr || ''],
    ['AR', reportData.a2c.ar || ''],
    ['MS', reportData.a2c.ms || ''],
    ['AS', reportData.a2c.as || ''],
    ['AV Vmax', reportData.a2c.avVmax || ''],
    ['AV Mean PG', reportData.a2c.avMeanPG || ''],
    ['AVA', reportData.a2c.avAVA || ''],
    [''],
    ['Subcostal Measurements'],
    ['ASD', reportData.subcostal.asd || ''],
    ['VSD', reportData.subcostal.vsd || ''],
    ['Pericardial Effusion', reportData.subcostal.pericardialEffusion || ''],
    ['IVC Diameter', reportData.subcostal.ivcDiameter || ''],
    ['IVC Collapse Ratio', reportData.subcostal.ivcCollapseRatio || ''],
    ['Volume Status', reportData.subcostal.volumeStatus || ''],
    ['RA/IVC Flow', reportData.subcostal.raIvcFlow || ''],
    [''],
    ['Summary'],
    ['LV Function', reportData.summary.lvFunction || ''],
    ['EF', reportData.summary.ef || ''],
    ['FS', reportData.summary.fs || ''],
    ['RV Function', reportData.summary.rvFunction || ''],
    ['TAPSE', reportData.summary.tapse || ''],
    ['Valvular', reportData.summary.valvular || ''],
    ['ASD/VSD', reportData.summary.asdVsd || ''],
    ['Aorta/LA', reportData.summary.aorta || ''],
    ['Pericardium', reportData.summary.pericardium || ''],
    ['IVC/Volume', reportData.summary.ivcVolume || ''],
    ['Notes', reportData.summary.notes || '']
  ];

  // Write data to the spreadsheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Exam Report!A1',
    valueInputOption: 'RAW',
    requestBody: {
      values: rows
    }
  });

  // Format the header row
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
                  fontSize: 14
                }
              }
            },
            fields: 'userEnteredFormat(textFormat)'
          }
        }
      ]
    }
  });

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
  };
}
