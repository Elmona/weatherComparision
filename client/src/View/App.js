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
      isLoading: false
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
                    res => {
                      console.log(res)
                      this.setState({ isLoading: false })
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
          <Row gutter={32} style={{ marginTop: '2em' }}>
            <Col span={12}>
              <CityPresentation
                city="Kalmar"
                avgTemp="12"
                coldestDay="-14"
                warmestDay="27"
                avgRain="2.1"
                rainiestDay="5.2"
                totalRain="32.7"
                informationText="Kalmar är centralort i Kalmar kommun, residensstad i Kalmar län samt tidigare stiftsstad i Kalmar stift. Kalmar fick en högskola 1977 och blev universitetsstad 2010. Kalmar är Smålands tredje största tätort efter Jönköping och Växjö. Ölandsbron går från Kalmar."
              />
            </Col>
            <Col span={12}>
              <CityPresentation
                city="Växjö"
                avgTemp="12"
                coldestDay="-14"
                warmestDay="27"
                avgRain="2.1"
                rainiestDay="5.2"
                informationText="Växjö är en tätort i södra Smålands inland samt centralort i Växjö kommun, residensstad för Kronobergs län och stiftsstad för Växjö stift. Växjö, som fick stadsrättigheter 1342 och blev universitetsstad 1999, är Sveriges 19:e största tätort med 65 383 invånare (2015)."
              />
            </Col>
          </Row>
        </Wrapper>
      </Container>
    )
  }
}

export default App
