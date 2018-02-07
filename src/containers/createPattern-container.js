import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import savePattern  from '../actions/main-component.js';
import mainComponent from '../components/main-component';

function mapStateToProps() {}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       savePattern
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(mainComponent);