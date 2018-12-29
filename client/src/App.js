import React, { Component } from 'react'
import './App.css'

import Wrapper from './styles/Wrapper'
import Container from './styles/Container'

import 'antd/dist/antd.css'
import { Progress, Slider, Button, Row, Col } from 'antd'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('Not useless')
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <h1>Compare weather</h1>
          <Row>
            <Col span={24}>
              <p>Select interval in years</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Slider
                min={1983}
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
          <Progress percent={30} />
        </Wrapper>
      </Container>
    )
  }

  getDataFromServer() {
    window.fetch('/test')
      .then(data => data.json())
      .then(data => console.log(data))
  }
}

export default App;
