import React, { Component } from 'react'
import PokemonList from '../pokemon/PokemonList'

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject("store")
@observer
class Dashboard extends Component {
    render() {
        return (
            <div >
                    <PokemonList />
            </div>
        )
    }
}

export default withRouter(Dashboard);