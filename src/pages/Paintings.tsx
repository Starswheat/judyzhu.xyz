import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import { paintings } from '../content';

function Viewer({ index, onChange, onClose }: { index: number; onChange: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const painting = paintings[index];
  const step = (by: number) => onChange((index + by + paintings.length) % paintings.length);

  useEffect(() => {
    dialog.current?.showModal();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, []);

  return <dialog
    ref={dialog}
    className="viewer"
    aria-label={painting.title}
    onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1); }}
  >
    <img src={painting.image} alt={painting.alt} />
    <div className="viewer-bar">
      <h2>{painting.title}</h2>
      <button className="icon-button" onClick={() => step(-1)} aria-label="Previous painting"><ArrowLeft size={18} aria-hidden="true" /></button>
      <button className="icon-button" onClick={() => step(1)} aria-label="Next painting"><ArrowRight size={18} aria-hidden="true" /></button>
      <button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} aria-hidden="true" /></button>
    </div>
  </dialog>;
}

export default function Paintings() {
  const [open, setOpen] = useState<number | null>(null);
  return <>
    <h1>Paintings</h1>
    <ul className="paintings">
      {paintings.map((painting, index) => <li key={painting.title}>
        <button className="painting" onClick={() => setOpen(index)}>
          <img src={painting.image} alt={painting.alt} loading={index > 1 ? 'lazy' : 'eager'} />
          <span>{painting.title}</span>
        </button>
      </li>)}
    </ul>
    {open !== null && <Viewer index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
  </>;
}
