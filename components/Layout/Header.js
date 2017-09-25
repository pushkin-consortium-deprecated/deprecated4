import React from 'react';
import * as b from 'react-bootstrap';
import s from './Header.css';
import l from './Layout.css';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {

  constructor(){
    super();
    this.state = { mobile: false };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  home() {
    if ((window.location.pathname.toString()).split('/')[1] === '') {
      return true;
    }
    else {
      return false;
    }
  }

  updateDimensions() {
    if (window.innerWidth < 768) {
      this.setState({mobile: true});
    }
    else {
      this.setState({mobile: false});
    }
  }

  render() {
    if (this.home()) {
      return (
        <header id="header">
          <Link to="/paths">
            <div
              className={s.landing}
              style={{
                backgroundImage: `url(${require('../../img/logo_button-min.png')})`
              }}
            />
          </Link>
        <b.Image style={{display: 'none'}} src={require('../../img/favicon.ico')}  />
        </header>
      );
    } else if (this.state.mobile && !this.home()) {
      return (
        <header className={s.header} id="header" ref={node => (this.root = node)} >
          <b.Image src={require('../../img/gww_logo.png')} className={s.logo} style={{marginTop: '5px', height: '90px'}}/>
          <div className={s.navWrapper}>
            <b.Nav bsStyle="pills">
              <b.NavDropdown active title="Menu" style={{padding: '3px', marginTop: '2px'}} id="bg-nested-dropdown">
              </b.NavDropdown>
            </b.Nav>
          </div>
        </header>
      );
    }
    else {
      return (
        <header className={s.header} id="header" ref={node => (this.root = node)}>
          {this.home() ? <b.Image src={require('../../img/logo_square-min.png')}  responsive /> : <b.Image src={require('../../img/gww_logo.png')} className={s.logo} />}
          <b.Nav style={{margin: '0px', fontFamily: '\'Ribeye Marrow\', cursive', fontSize: '20px', backgroundColor: '#a9a9a9'}} bsStyle="tabs" justified>
              <LinkContainer to="/paths">
          </b.Nav>
        </header>
      );
    };
  }
}

export default Header;
