import React from 'react';
import { browserHistory } from 'react-router';
import Modal from './model';

class QuizForum extends React.Component {
  constructor(props) {
    super(props);
    this.props.checkLogin();
    this.state = { isModalOpen: false, post: {} };
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  handlePostChange = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ ...this.state, post: { [field]: e.target.value } });
  };
  showLogInLink = () => {
    const { user, currentQuestion, isAuthenticated } = this.props;
    if (!isAuthenticated()) {
      if (currentQuestion.stimulus) {
        return (
          <h4 style={{ textAlign: 'center' }}>
            Please{' '}
            <a style={{ cursor: 'pointer' }} onClick={this.props.login}>
              Log In{' '}
            </a>
            to ask a question on the forum.
          </h4>
        );
      }
      return null;
    }
    return (
      <div>
        {currentQuestion.prompt && (
          <button onClick={() => this.openModal()}>Open modal</button>
        )}
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}
        >
          <form style={{ margin: 10 }}>
            <h3>Question id {currentQuestion.trial_index}</h3>
            <div id="question-prompt">...</div>
            <div className="form-group row">
              {currentQuestion.prompt && (
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Subject
                </label>
              )}
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="staticEmail"
                  style={{ width: '100%' }}
                  placeholder={
                    'I have a question about Listen Quiz question id ' +
                    currentQuestion.trial_index
                  }
                  onBlur={e => this.handlePostChange(e, 'subject')}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Your question
              </label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control-plaintext"
                  id="staticEmail"
                  style={{ width: '100%', minHeight: 200, outline: 'none' }}
                  placeholder="enter your question here..."
                  onBlur={e => {
                    this.handlePostChange(e, 'content');
                  }}
                />
              </div>
            </div>
          </form>
          <div style={{ marginLeft: 10, marginBottom: 10 }}>
            <button
              className="btn btn-primary"
              onClick={() => this.closeModal()}
            >
              Post
            </button>
          </div>
        </Modal>
      </div>
    );
  };
  render() {
    const { currentQuestion, user } = this.props;
    return <div>{this.showLogInLink()}</div>;
  }
}
export default QuizForum;
