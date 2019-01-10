import React, { Component } from 'react'
import '../App.css'

import Wrapper from '../styles/Wrapper'
import Container from '../styles/Container'
import Title from '../styles/Title'

import 'antd/dist/antd.css'
import { Button, Row, Col, Select, DatePicker, Form } from 'antd'

import { fetchAvailableCities, getSummaryForCities } from './Requester.js'
import CityPresentation from './CityPresentation'

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
      endDate: null,
      isLoading: false,
      summaries: null
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

  getSummaries() {
    const summaries = this.state.summaries
    return !summaries ? (
      ''
    ) : (
      <Row gutter={32} style={{ marginTop: '2em' }}>
        <Col span={12}>
          <CityPresentation {...summaries[0]} />
        </Col>
        <Col span={12}>
          <CityPresentation {...summaries[1]} />
        </Col>
      </Row>
    )
  }

  render() {
    const { cities, startDate, endDate, isLoading } = this.state
    const isInformationIsMissing = !startDate || !endDate
    return (
      <Container>
        <Wrapper>
          <Title>Compare weather</Title>
          <Form
            style={{
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <Form.Item>
              <Select
                defaultValue={DEFAULT_CITIES[0]}
                onChange={this.setCity(0)}
              >
                {this.state.availableCities.map(this.cityToOption)}
              </Select>
              <Select
                defaultValue={DEFAULT_CITIES[1]}
                onChange={this.setCity(1)}
              >
                {this.state.availableCities.map(this.cityToOption)}
              </Select>
            </Form.Item>
            <Form.Item>
              <RangePicker
                onChange={dates => {
                  dates.length === 2
                    ? this.setState({
                        startDate: dates[0].format('YYYY-MM-DD'),
                        endDate: dates[1].format('YYYY-MM-DD')
                      })
                    : this.setState({
                        startDate: null,
                        endDate: null
                      })
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  console.log(this.state)
                  this.setState({ isLoading: true })
                  getSummaryForCities({ cities, startDate, endDate }).fork(
                    console.error,
                    summaries => {
                      console.log(summaries)
                      this.setState({ isLoading: false, summaries })
                    }
                  )
                }}
                disabled={isInformationIsMissing}
                loading={isLoading}
                type="primary"
                style={{ width: '100%' }}
              >
                Compare
              </Button>
            </Form.Item>
          </Form>
          {this.getSummaries()}
        </Wrapper>
      </Container>
    )
  }
}

export default App
