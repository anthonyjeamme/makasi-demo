import { CSSProperties } from 'react'

export const ColorGradientStyle: Record<string, CSSProperties> = {
  root: {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: 8
  },
  cursor: {
    display: 'block',
    border: '2px solid white',
    borderRadius: 20,
    height: 8,
    width: 8,
    top: -4,
    left: -4,
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none'
  },
  whiteGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(
        to right,
        #fff 0%,
        rgba(255, 255, 255, 0) 100%
      )`,
    pointerEvents: 'none',
    borderRadius: 6
  },
  blackGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(to bottom, transparent 0%, #000 100%)`,
    pointerEvents: 'none',
    borderRadius: 6
  }
}
