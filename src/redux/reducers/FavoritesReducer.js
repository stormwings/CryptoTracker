import * as types from '../types';

const INITIAL_STATE = {
  loading: false,
  error: null,
  favorites: [],
};

const handleReceivedFavorites = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    favorites: [...action.payload.favorites],
  };
};

const handleErrorOnFetch = (state, action) => {
  return {
    ...state,
    loading: false,
    favorites: [],
    error: action.payload.error,
  };
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_FAVORITES: {
      return { ...state };
    }
    case types.FETCH_FAVORITES_PENDING: {
      return { ...state, loading: true };
    }
    case types.FETCH_FAVORITES_FULLFILLED: {
      return handleReceivedFavorites(state, action);
    }
    case types.FETCH_FAVORITES_REJECTED: {
      return handleErrorOnFetch(state, action);
    }
    default:
      return state;
  }
}
