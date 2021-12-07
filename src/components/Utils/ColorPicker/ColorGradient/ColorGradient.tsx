import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import {
  TRGBColor,
  TColorGradientRef,
  TColorGradientProps
} from '../ColorPicker.types'
import {
  findColorGradientPosition,
  findColorTint,
  hexToRGB,
  rgbToHexa
} from '../ColorPicker.utils'

import { ColorGradientStyle } from './ColorGradient.style'

const ColorGradient = (
  {
    tintColor,
    handleChange,
    defaultColor = '#ff0000',
    style = null,
    height,
    width
  }: TColorGradientProps,
  ref: React.Ref<TColorGradientRef>
) => {
  const CURSOR_SIZE = 12
  const VIEWPORT_WIDTH = width || 262
  const VIEWPORT_HEIGHT = height || 180

  const tintColorRef = useRef<TRGBColor>(tintColor)
  const gradientRef = useRef<HTMLDivElement>()
  const cursorRef = useRef<HTMLDivElement>()
  const isDraggingRef = useRef<boolean>(false)

  const cursorPositionRef = useRef({ x: 0, y: 0 })

  useImperativeHandle<any, TColorGradientRef>(ref, () => ({
    changeTintColor: (color) => {
      tintColorRef.current = color
      gradientRef.current.style.backgroundColor = rgbToHexa(color)
      getColorFromPosition(cursorPositionRef.current)
    },
    changeColor: (color) => {
      const colorTint = findColorTint(color)
      gradientRef.current.style.backgroundColor = rgbToHexa(colorTint)
      updatePositionFromColor(color)
    }
  }))

  useEffect(() => {
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const updatePositionFromColor = (color) => {
    const pos = findColorGradientPosition(color)

    cursorPositionRef.current = {
      x: pos.x * VIEWPORT_WIDTH,
      y: pos.y * VIEWPORT_HEIGHT
    }

    cursorRef.current.style.top =
      pos.y * VIEWPORT_HEIGHT - CURSOR_SIZE / 2 + 'px'
    cursorRef.current.style.left =
      pos.x * VIEWPORT_WIDTH - CURSOR_SIZE / 2 + 'px'
  }

  useEffect(() => {
    updatePositionFromColor(hexToRGB(defaultColor))
  }, [])

  const getColorFromPosition = (position) => {
    const { x, y } = getRatioFromPosition(position)

    const positionColor = {
      r: tintColorRef.current.r * y,
      g: tintColorRef.current.g * y,
      b: tintColorRef.current.b * y
    }

    const refColor =
      tintColorRef.current.b === 255
        ? positionColor.b
        : tintColorRef.current.g === 255
        ? positionColor.g
        : positionColor.r

    const b = {
      r:
        positionColor.r +
        (tintColorRef.current.r === 1 ? 0 : (refColor - positionColor.r) * x),
      g:
        positionColor.g +
        (tintColorRef.current.g === 1 ? 0 : (refColor - positionColor.g) * x),
      b:
        positionColor.b +
        (tintColorRef.current.b === 1 ? 0 : (refColor - positionColor.b) * x)
    }

    handleChange(rgbToHexa(b))
  }

  const getRatioFromPosition = ({ x, y }) => ({
    x: 1 - Math.max(0, Math.min(1, x / VIEWPORT_WIDTH)),
    y: 1 - Math.max(0, Math.min(1, y / VIEWPORT_HEIGHT))
  })

  const getPosition = (
    e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!gradientRef.current) return
    const x = e.pageX - gradientRef.current.getBoundingClientRect().x
    const y = e.pageY - gradientRef.current.getBoundingClientRect().y

    return { x, y }
  }

  const updateCursorPosition = ({ x, y }) => {
    cursorPositionRef.current = { x, y }

    cursorRef.current.style.top =
      Math.min(Math.max(0, y), VIEWPORT_HEIGHT) - CURSOR_SIZE / 2 + 'px'
    cursorRef.current.style.left =
      Math.min(Math.max(0, x), VIEWPORT_WIDTH) - CURSOR_SIZE / 2 + 'px'
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const position = getPosition(e)
    getColorFromPosition(position)
    updateCursorPosition(position)
    cursorPositionRef.current = position
    isDraggingRef.current = true

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingRef.current) {
      const position = getPosition(e)
      getColorFromPosition(position)
      updateCursorPosition(position)
    }
  }

  return (
    <div>
      <div
        className='ColorGradient'
        ref={gradientRef}
        style={{
          backgroundColor: rgbToHexa(tintColorRef.current),
          height: VIEWPORT_HEIGHT,
          width: VIEWPORT_WIDTH,
          ...ColorGradientStyle.root,
          ...style
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={ColorGradientStyle.whiteGradient} />
        <div style={ColorGradientStyle.blackGradient} />
        <div
          ref={cursorRef}
          className='cursor'
          style={ColorGradientStyle.cursor}
        />
      </div>
    </div>
  )
}

export default React.memo(forwardRef(ColorGradient))
