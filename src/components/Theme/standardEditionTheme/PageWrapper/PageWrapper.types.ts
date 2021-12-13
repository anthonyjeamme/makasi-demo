export type TPageWrapperContext = {
  open: (payload: any) => void
  close: () => void
}

export type TAddSectionModalComponent = (props: {
  isOpen: boolean
  payload: any
}) => JSX.Element | null
