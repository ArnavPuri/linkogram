import React from "react";
import Constants from "../constants";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            handle: '',
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let _data = {
            handle: this.state.handle,
            email: this.state.email,
            password: this.state.password
        };
        console.log(_data);
        const response = await fetch(Constants.baseURL + '/signup',
            {
                method: 'POST',
                mode: "no-cors", // TODO remove cors later
                body: JSON.stringify(_data),
                headers: {'Content-Type': 'application/json'},
            });
        console.log(response.statusText);
        console.log(response.status);
        console.log(response.body);
        if (response.status !== 200) {
            this.setState({error: response.body})
        }

    }

    render() {
        return <div className="flex flex-col mx-auto">
            <h2 className="text-xl text-gray-700  mt-8">Sign Up</h2>
            <form className="bg-white shadow-md rounded px-8 py-6 mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username (It will be your link)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username"
                        onChange={(e) => this.setState({handle: e.target.value})}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email (We don't spam)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" placeholder="Email"
                        onChange={(e) => this.setState({email: e.target.value})}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************"
                        onChange={(e) => this.setState({password: e.target.value})}/>
                    <p className="text-red-500 text-xs italic">{this.state.error}</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={this.handleSubmit}>
                        Sign Up
                    </button>

                </div>
            </form>
        </div>
    }
}

export default SignUp;