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
                "Authorization": "Bearer BQDIpW0rKCoqKy-EiksmeaMpCQ-2JQuu3yRVSQgPqW-10llvCkwek_qENWci5eM378OCLpURnCaOGrfPzJwKK2XI4uDn61dymZ11XkgBmqbVg3Z6k9xalI60JSdgiku0MPJGmTplhwYvrRdFsSxfEEAWzq4dwtW-eu9qlUVcER2ts0-qaNUaG3G7EUu6bpvgeKczhGeEKKyZauseOkbaVKvLCItz8G_1fYuquufJYmLUTNQevFoYja-YLzXp5NTp5KKPv4obve2ms68"
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
                        "Authorization": "Bearer BQDIpW0rKCoqKy-EiksmeaMpCQ-2JQuu3yRVSQgPqW-10llvCkwek_qENWci5eM378OCLpURnCaOGrfPzJwKK2XI4uDn61dymZ11XkgBmqbVg3Z6k9xalI60JSdgiku0MPJGmTplhwYvrRdFsSxfEEAWzq4dwtW-eu9qlUVcER2ts0-qaNUaG3G7EUu6bpvgeKczhGeEKKyZauseOkbaVKvLCItz8G_1fYuquufJYmLUTNQevFoYja-YLzXp5NTp5KKPv4obve2ms68"
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