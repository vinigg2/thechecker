import css from './Header.scss';
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
      menu: [
        {
          label: 'Home',
          link: '#'
        },
        {
          label: 'Features',
          link: '#'
        },
        {
          label: 'Screenshots',
          link: '#'
        },
        {
          label: 'Login',
          link: '#'
        }
      ],

      socials: [
        {
          label: faFacebook,
          link: '#'
        },
        {
          label: faInstagram,
          link: '#'
        },
        {
          label: faTwitter,
          link: '#'
        }
      ]

    }
  }

  _renderMennu(array) {
    let items = [];

    for (let i = 0; i < array.length; i++) {
      const { label, link } = array[i];
      items.push(
        <NavItem key={i}>
          <NavLink className={css.navLinkCustom} href={link}>{label}</NavLink>
        </NavItem>
      );
    }

    return items;
  }


  _renderMennuSocial(array) {
    let items = [];

    for (let i = 0; i < array.length; i++) {
      const { label, link } = array[i];
      items.push(
        <NavItem key={i}>
          <NavLink className={css.navLinkCustomSocial} href={link}><FontAwesomeIcon icon={label} /></NavLink>
        </NavItem>
      );
    }

    return items;
  }

  render() {
    return (
      <div id="header" className={css.header}>
        <Navbar color="transparent" light expand="md">
          <Container>
            <NavbarBrand href="/"><h1 className={css.logo}>Fun Weather.</h1></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse className={css.headerNavbar} navbar>
              <Nav navbar>
                {this._renderMennu(this.state.menu)}
              </Nav>
            </Collapse>
            <Collapse navbar className={css.headerNavbarSocial}>
              <Nav navbar>
                {this._renderMennuSocial(this.state.socials)}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>

        <div id="apresentation" className={css.banner}>
          <Container>
            <Row className={css.rowMiddle}>
              <Col md={6} sm={12}>
                <Fade bottom cascade>
                  <div>
                    <h2 className={css.titleBanner}>Get the most fun <br /> weather app</h2>
                    <p className={css.paragraph}>Simple, nice and user-friendly application of the <br /> weather. Only useful information</p>
                  </div>
                </Fade>
                <Fade delay={800} bottom>
                  <div className={css.groupButton}>
                    <Button className={components.btnSecondary} color="secondary">Download</Button>
                    <Button className={components.btnPrimary} color="primary">Features</Button>
                  </div>
                </Fade>
              </Col>
              <Col md={6} sm={12}>
                <div className={css.contentElements}>
                  <Fade>
                    <div className={css.phone}>
                      <img src={Images.PHONE} />
                      <img className={css.afterPhone} src={Images.AFTERPHONE} />
                    </div>
                  </Fade>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
};

export default Header;

Header.propTypes = {};