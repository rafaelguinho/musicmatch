import React, { Component } from 'react';
import Profile from './Profile';

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
                "Authorization": "Bearer BQBw55Men8bKWBR6juYtIXOmz8oUaSrfV8OoXx0ua3vgCgq0DuStEircwpV6IuqyIEkJs0JIiwffldAwKMc6CDJwO_q6rQMYmJp9pwM2_5o8uhp6Vd0J0PqOu2kX8ygq3e2Ka988XG45fQr1MVzWCyxvYfkL8jP2GHA4Mkmx0b7wGkyJsccBldNLN6NsoJWuUMaDErCrPpvigzOuY7ydnJJNuHLkFEIwctLDAyI6GLzmma46RDpq7x47h1surst16rX2r4g85L0nfxA"
              }
        }).then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});
        });
    }

    render() {
        return (
            <div>
                <div className="App-title">Music master</div>
                <div>
                    <input query={this.state.query}
                        onChange={event => { this.setState({ query: event.target.value }) }}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.search();
                            }
                        }}
                        type="search" placeholder="Search and artist..." />
                    <button onClick={() => this.search()}>Button</button>
                </div>
                <Profile artist={this.state.artist}/>
                <div className="Gallery">
                    Gallery
            </div>
            </div>
        )
    }
}

export default App;