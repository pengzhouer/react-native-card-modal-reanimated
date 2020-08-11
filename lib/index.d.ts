import React from 'react';
import { ModalType } from './Container';
import { ModalNavigation as _ModalNavigation } from './Modal';
declare const createSlideModal: (modals: Array<ModalType>) => (props: {
    children: React.ReactNode;
    toggleStatusBarStyle?: boolean;
}) => JSX.Element;
export declare const MODAL_PADDDING_BOTTOM: number;
export declare const openModal: (name: string, params?: any) => void | undefined;
export declare const closeModal: (name?: string | undefined) => void | undefined;
export declare const addPrepared: (name: string, params?: any) => void | undefined;
export declare const clearPrepared: (name: string) => void | undefined;
export declare type ModalNavigation = _ModalNavigation;
export default createSlideModal;
/**
 * PanModal should be rendered only once in whole app
 * 在 panmodal中  打开modal的动画过程中最好不要有组建的重新渲染，因为borderRadius的原生渲染优先级会比react组建渲染 低，如果动画过程中有组建的更新会导致borderRadius丢帧
 * modal中可以根据传入的opened参数，来决定是否开始提交大渲染，避免出现上面的情况，可以利用opend from false to ture这一过程来提前计算渲染数据，等到opened=true时再提交更新
 * 也可以先prepare modal 这样打开modal时就只更改display属性 可以很快地再原生端渲染完成。
 */ 
