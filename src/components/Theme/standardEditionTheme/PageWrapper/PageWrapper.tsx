import React from 'react'

import uniqid from 'uniqid'

import { usePageContext } from 'makasi-core'

import { X } from 'phosphor-react'

import {
  TAddSectionModalComponent,
  TPageWrapperContext
} from './PageWrapper.types'

const addSectionModalContext = React.createContext<TPageWrapperContext>({
  close: () => {},
  open: () => {}
})

export const useAddSectionModalContext = () =>
  React.useContext(addSectionModalContext)

export const PageWrapper: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [payload, setPayload] = React.useState(null)

  return (
    <addSectionModalContext.Provider
      value={{
        open: (payload) => {
          setPayload(payload)
          setIsOpen(true)
        },
        close: () => {
          setIsOpen(false)
          setPayload(null)
        }
      }}
    >
      <AddSectionModal isOpen={isOpen} payload={payload} />
      {children}
    </addSectionModalContext.Provider>
  )
}

const AddSectionModal: TAddSectionModalComponent = ({ isOpen, payload }) => {
  const pageContext = usePageContext()
  const modalCtx = React.useContext(addSectionModalContext)

  if (!isOpen) return null

  const { sections } = pageContext.pageSchema

  const handleAdd = (section: any) => {
    pageContext.addSection(payload.index, {
      id: uniqid(),
      type: section.type,
      params: {},
      data: section.defaultData
    })

    modalCtx.close()
  }

  return (
    <div className='AddSectionModal'>
      <button
        className='close'
        onClick={() => {
          modalCtx.close()
        }}
      >
        <X weight='bold' />
      </button>
      <div className='overlay' />
      <div className='box'>
        <div className='sections'>
          {sections.map((section) => (
            <button key={section.type} onClick={() => handleAdd(section)}>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
