import React, {Component} from 'react';
import CommentInputContainer from './CommentInputContainer';
import CommentList from '../components/CommentList';
class CommentApp extends Component {
  render() {
    return (
        <div className="wrapper">
          <CommentInputContainer/>
          <CommentList/>
        </div>
    )
  }
}
export default CommentApp;