import css from './Profile.scss';
import components from '../../styles/global.scss';
import React, { Component } from 'react';
import * as sessionActions from '../../actions/sessionActions';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faInstagram, faTwitter);

import {
    Button
} from 'reactstrap';
import Login from '../../components/Login/Login';
import { bindActionCreators } from 'redux';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { me } = this.props;

        const firstName = me.profile.name;

        return (
            <div id={css.profile}>
                <div className={css.box}>
                    <figure className={css.figure}>
                        {firstName[0]}
                    </figure>
                    <h4>{firstName}</h4>
                    <small>{me.email}</small>
                    <div className={css.groupButton}>
                        <Button onClick={() => browserHistory.push('/')} color="primary" className={components.btnPrimary}>Voltar</Button>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        me: state.session.me
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);