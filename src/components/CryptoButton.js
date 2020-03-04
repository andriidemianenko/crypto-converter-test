
import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { context } from '../utils'

function CryptoButton({ cryptoData }) {
  const { name, icon, usdValue, uahValue, rubValue } = cryptoData
  const { colors: { lightBlue1, lightGreen } } = useContext(context.themeContext)
  return (
    <Container style={{ backgroundColor: lightBlue1, minHeight: "200px", height: "auto" }}>
      <Row className="px-3">
        <Col xs={6} className="text-center">
          <img src={`../images/${icon}`} alt="" />
          <p style={{ color: lightGreen }}>{name}</p>
        </Col>
        <Col xs={6}>

        </Col>
      </Row>
    </Container>
  )
}

export default CryptoButton