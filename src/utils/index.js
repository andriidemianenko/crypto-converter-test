import { createContext } from 'react'

import theme from './theme'
import cryptoCurrencies from './cryptoCurrencies'

export const context = {
  themeContext: createContext(theme),
  cryptoCurrenciesContext: createContext(cryptoCurrencies)
}