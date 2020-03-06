import { createContext } from 'react'

import theme from './theme'
import cryptoCurrencies from './cryptoCurrencies'
import currencies from './currencies'

export const context = {
  themeContext: createContext(theme),
  cryptoCurrenciesContext: createContext(cryptoCurrencies),
  currencies: createContext(currencies)
}