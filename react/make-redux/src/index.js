function stateChanger(state, action) {
  if (!state) {
    return {
      title: {
        text: 'React 小书',
        color: 'red'
      },
      content: {
        text: 'React 小书内容',
        color: 'blue'
      }
    };
  }
  switch (action.type) {
    case 'UPDATE_TITLTE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLTE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state;
  }
}

function themeReducer(state, action) {
  if (!state) {
    return {
      themeName: 'Red Theme',
      themeColor: 'red'
    }
  }
  switch (action.type) {
    case 'UPDATE_THEME_NAME':
      return {...state, themeName: action.themeName};
    case 'UPDATE_THEME_COLOR':
      return {...state, themeColor: action.themeColor};
    default:
      return state;
  }
}

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  dispatch({});
  return {
    getState,
    dispatch,
    subscribe
  }
}

function rederApp(newAppState, oldAppState = {}) {

  if (newAppState === oldAppState) return;
  console.log('rederApp');
  rederTilte(newAppState.title, oldAppState.title);
  rederContent(newAppState.content, oldAppState.content);
}

function rederTilte(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  console.log('rederTilte');
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function rederContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  console.log('rederContent');
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

const store = createStore(stateChanger);
let oldState = store.getState();
store.subscribe(() => {
  const newState = store.getState();
  rederApp(newState, oldState);
  oldState = newState;
});
rederApp(store.getState());
// store.dispatch({type: 'UPDATE_TITLTE_TEXT', text: '《React 小书》'});
// store.dispatch({type: 'UPDATE_TITLTE_COLOR', color: 'blue'});
