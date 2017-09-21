/**
 * Created by Yancy on 2017/9/7.
 */
import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

class CommentApp extends Component {
    constructor(){
        super();
        this.state = {
            comments:[]
        }
    }
    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        let comments = this.state.comments;
        comments.push(comment);
        this.setState({
            comments
        })
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList comments={this.state.comments}/>
            </div>
        )
    }
}

export default CommentApp;