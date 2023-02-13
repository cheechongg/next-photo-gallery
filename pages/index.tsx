import { useEffect } from 'react';
import Image from 'next/image';
import { shallow } from 'zustand/shallow'

// services
import { getAppleEventGallery } from '@/services/Gallery';

import useGallery, { GalleryAction, GalleryState } from '@/stores/Gallery';

// type/interface
import type { ImageProps } from '@/types/GalleryImage';

export default function Home({ images }: { images: ImageProps[]}) {
  const [total, increase] = useGallery(
    (state: GalleryState & GalleryAction) => [state.total, state.increase],
    shallow
  )

  useEffect(() => {
    increase(images.length)
  }, [])

  return (
    <main className='mx-auto max-w-[1960px] p-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        <div className='row-span-2'>
          <div className='flex justify-center items-end h-full after:content relative overflow-hidden rounded-lg bg-white/10 p-8 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'>
            <button
              onClick={() => increase(1)}
              type='button'
              className='pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4'
            >
              Clone and Deploy {total}
            </button>
          </div>
        </div>
        {images.map((image) => (
          <div
            key={image.key}
            className='after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
          >
            <Image
              alt='Next.js Conf photo'
              className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
              style={{ transform: 'translate3d(0, 0, 0)' }}
              loading='lazy'
              placeholder='blur'
              src={image.url}
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABf/EAB8QAQAABAcAAAAAAAAAAAAAAAECAwQUAAUGERJBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAHBEAAQMFAAAAAAAAAAAAAAAAAQACEgMEERQh/9oADAMBAAIRAxEAPwAifoSkcsqpt1GW5EAQBvxB97wNusWxJ4qW2zJYX//Z'
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
  const images = await getAppleEventGallery();

  // Pass data to the page via props
  return {
    props: {
      images: JSON.parse(JSON.stringify(images)),
    },
  };
}
