/**
 * Created by Yancy on 2017/9/25.
 */
import * as actionTypes from '../actionTypes';

export function initComments(comments) {
  return {type:actionTypes.INIT_COMMENTS,comments}
}
export function addComment(comment) {
  return {type:actionTypes.ADD_COMMENT,comment}
}
export function deleteComment(commentIndex) {
  return {type:actionTypes.DELETE_COMMENT,commentIndex}
}