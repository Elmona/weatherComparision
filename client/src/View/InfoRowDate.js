import React from 'react'

import { Row, Col } from 'antd'

const InfoRowDate = ({ label, value, type, date = null }) => (
  <Row gutter={4} style={{ marginBottom: '1em' }}>
    <Col span={16} style={{ textAlign: 'left' }}>
      <b>{label}</b>
      {!date ? (
        ''
      ) : (
        <span style={{ textAlign: 'right', opacity: 0.5, marginLeft: '.8em' }}>
          {date}
        </span>
      )}
    </Col>
    <Col span={8} style={{ textAlign: 'right' }}>
      {value ? value + type : 'N/A'}
    </Col>
  </Row>
)

export default InfoRowDate
