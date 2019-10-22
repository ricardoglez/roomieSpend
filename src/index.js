'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";
import App from './components/App';
import './assets/defaultStyles.scss';
require('firebase/firestore');

const wrapper = document.getElementById('app');

ReactDOM.render(<App/>, wrapper);