import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { getColorLuminosity } from '../ColorPicker.utils'

import './ColorPalette.scss'

const ColorPalette = (
  {
    currentColorId,
    handleCreateColor,
    handleChange,
    customColors,
    currentEditingColorId,
    newColors
  },
  ref
) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    updateEditingColor: (color) => {
      if (!currentEditingColorId) return

      const element: HTMLButtonElement = rootRef.current.querySelector(
        `button#${currentEditingColorId}`
      )

      if (!element) return

      element.style.background = color
    }
  }))

  return (
    <div className='ColorPalette' ref={rootRef}>
      {/* <button
				className={`${currentColorId === 'white' ? 'active' : ''}`}
				onClick={() => {
					handleChange('white')
				}}
				style={{ background: '#ffffff' }}
			/>
			<button
				className={`${currentColorId === 'dark' ? 'active' : ''}`}
				onClick={() => {
					handleChange('dark')
				}}
				style={{
					background: website.getPaletteColor(website.theme.colors.dark)
				}}
			/>
			<button
				className={`${currentColorId === 'light' ? 'active' : ''}`}
				onClick={() => {
					handleChange('light')
				}}
				style={{
					background: website.getPaletteColor(website.theme.colors.light)
				}}
			/>
			<button
				className={`${currentColorId === 'primary' ? 'active' : ''}`}
				onClick={() => {
					handleChange('primary')
				}}
				style={{
					background: website.getPaletteColor(website.theme.colors.primary)
				}}
			/> */}
      {[...customColors, ...newColors].map(({ id, hex }) => (
        <button
          id={id}
          key={id}
          className={`custom-color${currentColorId === id ? ' active' : ''}${
            getColorLuminosity(hex) > 0.98 ? ' light-color' : ''
          }${currentEditingColorId === id ? ' editing' : ''}`}
          onClick={() => {
            handleChange(id)
          }}
          style={{
            background: hex
          }}
        />
      ))}

      <button onClick={handleCreateColor} className='more'>
        <i className='mdi mdi-plus' />
      </button>
    </div>
  )
}

export default forwardRef(ColorPalette)
