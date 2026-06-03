'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  alt: string
}

interface TourGalleryProps {
  images: GalleryImage[]
}

/**
 * Tour hero gallery: a 5-tile grid where any photo opens a fullscreen
 * lightbox that can be navigated with arrows / keyboard / thumbnails.
 */
export default function TourGallery({ images }: TourGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const total = images.length

  const show = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])

  // Touch swipe: horizontal → prev/next, vertical → close.
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [drag, setDrag] = useState(0)

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return
    setDrag(e.touches[0].clientX - touch.current.x)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    setDrag(0)
    const SWIPE = 50
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx <= -SWIPE) next()
      else if (dx >= SWIPE) prev()
    } else if (Math.abs(dy) >= 70) {
      close()
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    // Lock body scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, prev, next])

  if (total === 0) return null

  // The hero grid shows up to 5 tiles; tile 0 is the feature.
  const tiles = images.slice(0, 5)
  const extra = total - tiles.length

  return (
    <>
      <div className="gallery">
        {tiles.map((img, i) => (
          <button
            key={i}
            type="button"
            className={`g${i === 0 ? ' feat' : ''}`}
            onClick={() => show(i)}
            aria-label={`Abrir foto ${i + 1} de ${total}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes={i === 0 ? '(max-width:880px) 100vw, 50vw' : '(max-width:880px) 50vw, 25vw'}
              style={{ objectFit: 'cover' }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            {i === tiles.length - 1 && extra > 0 && (
              <span className="more-photos">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 15l5-5 4 4 3-3 6 6" />
                </svg>
                +{extra} fotos
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen lightbox */}
      <div
        className={`tp-lightbox${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Galería de fotos"
        inert={!open}
        onClick={close}
      >
        <div className="lb-bar">
          <span className="lb-count">
            {index + 1} / {total}
          </span>
          <button type="button" className="lb-close" onClick={close} aria-label="Cerrar galería">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div
          className="lb-stage"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {total > 1 && (
            <button type="button" className="lb-nav lb-prev" onClick={prev} aria-label="Foto anterior">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Plain img: lightbox sources are full-bleed, no layout sizing needed */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lb-img"
            src={images[index].url}
            alt={images[index].alt}
            style={drag ? { transform: `translateX(${drag}px)` } : undefined}
            draggable={false}
          />

          {total > 1 && (
            <button type="button" className="lb-nav lb-next" onClick={next} aria-label="Foto siguiente">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>

        {total > 1 && (
          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`lb-thumb${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la foto ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
