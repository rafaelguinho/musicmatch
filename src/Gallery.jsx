import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {

    render() {
        const tracks = this.props.tracks;
        return (
            <div>
                {
                    tracks.map((track, k) => {
                        const trackImg = track.album.images[0].url;

                        return (
                            <div key={k} className="track">
                                <img src={trackImg} alt="track" className="track-img" />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;