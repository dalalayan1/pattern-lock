export default function mainComponentReducers(state={
        patternArray: []
    },action){
    switch (action.type) {
        case 'SAVE_PATTERN':{
                let newState = Object.assign({},state, {
                    patternArray: action.payload
                });
                return newState;
            }
        default: return state;
    }
}