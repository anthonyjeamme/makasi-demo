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
  if (!isBrowser())
    return {
      metadata: {
        title: '',
        description: ''
      },
      sections: [
        {
          id: 'A',
          type: 'header',
          params: {},
          data: {}
        }
      ]
    }

  const cached = localStorage.getItem('page')

  if (cached) {
    return JSON.parse(cached)
  }

  return {
    metadata: {
      title: '',
      description: ''
    },
    sections: [
      {
        id: 'A',
        type: 'header',
        params: {},
        data: {}
      }
    ]
  }
}

export const standardPageSchema: TPageSchema = {
  defaultData: {
    metadata: {
      title: 'hello world',
      description: 'description'
    },
    sections: [
      {
        id: 'A',
        type: 'header',
        data: {},
        params: {}
      }
    ]
  },
  sections: [HeaderSectionDefinition, TextSectionDefinition]
}
