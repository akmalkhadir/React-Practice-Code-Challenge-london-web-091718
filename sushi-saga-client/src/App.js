import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    money: 100,
    eatenSushi: [],
    page: 0
  }

  componentDidMount () {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => {
        const newSushi = sushis.map(sushi => ({...sushi, eaten: false }))
        this.setState({ sushis: newSushi })
      })
  }

  getSushiToRender = () => {
    const {page} = this.state
    return this.state.sushis.slice(page*4, page*4 + 4)
  }

  eatSushi = (eatenSushi) => {
    if (this.state.money - eatenSushi.price >= 0 && !eatenSushi.eaten) {
      const newSushis = [...this.state.sushis].map(sushi => sushi.id === eatenSushi.id ? { ...sushi, eaten: true } : sushi)
      this.setState({
        sushis: newSushis,
        money: this.state.money - eatenSushi.price,
        eatenSushi: [...this.state.eatenSushi, eatenSushi]
      })
    }
  }

  updatePage = () => {
    this.setState({ page: this.state.page + 1})
  }

  render() {
    const sushisToRender = this.getSushiToRender()
    return (
      <div className="app">
        <SushiContainer sushis={sushisToRender} updatePage={this.updatePage} eatSushi={this.eatSushi} />
        <Table eatenSushi={this.state.eatenSushi} money={this.state.money} />
      </div>
    );
  }
}

export default App;