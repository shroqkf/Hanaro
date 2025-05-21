type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

export const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));
