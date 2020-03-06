import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyRates } from './store/actions'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { context } from './utils'

import CryptoButton from './components/CryptoButton'

function useCryptoWithRates(cryptos, currencyRates, loading) {
  return (!loading && currencyRates) ? cryptos.map(crypto => ({
    ...crypto,
    uahValue: Number((crypto.usdValue * currencyRates.uahToUsd).toFixed(3)),
    rubValue: Number((crypto.usdValue * currencyRates.rubToUsd).toFixed(3)),
  })) : []
}

function App() {
  const [validationErrorExists, setValidationError] = useState(false)
  const [volume, setVolume] = useState({ default: 0, volumeInCurrency: 0 })
  const [choosenCurrency, chooseCurrency] = useState('UAH')
  const [choosenCrypto, chooseCrypto] = useState('BTC')

  const { 
    colors: { mainBackground, lightGreen, borderBlue, lightBlue1 },
    text: { defaultFontSize, currencyFontWeight }
  } = useContext(context.themeContext)
  const cryptos = useContext(context.cryptoCurrenciesContext)
  const currencies = useContext(context.currencies)

  const loading = useSelector(state => state.areCurrencyRatesLoading)
  const currencyRates = useSelector(state => state.currencyRates)
  const dispatch = useDispatch()
  
  const cryptosWithRate = useCryptoWithRates(cryptos, currencyRates, loading)
  
  useEffect(() => {
    dispatch(getCurrencyRates())
  }, [dispatch])

  useEffect(() => {
    if (volume.default) validateAndSetVolume(volume.default)
  }, [choosenCrypto, choosenCurrency])

  function validateAndSetVolume(volume) {
    const isNumber = !isNaN(parseFloat(volume)) && isFinite(volume) && !(/\s/.test(volume))
    if (isNumber) {
      setValidationError(false)
      const { uahValue, rubValue, usdValue } = cryptosWithRate.find(crypto => crypto.name === choosenCrypto)
      switch (choosenCurrency) {
        case 'UAH':
          setVolume({ default: volume, volumeInCurrency: Number(volume * uahValue).toFixed(3) })
          break
        case 'USD':
          setVolume({ default: volume, volumeInCurrency: Number(volume * usdValue).toFixed(3) })
          break
        case 'RUB':
          setVolume({ default: volume, volumeInCurrency: Number(volume * rubValue).toFixed(3) })
          break
        default:
          return
      }
    } else {
      setValidationError(true)
      return
    }
  }

  return (
    <Container
      style={{ background: mainBackground, fontSize: defaultFontSize }}
      className="py-5 vh-100 text-center"
      fluid
     >
      {loading && <Spinner animation="grow" size="lg" style={{ width: '400px', height: '400px', color: lightGreen }}/>}
      {!loading && 
        <div>
          <Row className="justify-content-center mb-4">
            {cryptosWithRate.map(crypto => {
              return (
                <Col xs={3} key={`${crypto.name}-id`} onClick={() => chooseCrypto(crypto.name) }>
                  <CryptoButton cryptoData={{ ...crypto, isCryptoChoosen: choosenCrypto === crypto.name }} />
                </Col>
              )
            })}
          </Row>
          <Form className="mt-5 mb-3">
            <Form.Group  className="justify-content-center" as={Row}>
              <Form.Label column xs={1} style={{ color: lightGreen }}>Volume:</Form.Label>
              <Col xs={6}>
                <Form.Control
                  style={{ backgroundColor: mainBackground, borderColor: borderBlue, color: lightGreen }}
                  onChange={({ target }) => validateAndSetVolume(target.value)}
                  type="text"
                />
                {validationErrorExists && 
                  <Form.Text className="text-danger">
                    Volume must be a number!
                  </Form.Text>
                }
              </Col>
            </Form.Group>
          </Form>
          {volume.default &&
            <Row className="justify-content-center">
              <p style={{ color: lightGreen }}>
                  <b className="pr-2">{volume.default}{choosenCrypto}</b>
                  will be
                  <b className="px-2">{volume.volumeInCurrency}</b>
                  in
                  <b className="pl-2">{choosenCurrency}</b>
              </p>
            </Row>
          }
          <Row className="justify-content-center">
            {currencies.map(currency =>
                <Col xs={1} className="px-2" onClick={() => chooseCurrency(currency)} key={`${currency}-currency-name`}>
                <div className="px-2 py-3"
                  style={{
                    backgroundColor: choosenCurrency === currency ? lightGreen : lightBlue1,
                    color: choosenCurrency === currency ? lightBlue1 : lightGreen,
                    fontWeight: currencyFontWeight
                  }}>
                  <span>{currency}</span>
                </div>
              </Col>
            )}
          </Row>
      </div>
    }
    </Container>
  )
}

export default App
