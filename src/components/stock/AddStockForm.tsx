'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import PhotoUploadZone from './PhotoUploadZone'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/src/components/ui/select'
import { createStockItem } from '@/app/actions/stock'

const MODELS = [
  'iPhone 11', 'iPhone 12', 'iPhone 12 Mini', 'iPhone 13', 'iPhone 13 Mini',
  'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 14', 'iPhone 14 Plus',
  'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus',
  'iPhone 15 Pro', 'iPhone 15 Pro Max',
]

const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB']

const COLORS = [
  'Space Black', 'Midnight', 'Starlight', 'Blue', 'Purple', 'Red',
  'Natural', 'White', 'Pink', 'Yellow', 'Green',
]

const CONDITIONS = ['Brand New', 'Like New', 'Good', 'Fair', 'Poor']

const labelStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: 13,
  fontWeight: 600,
}

const inputStyle: React.CSSProperties = {
  height: 44,
  background: 'var(--bg-sunken)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '0 14px',
  color: 'var(--foreground)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
}

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: '1px solid var(--danger)',
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <span style={{ color: 'var(--danger)', fontSize: 12 }}>{msg}</span>
}

function validate(fields: {
  model: string; storage: string; color: string; condition: string
  imei: string; costPrice: string
}) {
  const errors: Partial<Record<keyof typeof fields, string>> = {}
  if (!fields.model)     errors.model     = 'Phone model is required'
  if (!fields.storage)   errors.storage   = 'Storage is required'
  if (!fields.color)     errors.color     = 'Color is required'
  if (!fields.condition) errors.condition = 'Condition is required'
  if (!fields.imei.trim()) {
    errors.imei = 'IMEI is required'
  } else if (!/^\d{15}$/.test(fields.imei.trim())) {
    errors.imei = 'IMEI must be exactly 15 digits'
  }
  const price = Number(fields.costPrice)
  if (!fields.costPrice) {
    errors.costPrice = 'Cost price is required'
  } else if (isNaN(price) || price <= 0) {
    errors.costPrice = 'Enter a valid price greater than 0'
  }
  return errors
}

export default function AddStockForm() {
  const [model, setModel]         = useState('')
  const [storage, setStorage]     = useState('')
  const [color, setColor]         = useState('')
  const [condition, setCondition] = useState('')
  const [imei, setImei]           = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [images, setImages]       = useState<string[]>([])
  const [errors, setErrors]       = useState<Partial<Record<string, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleUpload(publicId: string) {
    setImages((prev) => [...prev, publicId])
  }

  function handleRemove(publicId: string) {
    setImages((prev) => prev.filter((id) => id !== publicId))
  }

  function handleSubmit() {
    const fields = { model, storage, color, condition, imei, costPrice }
    const errs = validate(fields)
    setErrors(errs)
    setSubmitted(true)
    if (Object.keys(errs).length > 0) return

    startTransition(async () => {
      const result = await createStockItem({ model, storage, color, condition, imei, costPrice, images })
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  const hasErrors = submitted && Object.keys(errors).length > 0

  return (
    <div
      className="flex flex-col gap-6 rounded-xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 32 }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <PhotoUploadZone images={images} onUpload={handleUpload} onRemove={handleRemove} />

        <div className="flex-1 flex flex-col gap-4">
          {/* Phone Model */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Phone Model</label>
            <Select value={model} onValueChange={(v) => { setModel(v); if (submitted) setErrors((e) => ({ ...e, model: undefined })) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select model..." />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <FieldError msg={errors.model} />
          </div>

          {/* Storage */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Storage Capacity</label>
            <Select value={storage} onValueChange={(v) => { setStorage(v); if (submitted) setErrors((e) => ({ ...e, storage: undefined })) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage..." />
              </SelectTrigger>
              <SelectContent>
                {STORAGE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <FieldError msg={errors.storage} />
          </div>

          {/* Color + Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Color</label>
              <Select value={color} onValueChange={(v) => { setColor(v); if (submitted) setErrors((e) => ({ ...e, color: undefined })) }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color..." />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError msg={errors.color} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Condition</label>
              <Select value={condition} onValueChange={(v) => { setCondition(v); if (submitted) setErrors((e) => ({ ...e, condition: undefined })) }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition..." />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError msg={errors.condition} />
            </div>
          </div>

          {/* IMEI */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>IMEI Number</label>
            <input
              type="text"
              placeholder="15-digit IMEI..."
              value={imei}
              onChange={(e) => {
                setImei(e.target.value)
                if (submitted) setErrors((e2) => ({ ...e2, imei: undefined }))
              }}
              style={submitted && errors.imei ? inputErrorStyle : inputStyle}
              className="placeholder-[#555555]"
              maxLength={15}
            />
            <FieldError msg={errors.imei} />
          </div>

          {/* Cost Price */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Cost Price (ZAR)</label>
            <div
              className="flex items-center gap-2"
              style={{
                height: 44,
                background: 'var(--bg-sunken)',
                border: submitted && errors.costPrice ? '1px solid var(--danger)' : '1px solid var(--border)',
                borderRadius: 8,
                padding: '0 14px',
              }}
            >
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>R</span>
              <input
                type="number"
                placeholder="0.00"
                value={costPrice}
                onChange={(e) => {
                  setCostPrice(e.target.value)
                  if (submitted) setErrors((e2) => ({ ...e2, costPrice: undefined }))
                }}
                className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
                style={{ color: 'var(--foreground)' }}
                min={0}
              />
            </div>
            <FieldError msg={errors.costPrice} />
          </div>
        </div>
      </div>

      {hasErrors && (
        <p style={{ color: 'var(--danger)', fontSize: 13 }}>Please fix the errors above before submitting.</p>
      )}

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/inventory"
          className="flex items-center justify-center rounded-lg text-sm font-semibold"
          style={{ height: 44, padding: '0 24px', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-lg text-sm font-bold"
          style={{
            height: 44,
            padding: '0 32px',
            background: 'var(--accent)',
            color: 'var(--background)',
            opacity: isPending ? 0.8 : 1,
            cursor: isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {isPending ? (
            <>
              <Loader2 size={16} color="var(--background)" className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus size={16} color="var(--background)" />
              Add to Stock
            </>
          )}
        </button>
      </div>
    </div>
  )
}
