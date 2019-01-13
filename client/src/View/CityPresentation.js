import React from 'react'

import { Divider } from 'antd'
import InfoRow from './InfoRow.js'
import InfoRowDate from './InfoRowDate.js'

const toOneDecimal = n => (n ? n.toFixed(1) : n)

const formatDate = timestamp =>
  new Date(timestamp).toISOString().substring(0, 10)

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
    <InfoRowDate
      label="Warmest day"
      value={toOneDecimal(props.warmestDay.temperature)}
      date={formatDate(props.warmestDay.timestamp)}
      type="℃"
    />
    <InfoRowDate
      label="Coldest day"
      value={toOneDecimal(props.coldestDay.temperature)}
      date={formatDate(props.coldestDay.timestamp)}
      type="℃"
    />
    <InfoRow
      label="Average rainfall"
      value={toOneDecimal(props.avgRain)}
      type=" mm"
    />
    <InfoRowDate
      label="Rainiest day"
      value={toOneDecimal(props.rainiestDay.amount)}
      date={formatDate(props.rainiestDay.timestamp)}
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
