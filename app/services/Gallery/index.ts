import { BUCKET } from '@/utils/awsS3Bucket';
import type { ImageProps } from '@/types/GalleryImage';

export const getAppleEventGallery = async (): Promise<ImageProps[]> => {
  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: encodeURIComponent('WWDC-Apple-2022') + '/'
  } 

  const images: ImageProps[] = await new Promise((resolve) => {
    BUCKET.listObjectsV2(bucketParams, async function (err, data) {
      let res = [];
      let href = this.request.httpRequest.endpoint.href;
      let bucketUrl = href + process.env.AWS_S3_BUCKET_NAME + '/';

      if (!err) {
        res = data.Contents.map((image) => {
          let photoKey = image.Key;
          let url = bucketUrl + photoKey;
          let newImage = { 
            key: image.Key, 
            name: image.Key,
            url 
          };

          return newImage;
        });
      }

      resolve(res);
    });
  });

  return images;
}