import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Profile from "./profile";
import AddLinkCard from "./admin";
import SignUp from "./auth/Signup";
import Login from "./auth/Login";

function App() {

    return (
        <Router>
            <div className="flex flex-col">
                <ul className="flex self-center mt-4 justify-evenly">
                    <Link to="/">
                        <li className="mr-3 cursor-pointer min-w-full">
                            <p className="inline-block border border-red-300 rounded py-1 px-3 bg-red-300 text-red-500">Home</p>
                        </li>
                    </Link>
                    <Link to="/edit">
                        <li className="mr-3 cursor-pointer">
                            <p className="inline-block border border-red-200 rounded hover:border-red-200 text-red-500 hover:bg-red-200 py-1 px-3">Edit</p>
                        </li>
                    </Link>
                    <Link to="/logout">
                        <li className="mr-3 cursor-pointer">
                            <p className="inline-block border border-white rounded hover:border-red-200 text-red-500 hover:bg-red-200 py-1 px-3">Logout</p>
                        </li>
                    </Link>
                </ul>
                <Switch>
                    <Route exact path="/edit" component={AddLinkCard}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={SignUp}/>

                    <Route path="/:id" component={Profile}/>

                </Switch>
                <footer className="w-full text-center mt-4">
                    <p className="text-red-300 text-sm">(c) Copyright Linkogram</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
