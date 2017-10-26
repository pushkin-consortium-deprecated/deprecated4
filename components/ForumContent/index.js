import React from 'react';
import { Link } from 'react-router';

class ForumContent extends React.Component {
  showAllPosts = () => {
    return this.props.posts.map(post => {
      return (
        <Link to={`/forum/${post.id}`}>
          <h3>{post.post_subject}</h3>
        </Link>
      );
    });
  };
  render() {
    return <div>{this.showAllPosts()}</div>;
  }
}

export default ForumContent;
