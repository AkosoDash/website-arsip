import fs from "fs";
import { google } from "googleapis";
import { getDate, getMonth, getUnixDate, getYear } from "../utils/get_date.js";
import { googlekey } from "../utils/constant_env.js";
import error_handler from "../utils/error_handler.js";

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
const currentDate = `${getDate()}${getMonth()}${getYear()}${getUnixDate()}`;

const auth = new google.auth.GoogleAuth({
  credentials: googlekey,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const driveService = google.drive({
  version: "v3",
  auth,
});

const upload_file = async (file, folder = folderId) => {
  try {
    const fileMetaData = {
      name: `${currentDate}_${file.originalname}`,
      parents: [folder],
    };
    const media = {
      mimeType: file.mimeType,
      body: file?.streams ? file.streams : fs.createReadStream(file.path),
    };
    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    });
    await driveService.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const url = "https://drive.google.com/uc?view&id=";
    const result = await driveService.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });
    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
      link: url + response.data.id,
    };
  } catch (error) {
    console.log(error);
  }
};

const delete_file = async (file_id) => {
  try {
    const fileId = file_id;
    const result = await driveService.files.delete({ fileId });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export { upload_file, delete_file };
