import { useState } from 'react';

/** Screenshot slot. Drop /public/docs/<name>.png (or .webp) and it appears; until then a placeholder shows. */
export default function Shot({ name, alt, w = 1600, h = 1000 }: { name: string; alt: string; w?: number; h?: number }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className="mt-5">
      {missing
        ? <div role="img" aria-label={alt} style={{ aspectRatio: `${w} / ${h}` }} className="flex w-full items-center justify-center rounded-xl border border-dashed border-line bg-surface px-4 text-center font-mono text-xs text-faint">Screenshot: public/docs/{name}.png</div>
        : <img src={`/docs/${name}.webp`} alt={alt} width={w} height={h} loading="lazy" onError={() => setMissing(true)} className="h-auto w-full rounded-xl border border-line" />}
      <figcaption className="mt-2 text-center text-xs text-faint">{alt}</figcaption>
    </figure>
  )
}
