import React, { useEffect } from 'react'

import { ArrowUp, ArrowDown, Trash, List } from 'phosphor-react'

import { useClickOutside } from '@ajeamme/use-click-outside'
import {
  TMakasiSectionThemeProps,
  usePageContext,
  useSectionContext
} from 'makasi-core'

import { useAddSectionModalContext } from '../PageWrapper/PageWrapper'
import TextParam from './Params/TextParam/TextParam'
import ColorParam from './Params/ColorParam/ColorParam'

import SelectParam from './Params/SelectParam/SelectParam'
import ToggleParam from './Params/ToggleParam/ToggleParam'

import './PreSectionComponent.scss'

const ParamsDefinitions = {
  text: TextParam,
  color: ColorParam,
  select: SelectParam,
  toggle: ToggleParam
}

const Param = ({ definition, data, onChange }) => {
  const componentDefinition = ParamsDefinitions[definition.type]

  if (!componentDefinition) return <div>Unknown</div>

  const { Component } = componentDefinition

  return (
    <div className='Param'>
      {/* @ts-ignore */}
      <div className='label'>{definition.label}</div>
      <div>
        <Component
          value={data}
          onChange={(value) => {
            onChange(value, true)
          }}
          definition={definition}
        />
      </div>
    </div>
  )
}

const MenuDropdown = ({ paramsSchema, section }) => {
  const pageContext = usePageContext()

  const sectionData = pageContext.getSectionData(section.id)

  return (
    <div className='dropdown'>
      {Object.entries(paramsSchema).map(([key, param]) => (
        <Param
          key={key}
          definition={param}
          data={sectionData.params[key]}
          onChange={(value, shouldRefresh) => {
            pageContext.updateSectionData(
              section.id,
              // @ts-ignore
              {
                params: {
                  ...sectionData.params,
                  [key]: value
                }
              }
            )

            if (shouldRefresh) pageContext.refresh()
          }}
        />
      ))}
    </div>
  )
}

const Menu = ({ paramsSchema, section }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>()
  const sectionContext = useSectionContext()

  useClickOutside(isOpen, setIsOpen, rootRef)

  useEffect(() => {
    if (isOpen) {
      sectionContext.setIsFocused(true)
      return () => {
        sectionContext.setIsFocused(false)
      }
    }
  }, [isOpen])

  return (
    // @ts-ignore
    <div className='Menu' ref={rootRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <List />
      </button>

      {isOpen && <MenuDropdown paramsSchema={paramsSchema} section={section} />}
    </div>
  )
}

export const PreSectionComponent = ({
  section,
  index,
  data
}: TMakasiSectionThemeProps) => {
  const pageContext = usePageContext()
  const modalCtx = useAddSectionModalContext()

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
          <Menu
            paramsSchema={
              pageContext.getSectionDefinition(section.type).paramsSchema
            }
            section={section}
          />
        </div>
      </div>
    </div>
  )
}
