import { format } from "date-fns";
import { existsSync } from "fs";
import { appendFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url); // boilerplate
const __dirname = dirname(__filename); // boilerplate

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logs = join(__dirname, "..", "logs");
    if (!existsSync(logs)) {
      await mkdir(logs);
    }
    await appendFile(join(logs, logFileName), logItem);
  } catch (error) {
    console.log(error);
  }
};

export const logger = (req, _res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};
