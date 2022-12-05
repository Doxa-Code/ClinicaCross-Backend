import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbInfo = Object.keys(process.env)
  .filter((key) => key.match(new RegExp("MONGODB_", "gi")))
  .reduce((obj: any, key: any) => {
    obj[key] = process.env[key];
    return obj;
  }, {});

const infoRequired = [
  "MONGODB_URI",
  "MONGODB_USER",
  "MONGODB_PWD",
  "MONGODB_DB",
  "MONGODB_PORT",
];

infoRequired.map((info) =>
  generationThrow(
    checkInfoAvailable(dbInfo[info] || ""),
    `Please define the ${info} environment variable inside .env`
  )
);

function checkInfoAvailable(info: string): boolean {
  return !info;
}

function generationThrow(generate: boolean, msg: string) {
  if (generate) {
    throw new Error(msg);
  }
}

const { MONGODB_URI, MONGODB_USER, MONGODB_PWD, MONGODB_DB, MONGODB_PORT } =
  dbInfo;

mongoose.connect(
  `mongodb://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(
    MONGODB_PWD
  )}@${MONGODB_URI}:${MONGODB_PORT}/${MONGODB_DB}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

export default mongoose;
