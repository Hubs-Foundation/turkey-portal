import { google } from 'googleapis';
import { NewContactT } from 'types';

type ResponseT = {
  status: number;
};

/**
 * Add Contact To Google Sheets
 * @returns Promise<ResponseT>
 */
export const addContact = async ({
  name,
  email,
  organization,
  country,
  subject,
  activity,
  message,
}: NewContactT): Promise<ResponseT> => {
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  const sheets = google.sheets({ version: 'v4', auth: jwt });
  const response = await sheets.spreadsheets.values
    .append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A1:D5',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [name, email, organization, country, subject, activity, message],
        ],
      },
    })
    .catch((err) => {
      console.error(err);
      return {
        status: err.status,
      };
    });

  return {
    status: response.status,
  };
};
