import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios';

import Pagination from '../layout/Pagination';

export default class PokemonList extends Component {
    state = {
        limit: 10,
        count: 964,
        pokemon: null,
        filterPokemon: null
    };

    componentDidMount () {
        this.getPokemon(this.state.limit, (this.props.match.params.id - 1) * this.state.limit);
    }
    
    componentDidUpdate (prevProps, prevState) {
        if (prevState.limit !== this.state.limit || prevProps.match.params.id !== this.props.match.params.id)
            this.getPokemon(this.state.limit, (this.props.match.params.id - 1) * this.state.limit);
    }

    getPokemon = (limit, offset) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
             .then(res => 
                this.setState({ count: res.data['count'],
                                pokemon: res.data['results'],
                                filterPokemon: res.data['results'] }))
    }

    render() {
        return (
            <div>
                {this.state.pokemon ? (
                <div>
                    <form class="form-inline md-form form-sm active-pink active-pink-2 mt-2 float-left">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Pokemon" aria-label="Pokemon" onChange={(e) => this.filterList(e)} />
                        <select class="browser-default custom-select mt-2 ml-3 w-75" onChange={(e) => this.chooseLimit(e)}>>
                            <option disabled>limit</option>
                            <option selected value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            </select>
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
                <Pagination id={this.props.match.params.id} count={this.state.count} limit={this.state.limit} />
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

    chooseLimit(e) {
        this.setState({limit: e.target.value});
        console.log(this.state.limit);
    }
    
}
