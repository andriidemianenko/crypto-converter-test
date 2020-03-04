import React, { useContext, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Row, Col, Form } from 'react-bootstrap'
import { context } from './utils'

import CryptoButton from './components/CryptoButton'

function App() {
  const { colors: { mainBackground, lightGreen, borderBlue } } = useContext(context.themeContext)
  const cryptos = useContext(context.cryptoCurrenciesContext)
  const [volume, setVolume] = useState(0)
  
  return (
    <Container
      style={{ background: mainBackground }}
      className="py-5 vh-100"
      fluid
     >
      <Row className="justify-content-center mb-4">
        {cryptos.map(crypto => {
          return (
            <Col xs={3} key={`${crypto.name}-id`}>
              <CryptoButton cryptoData={crypto} />
            </Col>
          )
        })}
      </Row>
      <Form>
        <Form.Group  className="justify-content-center" as={Row}>
          <Form.Label column xs={1} style={{ color: lightGreen }}>Volume:</Form.Label>
          <Col xs={6}>
            <Form.Control
              style={{ backgroundColor: mainBackground, borderColor: borderBlue, color: lightGreen }}
              onChange={({ target }) => setVolume(target.value)}
              type="text"
            />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default App
