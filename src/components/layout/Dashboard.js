import React, { Component } from 'react'
import PokemonList from '../pokemon/PokemonList'

import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class Dashboard extends Component {
    render() {
        const id = parseInt(this.props.match.params.id);
        this.props.store.setId(id);

        return (
            <div >
                    <PokemonList id={this.props.store.id} />
            </div>
        )
    }
}

export default Dashboard;