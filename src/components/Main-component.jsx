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

	checkPatternHandler = () => {
		const {
			patternArray,
			props: {
				patternArray: storedPatternArray
			} = {}
		} = this;

		if ( patternArray.length < 4 ) {
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
			this.setState({
				error: true
			});
		}
		else {
			this.setState({
				error: false
			});
		}
		
		this.removePatternPaint();
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
					askForConfirmation && <h4 className="confirm-msg">{confirmMsg}</h4>
				}
				{
					patternConfirmed && <h4 className="redirect-msg">
											{redirectMsg}
											<Link to="/checkPattern">{redirectButtonMsg}</Link>
										</h4>
				}
				{
					patternMatched && <h4 className="redirect-msg">{patternMatchedMsg}</h4>
				}
				{
					error && <h4 className="error-msg">{checkPattern ? checkPatternErrorMsg : createPatternErrorMsg}</h4>
				}
			</div>
		);
	}
}