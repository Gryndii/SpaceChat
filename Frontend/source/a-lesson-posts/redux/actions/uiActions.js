import { types } from '../types';

export const startFetching = () => {
    return {
        type: types.START_FETCHING,
    };
};

export const stopFetching = () => {
    return {
        type: types.STOP_FETCHING,
    };
};
