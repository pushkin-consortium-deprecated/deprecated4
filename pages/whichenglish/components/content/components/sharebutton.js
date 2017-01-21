/* eslint-disable max-len */

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
      <a 
        href="mailto:?subject=Mapping English grammar around the world.&body=I helped GamesWithWords.org train their algorithm to guess which English I speak (http://www.gameswithwords.org/WhichEnglish/). It guessed that I speak Singaporean and that my native language is Spanish. Which English do you speak?"
        title="share by Email"
      >
        <img src={logo} style={{ height: 30, width: 30 }} alt="" />
      </a>
    );
  }
  render() {
    const shareUrl = 'http://localhost/WhichEnglish';
    const title = 'WhichEnglish'
    return (
      <div>
        <h5>Share your results and help us map the Englishes of the world!</h5>
        <div className="share-buttons">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            style={{ display: 'inline-block', 'margin-right': 3 }}
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
          <GooglePlusShareButton
            url={shareUrl}
            style={{ display: 'inline-block', 'margin-right': 3 }}
          >
            <GooglePlusIcon
              size={32}
              round
            />
          </GooglePlusShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            style={{ display: 'inline-block', 'margin-right': 3 }}
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
          <div style={{ display: 'inline-block', 'margin-right': 3 }}>
            {this.showMailIcon()}
          </div>
        </div>
      </div>
    );
  }
}
