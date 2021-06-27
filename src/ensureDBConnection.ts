import {AsyncHandler} from "@yehonadav/lambdahttp";
import {connectToDatabase, isDatabaseConnected} from "./mongoose-db";

export const ensureDBConnection = (handler:AsyncHandler):AsyncHandler => async (
  event,
  context,
  callback,
) =>
{
  if (!isDatabaseConnected())
    await connectToDatabase();

  return await handler(event, context, callback);
}