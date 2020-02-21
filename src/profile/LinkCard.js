import React from "react";
import './styles.css'
import Constants from "./constants";

class LinkCard extends React.Component {
    handle = 'thatIndianDeveloper';
    socialMedia = 'Instagram';
    svgPath = Constants.instagramSVG;
    state = {
        isHover: false,
    };

    constructor(props) {
        super(props);
        this.handle = props.handle;
        this.socialMedia = props.socialMedia;
        switch (this.socialMedia) {
            case "Instagram":
                this.svgPath = Constants.instagramSVG;
                break;
            case "Twitter":
                this.svgPath = Constants.twitterSVG;
                break;
            case "Facebook":
                this.svgPath = Constants.facebookSVG;
                break;
            default:
                this.svgPath = Constants.instagramSVG;
                break;
        }
        if (this.socialMedia === 'Twitter') {
            this.svgPath = Constants.twitterSVG
        }
    };

    onMouseOver = () => this.setState({isHover: true});
    onMouseOut = () => this.setState({isHover: false});

    render() {
        return <div
            className={`rounded-lg overflow-hidden bg-white flex items-center px-4 py-6 my-2  min-w-full ${this.state.isHover ? 'shadow-md' : 'shadow-2xl'}`}
            onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            <svg className="fill-current w-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 32 32">
                <path
                    d={this.svgPath}></path>
            </svg>
            <h1 className="text-sm">{this.handle}</h1>
        </div>
    };
}

export default LinkCard;