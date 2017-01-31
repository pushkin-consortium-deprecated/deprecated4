/* eslint-disable max-len */
import s from '../../survey.css';
import React, { PropTypes } from 'react';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const GooglePlusIcon = generateShareIcon('google');
const TwitterIcon = generateShareIcon('twitter');

export default class ShareButton extends React.Component {
  showMailIcon() {
    const logo = require('../../../../../public/img/mail.png')
    return (
      <div>
        <a 
          href="mailto:?subject=Mapping English grammar around the world.&body=I helped GamesWithWords.org train their algorithm to guess which English I speak (http://www.gameswithwords.org/WhichEnglish/). It guessed that I speak Singaporean and that my native language is Spanish. Which English do you speak?"
          title="share by Email"
        >
          <img src={logo} style={{ height: 50, width: 50 }} alt="" />
        </a>
      </div>
    );
  }
  render() {
    const shareUrl = 'http://localhost/WhichEnglish';
    const title = 'WhichEnglish'
    return (
      <div style={{ marginBottom: 40 }}>
        <div>
          <h5>Share your results and help us map the Englishes of the world!</h5>
        </div>
        <div className="row">
            <FacebookShareButton
              url={shareUrl}
              title={title}
              className={s.sharebutton}
            >
              <FacebookIcon
                size={50}
                round
              />
            </FacebookShareButton>
            <GooglePlusShareButton
              url={shareUrl}
              className={s.sharebutton}
            >
              <GooglePlusIcon
                size={50}
                round
              />
            </GooglePlusShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className={s.sharebutton}
            >
              <TwitterIcon
                size={50}
                round
              />
            </TwitterShareButton>
            {this.showMailIcon()}
        </div>
      </div>
    );
  }
}
