import S3 from 'aws-sdk/clients/s3';

export const BUCKET: S3.Types = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
  signatureVersion: 'v4',
  params: { Bucket: process.env.AWS_S3_BUCKET_NAME },
});
