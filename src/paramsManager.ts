
const paramsManager: {name: string, params: any}[] = [];

export const addOrSetParams = (name: string, params: any) => {
    const finded = paramsManager.find(x => x.name === name);
    if(finded){
        finded.params = params;
    }else{
        paramsManager.push({name, params});
    }
}

export const clearParams = (name: string) => {
    const index = paramsManager.findIndex(x => x.name === name);
    if(index !== -1){
        paramsManager.splice(index, 1);
    }
}

export const getParams = (name: string, defaultParams?: any) => {
    const finded = paramsManager.find(x => x.name === name);
    if(finded){
        return finded.params;
    }else{
        return defaultParams;
    }
}