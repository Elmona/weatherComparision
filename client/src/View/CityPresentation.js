import React from 'react'

import { Divider } from 'antd'
import InfoRow from './InfoRow.js'

const toOneDecimal = n => (n ? n.toFixed(1) : n)

const CityPresentation = props => (
  <div>
    <h2>{props.city}</h2>
    <p style={{ textAlign: 'left' }}>{props.informationText}</p>
    <Divider />
    <InfoRow
      label="Average temperature"
      value={toOneDecimal(props.avgTemp)}
      type="℃"
    />
    <InfoRow
      label="Warmest day"
      value={toOneDecimal(props.warmestDay)}
      type="℃"
    />
    <InfoRow
      label="Coldest day"
      value={toOneDecimal(props.coldestDay)}
      type="℃"
    />
    <InfoRow
      label="Average rainfall"
      value={toOneDecimal(props.avgRain)}
      type=" mm"
    />
    <InfoRow
      label="Rainiest day"
      value={toOneDecimal(props.rainiestDay)}
      type=" mm"
    />
    <InfoRow
      label="Total rainfall"
      value={toOneDecimal(props.totalRain)}
      type=" mm"
    />
  </div>
)

export default CityPresentation
