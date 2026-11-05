export function FeatureModal({ name, detail, onClose }: { name: string; detail: [string, string?]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => onClose()} onKeyDown={e => e.key === 'Escape' && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={name} className="max-h-full w-full max-w-lg overflow-auto rounded-2xl border border-line bg-bg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <button autoFocus aria-label="Close" onClick={() => onClose()} className="text-2xl leading-none text-muted hover:text-ink">×</button>
        </div>
        <p className="mt-3 leading-relaxed text-muted">{detail[0]}</p>
        {detail[1] && <img src={detail[1]} alt={name} className="mt-5 w-full rounded-xl border border-line" />}
      </div>
    </div>
  )
}
