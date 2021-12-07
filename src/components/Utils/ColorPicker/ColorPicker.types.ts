import React from 'react'

export type TColorGradientRef = {
  changeTintColor: (color: TRGBColor) => void
  changeColor: (color: TRGBColor) => void
}

export type TRGBColor = {
  r: number
  g: number
  b: number
}

export type TColorGradientProps = {
  tintColor: TRGBColor
  defaultColor?: string
  handleChange: (update: any) => void
  style?: React.CSSProperties
  width?: number
  height?: number
}

export type TColorPickerType = 'normal' | 'gradient'

export type TColorPicker = React.FC<{
  color: string
  onChange: (color: string) => void
  type?: TColorPickerType
  newColors?: any[]
  setNewColors?: (colors: any[]) => void
}>

export type TColorPickerDropdown = React.FC<{
  pickerIsOpen: boolean
  handleChange: (color: string) => void
  currentColor?: string
  newColors?: any[]
  setNewColors?: (colors: any[]) => void
}>
