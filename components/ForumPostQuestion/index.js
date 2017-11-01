import React from 'react';
import s from './styles.css';
import moment from 'moment';

class ForumPostQuestion extends React.Component {
  render() {
    const { subject, poster, content, created_at } = this.props;
    return (
      <div>
        <div>
          <a className={s['question-title']}>{subject}</a>
        </div>
        <svg height="2" width="100%">
          <line
            x1="100%"
            x2="0%"
            style={{ stroke: '#cfd8dc', strokeWidth: 2 }}
          />
        </svg>
        <div>
          <p>{content}</p>
        </div>
        <div>
          <div>posted by: {poster}</div>
          <div>created on: {moment(created_at).format('MM/DD/YYYY')}</div>
        </div>
      </div>
    );
  }
}

export default ForumPostQuestion;
