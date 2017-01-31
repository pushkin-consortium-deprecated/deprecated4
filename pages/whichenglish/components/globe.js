/* eslint-disable max-len */
import s from './survey.css';
import React, { PropTypes } from 'react';


export default class Globe extends React.Component {
  render() {
    return (
      <div className="col-xs-4">
        <img className={s.stockpicture} src={this.props.logo} alt="" />
      </div>
    );
  }
}
