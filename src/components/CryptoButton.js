
import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { context } from '../utils'

function CryptoButton({ cryptoData }) {
  const { name, icon, usdValue, uahValue, rubValue, isCryptoChoosen } = cryptoData
  const { colors: { lightBlue1, lightBlue3, lightGreen }, text: { defaultFontSize, currencyFontWeight } } = useContext(context.themeContext)
  return (
    <Container className="p-3" style={{ backgroundColor: lightBlue1, minHeight: "200px", height: "auto", border: isCryptoChoosen ? `3px solid ${lightBlue3}` : 'none' }}>
      <Row className="px-1">
        <Col lg={12} xl={5}>
          <img className="mb-2" src={`../images/${icon}`} alt="" />
          <p style={{ color: lightGreen, fontWeight: currencyFontWeight }}>{name}</p>
        </Col>
        <Col lg={12} xl={7} className="text-left" style={{ color: lightBlue3 }}>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>USD:</span><span>{usdValue}</span></p>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>UAH:</span><span>{uahValue}</span></p>
          <p><span className="pr-2" style={{ fontSize: defaultFontSize, fontWeight: currencyFontWeight }}>RUB:</span><span>{rubValue}</span></p>
        </Col>
      </Row>
    </Container>
  )
}

export default CryptoButton