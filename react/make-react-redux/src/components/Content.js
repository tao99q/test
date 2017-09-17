import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './ThemeSwitch';

class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  };

  render() {
    return (
        <div>
          <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
          <ThemeSwitch/>
        </div>
    )
  }
}