import Image from 'next/image';

import { BUCKET } from '../utils/awsS3Bucket';

const myLoader = ({ src, width, quality }) => {
  return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
};

export default function Home({ images }) {
  return (
    <main className='mx-auto max-w-[1960px] p-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        <div className='row-span-2'>
          <div className='flex justify-center items-end h-full after:content relative overflow-hidden rounded-lg bg-white/10 p-8 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'>
            <a
              className='pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4'
              href='https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application'
              target='_blank'
              rel='noreferrer'
            >
              Clone and Deploy
            </a>
          </div>
        </div>
        {images.map((image) => (
          <div
            key={image.Key}
            className='after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
          >
            <Image
              alt='Next.js Conf photo'
              className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
              style={{ transform: 'translate3d(0, 0, 0)' }}
              loading='lazy'
              // placeholder='blur'
              src={image.url}
              // blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABf/EAB8QAQAABAcAAAAAAAAAAAAAAAECAwQUAAUGERJBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAHBEAAQMFAAAAAAAAAAAAAAAAAQACEgMEERQh/9oADAMBAAIRAxEAPwAifoSkcsqpt1GW5EAQBvxB97wNusWxJ4qW2zJYX//Z'
              width={720}
              height={480}
              sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw'
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const ALBUM_FOLDER = encodeURIComponent('WWDC-Apple-2022') + '/';
  const images = await new Promise((resolve) => {
    BUCKET.listObjects({ Prefix: ALBUM_FOLDER }, async function (err, data) {
      let res = [];
      let href = this.request.httpRequest.endpoint.href;
      let bucketUrl = href + process.env.AWS_S3_BUCKET_NAME + '/';

      if (!err) {
        res = data.Contents.map((image) => {
          let photoKey = image.Key;
          let url = bucketUrl + photoKey;
          let newImage = { ...image, url };

          return newImage;
        });
      }

      resolve(res);
    });
  });

  // Pass data to the page via props
  return {
    props: {
      images: JSON.parse(JSON.stringify(images)),
    },
  };
}
