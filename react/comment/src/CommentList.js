import React, {Component} from 'react';
import Comment from './Comment';

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }

  render() {
    const comments = this.props.comments;
    return (
      <div className='comment-list'>
        {comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
      </div>
    )
  }
}

export default CommentList;