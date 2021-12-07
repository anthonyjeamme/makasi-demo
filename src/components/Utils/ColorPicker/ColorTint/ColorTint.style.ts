import { CSSProperties } from 'react'

export const ColorTintStyle: Record<string, CSSProperties> = {
  root: {
    position: 'relative',
    padding: '10px 0',
    userSelect: 'none'
  },
  gradient: {
    backgroundImage: `linear-gradient(
			to right,
			red 0%,
			#ff0 17%,
			lime 33%,
			cyan 50%,
			blue 66%,
			#f0f 83%,
			red 100%
		)`,
    height: 10,
    pointerEvents: 'none'
  },
  cursor: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    height: 20,
    width: 20,
    borderRadius: 20,
    background: 'red',
    left: -10,
    border: '2px solid white',
    pointerEvents: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)'
  }
}
