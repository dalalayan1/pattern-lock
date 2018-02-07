import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import savePattern  from '../actions/main-component.js';
import mainComponent from '../components/main-component';

function mapStateToProps(state) {
    let {patternArray} = state.mainComponentReducers;

    return{
       patternArray 
    };
}

function mapDispatchToProps() {}

export default connect(mapStateToProps,mapDispatchToProps)(mainComponent);