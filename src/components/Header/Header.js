import css from './Header.scss';
import components from '../../styles/global.scss';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Images } from '../../utils/Images';
import ScrollableAnchor from 'react-scrollable-anchor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import * as sessionActions from '../../actions/sessionActions';
library.add(faUserCircle);

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
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { bindActionCreators } from 'redux';

class Header extends Component {



  constructor(props) {
    super(props);

    this.state = {
      menu: this.props.menu,
      socials: this.props.socials,
      dropdownOpen: false,
      isOpen: false,
      fixed: ""
    }

    this.toggle = this.toggle.bind(this);
    this.toggleMobile = this.toggleMobile.bind(this);
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
      items.push(
        <NavItem key={i}>
          <NavLink className={css.navLinkCustom} href={link}>{label}</NavLink>
        </NavItem>
      );
    }

    return items;
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


  toggleMobile() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  _renderMenuLogin() {
    const { me } = this.props;

    if (me.profile) {
      const firstName = me.profile.name.split(' ')[0];
      return (
        <li>
          <Dropdown className={css.userGroup} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className={css.buttonUser}>
              <div className={css.avatar}>{firstName[0]}</div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>edit profile</DropdownItem>
              <DropdownItem onClick={this.props.actions.logout}>logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      )
    } else {
      return (
        <NavItem>
          <NavLink className={css.navLinkCustomSocial} href="javascript:void(0)" onClick={() => this.props.modalOpen(true)}><FontAwesomeIcon icon={faUserCircle} /></NavLink>
        </NavItem>
      )
    }
  }

  render() {
    const { menu, fixed } = this.state;
    return (
      <ScrollableAnchor id={'header'}>
        <div className={css.header}>
          <Navbar color="transparent" light expand="md" fixed={fixed} className={fixed ? css.fixedTopNavbar : ''}>
            <Container className={css.containerCustom}>
              <NavbarBrand href="/"><h1 className={css.logo}>Fun Weather.</h1></NavbarBrand>
              <NavbarToggler onClick={this.toggleMobile} />
              <Collapse className={css.headerNavbar} navbar isOpen={this.state.isOpen}>
                <Nav navbar>
                  {this._renderMennu(menu)}
                </Nav>
              </Collapse>
              <div className={css.headerNavbarSocial}>
                <ul>
                  {this._renderMenuLogin()}
                </ul>
              </div>
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
                        <img src={Images.PHONE} className={css.phoneImage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);