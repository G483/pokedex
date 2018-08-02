import React, { Component } from 'react';
import './App.css';
import ResultList from './ResultList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      requestUrl: "https://pokeapi.co/api/v2/pokemon-species/?limit=10"
    };
    
    this.updateRequestUrl = this.updateRequestUrl.bind(this);
  }

  updateRequestUrl(e) {
    this.setState({requestUrl: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/"><h1 className="App-title">Pokedex</h1></a>
        </header>
        <ResultList requestUrl={this.state.requestUrl} handler={this.updateRequestUrl} />
      </div>
    );
  }
}

export default App;
