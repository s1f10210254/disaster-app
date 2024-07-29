import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { filePath: string };
    resBody: string;
  };
  // post: {
  //   reqBody: { fileName: string };
  //   resBody: string;
  // };
  put: {
    reqFormat: FormData;
    reqBody: { filePath: string; image: Blob };
    resBody: string;
  };
}>;
