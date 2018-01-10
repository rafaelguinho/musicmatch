import React, { Component } from 'react';
import Profile from './Profile';
import Gallery from './Gallery';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/';
        let FETCH_URL = `${BASE_URL}search?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `${BASE_URL}artists/`;

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer BQAmnF6RzqjN5afSmA9Qk6eE7a5dGZaBBQa5bn8Glwu3M9BtbK8MDX8BBW3bzOIglgfBKpIu5QLPCMTVuQ7HlW7_a8spZgo61j8qNYNpSgNig8GGHH4qqIE9ISxR2oyrLbO4KAxxXxZ5dhp39L1-bpDaT5m9qomBhY-yZ49_JXDQUJScJb-MBRA1-2H9lJoNS39zN4-lIv4xu3_trPqJ8MKDhsOFGQ09DfRKpgROjmLL1C-e9n7a_liccJC6Sr3MZafs1Yl39nmaINs"
            }
        }).then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];

                this.setState({ query: artist.name });
                this.setState({ artist });

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=ES`;

                fetch(FETCH_URL, {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer BQAmnF6RzqjN5afSmA9Qk6eE7a5dGZaBBQa5bn8Glwu3M9BtbK8MDX8BBW3bzOIglgfBKpIu5QLPCMTVuQ7HlW7_a8spZgo61j8qNYNpSgNig8GGHH4qqIE9ISxR2oyrLbO4KAxxXxZ5dhp39L1-bpDaT5m9qomBhY-yZ49_JXDQUJScJb-MBRA1-2H9lJoNS39zN4-lIv4xu3_trPqJ8MKDhsOFGQ09DfRKpgROjmLL1C-e9n7a_liccJC6Sr3MZafs1Yl39nmaINs"
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        const tracks = json.tracks;
                        this.setState({ tracks });
                    });

            });
    }

    render() {
        return (
            <div className="Container">
                <header>
                    <h2 className="App-title">Music master</h2>
                </header>

                <div className="App-Content">

                    <div className="Form-Search">
                        <input className="Search-Field" query={this.state.query}
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                            type="search" placeholder="Search and artist..." />
                        <button onClick={() => this.search()}>Button</button>
                    </div>
                </div>
                {
                    this.state.artist !== null
                        ? <div>
                            <Profile artist={this.state.artist} />
                            <Gallery tracks={this.state.tracks}/>
                        </div>
                        : <div></div>
                }

            </div>
        )
    }
}

export default App;