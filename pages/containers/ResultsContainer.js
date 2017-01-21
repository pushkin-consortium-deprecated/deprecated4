import React, { Component } from 'react';
import { connect } from 'react-redux'
import ResultsList from '../../components/ResultsList/';
import CommentForm from '../../components/CommentForm/';
import { submitComments } from '../../actions/userinfo' 

class ResultsContainer extends Component {
  render(){
    return (
      <div>
        <ResultsList
          results={this.props.userInfo.results}

        />
        <CommentForm
          handleSubmit={(comments) => {
            this.props.dispatch(submitComments(comments));
          }}
          userInfo={this.props.userInfo}
        />
      </div>
    )

  }
}
export default connect(state => state)(ResultsContainer)
