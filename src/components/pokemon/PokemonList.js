import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios';

export default class PokemonList extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        pokemon: null,
        filterPokemon: null
    };

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        console.log(res.data['results']);
        this.setState({ pokemon: res.data['results'],
                        filterPokemon: res.data['results'] });
    }

    render() {
        return (
            <div>
                {this.state.pokemon ? (
                <div>
                    <form class="form-inline md-form form-sm active-pink active-pink-2 mt-2 float-left">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Pokemon" aria-label="Pokemon" onChange={(e) => this.filterList(e)} />
                    </form>
                    <div className="row">
                        {this.state.filterPokemon.map(pokemon => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                        ))}
                    </div>
                </div>
                ) : (
                <div>Loading</div>
                )}
            </div>
        )
    }

    filterList(e) {
        console.log(this.state.pokemon)
        var data = this.state.pokemon;
        data = data.filter(item => {
            return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        this.setState({filterPokemon: data});
    }
}
