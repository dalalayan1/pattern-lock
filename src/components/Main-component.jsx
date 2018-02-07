import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
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
			});
		}
		
		this.removePatternPaint();
	}
    handleMouseMove = (e) => {
		const {
			target: {
				dataset: {
					id
				} = {},
				classList
			} = {}
		} = e;

		if(this.dragging && id){
			this.pushElementToArray(id);
			classList.add('paint-pattern');
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

	removePatternPaint = () => {
		const circles = document.querySelectorAll('.circle-wrapper');

		circles.forEach((circle) => circle.classList.remove('paint-pattern'));
	}

	render() {
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
					this.state.patternConfirmed && <h4 href={config.redirectLink} className="redirect-msg">
														{config.redirectMsg}
														<Link to="/checkPattern">Click Here</Link>
													</h4>
				}
				{
					this.state.error && <h4 className="error-msg">{config.errorMsg}</h4>
				}
			</div>
		);
	}
}