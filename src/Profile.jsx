import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    toInitcap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let artist = { name: '', followers: { total: '' }, images: [{ url: '' }], genres: [] };

        if (this.props.artist !== null)
            artist = this.props.artist;

        return (
            <div className="Profile">
                <img className="Img-Profile" alt="profile" src={artist.images[0].url} />
                <div className="Followers"><strong>{artist.followers.total}</strong> followers</div>
                <div className="Genres">
                    {
                        artist.genres.map((genre, k) => {
                            genre = this.toInitcap(genre);
                            genre = genre !== artist.genres[artist.genres.lenght - 1]
                                ? `${genre}, `
                                : ` & ${genre}`;
                            return (
                                <span key={k}>{genre}</span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Profile;