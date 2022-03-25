import uploadConfig from '@config/upload';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(uploadConfig.tmpFolder, file); // pega o caminho absoluto
    const fileContent = await fs.promises.readFile(originalName); // le o arquivo

    const ContentType = mime.getType(originalName); // Pega o content type do arquivo de imagem

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`, // nome do bucket dentro da AWS
        Key: file, // Arquivo a ser enviado
        ACL: 'public-read',
        Body: fileContent, // arquivo de imagem
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
