import React, { Component } from 'react'
import '../App.css'

import Wrapper from '../styles/Wrapper'
import Container from '../styles/Container'
import Title from '../styles/Title'

import 'antd/dist/antd.css'
import { Button, Row, Col, Select, DatePicker } from 'antd'

import { fetchAvailableCities } from './Requester.js'

const { RangePicker } = DatePicker

const Option = Select.Option

const DEFAULT_CITIES = ['Kalmar', 'Växjö']

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      availableCities: [],
      cities: DEFAULT_CITIES,
      startDate: null,
      endDate: null
    }
  }

  componentDidMount() {
    fetchAvailableCities().fork(console.error, availableCities => {
      this.setState({
        availableCities
      })
    })
  }

  cityToOption(city) {
    return (
      <Option key={city.name} value={city.name}>
        {city.name}
      </Option>
    )
  }

  setCity(index) {
    return name => {
      let cities = this.state.cities
      cities[index] = name
      this.setState({ cities })
    }
  }

  render() {
    const isInformationIsMissing = !this.state.startDate || !this.state.endDate
    return (
      <Container>
        <Wrapper>
          <Title>Compare weather</Title>
          <Row>
            <Select
              defaultValue={DEFAULT_CITIES[0]}
              style={{ margin: '5px' }}
              onChange={this.setCity(0)}
            >
              {this.state.availableCities.map(this.cityToOption)}
            </Select>

            <Select
              defaultValue={DEFAULT_CITIES[1]}
              style={{ margin: '5px' }}
              onChange={this.setCity(1)}
            >
              {this.state.availableCities.map(this.cityToOption)}
            </Select>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col span={24}>
              <RangePicker
                onChange={dates => {
                  this.setState({
                    startDate: dates[0].format('YYYY-MM-DD'),
                    endDate: dates[1].format('YYYY-MM-DD')
                  })
                }}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ paddingTop: '20px' }}>
            <Button
              onClick={() => {
                console.log(this.state)
                this.getDataFromServer()
              }}
              disabled={isInformationIsMissing}
            >
              Compare
            </Button>
          </Row>
        </Wrapper>
      </Container>
    )
  }

  getDataFromServer() {
    window
      .fetch('/get')
      .then(data => data.json())
      .then(data => console.table(data))
  }
}

export default App
