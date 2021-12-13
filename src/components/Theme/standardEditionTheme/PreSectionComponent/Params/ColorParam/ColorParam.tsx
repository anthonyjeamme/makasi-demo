import React from 'react'

import './ColorParam.scss'

const ColorParam = ({ value, onChange }) => {
  const colorPalette = ['#273742', 'white', '#f4f5fd']

  return (
    <div className='ColorParam'>
      {colorPalette.map((color) => (
        <div
          key={color}
          role='button'
          className={`color-circle${color === value ? ' active' : ''}`}
          onClick={() => {
            onChange(color, true)
          }}
          style={{
            backgroundColor: color
          }}
        />
      ))}
    </div>
  )
}

export const colorParam = (label: string, defaultValue: string) => ({
  label,
  type: 'color',
  defaultValue
})

export default {
  Component: ColorParam,
  type: 'color',
  defaultValue: '#000000'
}
