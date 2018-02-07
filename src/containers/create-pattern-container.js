import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import savePattern  from '../actions';
import PatternComponent from '../components/patternComponent';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       savePattern
    }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(PatternComponent);