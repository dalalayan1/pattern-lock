import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import savePattern  from '../actions';
import PatternComponent from '../components/patternComponent';

function mapStateToProps(state) {
    let {patternArray} = state.patternComponentReducers;

    return{
       patternArray 
    };
}



export default connect(mapStateToProps)(PatternComponent);