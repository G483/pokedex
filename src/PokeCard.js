import React, { Component } from 'react';
import './Card.css';
import PokemonSpecies from './PokemonSpecies';
import loader from './loader.gif';

class PokeCard extends Component {
  constructor() {
    super();

    this.state = {
      speciesData: {}
    }

    this.localStorage = window.localStorage;
  }

  componentDidMount() {
    let url = this.props.url;
    if (this.localStorage[url]) {
      return this.setState({speciesData: JSON.parse(this.localStorage[url])})
    }

    fetch(this.props.url)
      .then(result => { return result.json()})
      .then(data => { 
        let pokemonData = new PokemonSpecies(data.id, data.capture_rate, data.color.name, data.evolution_chain.url);
        this.localStorage[url] = JSON.stringify(pokemonData);
        this.setState({speciesData: pokemonData})
      })
  }

  render() {
    return (
      <div className="card text-left">
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          { Object.keys(this.state.speciesData).length === 0 ?
            (<img src={loader} alt="loader" />) :
            (
              <div>
                <p><strong>Capture rate:</strong>{this.state.speciesData.captureRate}</p>
                <p><strong>Color:</strong> {this.state.speciesData.color}</p>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  value={this.state.speciesData.evolutionChainUrl}
                  onClick={this.props.handler} 
                >Show Evolution Chain</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default PokeCard;
