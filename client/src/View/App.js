import React, { Component } from 'react'
import '../App.css'

import Wrapper from '../styles/Wrapper'
import Container from '../styles/Container'
import Title from '../styles/Title'

import 'antd/dist/antd.css'
import {
  Progress,
  Slider,
  Button,
  Row,
  Col,
  Divider,
  Select,
} from 'antd'

const Option = Select.Option;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    window.fetch('/getCities')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({
          cities: data
        })
      })
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <Title>Compare weather</Title>
          <Row>
            <Col span={6}>
              <Select defaultValue="Kalmar">
                {this.state.cities.map(city =>
                  <Option key={city.name} value={city.name}>{city.name}</Option>
                )}
              </Select>
            </Col>
            <Col span={6}>
              <Select defaultValue="Växjö">
                {this.state.cities.map(city =>
                  <Option key={city.name} value={city.name}>{city.name}</Option>
                )}
              </Select>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>Select interval in years</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Slider
                min={1962}
                max={2018}
                range defaultValue={[1995, 2018]}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ paddingTop: '20px' }}>
            <Button
              onClick={() => this.getDataFromServer()}
            >View</Button>
          </Row>
          <Divider />
          <Progress percent={30} />
        </Wrapper>
      </Container>
    )
  }

  getDataFromServer() {
    window.fetch('/get')
      .then(data => data.json())
      .then(data => console.table(data))
  }
}

export default App;
