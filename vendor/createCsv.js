import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export default (fileName, data) => {
  try {
    const csvData = Object.values(data)
      .map((val) => val)
      .join("; ");
    if (!fs.existsSync(`storage/private/text`)) {
      fs.mkdirSync(`storage/private/text`, { recursive: true });
    }
    if (
      fs.existsSync(`storage/private/text/${fileName}.csv`)
    ) {
      fs.appendFileSync(
        `storage/private/text/${fileName}.csv`,
        csvData + `\n`
      );
    } else {
      const headers = Object.keys(data)
        .map((val) => val)
        .join("; ");
      fs.writeFileSync(
        `storage/private/text/${fileName}.csv`,
        headers + `\n` + csvData + `\n`
      );
    }
    return { fileUrl: process.env.BASE_URL + `private/text/${fileName}.csv` };
  } catch (error) {
    throw new Error(error);
  }
};
