import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter,Route } from 'react-router-dom';
 
import configureStore from './store/configureStore';
import CreatePatternContainer from './containers/create-pattern-container';
import CheckPatternContainer from './containers/check-pattern-container';

const store=configureStore();
render(
	
		<BrowserRouter>
		<div>
		<Route exact={true} path="/" render = {() => (
				<Provider store={store}>
					<CreatePattern/>
				</Provider>
		)} />
		<Route exact={true} path="/checkPattern" render = {() => (
				<Provider store={store}>
					<CheckPattern checkPattern={true}/>
				</Provider>
		)} />
		</div>
		</BrowserRouter>
	,
	document.getElementById('app-root')
	);