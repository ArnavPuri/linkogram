import React from "react";
import './styles.css'
import Constants from "../constants";

class LinkCard extends React.Component {
    handle = 'thatIndianDeveloper';
    socialMedia = 'Instagram';
    svgPath = Constants.instagramSVG;
    isAdmin = false;
    linkID = '';
    state = {
        isHover: false,
        linkID: ''
    };

    constructor(props) {
        super(props);
        this.handle = props.handle;
        this.socialMedia = props.socialMedia;
        this.isAdmin = props.isAdmin;
        this.linkID = props.linkID;
        this.onDelete = props.onDelete;
        this.updateSuitableSVG();
    };

    componentDidMount() {
        this.setState(
            {
                linkID: this.linkID,
            }
        );
    }

    updateSuitableSVG() {
        switch (this.socialMedia) {
            case "instagram":
                this.svgPath = Constants.instagramSVG;
                break;
            case "twitter":
                this.svgPath = Constants.twitterSVG;
                break;
            case "facebook":
                this.svgPath = Constants.facebookSVG;
                break;
            case "github":
                this.svgPath = Constants.githubSVG;
                break;
            case "youtube":
                this.svgPath = Constants.youtubeSVG;
                break;
            default:
                this.svgPath = Constants.instagramSVG;
                break;
        }
    };

    onMouseOver = () => this.setState({isHover: true});
    onMouseOut = () => this.setState({isHover: false});

    async handleClick(e) {
        console.log(this.linkID);
        //    http://localhost:5001/achieve-goals/us-central1/deleteLink
        const response = await fetch(Constants.baseURL + '/deleteLink',
            {
                method: 'POST',
                mode: "no-cors", // TODO remove cors later
                body: JSON.stringify({"linkID": this.linkID}),
                headers: {'Content-Type': 'application/json'},
            });
        this.onDelete(this.linkID);
    };

    render() {
        return <div
            className={`rounded-lg overflow-hidden bg-white flex flex-row  items-center justify-between  px-4 py-6 my-2  min-w-full ${this.state.isHover ? 'shadow-md' : 'shadow-xl'}`}
            onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            <div className="flex items-center">
                <svg className="fill-current w-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 32 32">
                    <path d={this.svgPath}/>
                </svg>
                <h1 className="text-sm">{this.handle}</h1>
            </div>
            {this.props.isAdmin &&
            <svg
                className="fill-current w-6 text-red-400 hover:bg-red-100 hover:text-red-700 flex items-center cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-4 -5 32 32" onClick={this.handleClick.bind(this)}>
                <path
                    d='M4.5 22.125c-0 0.003-0 0.006-0 0.008 0 0.613 0.494 1.11 1.105 1.116h12.79c0.612-0.006 1.105-0.504 1.105-1.117 0-0.003-0-0.006-0-0.009v0-15h-15zM6 8.625h12v13.125h-12z'/>
                <path d='M7.875 10.125h1.5v9.375h-1.5v-9.375z'/>
                <path d='M11.25 10.125h1.5v9.375h-1.5v-9.375z'/>
                <path d='M14.625 10.125h1.5v9.375h-1.5v-9.375z'/>
                <path
                    d='M15.375 4.125v-2.25c0-0.631-0.445-1.125-1.013-1.125h-4.725c-0.568 0-1.013 0.494-1.013 1.125v2.25h-5.625v1.5h18v-1.5zM10.125 2.25h3.75v1.875h-3.75z'/>
            </svg>}
        </div>
    };

}

export default LinkCard;