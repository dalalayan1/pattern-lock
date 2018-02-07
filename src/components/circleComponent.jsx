import React, { PropTypes } from 'react';

import '../styles/index.scss';

const CircleComponent = ({id}) => {

    return (
        <div className={`circle-wrapper ${id}`} data-id={id} >
        </div>
    );

};

CircleComponent.defaultProps = {

};

CircleComponent.propTypes = {

};

export default CircleComponent;
