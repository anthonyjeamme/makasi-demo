import React from 'react'

export const TextParam = ({ value, onChange }) => {
  return (
    <div className='TextParam'>
      <input
        defaultValue={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
    </div>
  )
}

export const textParam = (label: string) => ({
  type: 'text',
  value: '',
  label
})

export default {
  Component: TextParam,
  type: 'text',
  defaultValue: 'empty'
}
