import type { MultipartFile } from '@fastify/multipart';
import { recognitionUseCase } from 'domain/evacuationSearch/useCase/recognitionUseCase';
import { s3 } from 'service/s3Client';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const key = query.filePath;
    const url = await s3.getSignedUrl(key);
    return {
      status: 200,
      body: url,
    };
  },
  post: async ({ body }) => {
    const imageUrl = body.imageUrl;
    const gptResponse = await recognitionUseCase.recognition(imageUrl);
    return {
      status: 201,
      body: gptResponse,
    };
  },
  put: async ({ body }) => {
    const filePath = body.filePath;
    const image: MultipartFile = body.image;
    const buffer = await image.toBuffer();
    await s3.put({
      key: filePath,
      data: {
        ...image,
        toBuffer: async () => buffer,
      },
    });
    return {
      status: 202,
      body: `${filePath} `,
    };
  },
}));
