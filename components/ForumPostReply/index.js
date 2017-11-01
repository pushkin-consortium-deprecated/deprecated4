import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './styles.css';
import { Button } from 'react-bootstrap';

const PostReplyForm = props => {
  const {
    handleSubmit,
    user,
    data,
    formData,
    post_id,
    reset,
    handleLocalComment
  } = props;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(
          {
            auth0_id: user.auth0_id,
            responses: formData.postReply.values.post_reply,
            created_at: new Date(),
            post_id: post_id
          },
          handleLocalComment
        );
        reset();
      }}
    >
      <div>
        <div>
          <Field
            className={s['reply-textarea']}
            name="post_reply"
            component="textarea"
          />
        </div>
      </div>
      <div>
        <Button className="btn btn-success" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'postReply'
})(PostReplyForm);
