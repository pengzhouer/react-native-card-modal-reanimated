const paramsManager = [];
export const addOrSetParams = (name, params) => {
    const finded = paramsManager.find(x => x.name === name);
    if (finded) {
        finded.params = params;
    }
    else {
        paramsManager.push({ name, params });
    }
};
export const clearParams = (name) => {
    const index = paramsManager.findIndex(x => x.name === name);
    if (index !== -1) {
        paramsManager.splice(index, 1);
    }
};
export const getParams = (name, defaultParams) => {
    const finded = paramsManager.find(x => x.name === name);
    if (finded) {
        return finded.params;
    }
    else {
        return defaultParams;
    }
};
