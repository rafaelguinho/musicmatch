import React, { Component } from 'react';
import Profile from './Profile';
import Gallery from './Gallery';
import NotFound from './NotFound';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            tracks: [],
            token: null,
            notFound: false
        }
    }

    componentDidMount() {
        
                let hashParams = {};
                let e, r = /([^&;=]+)=?([^&;]*)/g,
                    q = window.location.hash.substring(1);
                while ( e = r.exec(q)) {
                    hashParams[e[1]] = decodeURIComponent(e[2]);
                }
        
                if(!hashParams.access_token) {
                    window.location.href = 'https://accounts.spotify.com/authorize?client_id=ec45daa8ba894ba6ba81647b5cb3dbe7&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=https://hopeful-engelbart-c560a2.netlify.com/callback';
                } else {
                    this.setState({token: hashParams.access_token});
                }
        
            }

    search() {
        const TOKEN = this.state.token;//"BQCIbtB48iF_gfwbCXoERG6H4B0PQ3jug9YMlEBNhr1bTX-gyTs1Kw3Fwx5RtTmLaZtngTq38bxgpujaAdmE8JNB2jRzyTLPlm1q3dCYyjeGpttnt6VYDB8wnXTyWCZqSxYjNuk90a1dH4B5VblCEPokROBjIizFgAHZ216g18HKQyORdy77fKfp4ZEzLsGdNTXCUsRHoui0m-is6wvZv97gOqt2QAqGd07c1wf6Lwv0G1bBAzSU9ZOLp-Ru-rkTAyZXkaHWuVVMYXU";
        const BASE_URL = 'https://api.spotify.com/v1/';
        let FETCH_URL = `${BASE_URL}search?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `${BASE_URL}artists/`;

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {

                "Authorization": `Bearer ${TOKEN}`
       }
        }).then(response => response.json())
        .catch(error => {
            this.setState({ notFound: true });
        })
            .then(json => {
                if(!json.artists.items.length){
                    this.setState({ notFound: true });
                    return; 
                }

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
                    .catch(error => console.error('Error:', error))
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
                            <div className="search-container">
                            <button className="btn-round" onClick={() => this.search()}></button>
                            </div>
                        
                    </div>
                </div>
                {
                    this.state.artist !== null
                        ? <div>
                            <Profile artist={this.state.artist} />
                            <Gallery tracks={this.state.tracks}/>
                        </div>
                        : this.state.notFound
                            ? <NotFound />
                            :<div></div>
                }

            </div>
        )
    }
}

export default App;