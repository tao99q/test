function reducers(reduces) {
  return function reducer(state, action) {
    var newState = {};
    for (var key in reduces) {
      newState[key] = reduces[key](state[key], action);
    }
    return newState;
  }
}