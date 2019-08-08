import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

import { observable, action, runInAction } from 'mobx';
import { Provider } from 'mobx-react';

class Store {
    @observable id = 1;
    @observable limit = 10;
    @observable count = 964;
    @observable pokemon = null;
    @observable filterPokemon = null;

    /**
     * Set of id
     * @param {number} id Number of page
     */
    @action setId(id) {
        this.id = id;
    }

    /**
     * Set of limit
     * @param {number} limit Number of pokemons on page
     */
    @action setLimit(limit) {
        this.limit = limit;
    }

    /**
     * Set of pokemons
     * @param {array} filterPokemon Main array of objects for the following manipulations
     */
    @action setFilterPokemon(filterPokemon) {
        this.filterPokemon = filterPokemon;
    }

    /**
     * Get pokemobs by Pokeapi.co with the following record them and their count in store
     * @param {number} limit Number of pokemons on page
     * @param {number} offset Offset for get pokemons
     */
    @action getPokemon(limit, offset) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
             .then(res => {
                runInAction(() => {
                    this.count = res.data['count'];
                    this.pokemon = res.data['results'];
                    this.setFilterPokemon(this.pokemon);
                })
             })
    }
}

ReactDOM.render(<Provider store={new Store()}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
