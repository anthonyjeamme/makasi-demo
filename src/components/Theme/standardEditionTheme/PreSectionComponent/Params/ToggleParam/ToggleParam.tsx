import React from 'react'

import { Check } from 'phosphor-react'

import './ToggleParam.scss'

const ToggleParam = ({ value, onChange }) => {
  return (
    <div className='ToggleParam'>
      <div
        role='button'
        onClick={() => {
          onChange(!value, true)
        }}
        className={`checkbox${value === true ? ' active' : ''}`}
      >
        <Check weight='bold' />
      </div>
    </div>
  )
}

export const toggleParam = (label: string, defaultValue: boolean) => ({
  Component: ToggleParam,
  label,
  defaultValue,
  type: 'toggle'
})

export default {
  Component: ToggleParam,
  type: 'toggle',
  defaultValue: true
}
