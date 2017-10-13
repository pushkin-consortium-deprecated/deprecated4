import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './styles.css';
const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting, data, close } = props;
  return (
    <form onSubmit={handleSubmit} className={s['post-form']}>
      <div>
        <label>Post a question about Q{data.trial_index}</label>
      </div>
      <div>
        <label>Subject</label>
        <div>
          <Field
            name="subject"
            component="input"
            type="text"
            placeholder="enter a subject"
          />
        </div>
      </div>
      <div>
        <label>Content</label>
        <div>
          <Field name="content" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Close
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(SimpleForm);
