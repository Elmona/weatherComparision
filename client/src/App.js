import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.getDataFromServer()
  }
  render() {
    return (
      <div className="App">
        <p>hoho</p>
      </div>
    );
  }

  getDataFromServer() {
    window.fetch('/test')
      .then(data => data.json())
      .then(data => console.log(data))
  }
}

export default App;
