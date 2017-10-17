import React from 'react';

class ForumContent extends React.Component {
  showAllPosts = () => {
    return this.props.posts.map(post => {
      return (
        <div>
          <h3>{post.post_subject}</h3>
          <div>{post.post_content}</div>
        </div>
      );
    });
  };
  render() {
    return <div>{this.showAllPosts()}</div>;
  }
}

export default ForumContent;
