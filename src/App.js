import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from "./profile";
import AddLinkCard from "./admin";

function App() {
    return (
        <Router>
            <div className="bg-red-100 flex flex-col w-full h-screen">
                <ul className="flex self-center mt-4">
                    <li className="mr-3">
                        <a className="inline-block border border-red-300 rounded py-1 px-3 bg-red-300 text-red-500">Home</a>
                    </li>
                    <li className="mr-3">
                        <a className="inline-block border border-white rounded hover:border-red-200 text-red-500 hover:bg-red-200 py-1 px-3">Edit</a>
                    </li>
                    <li className="mr-3">
                        <a className="inline-block border border-white rounded hover:border-red-200 text-red-500 hover:bg-red-200 py-1 px-3">Logout</a>
                    </li>

                </ul>
                <Switch>
                    <Route exact path="/edit" component={AddLinkCard}/>
                    <Route path="/:id" component={Profile}/>

                </Switch>
                <footer className="w-full fixed bottom-0 text-center">
                    <p className="text-red-300 text-sm">(c) Copyright Linkogram</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
