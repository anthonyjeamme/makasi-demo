import React from 'react'

import './SelectParam.scss'

const SelectParam = ({ value, onChange, definition }) => {
  return (
    <div className='SelectParam'>
      {definition.options.map((option) => (
        <button
          key={option.value}
          className={value === option.value ? 'active' : ''}
          onClick={() => {
            onChange(option.value, true)
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export const selectParam = (
  label: string,
  defaultValue: string,
  options: TSelectOption[]
) => ({
  label,
  defaultValue,
  type: 'select',
  options
})

type TSelectOption = {
  label: string | JSX.Element
  value: string
}

export default {
  Component: SelectParam,
  type: 'select',
  defaultValue: null
}
