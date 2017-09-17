import React,{Component} from 'react';
class Comment extends Component{
    render(){
        const {username,content} = this.props.comment;
        return (
            <div className='comment'>
                <div className='comment-user'>
                  <span>{username}:</span>
                </div>
              <p>
                {content}
              </p>
            </div>
        )
    }
}
export default Comment;