/**
 * Created by Yancy on 2017/9/7.
 */
import React, {Component} from 'react'
class Comment extends Component {
    render() {
        return (
            <div key={this.props.i}>
                <div className='comment'>
                    <div className='comment-user'>
                        <span>{this.props.comment.username} </span>：
                    </div>
                    <p>{this.props.comment.content}</p>
                </div>
            </div>
        )
    }
}
export default Comment