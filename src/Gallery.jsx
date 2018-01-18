import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {

    render() {
        const tracks = this.props.tracks;
        return (
            <div className="gallery-container">
                <h4 className="gallery-title">POPULAR TRACKS</h4>
                <div className="gallery">
                    {
                        tracks.map((track, k) => {
                            const trackImg = track.album.images[0].url;

                            return (
                                <div key={k} className="track">
                                    <img src={trackImg} alt="track" className="track-img" />
                                    <p className="track-text">{track.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}

export default Gallery;