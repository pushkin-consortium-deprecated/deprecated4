/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import SkyLight from 'react-skylight';

export default class Algorithm extends React.Component {
  switchContent() {
    const styles = {
      overflow: 'auto',
      backgroundColor: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };
    const logo = require('../../../../../public/img/algorithms.png');
    return (
        <div className="col-xs-2" onClick={() => this.refs.simpleDialog.show()}>
          <div >
            <img src={logo} style={{ height: 80, width: 80 }} />
            <p>the algorithm</p>
          </div>
        <SkyLight dialogStyles={styles} hideOnOverlayClicked ref="simpleDialog" title="How it works">
          <p>The algorithm that guesses your native language and dialect works like this:
            We measure the Euclidean distance between your responses and the typical responses for each dialect. Whichever dialect you are closest to is likely your dialect.
            For example, below is a table showing the percentage of speakers of Dialects A and B who answer "grammatical" to each of four sentences. On the right, you can see some participants answers (1 = grammatical, 0 = ungrammatical).
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Sentence</th>
                <th>Dialect A</th>
                <th>Dialect B</th>
                <th>Participant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sent. 1</td>
                <td>0%</td>
                <td>100%</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Sent. 2</td>
                <td>100%</td>
                <td>0%</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Sent. 3</td>
                <td>50%</td>
                <td>50%</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Sent. 4</td>
                <td>80%</td>
                <td>20%</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
          <p>
            <a href="https://en.wikipedia.org/wiki/Euclidean_distance" target="_blank">Euclidean distance</a> may be familiar if you ever if you ever calculated distances in geometry. The major difference is that we have more than three dimensions to deal with. In our table above, it is four dimensions. In the actual quiz, it is about 80. But the basic procedure is the same.
          </p>
          <p>
          In our example, the distance between the participant and Dialect A is 0.5 whereas the distance between the participant and Dialect B is 1.7. The actual number is not especially meaningful -- the more questions in the survey, the larger the distances are going to be -- but what is meaningful is that our participant is closer to Dialect A and so is more likely to speak that dialect.
          </p>
          <p>
          To look at native language as well, we define non-native "dialects" based on the typical answers given by people whose native language is the same. That is, we find the typical answers for the "Spanish dialect", the "Russian dialect", and so on. If a participant is closest to a traditional dialect of English (like American or Canadian), the algorithm guesses that they are a native English speaker. However, if their answers are closest to one of the non-native dialects (like the Spanish dialect), it guesses that they are a Spanish-speaker.
          </p>
          <p>
          Of course, the algorithm can only make guesses about dialects for which it has a lot of information. So the algorithm cannot guess that someone&apos;s native language is (for example) Japanese until enough Japanese-speaking people have participated in the quiz. Only then does the algorithm have a good sense as to how Japanese-speaking people use English grammar.
          </p>
          <p>
          This algorithm is fairly simple. However, it is surprisingly accurate, particularly for dialects about which it has a lot of information. We are also testing out more sophisticated algorithms. Whenever we have interesting results to report, we will describe them on the findings page and/or our blog.
          </p>
        </SkyLight>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.switchContent()}
      </div>
    );
  }
}
