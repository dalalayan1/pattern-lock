import React, { PropTypes } from 'react';

import '../styles/index.scss';

class CircleComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isDragging: false
        }
    }

    render() {
        return (
            <div className={`circle-wrapper ${this.props.id}`} data-id={this.props.id} >
            </div>
        );
    }

};

CircleComponent.defaultProps = {

};

CircleComponent.propTypes = {

};

export default CircleComponent;
