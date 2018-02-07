import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import CircleComponent from './circleComponent';
import config from '../config.json';
import '../styles/index.scss';
export default class PatternComponent extends React.Component{

	constructor(props){
		super(props);
		this.dragging = false;
		this.patternArray = [];
		this.state = {
			state: false,
			patternArray: [],
			askForConfirmation: false,
			patternConfirmed: false,
			patternMatched: false
		};
	}

	componentDidMount() {
	}

	handleMouseUp = (e) => {
		this.dragging = false;
		if( this.props.checkPattern ) {
			this.checkPatternHandler();
		}
		else {
			this.createPatternHandler();
		}
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
		this.resetPatternPaint();
	}

	createPatternHandler = () => {
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
			this.addErrorPaint();
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
			this.addErrorPaint();
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

	checkPatternHandler = () => {
		const {
			patternArray,
			props: {
				patternArray: storedPatternArray
			} = {}
		} = this;

		if ( patternArray.length < 4 ) {
			this.addErrorPaint();
			this.setState({
				error: true
			});
		}
		else if (JSON.stringify(patternArray) === JSON.stringify(storedPatternArray)) {
			this.setState({
				patternMatched: true,
				error: false
			});
		}
		else if (JSON.stringify(patternArray) !== JSON.stringify(storedPatternArray)) {
			this.addErrorPaint();
			this.setState({
				error: true
			});
		}
		else {
			this.setState({
				error: false
			});
		}
		
		//this.removePatternPaint();
	}
	
	pushElementToArray = id => {
		const patternArray = this.patternArray;
		const patternArrayLength = patternArray.length;

		if(id !== patternArray[patternArrayLength - 1]) {
			this.patternArray.push(id);
		}
	}

	addErrorPaint = () => {
		const circles = document.querySelectorAll('.circle-wrapper.paint-pattern');

		circles.forEach((circle) =>  {
			circle.classList.remove('paint-pattern');
			circle.classList.add('paint-error');
		});
	} 

	removePatternPaint = () => {
		const circles = document.querySelectorAll('.circle-wrapper');

		circles.forEach((circle) => circle.classList.remove('paint-pattern'));
	}

	resetPatternPaint = () => {
		const circles = document.querySelectorAll('.circle-wrapper');

		circles.forEach((circle) => circle.classList.remove('paint-pattern', 'paint-error'));
	}

	render() {
		const {
				createPattern: {
					instructionMsg: createPatternInstructionMsg,
					patternArray,
					confirmMsg,
					errorMsg: createPatternErrorMsg,
					redirectLink,
					redirectMsg,
					redirectButtonMsg
				} = {},
				checkPattern: {
					instructionMsg: checkPatternInstructionMsg,
					errorMsg: checkPatternErrorMsg,
					patternMatchedMsg
				} = {}
			} = config,
			{ checkPattern } = this.props,
			{ askForConfirmation, patternConfirmed, patternMatched, error } = this.state;

		return(
			<div className="main-component">
				<h2 className="instruction-msg">{checkPattern ? checkPatternInstructionMsg : createPatternInstructionMsg}</h2>
				<div className="pattern-wrapper"
					onMouseMove={this.handleMouseMove}
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
				>
					{
						patternArray.map((item) => (
							<CircleComponent key={item} id={item}/>
						))
					}
				</div>
				{
					askForConfirmation && <h3 className="confirm-msg">{confirmMsg}</h3>
				}
				{
					patternConfirmed && <h3 className="redirect-msg">
											{redirectMsg}
											<Link to="/checkPattern">{redirectButtonMsg}</Link>
										</h3>
				}
				{
					patternMatched && <h3 className="redirect-msg">{patternMatchedMsg}</h3>
				}
				{
					error && <h3 className="error-msg">{checkPattern ? checkPatternErrorMsg : createPatternErrorMsg}</h3>
				}
			</div>
		);
	}
}