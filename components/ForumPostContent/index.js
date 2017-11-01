import React from 'react';
import { connect } from 'react-redux';

import { getOnePost, makeComment } from '../../actions/forum';
import { getUserInfo, isAuthenticated } from '../../actions/userinfo';
import PostReplyForm from '../ForumPostReply';
import ForumPostQuestion from '../ForumPostQuestion';
import ForumPostComments from '../ForumPostComments';
import Loading from '../Loading';
import s from './styles.css';

class ForumQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentWillMount() {
    this.props.dispatch(getUserInfo());
  }
  componentDidMount() {
    getOnePost(this.props.params.id).then(res => {
      this.setState({ data: res });
    });
  }
  handleLocalComment = comment => {
    this.setState({
      data: {
        ...this.state.data,
        forumComments: [...this.state.data.forumComments, comment]
      }
    });
  };
  createComment = (data, cb) => {
    this.props.dispatch(makeComment(data, cb));
  };
  render() {
    const { userInfo, formData, comment } = this.props;
    return (
      <div>
        {!this.state.data && <Loading />}
        {this.state.data && (
          <div>
            <ForumPostQuestion
              subject={this.state.data.post_subject}
              content={this.state.data.post_content}
              poster={this.state.data.nickname}
              created_at={this.state.data.created_at}
            />
            <svg height="2" width="100%">
              <line
                x1="100%"
                x2="0%"
                style={{ stroke: '#cfd8dc', strokeWidth: 2 }}
              />
            </svg>
            <ForumPostComments comments={this.state.data.forumComments} />
            {isAuthenticated() && (
              <PostReplyForm
                handleSubmit={this.createComment}
                user={userInfo.profile}
                formData={formData}
                post_id={this.props.params.id}
                handleLocalComment={this.handleLocalComment}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    formData: state.form
  };
};
export default connect(mapStateToProps)(ForumQuestion);
