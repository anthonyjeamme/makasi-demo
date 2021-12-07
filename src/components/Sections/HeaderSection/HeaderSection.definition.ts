import { TSectionDefinition } from 'makasi-core'
import HeaderSection from './HeaderSection'

export const HeaderSectionDefinition: TSectionDefinition = {
  type: 'header',
  Component: HeaderSection,
  label: 'Header',
  defaultData: {},
  paramsSchema: {
    backgroundColor: {
      type: 'color',
      title: 'Couleur de fond',
      defaultValue: '#eeeeee'
    }
  }
}
