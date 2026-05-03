'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import type { StockItem } from '@prisma/client'
import { zar } from '@/src/lib/format'
import { recordSale } from '@/app/actions/sales'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/src/components/ui/select'

const PAYMENT_METHODS = [
  { value: 'CASH',     label: 'Cash' },
  { value: 'EFT',      label: 'EFT' },
  { value: 'SNAPSCAN', label: 'SnapScan' },
  { value: 'YOCO',     label: 'Yoco' },
  { value: 'OTHER',    label: 'Other' },
]

const labelStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: 13,
  fontWeight: 600,
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <span style={{ color: 'var(--danger)', fontSize: 12 }}>{msg}</span>
}

function validate(fields: {
  buyerName: string; buyerPhone: string; salePrice: string; paymentMethod: string
}) {
  const errors: Partial<Record<keyof typeof fields, string>> = {}
  if (!fields.buyerName.trim())     errors.buyerName     = 'Buyer name is required'
  if (!fields.buyerPhone.trim())    errors.buyerPhone    = 'Phone number is required'
  if (!fields.paymentMethod)        errors.paymentMethod = 'Payment method is required'
  const price = Number(fields.salePrice)
  if (!fields.salePrice) {
    errors.salePrice = 'Sale price is required'
  } else if (isNaN(price) || price <= 0) {
    errors.salePrice = 'Enter a valid price greater than 0'
  }
  return errors
}

export default function SaleForm({ item }: { item: StockItem }) {
  const [buyerName, setBuyerName]         = useState('')
  const [buyerPhone, setBuyerPhone]       = useState('')
  const [salePrice, setSalePrice]         = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [errors, setErrors]               = useState<Partial<Record<string, string>>>({})
  const [isPending, startTransition]      = useTransition()

  const salePriceNum = Number(salePrice)
  const profit       = salePriceNum - item.costPrice
  const hasPrice     = salePrice !== '' && salePriceNum > 0
  const isLoss       = hasPrice && profit < 0

  const profitDisplay = hasPrice
    ? (profit >= 0 ? `+${zar.format(profit)}` : `-${zar.format(Math.abs(profit))}`)
    : '—'

  function handleConfirm() {
    const fields = { buyerName, buyerPhone, salePrice, paymentMethod }
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    startTransition(async () => {
      const result = await recordSale({
        stockItemId:   item.id,
        buyerName,
        buyerPhone:    `+27${buyerPhone}`,
        salePrice,
        paymentMethod,
      })
      if (result?.error) toast.error(result.error)
    })
  }

  return (
    <div
      className="flex-1 flex flex-col gap-6 rounded-xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 32 }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--foreground)' }}>Sale Details</h2>

      {/* Buyer Name */}
      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Buyer Name</label>
        <input
          type="text"
          placeholder="Enter buyer name..."
          value={buyerName}
          onChange={(e) => {
            setBuyerName(e.target.value)
            setErrors((p) => ({ ...p, buyerName: undefined }))
          }}
          className="placeholder-[#555555] outline-none"
          style={{
            height: 44,
            background: 'var(--bg-sunken)',
            border: errors.buyerName ? '1px solid var(--danger)' : '1px solid var(--border)',
            borderRadius: 8,
            padding: '0 14px',
            color: 'var(--foreground)',
            fontSize: 14,
          }}
        />
        <FieldError msg={errors.buyerName} />
      </div>

      {/* Buyer Phone */}
      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Buyer Phone Number</label>
        <div
          className="flex items-center gap-2"
          style={{
            height: 44,
            background: 'var(--bg-sunken)',
            border: errors.buyerPhone ? '1px solid var(--danger)' : '1px solid var(--border)',
            borderRadius: 8,
            padding: '0 14px',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>+27</span>
          <input
            type="tel"
            placeholder="..."
            value={buyerPhone}
            onChange={(e) => {
              setBuyerPhone(e.target.value)
              setErrors((p) => ({ ...p, buyerPhone: undefined }))
            }}
            className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
            style={{ color: 'var(--foreground)' }}
          />
        </div>
        <FieldError msg={errors.buyerPhone} />
      </div>

      {/* Sale Price + Payment Method */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Sale Price (ZAR)</label>
          <div
            className="flex items-center gap-2"
            style={{
              height: 44,
              background: 'var(--bg-sunken)',
              border: errors.salePrice ? '1px solid var(--danger)' : '1px solid var(--border)',
              borderRadius: 8,
              padding: '0 14px',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, flexShrink: 0 }}>R</span>
            <input
              type="number"
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => {
                setSalePrice(e.target.value)
                setErrors((p) => ({ ...p, salePrice: undefined }))
              }}
              className="flex-1 bg-transparent outline-none placeholder-[#555555] text-sm"
              style={{ color: 'var(--foreground)' }}
              min={0}
            />
          </div>
          <FieldError msg={errors.salePrice} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Payment Method</label>
          <Select
            value={paymentMethod}
            onValueChange={(v) => {
              setPaymentMethod(v)
              setErrors((p) => ({ ...p, paymentMethod: undefined }))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method..." />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((m) => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError msg={errors.paymentMethod} />
        </div>
      </div>

      {/* Profit / Loss banner */}
      <div
        className="flex items-center justify-between rounded-lg"
        style={{
          background: isLoss ? 'var(--danger-bg)' : 'var(--accent-bg)',
          border: `1px solid ${isLoss ? 'var(--danger-dark)' : 'var(--accent-dark)'}`,
          padding: '16px 20px',
        }}
      >
        <div className="flex flex-col gap-0.5">
          <span style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>Estimated Profit</span>
          {isLoss && (
            <span style={{ color: 'var(--danger)', fontSize: 12 }}>Selling below cost price</span>
          )}
        </div>
        <span style={{ color: isLoss ? 'var(--danger)' : 'var(--accent)', fontSize: 20, fontWeight: 800 }}>
          {profitDisplay}
        </span>
      </div>

      {/* Buttons */}
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
          onClick={handleConfirm}
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
          <Check size={16} color="var(--background)" />
          {isPending ? 'Confirming...' : 'Confirm Sale'}
        </button>
      </div>
    </div>
  )
}
