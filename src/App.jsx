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
        const TOKEN = "BQDL2wXCxCbjVUCitHPtGVI2L8UMynw_bn6DrMd_7o_6EPrHQ9SCp8k-W9qqAwCe4vQqszJhwcOjxrRngDIwVd7aGOVOnCzEWQx_cKFyX-xxAP_sKszaNNSyhNM_vv_p-g_hkt49Z0g4pbkyZ0yZJguOZVLishGFY4iUEWUtBLNR5I1QdcxZNC47WxxUXfd59Knkp29d_j0BS612Ndb53GVSRgdHYD8TazFXJ-K42GjltzVVEJI8pRtHMg_Qj1Y0EgVHz0Rj686N9Jg";
        const BASE_URL = 'https://api.spotify.com/v1/';
        let FETCH_URL = `${BASE_URL}search?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `${BASE_URL}artists/`;

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {

                "Authorization": `Bearer ${TOKEN}`
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
                        "Authorization": `Bearer ${TOKEN}`
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