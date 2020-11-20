import { useDispatch, useSelector } from 'react-redux';
import { urlFavorites } from '../urls';
import Http from './../../libs/http';
import * as types from './../types';

export const fetchFavorites = () => (dispatch) => {
  dispatch({ type: types.FETCH_FAVORITES_PENDING });

  Http.instance
    .get(urlFavorites)
    .then(({ data }) => {
      dispatch({
        type: types.FETCH_FAVORITES_FULLFILLED,
        payload: { favorites: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_FAVORITES_REJECTED,
        payload: { error },
      });
    });
};

export const useFavoritesReducer = () => {
  const { favoritesReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addFavorite = (favorite) => {
    dispatch({
      type: types.SET_FAVORITE,
      payload: { favorite },
    });
  };

  const removeFavorite = (favoriteId) => {
    dispatch({
      type: types.DELETE_FAVORITE,
      payload: { favoriteId },
    });
  };

  const favoritesActions = {
    addFavorite,
    removeFavorite,
  };

  return [favoritesReducer, favoritesActions];
};
