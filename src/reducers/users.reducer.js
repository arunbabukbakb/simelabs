import { constants } from '../constants';

const initialState = {
    user: {},
    loading: false,
};

export function user(state = initialState, action) {
    switch (action.type) {
        case constants.LOADING_MAIN:
            return {
                ...state,
                loading: action.value
            };
        default: return state
    }
}