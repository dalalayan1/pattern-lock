export default function savePattern(patternArray){
    return function(dispatch){
            dispatch({
                type:'SAVE_PATTERN',
                payload: patternArray
            });
        }
}