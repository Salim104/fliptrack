'use client'

import { createContext, useContext, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type SelectContextValue = {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextValue>({
  value: '',
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
})

export function Select({
  children,
  value = '',
  onValueChange = () => {},
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, setOpen } = useContext(SelectContext)
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`flex items-center justify-between w-full ${className ?? ''}`}
      style={{
        height: 44,
        background: 'var(--bg-sunken)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '0 14px',
      }}
    >
      {children}
      <ChevronDown size={16} color="var(--text-muted)" className="flex-shrink-0" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useContext(SelectContext)
  return (
    <span style={{ color: value ? 'var(--foreground)' : 'var(--text-muted)', fontSize: 14 }}>
      {value || placeholder}
    </span>
  )
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContext(SelectContext)
  if (!open) return null
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpen(false)}
      />
      <div
        className="absolute z-50 w-full mt-1 rounded-lg overflow-y-auto"
        style={{
          background: 'var(--bg-sunken)',
          border: '1px solid var(--border)',
          maxHeight: 240,
        }}
      >
        {children}
      </div>
    </>
  )
}

export function SelectItem({
  children,
  value,
}: {
  children: React.ReactNode
  value: string
}) {
  const { value: selected, onValueChange, setOpen } = useContext(SelectContext)
  const isSelected = selected === value
  return (
    <button
      type="button"
      onClick={() => {
        onValueChange(value)
        setOpen(false)
      }}
      className="flex w-full items-center text-sm"
      style={{
        padding: '10px 14px',
        color: isSelected ? 'var(--accent)' : 'var(--foreground)',
        background: isSelected ? 'var(--accent-dark)' : 'transparent',
        textAlign: 'left',
      }}
    >
      {children}
    </button>
  )
}
