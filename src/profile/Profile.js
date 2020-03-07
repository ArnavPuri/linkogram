import React from 'react';
import '../styles.css';
import LinkCard from "./LinkCard";
import {Link} from "react-router-dom";
import Constants from "../constants";

class Profile extends React.Component {

    state = {
        links: [],
        name: '',
        bio: '',
        isAdmin: true,
        userID: this.props.match.params.id
    };

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.getLinks();
    }

    onDelete(linkID) {
        let updatedLinks = this.state.links.filter(value => {
            return value.key !== linkID;
        });
        this.setState(
            {
                links: updatedLinks
            }
        );
    }

    async getLinks() {
        console.log('Get Links');
        let response = await fetch(`${Constants.baseURL}/getLinks?id=${this.state.userID}`);
        let resData = await response.json();
        this.setState({
            links: resData.links.map((link) =>
                <LinkCard key={link.id} handle={link.handle} socialMedia={link.socialMedia}
                          isAdmin={this.state.isAdmin} linkID={link.id} onDelete={this.onDelete} isEditing={true}/>
            ),
            name: resData.name,
            bio: resData.bio,
        });
        if (response.status !== 200) {
            this.setState({
                name: "USER NOT FOUND"
            });
        }
    }

    render() {
        return (

            <div className="flex flex-col my-12 sm:w-full px-4 lg:w-auto lg:mx-auto">
                {/* Name card */}
                <div
                    className="flex flex-row rounded-lg shadow-lg bg-white items-center px-4 py-4 mb-4">
                    <img src="https://pbs.twimg.com/profile_images/1138261784106680321/nzg-HuA__400x400.jpg"
                         alt={this.state.name}
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
                <Link
                    to={{
                        pathname: "/edit",
                        userID: this.state.userID
                    }}>
                    <div
                        className="rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white flex flex-col items-center text-center px-4 py-4 my-2 min-w-full  text-gray-500 hover:text-gray-700">
                        <svg className=" fill-current text-center w-8" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 32 32">
                            <path
                                d='M20.625 11.25h-7.875v-7.875h-1.5v7.875h-7.875v1.5h7.875v7.875h1.5v-7.875h7.875v-1.5z'/>
                        </svg>
                        <p className="text-sm">Add New Link</p>
                    </div>
                </Link>
            </div>


        );
    }
}

export default Profile;
