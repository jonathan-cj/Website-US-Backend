require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const logger = require('../../utils/Logger');
const creds = require('../../website-us-338407-8d4a34eb92a7.json');

const getDriveImgLink = (id) => `https://drive.google.com/uc?export=view&id=${id}`

module.exports = {
  async getBoysLineup() {
    try {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY
      });

      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows({ limit: 2 });

      var ret = [];
      rows.forEach((row) => {
        ret.push({
          nama: row.Nama,
          gambar: row.Gambar ? getDriveImgLink(row.Gambar.split('/')[5]) : null,
          nomor: row.Nomor,
          posisi: row.Posisi,
        });
      });

      return ret;
    } catch (e) {
      logger.log('error', e);
    }
  },
};
