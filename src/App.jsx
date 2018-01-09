import React, { Component } from 'react';
import Profile from './Profile';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer BQDqG3Dysx52sCeIXg8yW3T1iKmPtLg2xo9uJu2WmERbtp_RgNcFUospIuIhUFEWlq32FjBg4Ixw0C96lF8"
            }
        }).then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];

                this.setState({ artist });
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
                        ? <Profile artist={this.state.artist} />
                        : <div></div>
                }

                <div className="Gallery">
                    Gallery
            </div>
            </div>
        )
    }
}

export default App;