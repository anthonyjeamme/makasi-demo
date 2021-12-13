import React from 'react'
import {
  EditableText,
  TSectionInstanceComponent,
  EditableButton,
  EditableElement,
  usePageContext
} from 'makasi-core'

import './HeaderSection.scss'

const HeaderSection: TSectionInstanceComponent = ({ params, data, id }) => {
  const pageContext = usePageContext()

  return (
    <div
      className={`HeaderSection margin-${params.margin}`}
      style={{
        backgroundColor: params.backgroundColor || 'white',
        color: params.textColor || '#273742'
      }}
    >
      <div className='container'>
        <EditableElement.h1 field='titre' />

        <img
          className='illustration'
          src='https://egghead.io/_next/image?url=https%3A%2F%2Fd2eip9sf3oo6c2.cloudfront.net%2Fplaylists%2Fsquare_covers%2F000%2F459%2F856%2Fsquare_480%2Fjotai.png&w=640&q=100'
        />

        <EditableText field='text' className='subtitle' />

        {params.showButton !== false && (
          <div
            style={{
              padding: '20px 0 0 0',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <EditableButton
              field='button'
              onClick={() => {
                pageContext.setEditionEnabled(!pageContext.editionEnabled)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default HeaderSection
