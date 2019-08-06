import React, { Component } from 'react'
import PokemonList from '../pokemon/PokemonList'

export default class Dashboard extends Component {
    componentDidMount() {
        const { id } = this.props.match.params.id;
    }

    render() {
        return (
            <div >
                    <PokemonList id={this.id} />
            </div>
        )
    }
}
