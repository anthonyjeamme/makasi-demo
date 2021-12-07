import { TSectionDefinition } from 'makasi-core'
import TextSection from './TextSection'

export const TextSectionDefinition: TSectionDefinition = {
  type: 'text',
  Component: TextSection,
  label: 'Texte',
  defaultData: {},
  paramsSchema: {
    backgroundColor: {
      type: 'color',
      title: 'Couleur de fond',
      defaultValue: '#eeeeee'
    }
  }
}
