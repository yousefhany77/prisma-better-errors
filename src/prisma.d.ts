export declare class PrismaClientKnownRequestError extends Error implements ErrorWithBatchIndex {
  code: string;
  meta?: Record<string, unknown>;
  clientVersion: string;
  batchRequestIdx?: number;
  constructor(message: string, { code, clientVersion, meta, batchRequestIdx }: KnownErrorParams);
  get [Symbol.toStringTag](): string;
}

declare interface ErrorWithBatchIndex {
  batchRequestIdx?: number;
}

declare type KnownErrorParams = {
  code: string;
  clientVersion: string;
  meta?: Record<string, unknown>;
  batchRequestIdx?: number;
};
