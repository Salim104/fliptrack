'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import type { StockItem } from '@/src/lib/mock-data'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/src/components/ui/select'

const PAYMENT_METHODS = ['Cash', 'EFT', 'SnapScan', 'Yoco', 'Other']

const labelStyle: React.CSSProperties = {
  color: '#888888',
  fontSize: 13,
  fontWeight: 600,
}

export default function SaleForm({ item }: { item: StockItem }) {
  const [buyerName, setBuyerName]       = useState('')
  const [buyerPhone, setBuyerPhone]     = useState('')
  const [salePrice, setSalePrice]       = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const profit = Number(salePrice) - item.costPrice
  const formattedProfit =
    salePrice !== '' && profit > 0
      ? `R ${profit.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'R 0.00'

  function handleConfirm() {
    console.log({
      stockItemId: item.id,
      buyerName,
      buyerPhone: `+27${buyerPhone}`,
      salePrice: Number(salePrice),
      paymentMethod,
      estimatedProfit: profit,
    })
  }

  return (
    <div
      className="flex-1 flex flex-col gap-6 rounded-xl"
      style={{ background: '#1A1A1A', border: '1px solid #222222', padding: 32 }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>Sale Details</h2>

      {/* Buyer Name */}
      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Buyer Name</label>
        <input
          type="text"
          placeholder="Enter buyer name..."
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          className="placeholder-[#555555] outline-none"
          style={{
            height: 44,
            background: '#111111',
            border: '1px solid #222222',
            borderRadius: 8,
            padding: '0 14px',
            color: '#FFFFFF',
            fontSize: 14,
          }}
        />
      </div>

      {/* Buyer Phone */}
      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Buyer Phone Number</label>
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
          <span style={{ color: '#888888', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>+27</span>
          <input
            type="tel"
            placeholder="..."
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
            style={{ color: '#FFFFFF' }}
          />
        </div>
      </div>

      {/* Sale Price + Payment Method */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sale Price */}
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Sale Price (ZAR)</label>
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
            <span style={{ color: '#888888', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>R</span>
            <input
              type="number"
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
              style={{ color: '#FFFFFF' }}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Payment Method</label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select method..." />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Estimated Profit banner */}
      <div
        className="flex items-center justify-between rounded-lg"
        style={{
          background: '#0D2B1A',
          border: '1px solid #1A5C38',
          padding: '16px 20px',
        }}
      >
        <span style={{ color: '#888888', fontSize: 14, fontWeight: 500 }}>Estimated Profit</span>
        <span style={{ color: '#00FF88', fontSize: 20, fontWeight: 800 }}>{formattedProfit}</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/inventory"
          className="flex items-center justify-center rounded-lg text-sm font-semibold"
          style={{ height: 44, padding: '0 24px', border: '1px solid #222222', color: '#888888' }}
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex items-center justify-center gap-2 rounded-lg text-sm font-bold"
          style={{ height: 44, padding: '0 32px', background: '#00FF88', color: '#0A0A0A' }}
        >
          <Check size={16} color="#0A0A0A" />
          Confirm Sale
        </button>
      </div>
    </div>
  )
}
