import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import Store from './components/Store'
import {positions,transitions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE
}
ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
