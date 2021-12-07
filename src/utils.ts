import { TConnectorFactory, TPageSchema } from 'makasi-core'
import { HeaderSectionDefinition } from './components/Sections/HeaderSection/HeaderSection.definition'
import { TextSectionDefinition } from './components/Sections/TextSection/TextSection.definition'

export const isBrowser = () => typeof window !== 'undefined'

export const LocalstorageConnector: TConnectorFactory = (id: string) => {
  const getData = async () => {
    if (!isBrowser()) return null

    const data = localStorage.getItem(`$makasi--${id}`)

    if (data) {
      try {
        return JSON.parse(data)
      } catch {}
    }

    return null
  }

  const saveData = async (data) => {
    if (!isBrowser()) return null

    localStorage.setItem(`$makasi--${id}`, JSON.stringify(data))
  }

  return {
    getData,
    saveData
  }
}

export const getData = () => {
  if (!isBrowser()) return standardPageSchema.defaultData

  const cached = localStorage.getItem('page')

  if (cached) {
    return JSON.parse(cached)
  }

  return standardPageSchema.defaultData
}

export const standardPageSchema: TPageSchema = {
  defaultData: {
    metadata: { title: 'Makasi', description: 'Build Powerful Editable Apps' },
    sections: [
      {
        id: 'A',
        type: 'header',
        data: {
          titre: 'Build Powerful Editable Apps',
          text: {
            blocks: [
              {
                key: '3hdos',
                text: 'We manage page edition, you build amazing features',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
              },
              {
                key: 'cv2qr',
                text: 'and your client write great content !',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
              }
            ],
            entityMap: {}
          },
          soustitre: 'Il est super beau',
          button: 'This page is made with it ! Click to try'
        },
        params: { backgroundColor: '#f4f5fd' }
      },
      {
        id: 'kwvgjek0',
        type: 'header',
        params: {},
        data: {
          titre: 'The best of every worlds',
          text: {
            blocks: [
              {
                key: '7nse6',
                text: 'Wysiwyg for your client, your keep control on your design and structure, power of React, toolkit to help developers make editable apps easily.',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
              }
            ],
            entityMap: {}
          },
          button: 'Click here to try !'
        }
      }
    ]
  },
  sections: [HeaderSectionDefinition, TextSectionDefinition]
}
