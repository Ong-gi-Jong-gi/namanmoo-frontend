import AWS from 'aws-sdk';

const uploadFileS3 = async (file: File): Promise<void> => {
  const PUBLIC_KEY = import.meta.env.VITE_AWS_PUBLIC_KEY;
  const PRIVATE_KEY = import.meta.env.VITE_AWS_PRIVATE_KEY;
  const BUCKET = import.meta.env.VITE_PULL_BUCKET_NAME;
  const REGION = 'ap-northeast-2';

  // AWS 계정 설정
  AWS.config.update({
    accessKeyId: PUBLIC_KEY,
    secretAccessKey: PRIVATE_KEY,
    region: REGION,
  });

  const s3 = new AWS.S3();

  const uploadParams = {
    Bucket: BUCKET,
    Key: `${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default uploadFileS3;
