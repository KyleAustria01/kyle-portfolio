import { useEffect, useRef } from 'react';
import { useTheme } from '../context/useTheme';

const DURATION = 420; // ms
const GRID_W = 160; // low-res buffer, upscaled with pixelated rendering
const GRID_H = 90;

/**
 * TV static burst over a theme change. The canvas is deliberately tiny and
 * upscaled by CSS, so the noise reads as chunky pixels and costs almost
 * nothing to redraw each frame.
 *
 * Skips the first render — the stored theme applying on load is not a change
 * the viewer made, so it should not flash.
 */
export default function ThemeTransition() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const rafRef = useRef(0);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    canvas.width = GRID_W;
    canvas.height = GRID_H;
    overlay.classList.add('active');

    const image = ctx.createImageData(GRID_W, GRID_H);
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);

      // Ramp in fast, hold, then fall away.
      const intensity = t < 0.25 ? t / 0.25 : 1 - (t - 0.25) / 0.75;
      overlay.style.opacity = String(Math.max(intensity, 0) * 0.85);

      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const on = Math.random();
        if (on < 0.42) {
          data[i + 3] = 0; // transparent gap, so the page shows through
          continue;
        }
        const v = Math.random() * 255;
        // Mostly monochrome grain with occasional cyan/magenta pixels, matching
        // the glitch layers used elsewhere.
        const tint = Math.random();
        if (tint > 0.94) {
          data[i] = 0;
          data[i + 1] = 210;
          data[i + 2] = 255;
        } else if (tint > 0.88) {
          data[i] = 255;
          data[i + 1] = 0;
          data[i + 2] = 127;
        } else {
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
        }
        data[i + 3] = 200;
      }
      ctx.putImageData(image, 0, 0);

      // A couple of horizontal tears per frame, like a mistracking signal.
      const tears = 2;
      for (let n = 0; n < tears; n += 1) {
        const y = Math.floor(Math.random() * GRID_H);
        const h = 1 + Math.floor(Math.random() * 4);
        const shift = Math.floor((Math.random() - 0.5) * 26);
        const slice = ctx.getImageData(0, y, GRID_W, h);
        ctx.putImageData(slice, shift, y);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        ctx.clearRect(0, 0, GRID_W, GRID_H);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [theme]);

  return (
    <div className="theme-static" ref={overlayRef} aria-hidden="true">
      <canvas className="theme-static-canvas" ref={canvasRef} />
    </div>
  );
}
