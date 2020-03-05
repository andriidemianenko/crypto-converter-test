import axios from 'axios'

export const ExchangeRateApi = {
  getCurrencyRates(url) {
    return axios.get(url)
  }
}