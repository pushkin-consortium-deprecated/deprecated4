/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
    };
    this.handleStart = this.handleStart.bind(this);
  }
  handleStart() {
    this.setState({ next: true });
  }
  handleTextChange() {
    if (this.state.next) {
      return (
        <div>
          <p>
            This experiment is being conducted by researchers at Massachusetts Institute of Technology. Please read this consent statement carefully before deciding whether to participate.
            About the research: This experiment examines people's knowledge of English grammar. We are interested in how this is affected by demographic variables such as where you live, your age, and the age at which you began learning English.
            Risks and Benefits: This research has no known risks. We will explain the purpose of the experiment at the end of the experiment, along with any potential implications of the research. To receive copies of journal articles or research summaries, email gameswithwords@gmail.com.
            Confidentiality: Study participation is anonymous and confidential. We do not ask or store your identity.
            Participation and Withdrawal: Your participation in this study is completely voluntary, and you may quit at any time without penalty.
            Contact: Click here to contact us with questions about this research.
            Review: This study has been approved by the Massachusetts Institute of Technology institutional review board.
            Agreement: By clicking "Start Quiz," I indicate that this research has been sufficiently explained and I agree to participate in this study.
          </p>
          <button style={{ 'marginTop': 30, width: 180 }} className="btn btn-success">Start Quiz</button>
        </div>
      );
    }
    return (
      <div>
        <p>
          Is Throw me down the stairs my shoes a good English sentence?
          The answer depends on where you live. Many people in Newfoundland find that sentence perfectly grammatical.
          By taking this quiz, you will be helping train a machine algorithm that is mapping out the differences in English grammar around the world, both in traditionally English-speaking countries and also in countries like Mexico, China, and India.
          At the end, you can see our algorithm's best guess as to which English you speak as well as whether your first (native) language is English or something else.
        </p>
        <button onClick={this.handleStart} style={{ 'marginTop': 30, width: 180 }} className="btn btn-success">Next</button>
      </div>
    );
  }
  render() {
    const logo = require('../../../public/img/globe.jpg')
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <h5 style={{ 'marginTop': 20 }}>Which English?</h5>
            {this.handleTextChange()}
          </div>
          <div className="col-xs-4">
            <img src={logo} alt="" />
            <p>Which of the world&aposs Englishes do you speak? Take this quiz, and our computer algorithm will try to guess. 10 minutes</p>
          </div>
        </div>
      </div>
    );
  }
}
export default(connect(state => state))(StartPage)