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
        linkID: '',
        isEditing: false,
        handle: this.props.handle
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

    async handleDelete(e) {
        let isConfirmed = window.confirm("Are you sure you want to delete this link?");
        if (isConfirmed) {
            await fetch(Constants.baseURL + '/deleteLink',
                {
                    method: 'POST',
                    mode: "no-cors", // TODO remove cors later
                    body: JSON.stringify({"linkID": this.linkID}),
                    headers: {'Content-Type': 'application/json'},
                });
            this.onDelete(this.linkID);
        }
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
                {!this.state.isEditing &&
                <h1 className="text-sm">{this.state.handle}</h1>
                }
                {this.state.isEditing &&
                <input className="text-sm border-2 focus:border-red-200 border-red-200" type="text"
                       value={this.state.handle}
                       onChange={(e) => this.setState({handle: e.target.value})}/>

                }
            </div>
            <div className="flex">
                {/*Edit icon*/}
                {this.props.isAdmin &&
                <svg
                    className="fill-current w-5 text-red-400 hover:bg-red-100 hover:text-red-700 flex items-center cursor-pointer"
                    id="cis-pen" viewBox="0 0 512 512"
                    onClick={() => this.setState({isEditing: !this.state.isEditing})}>
                    <path
                        d="M189.2056,219.7944A626.818,626.818,0,0,0,38.8384,461.66v0a9,9,0,0,0,2.1587,9.2549l.0874.0874a9,9,0,0,0,9.2549,2.1587h0A626.818,626.818,0,0,0,292.2056,322.7944l92.5669-92.5669-103-103Z"
                        className="cls-1"/>
                    <path
                        d="M458.668,53.332a72.8318,72.8318,0,0,0-103,0l-48.44,48.44,103,103,48.44-48.4405A72.8318,72.8318,0,0,0,458.668,53.332Z"
                        className="cls-1"/>
                </svg>

                }
                {/*delete*/}
                {this.props.isAdmin &&
                <svg
                    className="fill-current w-6 text-red-400 hover:bg-red-100 hover:text-red-700 flex items-center cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-4 -5 32 32" onClick={this.handleDelete.bind(this)}>
                    <path
                        d='M4.5 22.125c-0 0.003-0 0.006-0 0.008 0 0.613 0.494 1.11 1.105 1.116h12.79c0.612-0.006 1.105-0.504 1.105-1.117 0-0.003-0-0.006-0-0.009v0-15h-15zM6 8.625h12v13.125h-12z'/>
                    <path d='M7.875 10.125h1.5v9.375h-1.5v-9.375z'/>
                    <path d='M11.25 10.125h1.5v9.375h-1.5v-9.375z'/>
                    <path d='M14.625 10.125h1.5v9.375h-1.5v-9.375z'/>
                    <path
                        d='M15.375 4.125v-2.25c0-0.631-0.445-1.125-1.013-1.125h-4.725c-0.568 0-1.013 0.494-1.013 1.125v2.25h-5.625v1.5h18v-1.5zM10.125 2.25h3.75v1.875h-3.75z'/>
                </svg>
                }
            </div>


        </div>
    };

}

export default LinkCard;