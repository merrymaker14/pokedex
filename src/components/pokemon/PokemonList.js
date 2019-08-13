import React, { Component } from 'react'
import PokemonCard from './PokemonCard'

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { withRouter } from 'react-router-dom';

import Pagination from '../layout/Pagination';

@inject("store")
@observer
class PokemonList extends Component {
    state = {
        filterPokemon: []
    };

    componentWillMount() {
        this.props.store.getPokemon(this.props.store.limit, (this.props.match.params.id - 1) * this.props.store.limit);
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({ filterPokemon: toJS(this.props.store.pokemon) });
        }, 500)
    }

    componentDidUpdate (prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.store.getPokemon(this.props.store.limit, (this.props.match.params.id - 1) * this.props.store.limit);
        }
    }

    render() {
        return (
            <div>
                {toJS(this.props.store.filterPokemon) ? (
                <div>
                    <form className="form-inline md-form form-sm active-pink active-pink-2 mt-2 float-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <select className="browser-default custom-select ml-3 w-75" onChange={(e) => this.chooseLimit(e)}>>
                            <option disabled>limit</option>
                            <option selected value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <input className="form-control form-control-sm mt-2 ml-3 w-75" type="text" placeholder="Pokemon" aria-label="Pokemon" onChange={(e) => this.filterList(e)} />
                    </form>
                    <Pagination count={this.props.store.count} limit={this.props.store.limit} />
                    <div className="row">
                        {toJS(this.props.store.filterPokemon).map(pokemon => (
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

    /**
     * Filter list of pokemons by name
     * @param {event} e Event data
     */
    filterList(e) {
        var data = toJS(this.props.store.pokemon);
        data = data.filter(item => {
            return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        this.props.store.setFilterPokemon(data);
    }

    /**
     * Choose of pokemons limit on page
     * @param {event} e Event data
     */
    chooseLimit(e) {
        this.props.store.setLimit(e.target.value);
        this.props.store.getPokemon(this.props.store.limit, (this.props.match.params.id - 1) * this.props.store.limit);
    }
}

export default withRouter(PokemonList);