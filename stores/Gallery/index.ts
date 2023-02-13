import { create } from 'zustand';

export type GalleryState = {
  total: number,
}

export type GalleryAction = {
  increase: (by: number) => void
}

const useGallery = create<GalleryState & GalleryAction>()((set) => ({
  total: 0,
  increase: (by: number) => set((state) => ({ total: state.total + by })),
}))

export default useGallery;