import React from 'react';
import { browserHistory } from 'react-router';
import Modal from './model';
import { Field, reduxForm } from 'redux-form';
import SimpleForm from './form';
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
  handleOnSubmit = () => {
    console.log('submit');
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
          <div style={{ margin: 10 }}>
            <SimpleForm data={currentQuestion} />
          </div>
          <button onClick={this.closeModal}>Close</button>
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
