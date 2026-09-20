// Deterministic gradient thumbnail so cards look distinct without hotlinked images.
function hueFrom(text = '') {
  let hash = 0
  for (const ch of text) hash = (hash * 31 + ch.codePointAt(0)) % 360
  return hash
}

export default function Thumb({ title }) {
  return (
    <div className="thumb" style={{ '--hue': hueFrom(title) }} aria-hidden="true">
      <span>{title?.trim()?.[0]?.toUpperCase() ?? '•'}</span>
    </div>
  )
}
