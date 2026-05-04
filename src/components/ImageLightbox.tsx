import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ImageLightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!open) return;
    resetZoom();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.5, 4));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.5, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, resetZoom]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - start.x, y: e.clientY - start.y });
  };
  const handlePointerUp = () => setDragging(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 4)); }}
              className="grid h-10 w-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur hover:bg-card"
              aria-label="Zoom avant"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setZoom((z) => { const nz = Math.max(z - 0.5, 1); if (nz === 1) setPos({ x: 0, y: 0 }); return nz; }); }}
              className="grid h-10 w-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur hover:bg-card"
              aria-label="Zoom arrière"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="grid h-10 w-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur hover:bg-card"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Zoom level indicator */}
          {zoom > 1 && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur">
              {Math.round(zoom * 100)}%
            </div>
          )}

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl"
            style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (zoom > 1) resetZoom();
              else setZoom(2.5);
            }}
          >
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              draggable={false}
              className="max-h-[90vh] max-w-[90vw] select-none object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
              }}
            />
          </motion.div>

          {/* Hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
            Double-cliquez pour zoomer · Échap pour fermer
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
