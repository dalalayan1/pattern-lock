import SAVE_PATTERN from '../constants';

export default function savePattern(patternArray){
    return {
                type:'SAVE_PATTERN',
                payload: patternArray
        }
}