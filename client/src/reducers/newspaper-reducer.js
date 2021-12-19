const initialState = {
    newspaper: [],
}

const newspaperReducer = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_NEWSPAPER":
            return {
                ...state,
                newspaper: action.payload,
            }

        default:
            return state;
    }
}

export default newspaperReducer
