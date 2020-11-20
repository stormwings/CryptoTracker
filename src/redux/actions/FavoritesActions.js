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
