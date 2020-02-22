import React from 'react';
import '../styles.css';
import LinkCard from "./LinkCard";
import {Link} from "react-router-dom";

class Profile extends React.Component {
    state = {
        links: [],
        name: '',
        bio: ''
    };

    componentDidMount() {
        fetch('https://us-central1-achieve-goals.cloudfunctions.net/getLinks')
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

            <div className="flex flex-col mx-auto my-16 items-center">
                {/* Name card */}
                <div
                    className="flex flex-row max-w-md rounded-lg shadow-lg bg-white items-center px-4 py-4 mb-4">
                    <img src="https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png" alt="User avatar"
                         className="w-10 h-10 rounded-full mr-4"/>
                    <div className="flex-col">
                        <h1 className="text-3xl">{this.state.name}</h1>
                        <h1 className="font-light text-sm text-gray-700">{this.state.bio}</h1>
                    </div>
                </div>
                {/* Link cards */}
                {this.state.links.length !== 0 ? this.state.links :
                    <p className="text-sm text-red-600">No links here</p>}
                {/* Add new Link */}
                <Link to="/edit">
                    <div
                        className="rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white flex flex-col items-center text-center px-4 py-4 my-2 min-w-full">
                        <svg className=" fill-current text-gray-700 text-center w-8" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 32 32">
                            <path className="text-gray-500"
                                  d='M20.625 11.25h-7.875v-7.875h-1.5v7.875h-7.875v1.5h7.875v7.875h1.5v-7.875h7.875v-1.5z'/>
                        </svg>
                        <p className="text-sm text-gray-500">Add New Link</p>
                    </div>
                </Link>
            </div>


        );
    }
}

export default Profile;
