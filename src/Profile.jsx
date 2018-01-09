import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    render() {
        let artist = { name: '', followers: { total: '' }, images: [{ url: '' }] };

        if (this.props.artist !== null)
            artist = this.props.artist;

        return (
            <div>
                <img src="" alt="profile" src={artist.images[0].url} />
                <div>{artist.name}</div>
                <div>{artist.followers.total}</div>
            </div>
        )
    }
}

export default Profile;