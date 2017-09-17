import * as actionTypes from '../actionTypes';

export default function (state, action) {
  if (!state) {
    state = {comments: []};
  }
  switch (action.type) {
    case actionTypes.INIT_COMMENTS:
      return {comments: action.comments};
    case actionTypes.ADD_COMMENT:
      return {
        comments: [...state.comments, acton.comment]
      };
    case actionTypes.DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      };
    default:
      return state;
  }
}
