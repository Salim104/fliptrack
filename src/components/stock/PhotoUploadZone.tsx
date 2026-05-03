'use client'

import { useRef, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { Camera, ImageIcon, X, Loader2 } from 'lucide-react'

interface Props {
  images: string[]
  onUpload: (publicId: string) => void
  onRemove: (publicId: string) => void
}

export default function PhotoUploadZone({ images, onUpload, onRemove }: Props) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    setShowPrompt(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'fliptrack')
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json() as { public_id?: string }
      if (data.public_id) onUpload(data.public_id)
    } finally {
      setUploading(false)
    }
  }

  function onCameraChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function onGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const prompt = (
    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => cameraRef.current?.click()}
        className="flex items-center gap-2 rounded-full text-sm font-medium"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '8px 16px' }}
      >
        <Camera size={15} />
        Take Photo
      </button>
      <button
        type="button"
        onClick={() => galleryRef.current?.click()}
        className="flex items-center gap-2 rounded-full text-sm font-medium"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '8px 16px' }}
      >
        <ImageIcon size={15} />
        Choose Photo
      </button>
    </div>
  )

  return (
    <div className="w-full aspect-square lg:w-60 lg:h-60 lg:aspect-auto flex-shrink-0">
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onCameraChange} />
      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={onGalleryChange} />

      {images.length === 0 ? (
        <div
          onClick={() => !uploading && setShowPrompt(true)}
          className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl"
          style={{
            background: 'var(--bg-sunken)',
            border: '1px solid var(--border)',
            cursor: uploading ? 'default' : 'pointer',
          }}
        >
          {uploading ? (
            <Loader2 size={40} color="var(--text-muted)" className="animate-spin" />
          ) : showPrompt ? (
            prompt
          ) : (
            <>
              <Camera size={40} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>Upload Photo</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 12, opacity: 0.6 }}>Click to select</span>
            </>
          )}
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
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <Loader2 size={32} color="#fff" className="animate-spin" />
            </div>
          )}
          {showPrompt && !uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
              {prompt}
            </div>
          )}
          <button
            type="button"
            onClick={() => onRemove(images[0])}
            className="absolute top-2 right-2 rounded-full p-1"
            style={{ background: 'rgba(0,0,0,0.7)' }}
          >
            <X size={14} color="#fff" />
          </button>
          {!showPrompt && !uploading && (
            <button
              type="button"
              onClick={() => setShowPrompt(true)}
              className="absolute bottom-2 right-2 rounded-lg text-xs px-2 py-1 font-medium"
              style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}
            >
              Change
            </button>
          )}
        </div>
      )}
    </div>
  )
}
