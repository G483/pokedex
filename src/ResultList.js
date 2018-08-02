import React, { Component } from 'react';
import PokeCard from './PokeCard';

class ResultList extends Component {
  constructor() {
    super();

    this.state = {
      results: []
    }

    this.evolutionSpecies = [];
    this.renderPokeCards = this.renderPokeCards.bind(this);
  }

  componentDidMount() {
    fetch(this.props.requestUrl)
      .then(response => { return response.json() })
      .then(data => { 
        this.setState({results: data.results}) 
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.requestUrl.search('evolution') === -1) {
      return;
    }

    fetch(this.props.requestUrl)
      .then(response => { return response.json() })
      .then(data => { 
        if (this.evolutionSpecies.length === 0) {
          this.updateFromEvolution(data.chain);
        }
      });
  }

  updateFromEvolution(evolutionData) {
    while(evolutionData.evolves_to.length !== 0) {
      this.evolutionSpecies.push(evolutionData.species);

      evolutionData = evolutionData.evolves_to[0];
    }
    this.evolutionSpecies.push(evolutionData.species);
    
    return this.setState({results: this.evolutionSpecies})
  }

  renderPokeCards() {
    let results = [];

    this.state.results.forEach((result, index) => {
      results.push(<PokeCard name={result.name} url={result.url} key={index} handler={this.props.handler} />)
    });
    
    return results;
  }

  render() {
    return (
      <div className="container">
        <div className="card-columns">
          {this.renderPokeCards()}
        </div>
      </div>
    );
  }
}

export default ResultList;
