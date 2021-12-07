import React from 'react'

import { page, TPageData } from 'makasi-core'
import { getData, LocalstorageConnector, standardPageSchema } from '../utils'
import { StandardTheme } from '../components/Theme/standardEditionTheme/StandardEditionTheme'

const standardPage = (data: TPageData) =>
  page(standardPageSchema, LocalstorageConnector('page'), StandardTheme)

export default standardPage(getData())
