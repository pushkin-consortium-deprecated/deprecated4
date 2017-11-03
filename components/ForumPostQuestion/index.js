import React from 'react';
import s from './styles.css';
import moment from 'moment';

class ForumPostQuestion extends React.Component {
  render() {
    const { quiz, subject, poster, content, created_at } = this.props;
    return (
      <div>
        <div className={s['question-container']}>
          {quiz && <div className={s['quiz-tag']}>{quiz}</div>}
          {!quiz && (
            <div className={s['quiz-tag']} style={{ background: 'tomato' }}>
              general
            </div>
          )}
          <div>
            <a className={s['question-title']}>{subject}</a>
          </div>
        </div>
        <div>
          <p>{content}</p>
        </div>
        <div className={s['question-details']}>
          <div>posted by: {poster || 'Anonymous'}</div>
          <div>created on: {moment(created_at).format('MM/DD/YYYY')}</div>
        </div>
      </div>
    );
  }
}

export default ForumPostQuestion;
