import React from 'react'

import { FloppyDisk, X } from 'phosphor-react'

import { TMakasiPageThemeProps, usePageContext } from 'makasi-core'

export const PrePageComponent = (props: TMakasiPageThemeProps) => {
  const pageContext = usePageContext()

  return (
    <div className='PageEditionComponent'>
      {/* <Seo {...pageContext.toJSON().metadata} /> */}
      {pageContext.editionEnabled && (
        <div style={{ display: 'flex' }}>
          <button
            title='Save (indexedDB)'
            onClick={() => {
              props.dataConnector.saveData(pageContext.toJSON())
            }}
          >
            <FloppyDisk />
          </button>

          <button
            title='Disable edition mode'
            onClick={() => {
              pageContext.setEditionEnabled(false)
            }}
          >
            <X />
          </button>
        </div>
      )}
    </div>
  )
}
