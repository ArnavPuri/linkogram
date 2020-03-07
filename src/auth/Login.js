import React from "react";
import Constants from "../constants";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let _data = {
            email: this.state.email,
            password: this.state.password
        };

        let res = await axios.post(
            Constants.baseURL + '/login',
            _data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            }
        );

        if (res.status !== 200) {
            this.setState({error: res.data.response});
            return;
        }
        this.setState({error: ''});
        window.localStorage.setItem('token', res.data.response);
        let repsonseData = await axios.post(Constants.baseURL + '/getUser',
            {
                token: res.data.response
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                }
            });
        window.localStorage.setItem('userHandle', repsonseData.data.handle);
        this.props.history.push(`/${repsonseData.data.handle}`);

    }

    render() {
        return <div className="flex flex-col mx-auto">
            <h2 className="text-xl text-gray-700  mt-8">Login</h2>
            <form className="bg-white shadow-md rounded px-8 py-6 mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
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
                        Login
                    </button>

                </div>
            </form>
        </div>
    }
}

export default Login;