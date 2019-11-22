const initialState = {
  width: 960,
  height: 600,
  colWidth: 300,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WIDTH_AND_HEIGHT_AND_COL_WIDTH':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        colWidth: action.payload.colWidth,
      };

    case 'SET_WIDTH_AND_HEIGHT':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };

    case 'SET_COL_WIDTH':
      return {
        ...state,
        colWidth: action.payload.colWidth,
      };

    default:
      return state;
  }
};

export default reducer;
