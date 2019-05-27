import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';
import { setData } from '../../actions/testData';

const mapStateToProps = state => {
    const isOpen = state.testData.isOpen;


    return {
        isOpen
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Home);