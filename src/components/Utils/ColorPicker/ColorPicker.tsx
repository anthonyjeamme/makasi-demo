import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'

// import useClickOutside from '~hooks/useClickOutside'
import ColorGradient from './ColorGradient/ColorGradient'
import {
  TColorGradientRef,
  TColorPicker,
  TColorPickerDropdown
} from './ColorPicker.types'
import ColorTint from './ColorTint/ColorTint'

import { findColorTint, hexToRGB, updateArrayItem } from './ColorPicker.utils'

import ColorPalette from './ColorPalette/ColorPalette'

import './ColorPicker.scss'

const ColorPicker: TColorPicker = ({
  color,
  onChange,
  type = 'normal',
  newColors = [],
  setNewColors
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [pickerIsOpen, setPickerIsOpen] = useState(false)

  // useClickOutside(pickerIsOpen, setPickerIsOpen, rootRef)

  return (
    <div className={`ColorPicker`} ref={rootRef}>
      {type === 'normal' ? (
        <ColorPickerDropdownNormal
          pickerIsOpen={pickerIsOpen}
          handleChange={onChange}
          currentColor={color}
          newColors={newColors}
          setNewColors={setNewColors}
        />
      ) : (
        <ColorPickerDropdownGradient
          pickerIsOpen={pickerIsOpen}
          handleChange={onChange}
          currentColor={color}
        />
      )}

      <button
        onClick={() => {
          setPickerIsOpen(!pickerIsOpen)
        }}
        className='square'
        style={{
          zIndex: pickerIsOpen ? 2 : 0,
          backgroundColor: newColors.find(({ id }) => id === color)
            ? newColors.find(({ id }) => id === color).hex
            : 'white'
        }}
      />
    </div>
  )
}

export default ColorPicker

const useSmoothUpdate = (callback, duration = 50) => {
  const timeoutRef = useRef(null)

  const push = (...props) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...props)
    }, duration)
  }

  return {
    push
  }
}

const ColorPickerDropdownNormal: TColorPickerDropdown = ({
  pickerIsOpen,
  handleChange,
  currentColor,
  newColors,
  setNewColors
}) => {
  const colorGradientRef = useRef<TColorGradientRef>()
  const colorTintRef = useRef<any>()
  const [extended, setExtended] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerDropdownRef = useRef<HTMLDivElement>()
  const [currentEditingColorId, setCurrentEditingColorId] =
    useState<string>(null)

  const smoothUpdate = useSmoothUpdate((hex) => {
    if (!currentEditingColorId) return

    setNewColors(
      updateArrayItem({
        id: currentEditingColorId,
        hex
      })(newColors)
    )
  }, 200)

  const colorPaletteRef = useRef(null)

  useEffect(() => {
    if (pickerIsOpen) {
      inputRef.current.select()
    } else {
      setExtended(false)
      setCurrentEditingColorId(null)
    }
  }, [pickerIsOpen])

  return (
    <div
      className={`ColorPickerDropdown ${pickerIsOpen ? 'active' : ''} ${
        extended ? 'extended' : ''
      }`}
      ref={colorPickerDropdownRef}
      style={{
        transition: 'height 300ms !important'
      }}
    >
      <ColorPalette
        ref={colorPaletteRef}
        handleCreateColor={() => {
          const newCustomColor = {
            id: uniqid(),
            hex: '#ff0000'
          }

          setNewColors([...newColors, newCustomColor])

          // customColorsRef.current = [...customColorsRef.current, newCustomColor]
          setCurrentEditingColorId(newCustomColor.id)
          handleChange(newCustomColor.id)
          setExtended(true)
          colorTintRef.current.changeTintColor({
            r: 255,
            g: 0,
            b: 0
          })

          window.requestAnimationFrame(() => {
            colorGradientRef.current.changeColor(hexToRGB(newCustomColor.hex))
          })
        }}
        newColors={newColors}
        currentColorId={currentColor}
        currentEditingColorId={currentEditingColorId}
        handleChange={(value) => {
          setCurrentEditingColorId(null)
          handleChange(value)
          setExtended(false)
        }}
        customColors={[]}
      />
      <div className={`more ${extended ? 'active' : ''}`}>
        <ColorGradient
          tintColor={{
            r: 255,
            g: 0,
            b: 0
          }}
          ref={colorGradientRef}
          handleChange={(value) => {
            colorPaletteRef.current.updateEditingColor(value)
            smoothUpdate.push(value)
            inputRef.current.value = value
          }}
        />
        <ColorTint
          ref={colorTintRef}
          defaultValue={{
            r: 255,
            g: 0,
            b: 0
          }}
          handleChange={(tintColor) => {
            colorGradientRef.current.changeTintColor(tintColor)
          }}
        />

        <input
          type='text'
          ref={inputRef}
          onChange={(e) => {
            if (e.target.value.toLowerCase().match(/^#[0-9a-z]{6}$/)) {
              const rgbColor = hexToRGB(e.target.value)
              const tintColor = findColorTint(rgbColor)

              colorGradientRef.current.changeTintColor({
                r: tintColor.r / 256,
                g: tintColor.g / 256,
                b: tintColor.b / 256
              })
            }
          }}
        />
      </div>
    </div>
  )
}

const ColorPickerDropdownGradient: TColorPickerDropdown = ({
  pickerIsOpen,
  handleChange,
  currentColor
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const colorGradientRef = useRef<TColorGradientRef>()
  const colorTintRef = useRef<any>()
  const colorPickerDropdownRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (pickerIsOpen) {
      inputRef.current.select()
    }
  }, [pickerIsOpen])

  const smoothUpdate = useSmoothUpdate((value) => {
    handleChange(value)
  })

  const defaultTintColor = findColorTint(hexToRGB(currentColor))

  return (
    <div
      className={`ColorPickerDropdown ${pickerIsOpen ? 'active' : ''}`}
      ref={colorPickerDropdownRef}
      style={{
        transition: 'height 300ms !important'
      }}
    >
      <div className='more active'>
        <ColorGradient
          ref={colorGradientRef}
          defaultColor={currentColor}
          tintColor={defaultTintColor}
          handleChange={(value) => {
            smoothUpdate.push(value)
            inputRef.current.value = value
          }}
        />
        <ColorTint
          ref={colorTintRef}
          defaultValue={defaultTintColor}
          handleChange={(tintColor) => {
            colorGradientRef.current.changeTintColor(tintColor)
          }}
        />

        <input
          type='text'
          defaultValue={currentColor}
          ref={inputRef}
          onChange={(e) => {
            if (e.target.value.toLowerCase().match(/^#[0-9a-z]{6}$/)) {
              const rgbColor = hexToRGB(e.target.value)
              colorGradientRef.current.changeColor(rgbColor)
              colorTintRef.current.changeTintColor(findColorTint(rgbColor))
              handleChange(e.target.value)
            }
          }}
        />
      </div>
    </div>
  )
}
