export declare const IS_IOS: boolean;
export declare const IS_ANDROID: boolean;
export declare const viewportHeight: number;
export declare const concatOpenedAndPrepared: (opened: string[], prepared: string[]) => {
    name: string;
    status: 'ready' | 'prepare';
}[];
