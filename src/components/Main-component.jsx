import React from 'react';
import { browserHistory } from 'react-router';
import CircleComponent from './circleComponent';
import config from '../config.json';
import '../styles/index.scss';
export default class mainComponent extends React.Component{

	constructor(props){
		super(props);
		this.dragging = false;
		this.patternArray = [];
		this.state = {
			state: false,
			patternArray: [],
			askForConfirmation: false,
			patternConfirmed: false
		};
	}

	handleMouseUp = (e) => {
		this.dragging = false;
		const { patternArray,
				state: {
					patternArray: patternArrayState,
					askForConfirmation
				} = {},
				props: {
					savePattern
				} = {}
			} = this;

		if ( patternArray.length < 4 ) {
			this.setState({
				error: true,
				askForConfirmation: false
			});
		}
		else if (askForConfirmation && JSON.stringify(patternArray) === JSON.stringify(patternArrayState)) {
			savePattern(patternArray);
			browserHistory.push("patternCheck");
			this.setState({
				askForConfirmation: false,
				patternConfirmed: true
			});
		}
		else if (askForConfirmation && JSON.stringify(patternArray) !== JSON.stringify(patternArrayState)) {
			this.setState({
				error: true,
				askForConfirmation: false
			});
		}
		else {
			this.setState({
				error: false,
				patternArray,
				askForConfirmation: true
			}, () => {

			});
		}
	}
    handleMouseMove = (e) => {
		const {
			target: {
				dataset: {
					id
				} = {}
			} = {}
		} = e;

		if(this.dragging && id){
			this.pushElementToArray(id);
		}
		
	}
    handleMouseDown = (e) => {
		this.dragging = true;
		this.patternArray = [];
	}
	
	pushElementToArray = id => {
		const patternArray = this.patternArray;
		const patternArrayLength = patternArray.length;

		if(id !== patternArray[patternArrayLength - 1]) {
			this.patternArray.push(id);
		}
	}

	render(){
		return(
			<div className="main-component">
				<h2 className="instruction-msg">{config.instructionMsg}</h2>
				<div className="pattern-wrapper"
					onMouseMove={this.handleMouseMove}
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
				>
					{
						config.patternArray.map((item) => (
							<CircleComponent key={item} id={item}/>
						))
					}
				</div>
				{
					this.state.askForConfirmation && <h4 className="confirm-msg">{config.confirmMsg}</h4>
				}
				{
					this.state.patternConfirmed && <a href={config.redirectLink} className="redirect-msg">{config.redirectMsg}</a>
				}
				{
					this.state.error && <h4 className="error-msg">{config.errorMsg}</h4>
				}
			</div>
		);
	}
}