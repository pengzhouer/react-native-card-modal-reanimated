import React from 'react';
import Animated from 'react-native-reanimated';
export declare type ModalNavigation = {
    params: any;
    setParams: (params: any) => void;
    close: () => void;
    gestureHandler: {
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    onModalDidFocus: (callback: () => void) => (() => void);
};
export declare type LastModalRef = {
    closeLast: () => void;
};
declare type Props = {
    name: string;
    title: string | ((params: any) => string);
    transition: Animated.Value<number>;
    index: number;
    component: any;
    isLast: boolean;
    closeRef: React.MutableRefObject<(name: string) => void>;
    forwardRef?: (ref: LastModalRef) => void;
    hideHeaderButton?: boolean;
    hideHeader?: boolean;
    ready: boolean;
};
declare function Modal(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Modal>;
export default _default;
