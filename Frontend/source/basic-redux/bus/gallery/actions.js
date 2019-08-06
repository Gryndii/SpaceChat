//Types
import { SHOW_NEXT_PHOTO, SHOW_PREVIOUS_PHOTO, SHOW_INDEX_PHOTO } from './types';

export const showNextPhoto = () => {
  return {
    type: SHOW_NEXT_PHOTO,
  };
};

export const showPreviousPhoto = () => {
  return {
    type: SHOW_PREVIOUS_PHOTO,
  };
};

export const showIndexPhoto = (index) => {
  return {
    type: SHOW_INDEX_PHOTO,
    payload: index,
  };
};