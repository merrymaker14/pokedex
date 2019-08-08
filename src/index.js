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

    @action setId(id) {
        this.id = id;
    }

    @action setLimit(limit) {
        this.limit = limit;
    }

    @action setFilterPokemon(filterPokemon) {
        this.filterPokemon = filterPokemon;
    }

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
