import * as actionTypes from '../actionTypes';

// action creators
export const initComments = (comments) => {
  return { type: actionTypes.INIT_COMMENTS, comments }
};

export const addComment = (comment) => {
  return { type: actionTypes.ADD_COMMENT, comment }
};

export const deleteComment = (commentIndex) => {
  return { type: actionTypes.DELETE_COMMENT, commentIndex }
};