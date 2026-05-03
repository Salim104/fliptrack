export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div
        className="animate-spin rounded-full"
        style={{ width: 32, height: 32, border: '2px solid var(--accent)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}
