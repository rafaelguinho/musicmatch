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
                "Authorization": "Bearer BQB-Vz10rmgFXIvFQhFpdvaKZ6YMOOQPtP6NCfEDsEBWeKfaFwadlmWduIUw51KFJLKy1JR1uin9JY-fAbwA2MzCHbxsDvw8NE8gZgKKnqFlwwxo2-Cd7y5RROL_D7eRT5tlNePA_m6Rl3v8MpcnDZYJPDmxpSGYWgKhKFR9EuV4PAmeQZwil5yqqnatRCw2TtT_5of7vCJaXBxmPVOzSpbjlxIRK4jc5CR69GUWfWI2D96VUf276AOHlekMKSkd6omT0IDuLvtFQj4"
            }
        }).then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];

                this.state.query = artist.name;

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