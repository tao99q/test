import React, {Component} from 'react';

class CommentInput extends Component{
  render(){
    return(
        <div className="comment-input">
          <div className="comment-field">
            <span className="comment-field-name">用户名:</span>
            <input type="text" id="username" className="comment-field-input"/>
          </div>
          <div className="comment-field">
            <span>评论内容:</span>
            <textarea/>
          </div>
          <div className="comment-field-button">
            <button>发布</button>
          </div>
        </div>
    )
  }
}
export default CommentInput;
