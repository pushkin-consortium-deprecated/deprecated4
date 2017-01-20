import React, { Component } from 'react';
import { connect } from 'react-redux'
import ResultsList from '../../components/ResultsList/';
import CommentForm from '../../components/CommentForm/';
import { submitComments } from '../../actions/userresponses' 

class ResultsContainer extends Component {
  render(){
    return (
      <div>
      <ResultsList

      />
      <ResultsList

      />
      <CommentForm
        handleSubmit={(comments) => {
        this.props.dispatch(submitComments(comments));
       }}

      />
      </div>
    )

  }
}
export default connect(state => state)(ResultsContainer)
