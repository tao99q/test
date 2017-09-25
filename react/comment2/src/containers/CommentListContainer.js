/**
 * Created by Yancy on 2017/9/25.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initComments,deleteComment} from '../actions';
import CommentList  from '../components/CommentList';
class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.any,
    onSubmit: PropTypes.func
  };
  render() {
    return (
        <CommentList />
    )
  }
}
export default CommentListContainer;