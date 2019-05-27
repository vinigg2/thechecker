import css from './Header.scss';
import components from '../../styles/global.scss';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Images } from '../../utils/Images';
import ScrollableAnchor from 'react-scrollable-anchor';
import PropTypes from 'prop-types';

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

class Header extends Component {



  constructor(props) {
    super(props);

    this.state = {
      menu: this.props.menu,
      socials: this.props.socials,
      fixed: ""

    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    const scrollTop = event.target.documentElement.scrollTop;
    if (scrollTop > 300) {
      this.setState({ fixed: "top" });
    } else {
      this.setState({ fixed: "" });
    }

  }

  _renderMennu(array) {
    let items = [];

    for (let i = 0; i < array.length; i++) {
      const { label, link } = array[i];
      if (label.toLowerCase() === 'login') {
        items.push(
          <NavItem key={i}>
            <NavLink className={css.navLinkCustom} onClick={() => this.props.modalOpen(true)} href="javascript:void(0)">{label}</NavLink>
          </NavItem>
        );
      } else {
        items.push(
          <NavItem key={i}>
            <NavLink className={css.navLinkCustom} href={link}>{label}</NavLink>
          </NavItem>
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
        <NavItem key={i}>
          <NavLink className={css.navLinkCustomSocial} href={link}><FontAwesomeIcon icon={label} /></NavLink>
        </NavItem>
      )
    }

    return items;
  }

  render() {
    const { menu, socials, fixed } = this.state;
    return (
      <ScrollableAnchor id={'header'}>
        <div className={css.header}>
          <Navbar color="transparent" light expand="md" fixed={fixed} className={fixed ? css.fixedTopNavbar : ''}>
            <Container>
              <NavbarBrand href="/"><h1 className={css.logo}>Fun Weather.</h1></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className={css.headerNavbar} navbar>
                <Nav navbar>
                  {this._renderMennu(menu)}
                </Nav>
              </Collapse>
              <Collapse navbar className={css.headerNavbarSocial}>
                <Nav navbar>
                  {this._renderMennuSocial(socials)}
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
                      <a href="#features" className={components.btnPrimary} color="primary">Features</a>
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
      </ScrollableAnchor>
    );
  }
};

export default Header;

Header.propTypes = {};