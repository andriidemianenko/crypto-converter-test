import { put, takeLatest, all, call } from 'redux-saga/effects'
import { ExchangeRateApi } from '../api'

function* fetchCurrencyRates() {
  try {
    const { rubResponse, uahResponse } = yield all({
      rubResponse: call(ExchangeRateApi.getCurrencyRates, 'https://api.exchangeratesapi.io/latest?base=USD&symbols=RUB'),
      uahResponse: call(ExchangeRateApi.getCurrencyRates, 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    })
    const { data: [uahToUsd] } = uahResponse
    const { data: { rates } } = rubResponse
    const payload = { rubToUsd: Number(parseFloat(rates.RUB).toFixed(2)), uahToUsd: Number(parseFloat(uahToUsd.buy).toFixed(2)) }
    yield put({ type: 'SET_CURRENCY_RATES', payload })
  } catch (error) {
    yield put({ type: 'FETCH_CURRENCY_ERROR', payload: error })
  }
}

function* currencyWatcher() {
  yield takeLatest('GET_CURRENCY_RATES', fetchCurrencyRates)
}

export default function* rootSaga() {
  yield all([
    currencyWatcher()
  ])
}