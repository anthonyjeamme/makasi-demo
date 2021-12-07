import React, { useRef, useState } from 'react'

import { ArrowUp, ArrowDown, Trash, FloppyDisk, X, List } from 'phosphor-react'

import uniqid from 'uniqid'

import {
  TMakasiTheme,
  usePageContext,
  TMakasiSectionThemeProps,
  TMakasiPageThemeProps
} from 'makasi-core'

import useClickOutside from '../../../utils/useClickOutside'
import Seo from '../../seo'

import './StandardEditionTheme.scss'

const PrePageComponent = (props: TMakasiPageThemeProps) => {
  const pageContext = usePageContext()

  return (
    <div className='PageEditionComponent'>
      <Seo {...pageContext.toJSON().metadata} />
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

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>()

  useClickOutside(isOpen, setIsOpen, rootRef)

  return (
    <div className='Menu' ref={rootRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <List />
      </button>

      {isOpen && <div className='dropdown'>Dropdown</div>}
    </div>
  )
}

const PreSectionComponent = ({
  section,
  index,
  data
}: TMakasiSectionThemeProps) => {
  const pageContext = usePageContext()
  const modalCtx = React.useContext(addSectionModalContext)

  if (!pageContext.editionEnabled) return null

  return (
    <div className='SectionEditionComponent'>
      {index > 0 && (
        <div className='add-before'>
          <button
            title='Add a section here'
            onClick={() => {
              modalCtx.open({ index })
            }}
          >
            +
          </button>
        </div>
      )}
      <div className='add-after'>
        <button
          title='Add a section here'
          onClick={() => {
            modalCtx.open({ index: index + 1 })
          }}
        >
          +
        </button>
      </div>
      <div
        className='topbar'
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            display: 'flex'
          }}
        >
          {index > 0 && (
            <button
              title='Move up'
              onClick={() => {
                pageContext.moveSection(section.id, index - 1)
              }}
            >
              <ArrowUp />
            </button>
          )}

          {index < data.sections.length - 1 && (
            <button
              title='Move down'
              onClick={() => {
                pageContext.moveSection(section.id, index + 1)
              }}
            >
              <ArrowDown />
            </button>
          )}

          <button
            title='Remove section'
            onClick={() => {
              pageContext.removeSection(section.id)
            }}
          >
            <Trash />
          </button>
        </div>

        <div>
          <Menu />
        </div>
      </div>
    </div>
  )
}

const AddSectionModal = ({ isOpen, payload }) => {
  const pageContext = usePageContext()
  const modalCtx = React.useContext(addSectionModalContext)

  if (!isOpen) return null

  const { sections } = pageContext.pageSchema

  const handleAdd = (section) => {
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

const addSectionModalContext = React.createContext(null)

const PageWrapper: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState(null)

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

export const StandardTheme: TMakasiTheme = {
  PageWrapper,
  PrePageComponent,
  PreSectionComponent
}
