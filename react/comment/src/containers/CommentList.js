import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';
import {deleteComment, initComments} from "../actions";

class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  };

  componentWillMount() {
    this._loadComments();
  }

  _loadComments() {
    let comments = localStorage.getItem('comments');
    comments = JSON.parse(comments) || [];
    this.props.initComments(comments);
  }

  handleDeleteComment(index) {
    const {comments} = this.props;
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
    localStorage.setItem('comments', newComments);
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render() {
    return (
        <CommentList comments={this.props.comments}
                     onDeleteComment={this.handleDeleteComment.bind(this)}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initComments: (comments) => {
      dispatch(initComments(comments));
    },
    onDeleteComment: (index) => {
      dispatch(deleteComment(index));
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
