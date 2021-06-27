import mongoose, {Mongoose} from 'mongoose';

if (!process.env.DB_PROTOCOL)
  throw "missing process.env.DB_PROTOCOL";

if (!process.env.DB_USER)
  throw "missing process.env.DB_USER";

if (!process.env.DB_PASS)
  throw "missing process.env.DB_PASS";

if (!process.env.DB_URL)
  throw "missing process.env.DB_URL";

if (!process.env.DB_NAME)
  throw "missing process.env.DB_NAME";

if (!process.env.DB_PARAMS)
  throw "missing process.env.DB_PARAMS";

const DB_URI = `${process.env.DB_PROTOCOL}://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_URL}/${process.env.DB_NAME}${process.env.DB_PARAMS}`

export let databaseConnection:Mongoose;

export const isDatabaseConnected = () => databaseConnection !== undefined;

export const connectToDatabase = () => {
  return mongoose.connect(DB_URI, {
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,

    // not sure this is needed every time we open a connection...
    useCreateIndex: true,

    // use MongoDB driver's instead of mongoose
    useFindAndModify: false,

    // we'll see when we need this
    // maxIdleTimeMS: 10000,
    // socketTimeoutMS: 10000,
    // connectTimeoutMS: 10000,
  }).then(db => {
    databaseConnection = db;
    return db;
  });
}
