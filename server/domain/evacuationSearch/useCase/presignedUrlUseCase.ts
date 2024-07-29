import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_BUCKET } from 'service/envValues';
import { s3Client } from 'service/s3Client';

export const presignedUrlUseCase = {
  getPresignedUrl: async (fileName: string, fileType: string): Promise<string> => {
    try {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: `${fileName}.${fileType}`,
        ContentType: fileType,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
      return url;
    } catch (error) {
      console.error({ error });
      throw new Error(`Error getting presigned URL: ${error}`);
    }
  },
};
