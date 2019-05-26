import css from './Footer.scss';
import components from '../../styles/global.scss';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Images } from '../../utils/Images';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Row,
    Col,
    NavLink,
    Button
} from 'reactstrap';
import PropTypes from 'prop-types';


library.add(faFacebook, faInstagram, faTwitter)

class Header extends Component {



    constructor(props) {
        super(props);
        this.state = {
            menu: this.props.menu,
            socials: this.props.socials
        }
    }

    _renderMennu(array) {
        let items = [];

        for (let i = 0; i < array.length; i++) {
            const { label, link } = array[i];

            if (label.toLowerCase() !== 'login') {
                items.push(
                    <li key={i}>
                        <a className={css.link} href={link}>{label}</a>
                    </li>
                );
            }
        }

        return items;
    }

    _renderMennuSocial(array) {
        let items = [];

        for (let i = 0; i < array.length; i++) {
            const { label, link } = array[i];
            items.push(
                <li key={i}>
                    <a className={css.link} href={link}><FontAwesomeIcon icon={label} /></a>
                </li>
            );
        }

        return items;
    }

    render() {

        const { menu, socials } = this.state;

        return (
            <div id={css.footer}>
                <div id={css.appInf}>
                    <Container>
                        <Row className={components.middle}>
                            <Col md={6} xs={12}>
                                <h2>How Download the app?</h2>
                                <p>Just download the app from the store. <br /> Simple, nice and user-friendly application of <br /> theweather. Only relevant and useful <br /> information.</p>
                                <div className={css.stores}>
                                    <img src={Images.GOOGLEPLAY} />
                                    <img src={Images.APPSTORE} />
                                </div>
                            </Col>
                            <Col md={6} xs={12}>
                                <img className={css.phones} src={Images.PHONES} />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div id={css.siteMap}>
                    <Container>
                        <Row className={components.middle}>
                            <Col lg={2}>
                                <div className={css.logo}>
                                    <span>Fun</span> Weather.
                                </div>
                            </Col>

                            <Col lg={8}>
                                <ul>
                                    {this._renderMennu(menu)}
                                </ul>
                            </Col>

                            <Col lg={2}>
                                <ul className={css.social}>
                                    {this._renderMennuSocial(socials)}
                                </ul>
                            </Col>
                        </Row>
                    </Container>

                    <div id={css.copyRight}>
                        <Container>
                            <hr />
                            © 2016 All rights reserved. Vinícius Pereira
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
};

export default Header;

Header.propTypes = {};