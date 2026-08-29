/** Fixed CRT scanline + film-grain overlays. Purely decorative, never interactive. */
export default function CRTOverlay() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
    </>
  );
}
