import {Dimensions, Platform} from "react-native";

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const viewportHeight = Dimensions.get('window').height;

export const concatOpenedAndPrepared = (opened: string[], prepared: string[]) => {
    const returned: {name: string, status: 'ready' | 'prepare'}[] = [];
    for(let i = 0; i < opened.length; i++){
        returned.push({
            name: opened[i],
            status: 'ready',
        })
    }
    for(let i = 0; i < prepared.length; i++){
        if(opened.indexOf(prepared[i]) === -1){
            returned.push({
                name: prepared[i],
                status: 'prepare',
            })
        }
    }
    return returned;
}
  