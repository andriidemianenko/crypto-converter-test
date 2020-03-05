import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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
  const [volume, setVolume] = useState(0)
  const [validationErrorExists, setValidationError] = useState(false)
  const [currentCurrency, chooseCurrency] = useState('UAH')

  const { colors: { mainBackground, lightGreen, borderBlue }, text: { defaultFontSize } } = useContext(context.themeContext)
  const cryptos = useContext(context.cryptoCurrenciesContext)

  const loading = useSelector(state => state.areCurrencyRatesLoading)
  const currencyRates = useSelector(state => state.currencyRates)
  const dispatch = useDispatch()
  
  const cryptosWithRate = useCryptoWithRates(cryptos, currencyRates, loading)
  
  useEffect(() => {
    dispatch(getCurrencyRates())
  }, [dispatch])

  function validateAndSetVolume(volume) {
    const isNumber = !isNaN(parseFloat(volume)) && isFinite(volume) && !(/\s/.test(volume))
    if (isNumber) {
      setValidationError(false)
    } else {
      setValidationError(true)
      return
    }
  }

  return (
    <Container
      style={{ background: mainBackground, fontSize: defaultFontSize }}
      className="py-5 vh-100"
      fluid
     >
      <Spinner animation="grow" size="lg" />

      {!loading && 
        <Row className="justify-content-center mb-4">
          {cryptosWithRate.map(crypto => {
            return (
              <Col xs={3} key={`${crypto.name}-id`}>
                <CryptoButton cryptoData={crypto} />
              </Col>
            )
          })}
        </Row>
      }
      <Form className="my-5">
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
    </Container>
  )
}

export default App
