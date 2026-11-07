import { useRef, type ButtonHTMLAttributes } from 'react';

export function GlassButton({ children, className = '', onPointerMove, onPointerLeave, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  function reset() { ref.current?.style.removeProperty('--tilt-x'); ref.current?.style.removeProperty('--tilt-y'); }
  return <button {...props} ref={ref} className={`glass-button ${className}`} onPointerMove={event => {
    if (event.pointerType === 'mouse' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 7}deg`);
      event.currentTarget.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 9}deg`);
    }
    onPointerMove?.(event);
  }} onPointerLeave={event => { reset(); onPointerLeave?.(event); }} onBlur={event => { reset(); props.onBlur?.(event); }}>{children}</button>;
}
