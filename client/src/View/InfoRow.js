import React from 'react'

import { Row, Col } from 'antd'

const InfoRow = ({ label, value, type }) => (
  <Row gutter={16} style={{ marginBottom: '1em' }}>
    <Col span={12} style={{ textAlign: 'left' }}>
      <b>{label}</b>
    </Col>
    <Col span={12} style={{ textAlign: 'right' }}>
      {value ? value + type : 'N/A'}
    </Col>
  </Row>
)

export default InfoRow
