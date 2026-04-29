'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PhotoUploadZone from './PhotoUploadZone'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/src/components/ui/select'

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
  color: '#888888',
  fontSize: 13,
  fontWeight: 600,
}

const inputStyle: React.CSSProperties = {
  height: 44,
  background: '#111111',
  border: '1px solid #222222',
  borderRadius: 8,
  padding: '0 14px',
  color: '#FFFFFF',
  fontSize: 14,
  outline: 'none',
  width: '100%',
}

export default function AddStockForm() {
  const [model, setModel] = useState('')
  const [storage, setStorage] = useState('')
  const [color, setColor] = useState('')
  const [condition, setCondition] = useState('')
  const [imei, setImei] = useState('')
  const [costPrice, setCostPrice] = useState('')

  function handleSubmit() {
    console.log({ model, storage, color, condition, imei, costPrice })
  }

  return (
    <div
      className="flex flex-col gap-6 rounded-xl"
      style={{ background: '#1A1A1A', border: '1px solid #222222', padding: 32 }}
    >
      {/* Two-column: upload + fields */}
      <div className="flex flex-col lg:flex-row gap-6">
        <PhotoUploadZone />

        {/* Fields column */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Phone Model */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Phone Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select model..." />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Storage Capacity */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Storage Capacity</label>
            <Select value={storage} onValueChange={setStorage}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage..." />
              </SelectTrigger>
              <SelectContent>
                {STORAGE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color + Condition side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Color</label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color..." />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Condition</label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition..." />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* IMEI Number */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>IMEI Number</label>
            <input
              type="text"
              placeholder="Enter IMEI number..."
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              style={inputStyle}
              className="placeholder-[#555555]"
            />
          </div>

          {/* Cost Price */}
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Cost Price (ZAR)</label>
            <div
              className="flex items-center gap-2"
              style={{
                height: 44,
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: 8,
                padding: '0 14px',
              }}
            >
              <span style={{ color: '#888888', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>
                R
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
                style={{ color: '#FFFFFF' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button row */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/inventory"
          className="flex items-center justify-center rounded-lg text-sm font-semibold"
          style={{
            height: 44,
            padding: '0 24px',
            border: '1px solid #222222',
            color: '#888888',
          }}
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 rounded-lg text-sm font-bold"
          style={{
            height: 44,
            padding: '0 32px',
            background: '#00FF88',
            color: '#0A0A0A',
          }}
        >
          <Plus size={16} color="#0A0A0A" />
          Add to Stock
        </button>
      </div>
    </div>
  )
}
