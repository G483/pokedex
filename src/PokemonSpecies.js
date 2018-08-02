// Note that the word species refers to both singular and plural
// Ideally we would add some sort of validation for types as well as getters and setters
const PokemonSpecies = function(id, captureRate, color, evolutionChain) {
    this.id = id;
    this.captureRate = captureRate;
    this.color = color;
    this.evolutionChainUrl = evolutionChain;

    return this;
}

export default PokemonSpecies;