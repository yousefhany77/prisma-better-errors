import { PrismaClientKnownRequestError } from "./prisma";
import { getPrismaErrorMessage } from "./util";

export class prismaError extends Error {
  statusCode: number;
  title: string;
  metaData?: string;

  constructor(error: PrismaClientKnownRequestError) {
    const { message, httpStatus } = getPrismaErrorMessage(error);
    super(message);
    this.title = 'Prisma Error';
    this.statusCode = httpStatus;
    this.metaData = error.meta && JSON.parse(JSON.stringify(error.meta));
  }
}
