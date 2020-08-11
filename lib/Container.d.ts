import React from 'react';
export declare type ForwardRef = {
    openModal: (name: string, params?: any) => void;
    closeModal: (name?: string) => void;
    addPrepared: (name: string, params?: any) => void;
    clearPrepared: (name: string) => void;
};
export declare type ModalType = {
    name: string;
    title: string | ((params: any) => string);
    hideHeaderButton?: boolean;
    hideHeader?: boolean;
    component: any;
};
export declare type Props = {
    children: React.ReactNode;
    modals: Array<ModalType>;
    forwardRef?: (ref: ForwardRef) => void;
    toggleStatusBarStyle?: boolean;
};
declare function Container(props: Props): JSX.Element;
export default Container;
