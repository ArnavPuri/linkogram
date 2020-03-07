import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//     hydrate(<App/>, rootElement);
// } else {
//     render(<App/>, rootElement);
// }

serviceWorker.register();
