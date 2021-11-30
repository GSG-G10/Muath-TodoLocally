const initialState = { data: [], taskDone: [] };

const todosReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case "NEW_CARD":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case "DELETE_CARD":
      return {
        ...state,
        data: state.data.filter((elm) => elm.id !== action.id),
      };

    default:
      return state;
  }
};

export default todosReducer;
