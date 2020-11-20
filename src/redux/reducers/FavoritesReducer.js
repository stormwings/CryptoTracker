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

const handleAddFavorite = (state, action) => {
  const { favorite } = action.payload;

  return {
    ...state,
    favorites: [...state.favorites, favorite],
  };
};

const handleRemoveFavorite = (state, action) => {
  const { favoriteId } = action.payload;

  const removeById = ({ id }) => id !== favoriteId;

  const favorites = state.favorites.filter(removeById);

  return {
    ...state,
    favorites: [...favorites],
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
    case types.SET_FAVORITE: {
      return handleAddFavorite(state, action);
    }
    case types.DELETE_FAVORITE: {
      return handleRemoveFavorite(state, action);
    }
    default:
      return state;
  }
}
