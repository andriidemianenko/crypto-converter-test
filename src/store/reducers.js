const initialState = {
  currencyRates: undefined,
  areCurrencyRatesLoading: false,
  error: {
    exists: false,
    data: undefined
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENCY_RATES':
      return { ...state, areCurrencyRatesLoading: true }
    case 'SET_CURRENCY_RATES':
      return { ...state, currencyRates: action.payload, areCurrencyRatesLoading: false }
    case 'GET_CURRENCY_ERROR':
      return { ...state, areCurrencyRatesLoading: false, error: { exists: true, data: action.payload }}
    default:
      return state
  }
}

export default reducer