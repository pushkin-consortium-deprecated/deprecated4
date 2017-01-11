import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';

import { connect } from 'react-redux';

class Container extends Component {
  render() {
    return (
      <Layout>
        {this.props.children}
      </Layout>
    );
  }
}
export default connect(state => state)(Container)