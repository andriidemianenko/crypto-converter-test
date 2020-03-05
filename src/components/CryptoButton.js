
import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { context } from '../utils'

function CryptoButton({ cryptoData }) {
  const { name, icon, usdValue, uahValue, rubValue } = cryptoData
  const { colors: { lightBlue1, lightBlue3, lightGreen }, text: { defaultFontSize, currencyFontWeight } } = useContext(context.themeContext)
  return (
    <Container className="p-3" style={{ backgroundColor: lightBlue1, minHeight: "200px", height: "auto" }}>
      <Row className="px-1">
        <Col md={12} lg={5} className="text-center">
          <img className="mb-2" src={`../images/${icon}`} alt="" />
          <p style={{ color: lightGreen, fontWeight: currencyFontWeight }}>{name}</p>
        </Col>
        <Col md={12} lg={7} style={{ color: lightBlue3 }}>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>USD:</span><span>{usdValue}</span></p>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>UAH:</span><span>{uahValue}</span></p>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>RUB:</span><span>{rubValue}</span></p>
        </Col>
      </Row>
    </Container>
  )
}

export default CryptoButton