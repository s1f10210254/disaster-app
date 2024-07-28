import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: '' }),
  post: ({ body }) => ({
    status: 201,
    body: `${body.imageUrl}`,
  }),
}));
