import { SQSEvent, Context } from "aws-lambda";
export default interface SQSController {
  handle: (event: SQSEvent, context: Context) => Promise<any>;
}
