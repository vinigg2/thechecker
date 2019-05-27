import css from './Login.scss';
import components from '../../styles/global.scss';
import React from 'react';
import Fade from 'react-reveal/Fade';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';
import { Images } from '../../utils/Images';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.status,
            type: 'home'
        };

        this.close = this.close.bind(this);
    }

    componentWillReceiveProps(e) {
        this.setState({
            modal: e.status
        })
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
        switch (type) {
            case 'home':
                return (
                    <div>
                        <h4 className={`${css.logo} text-center`}>Fun Weather User.</h4>
                        <div className={`${css.avatar} text-center`}>
                            <img src={Images.AVATAR} />
                        </div>
                        <div className={css.groupButton}>
                            <Button className={components.btnPrimary} onClick={() => this.handleType('login')} color="primary">Fazer login</Button>
                            <Button className={components.btnSecondary} onClick={() => this.handleType('register')} color="secondary">Criar conta</Button>
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
                        <Form className={css.form}>
                            <FormGroup>
                                <Input type="email" className={css.input} name="email" id="email" placeholder="E-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" className={css.input} name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <div className={css.groupButton}>
                                <Button className={components.btnPrimary} color="primary">Fazer login</Button>
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
                        <Form className={css.form}>
                            <FormGroup>
                                <Input type="text" className={css.input} name="name" id="name" placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" className={css.input} name="email" id="email" placeholder="E-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" className={css.input} name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <div className={css.groupButton}>
                                <Button className={components.btnSecondary} color="secondary">Criar conta</Button>
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
                    <ModalHeader className={css.modalHeader} toggle={this.close}></ModalHeader>
                    <ModalBody className={css.modalBody}>
                        {this._renderContent(type)}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login;