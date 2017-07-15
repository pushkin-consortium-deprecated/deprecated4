import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './styles.css';

class MobileNotSupported extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  };

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  constructor(props) {
    super();
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    const margin = (document.documentElement.clientHeight - document.getElementById('header').scrollHeight - document.getElementById('footer').scrollHeight - 15 - this.refs.message.scrollHeight) / 2;
    if (margin > 0) {
      this.refs.message.style.marginTop = `${margin}px`;
    }
    else {
      this.refs.message.style.marginTop = '0px';
    }
  }

  componentDidMount() {
    this.onResize = this.onResize.bind(this);
  }

  render() {

    return (
      <div>
        <div>
          <Row>
            <Col xs={12}>
              <div className={s.center} ref="message">
                <Image style={{display: 'none'}} src={require('../../img/favicon.ico')}  onLoad={this.onResize} />
                <p className={s.title}>
                  We're sorry, but the page you requested isn't supported on mobile devices yet. We're working hard to update this, so please check back soon!
                </p>
                <br />
                <p className={s.title}>
                  You can either <a href="/" onClick={this.goBack}>go back</a>, or select an option from the menu above.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default MobileNotSupported;
