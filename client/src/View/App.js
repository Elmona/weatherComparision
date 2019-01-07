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
  Select
} from 'antd'

const Option = Select.Option

class App extends Component {
  constructor(props) {
    super(props)
    console.log('Not useless')
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <Title>Compare weather</Title>
          <Row>
            <Col span={4}>
              <Select defaultValue="Kalmar">
                <Option value="Kalmar">Kalmar</Option>
                <Option value="Skellefte">Skellefte</Option>
                <Option value="Vaxjo">Vaxjo</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="Kalmar">
                <Option value="Kalmar">Kalmar</Option>
                <Option value="Skellefte">Skellefte</Option>
                <Option value="Vaxjo">Vaxjo</Option>
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
