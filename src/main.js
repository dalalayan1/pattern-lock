import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Link } from 'react-router-dom';
 
import configureStore from './store/configureStore';
import Maincomponent from './containers/main-container.js';

const store=configureStore();
render(
	
		<BrowserRouter>
		<div>
		<Route exact={true} path="/" render = {() => (
				<Provider store={store}>
					<Maincomponent/>
				</Provider>
		)} />
		<Route exact={true} path="/checkPattern" render = {() => (
				<Provider store={store}>
					<Maincomponent/>
				</Provider>
		)} />
		</div>
		</BrowserRouter>
	,
	document.getElementById('app-root')
	);