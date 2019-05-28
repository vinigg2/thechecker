import css from './Login.scss';
import components from '../../styles/global.scss';
import React, { PropTypes } from 'react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
library.add(faArrowAltCircleLeft);

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Alert,
    Input
} from 'reactstrap';
import { Images } from '../../utils/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SessionApi from '../../api/SessionApi';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.status,
            type: 'home',
            error: '',
            credentials: {
                email: '',
                password: ''
            },
            signup: {
                name: '',
                email: '',
                password: ''
            }
        };

        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleError = this.handleError.bind(this);
        this.onChangeSignUp = this.onChangeSignUp.bind(this);
    }

    componentWillReceiveProps(e) {
        this.setState({
            modal: e.status
        })
    }

    onChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({ credentials: credentials });
    }


    onChangeSignUp(event) {
        const field = event.target.name;
        const signup = this.state.signup;
        signup[field] = event.target.value;
        return this.setState({ signup: signup });
    }

    onSignIn(event) {
        event.preventDefault();
        const { me } = this.props;
        this.props.actions.logInUser(this.state.credentials)
            .then(() => {
                if (me && me.profile) {
                    this.close();
                } else {
                    this.handleError('User not found.', 3000)
                }
            })
    }

    onSave(event) {
        event.preventDefault();
        SessionApi.signup(this.state.signup)
            .then(res => {
                if (res && res.message) {

                    const data = {
                        email: this.state.signup.email,
                        password: this.state.signup.password
                    }

                    this.props.actions.logInUser(data);

                    this.setState({
                        signup: {
                            name: '',
                            email: '',
                            password: ''
                        }
                    });

                    this.close();
                } else {
                    this.handleError('an account with this email has already been created', 3000);
                }
            })
            .catch(error => {
                this.handleError('try again later.', 3000);
                console.error(error);
            })
    }

    handleError(msgm, timeout) {
        this.setState({
            error: msgm
        });

        if (timeout) {
            setTimeout(() => {
                this.setState({
                    error: ''
                })
            }, timeout)
        }
    }

    close() {
        this.setState({
            type: 'home'
        })
        this.props.modalClose(false);
    }

    handleType(type) {
        this.setState({ type })
    }

    _renderContent(type) {
        const { error, credentials, signup } = this.state;
        switch (type) {
            case 'home':
                return (
                    <div>
                        <h4 className={`${css.logo} text-center`}>Fun Weather User.</h4>
                        <div className={`${css.avatar} text-center`}>
                            <img src={Images.AVATAR} />
                        </div>
                        <div className={css.groupButton}>
                            <Button className={components.btnPrimary} onClick={() => this.handleType('login')} color="primary">Sign in</Button>
                            <Button className={components.btnSecondary} onClick={() => this.handleType('register')} color="secondary">Sign up</Button>
                        </div>
                    </div>
                )
            case 'login':
                return (
                    <Fade>
                        <h4 className={`${css.logo} text-center`}>Fun Weather Login.</h4>
                        <div className={`${css.avatar} text-center`}>
                            <img src={Images.AVATAR} />
                        </div>
                        {
                            error &&
                            <Fade>
                                <Alert className={'text-center'} color="danger">{error}</Alert>
                            </Fade>
                        }
                        <Form className={css.form}>
                            <FormGroup>
                                <Input type="email" onChange={this.onChange} className={css.input} name="email" id="email" placeholder="E-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" onChange={this.onChange} className={css.input} name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <div className={css.groupButton}>
                                <Button disabled={!credentials.email || !credentials.password} className={components.btnPrimary} color="primary" onClick={this.onSignIn}>Sign in</Button>
                            </div>
                        </Form>
                    </Fade>
                )

            case 'register':
                return (
                    <Fade>
                        <h4 className={`${css.logo} text-center`}>Fun Weather Register.</h4>
                        <div className={`${css.avatar} text-center`}>
                            <img src={Images.AVATAR} />
                        </div>
                        {
                            error &&
                            <Fade>
                                <Alert className={'text-center'} color="danger">{error}</Alert>
                            </Fade>
                        }
                        <Form className={css.form}>
                            <FormGroup>
                                <Input type="text" onChange={this.onChangeSignUp} className={css.input} name="name" id="name" placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" onChange={this.onChangeSignUp} className={css.input} name="email" id="email" placeholder="E-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" onChange={this.onChangeSignUp} className={css.input} name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <div className={css.groupButton}>
                                <Button disabled={!signup.email || !signup.password || !signup.name} onClick={this.onSave} className={components.btnSecondary} color="secondary">Sign up</Button>
                            </div>
                        </Form>
                    </Fade>
                )
        }
    }

    render() {
        const { type } = this.state;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.close} className={css.modal}>
                    <ModalHeader className={css.modalHeader} toggle={this.close}>
                        {
                            type !== 'home' &&
                            <button className={css.back} onClick={() => { this.setState({ type: 'home' }) }}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            </button>
                        }

                    </ModalHeader>
                    <ModalBody className={css.modalBody}>
                        {this._renderContent(type)}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);