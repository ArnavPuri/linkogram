import React from 'react';
import '../styles.css';
import LinkCard from "./LinkCard";

class Link {
    socialMedia;
    handle;
}

class Profile extends React.Component {
    state = {
        links: [],
        name: '',
        bio: ''
    };


    componentDidMount() {
        fetch('http://127.0.0.1:5001/achieve-goals/us-central1/getLinks')
            .then(value => value.json())
            .then(value => this.setState({
                links: value.links.map((link) =>
                    <LinkCard key={link.id + link.socialMedia} handle={link.handle} socialMedia={link.socialMedia}/>
                ),
                name: value.name,
                bio: value.bio,

            }));
    }

    render() {
        return (
            <div className="bg-red-100 flex flex-col">
                <div className="flex flex-col mx-auto my-16 items-center">
                    {/* Name card */}
                    <div
                        className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex items-center px-4 py-6 mb-4">
                        <img src="https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png" alt="User avatar"
                             className="w-10 h-10 rounded-full mr-4"/>
                        <div className="flex-col">
                            <h1 className="text-3xl">{this.state.name}</h1>
                            <h1 className="font-light text-sm text-gray-700">{this.state.bio}</h1>
                        </div>
                    </div>
                    {/* Link card */}
                    {/*<LinkCard handle="thatIndianDeveloper" socialMedia="Instagram"/>*/}
                    {this.state.links}
                </div>
                <footer className="flex w-full fixed bottom-0 items-center text-center">
                    <p>(c) Copyright Linkogram!</p>
                </footer>
            </div>
        );
    }
}

export default Profile;
