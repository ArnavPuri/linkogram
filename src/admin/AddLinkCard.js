import React from "react";
import Constants from "../constants";

class AddLinkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            socialMedia: 'instagram',
            handleError: false,
            userID: props.location.userID
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.handle === '') {
            this.setState({
                handleError: true
            });
            return
        }
        this.setState({
            handleError: false
        });
        let _data = {
            handle: this.state.handle,
            socialMedia: this.state.socialMedia,
            userID: this.state.userID
        };
        await fetch(Constants.baseURL + '/saveLink',
            {
                method: 'POST',
                mode: "no-cors", // TODO remove cors later
                body: JSON.stringify(_data),
                headers: {'Content-Type': 'application/json'},
            });
        this.props.history.push(`/${this.state.userID}`);
    }

    render() {
        return (
            <div className="flex flex-col mx-auto my-16">
                <h2 className="text-xl text-gray-700">Add new link</h2>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="socialMedia">
                            Platform
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state" value={this.state.socialMedia}
                                onChange={(e) => this.setState({socialMedia: e.target.value})}>
                                <option value='instagram'>Instagram</option>
                                <option value='twitter'>Twitter</option>
                                <option value='facebook'>Facebook</option>
                                <option value='youtube'>Youtube</option>
                                <option value='github'>Github</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Handle
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="handle" type="text" placeholder="elonmusk"
                            onChange={(e) => this.setState({handle: e.target.value})}/>
                        {this.state.handleError &&
                        <p className="text-sm text-red-700 ">
                            Please provide suitable username
                        </p>
                        }
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button" onClick={this.handleSubmit}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}

export default AddLinkCard;