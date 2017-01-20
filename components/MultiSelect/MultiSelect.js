import React, { Component, PropTypes } from 'react';
import s from './style.css';

export default class MultiSelect extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
    };
  }
  getTokens = () => this.state.tokens
  render() {
    return (
      <div>
        {this.state.tokens.map(token => (
          <span
            className={s.token}
          >
            {token}
            <span
              className={s.closeButton}
              onClick={() => {
                const index = this.state.tokens.indexOf(token);
                this.setState({
                  tokens: [
                    ...this.state.tokens.slice(0, index),
                    ...this.state.tokens.slice(index + 1),
                  ],
                });
              }}
            >
              x
            </span>
          </span>
        ))}
        <select
          required
          onChange={(e) => this.setState({
            tokens: [
              ...this.state.tokens,
              e.target.value,
            ],
          })
          }
        >
          {this.props.options.filter(option => this.state.tokens.indexOf(option) < 0).map(option => <option value={option}>{option}</option>)}
        </select>
      </div>
    );
  }
}
