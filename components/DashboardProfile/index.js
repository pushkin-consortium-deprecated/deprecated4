import React from 'react';
import s from './styles.css';
import DashboardProfileView from '../DashboardProfileView/index';
import DashboardProfileEditView from '../DashboardProfileEditView/index';
import moment from 'moment';
import local from '../../actions/axiosConfigInitial';
import { Button } from 'react-bootstrap';

class DashboardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.messages = {
      emailValidation: 'Please enter a valid email address or leave empty',
      profileSaved: 'Profile saved!',
      enterNickname: 'Please edit your profile to set a nickname'
    };
    this.state = {
      disabled: false,
      edit: false,
      user_metadata: {
        imagePreviewUrl: this.props.profile.imagePreviewUrl || '',
        nickname: this.props.profile.nickname || '',
        userEmail: this.props.profile.userEmail || ''
      }
    };
  }
  auth0User = () => {
    const { profile, resetPassword } = this.props;
    if (profile.sub.includes('google') || profile.sub.includes('facebook')) {
      return null;
    }
    return (
      <a onClick={() => resetPassword(profile.email)}>Change your password</a>
    );
  };
  handleEdit = () => {
    this.setState({ edit: true });
  };
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  handleChangeUserMetaData = (field, e) => {
    switch (field) {
      case 'userEmail':
        if (this.validateEmail(e.target.value)) {
          this.setState({
            disabled: false,
            user_metadata: {
              ...this.state.user_metadata,
              userEmail: e.target.value
            }
          });
        } else {
          if (e.target.value) {
            this.setState({ disabled: true });
            swal(this.messages.emailValidation, null, 'error');
          } else {
            this.setState({ disabled: false });
          }
        }
      default:
        this.setState({
          user_metadata: {
            ...this.state.user_metadata,
            [field]: e.target.value
          }
        });
    }
  };
  _handleSubmit = e => {
    e.preventDefault();
    this.props.updateUser(this.state.user_metadata, this.props.profile.sub);
    this.props.updateLocalProfile(
      this.state.user_metadata.nickname,
      this.state.user_metadata.imagePreviewUrl,
      this.state.user_metadata.userEmail
    );
    this.setState({ edit: false }, () => {
      swal(this.messages.profileSaved, null, 'success');
    });
  };
  _handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        user_metadata: {
          ...this.state.user_metadata,
          imagePreviewUrl: reader.result
        }
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { profile } = this.props;
    return (
      <div className={s.profileWrapper}>
        {!this.state.edit && (
          <DashboardProfileView
            nickname={profile.nickname || this.messages.enterNickname}
            image={profile.imagePreviewUrl}
            setEditView={this.handleEdit}
            userEmail={profile.userEmail}
          />
        )}
        {this.state.edit && (
          <DashboardProfileEditView
            handleSubmit={this._handleSubmit}
            handleChangeUserMetaData={this.handleChangeUserMetaData}
            handleImageChange={this._handleImageChange}
            imagePreviewUrl={this.state.user_metadata.imagePreviewUrl}
            disabled={this.state.disabled}
            profile={this.state.user_metadata}
          />
        )}
        <div className={s.resetpassword}>{this.auth0User()}</div>
      </div>
    );
  }
}
export default DashboardProfile;
