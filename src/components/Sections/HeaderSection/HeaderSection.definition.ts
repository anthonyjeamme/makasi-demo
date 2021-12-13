import { TSectionDefinition } from 'makasi-core'
import { colorParam } from '../../Theme/standardEditionTheme/PreSectionComponent/Params/ColorParam/ColorParam'
import { selectParam } from '../../Theme/standardEditionTheme/PreSectionComponent/Params/SelectParam/SelectParam'
import { toggleParam } from '../../Theme/standardEditionTheme/PreSectionComponent/Params/ToggleParam/ToggleParam'
import HeaderSection from './HeaderSection'

export const HeaderSectionDefinition: TSectionDefinition = {
  type: 'header',
  Component: HeaderSection,
  label: 'Header',
  defaultData: {},
  paramsSchema: {
    backgroundColor: colorParam('Couleur de fond', 'white'),
    textColor: colorParam('Couleur du texte', '#273742'),
    showButton: toggleParam('Afficher le bouton', true),
    margin: selectParam('Marges', 'normal', [
      {
        label: 'Grand',
        value: 'big'
      },
      {
        label: 'Moyen',
        value: 'normal'
      },
      {
        label: 'Petit',
        value: 'small'
      }
    ])
  }
}
