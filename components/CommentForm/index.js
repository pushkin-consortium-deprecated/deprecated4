import React, { Component } from 'react';
import LANGUAGES from './LANGUAGES';
import { Tokenizer } from 'react-typeahead';
import s from './styles.css';
import MultiSelect from '../MultiSelect/MultiSelect';


const OPTIONS = [
  { label: 'From Birth', value: 0 },
];
for (let i = 1; i <= 100; i++) {
  OPTIONS.push({
    label: i,
    value: i,
  });
}

export default class CommentForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      primaryLanguages: this.refs.primaryLanguages.getTokens(),
      nativeLanguages: this.refs.nativeLanguages.getTokens(),
      learnEnglishAge: this.learnAge.value,
    };
    this.props.handleSubmit(payload);
  }
  buttonDisabled = () => {
    return false;
  }

  render() {
    return (
      <div className={s.commentForm}>
      <div className="row">
        <div className="col-xs-12">
        <h2>How Did we Do</h2>
        </div>
      </div>
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="col-xs-12">
          <label
            htmlFor="learn_age"
          >
            When did you start learning english?
            <select
              ref={(ref) => this.learnAge = ref}
              required
            >
            {OPTIONS.map(option => <option value={option.value}>{option.label}</option>)}
            </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
              <label>List all <strong>native</strong> language(s) <em>learned from birth</em></label>
              <MultiSelect
                options={LANGUAGES}
                ref="nativeLanguages"
              />
          </div>
          <div className="col-xs-12 col-sm-6">
              <label>List all <strong>primary</strong> language(s) <em>learned from birth</em></label>
              <MultiSelect
                options={LANGUAGES}
                ref="primaryLanguages"
              />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              style={{ width: 100, margin: '0 auto', display: 'block' }}
              className="btn btn-success"
              disabled={this.buttonDisabled()}
              type="submit"
            >
              Next
            </button>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

