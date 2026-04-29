import { Camera } from 'lucide-react'

export default function PhotoUploadZone() {
  return (
    <div className="w-full aspect-square lg:w-60 lg:h-60 lg:aspect-auto flex-shrink-0">
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer"
        style={{ background: '#111111', border: '1px solid #222222' }}
      >
        <Camera size={40} color="#888888" />
        <span style={{ color: '#888888', fontSize: 14, fontWeight: 500 }}>
          Upload Photo
        </span>
        <span style={{ color: '#888888', fontSize: 12, opacity: 0.6 }}>
          Click or drag image here
        </span>
      </div>
    </div>
  )
}
