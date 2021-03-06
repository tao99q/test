/**
 * Created by Yancy on 2017/9/25.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentInput from '../components/CommentInput';
import {addComment} from '../actions';
class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.any,
    onSubmit: PropTypes.func
  };

  constructor() {
    super();
    this.state = {username: ''};
  }

  componentWillMount() {
    this._loadUsername();
  }

  _loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({
        username
      });
    }
  }

  _saveUsername(username) {
    localStorage.setItem('username', username);
  }

  handleSubmit(comment) {

  }

  render() {
    return (
        <CommentInput username={this.state.username}
                      onUserNameInputBlur={this._saveUsername.bind(this)}
                      onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment));
    }
  }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps)
(CommentInputContainer);