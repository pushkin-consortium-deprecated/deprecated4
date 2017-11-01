import React from 'react';
import moment from 'moment';
class ForumPostComments extends React.Component {
  showComments(comments) {
    return comments.map((comment, index) => {
      return (
        <div>
          <div>{comment.responses}</div>
          <div>Answer from {comment.nickname}</div>
          <div>
            Answered on{' '}
            {comment.created_at &&
              moment(comment.created_at).format('MM/DD/YYYY')}
          </div>
          <svg height="2" width="100%">
            <line
              x1="100%"
              x2="0%"
              style={{ stroke: '#cfd8dc', strokeWidth: 2 }}
            />
          </svg>
        </div>
      );
    });
  }
  render() {
    const { comments } = this.props;
    return <div style={{ width: '80%' }}>{this.showComments(comments)}</div>;
  }
}

export default ForumPostComments;
