import React from 'react'

import { Divider } from 'antd'
import InfoRow from './InfoRow.js'

const CityPresentation = props => (
  <div>
    <h2>{props.city}</h2>
    <p style={{ textAlign: 'left' }}>{props.informationText}</p>
    <Divider />
    <InfoRow label="Average temperature" value={props.avgTemp} type="℃" />
    <InfoRow label="Warmest day" value={props.warmestDay} type="℃" />
    <InfoRow label="Coldest day" value={props.coldestDay} type="℃" />
    <InfoRow label="Average rainfall" value={props.avgRain} type=" mm" />
    <InfoRow label="Rainiest day" value={props.rainiestDay} type=" mm" />
    <InfoRow label="Total rainfall" value={props.totalRain} type=" mm" />
  </div>
)

export default CityPresentation
