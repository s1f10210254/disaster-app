import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  //   get: {
  //     query: { filePath: string };
  //     resBody: string;
  //   };
  //   post: {
  //     reqBody: { imageUrl: string };
  //     resBody: string;
  //   };
  //   put: {
  //     reqFormat: FormData;
  //     reqBody: { filePath: string; image: Blob };
  //     resBody: string;
  //   };
}>;
