import React from 'react'
import { EditableText, TSectionInstanceComponent } from 'makasi-core'

import './TextSection.scss'

const TextSection: TSectionInstanceComponent = ({ params, data, id }) => {
  return (
    <div
      className='TextSection'
      style={{
        backgroundColor: params.backgroundColor || 'white'
      }}
    >
      <div className='container'>
        <EditableText field='text' className='subtitle' />
      </div>
    </div>
  )
}
export default TextSection
