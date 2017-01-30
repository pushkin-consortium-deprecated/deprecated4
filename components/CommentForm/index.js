import React, { Component } from 'react';
import LANGUAGES from './LANGUAGES';
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
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
  }
  handleSubmit = (e) => {
    this.setState({page: 2 });
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
  submitPart2 = (e) => {
    e.preventDefault();
    const payload = {
      householdEnglish: this.householdEnglish.value,
      englishYears: this.englishYears.value,
    };
    this.props.submitPart2(payload);
  }

  render() {
    console.log("this .props in comment form", this.props)
    switch(this.state.page) {
      case 1:
    return (
      <div className={s.commentForm}>
      {this.props.userInfo.isFetching && 
        <h4>Loading...</h4>
        
      }
      {!this.props.userInfo.isFetching && 
        <div>
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
      }
    </div>
    );
    case 2:
      return  (
        <div>
          <form
            onSubmit={this.submitPart2}
          >
            <div className="row">
              <div className="col-xs-12">
                <h3>How did we do? train our algorithm by answering a few questions</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <label htmlFor="yearsLived">
                  Total years lived in an English-speaking country
                  <select
                    ref={(ref) => this.englishYears = ref}
                    required
                  >
                  {OPTIONS.map(option => <option value={option.value}>{option.value}</option>)}
                  </select>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
              <label htmlFor="householdEnglish">
                Does anyone in your home (spouse, child, etc?) speak mostly English?
                <select 
                  type="text" 
                  className="form-control"
                  ref={(ref) => this.householdEnglish = ref}
                  name="householdEnglish"
                >
                {[{ label: 'yes', value: true,}, { label: 'no', value: false }].map(option => <option value={option.value}>{option.label}</option>)}

                </select>

              </label>
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
}

