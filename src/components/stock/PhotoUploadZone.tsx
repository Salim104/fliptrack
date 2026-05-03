'use client'

import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { Camera, X } from 'lucide-react'

interface Props {
  images: string[]
  onUpload: (publicId: string) => void
  onRemove: (publicId: string) => void
}

export default function PhotoUploadZone({ images, onUpload, onRemove }: Props) {
  return (
    <div className="w-full aspect-square lg:w-60 lg:h-60 lg:aspect-auto flex-shrink-0">
      <CldUploadWidget
        uploadPreset="fliptrack"
        options={{
          sources: ['local'],
          multiple: false,
          showSkipCropButton: false,
          cropping: false,
        }}
        onSuccess={(result) => {
          const info = result.info as { public_id: string }
          if (info?.public_id) onUpload(info.public_id)
        }}
      >
        {({ open }) =>
          images.length === 0 ? (
            <div
              onClick={() => open()}
              className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer"
              style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
            >
              <Camera size={40} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>Upload Photo</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 12, opacity: 0.6 }}>Click or drag image here</span>
            </div>
          ) : (
            <div
              className="relative w-full h-full rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-sunken)' }}
            >
              <CldImage
                src={images[0]}
                alt="Stock photo"
                fill
                style={{ objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => onRemove(images[0])}
                className="absolute top-2 right-2 rounded-full p-1"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <X size={14} color="#fff" />
              </button>
              <button
                type="button"
                onClick={() => open()}
                className="absolute bottom-2 right-2 rounded-lg text-xs px-2 py-1 font-medium"
                style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}
              >
                Change
              </button>
            </div>
          )
        }
      </CldUploadWidget>
    </div>
  )
}
