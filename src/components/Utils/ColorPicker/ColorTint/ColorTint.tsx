import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { findColorTintPosition, rgbToHexa } from '../ColorPicker.utils'

import { ColorTintStyle } from './ColorTint.style'

const ColorTint = ({ defaultValue, handleChange, style = null }, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)

  const CURSOR_SIZE = 24

  useImperativeHandle<any, any>(ref, () => ({
    changeTintColor: (color) => {
      cursorRef.current.style.background = rgbToHexa(color)
      cursorRef.current.style.left =
        (findColorTintPosition(color) * rootRef.current.offsetWidth) / 6 -
        CURSOR_SIZE / 2 +
        'px'
    }
  }))

  useEffect(() => {
    cursorRef.current.style.background = rgbToHexa(defaultValue)
    cursorRef.current.style.left =
      (findColorTintPosition(defaultValue) * rootRef.current.offsetWidth) / 6 -
      CURSOR_SIZE / 2 +
      'px'
  }, [])

  const curves = {
    r: {
      start: (x) => -x + 2,
      end: (x) => x - 4,
      b: 3
    },
    g: {
      start: (x) => x,
      end: (x) => -x + 4,
      b: 2
    },
    b: {
      start: (x) => x - 2,
      end: (x) => -x + 6,
      b: 4
    }
  }

  const getColorFromPosition = (x: number) => {
    const applyCurve = (x, curve) =>
      Math.max(
        0,
        Math.min(1, x * 6 < curve.b ? curve.start(x * 6) : curve.end(x * 6))
      )

    return {
      r: applyCurve(x, curves.r) * 255,
      g: applyCurve(x, curves.g) * 255,
      b: applyCurve(x, curves.b) * 255
    }
  }

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    isDraggingRef.current = true

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)

    const ratio = getMousePosition(e)

    cursorRef.current.style.left =
      rootRef.current.offsetWidth * ratio - CURSOR_SIZE / 2 + 'px'
    changeColor(getColorFromPosition(ratio))
  }

  const getMousePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    const x =
      (e.pageX - rootRef.current.getBoundingClientRect().x) /
      rootRef.current.offsetWidth

    return Math.max(0, Math.min(1, x))
  }

  const changeColor = (color) => {
    cursorRef.current.style.backgroundColor = rgbToHexa(color)
    handleChange(color)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingRef.current) {
      const ratio = getMousePosition(e)

      cursorRef.current.style.left =
        rootRef.current.offsetWidth * ratio - CURSOR_SIZE / 2 + 'px'

      changeColor(getColorFromPosition(ratio))
    }
  }

  return (
    <div
      className='ColorTint'
      ref={rootRef}
      onMouseDown={handleMouseDown}
      draggable={false}
      style={{ ...ColorTintStyle.root, ...style }}
    >
      <div className='gradient' style={ColorTintStyle.gradient} />
      <div className='cursor' ref={cursorRef} style={ColorTintStyle.cursor} />
    </div>
  )
}

export default React.forwardRef(ColorTint)
