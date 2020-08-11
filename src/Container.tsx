import React, { useState, useMemo, useRef } from 'react';
import {View, StyleProp, ViewStyle, StyleSheet, StatusBar} from 'react-native';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {useSafeArea} from 'react-native-safe-area-context';

import Modal, {LastModalRef} from './Modal';
import {viewportHeight, concatOpenedAndPrepared} from './helper';
import {addOrSetParams, clearParams} from './paramsManager';

import styles, {_scale, _scaleBehind, _borderRadius, _top} from "./styles";

const {Value, interpolate, useCode, block, cond, neq, set, and, call, greaterOrEq, lessOrEq} = Animated;

export type ForwardRef = {
    openModal: (name: string, params?: any) => void;
    closeModal: (name?: string) => void;
    addPrepared: (name: string, params?: any) => void;
    clearPrepared: (name: string) => void;
}
export type ModalType = {
    name: string;
    title: string | ((params: any) => string);
    hideHeaderButton?: boolean;
    hideHeader?: boolean;
    component: any;
}
export type Props = {
    children: React.ReactNode;
    modals: Array<ModalType>;
    forwardRef?: (ref: ForwardRef) => void;
    toggleStatusBarStyle?: boolean;
}

function Container(props: Props){
    const {children, modals, forwardRef, toggleStatusBarStyle} = props;

    const [opened, setOpened] = useState<Array<string>>([]);
    const [prepared, setPrepared] = useState<Array<string>>([]);

    const insets = useSafeArea();

    // last modal ref
    const lastModalRef = useRef<LastModalRef | null>();
    const lastModalRefCreate = useMemo(() => (ref: LastModalRef) => {lastModalRef.current = ref}, []);
    
    // transition rely on modalsNum
    const transition: Animated.Value<number> = useMemo(() => new Value(0), []); 
    // main page scale
    const scale = useMemo(() => interpolate(transition, {
        inputRange: [0, 1, 2],
        outputRange: [1, _scale, _scaleBehind],
        extrapolateRight: Extrapolate.CLAMP, 
    }), []);
    // main page overlay opacity
    const opacity = useMemo(() => interpolate(transition, {
        inputRange: [0, 1, 2],
        outputRange: [0, 0.2, 0.4],
        extrapolateRight: Extrapolate.CLAMP,
    }), []);
    // main page borderadius
    const borderRadius = useMemo(() => interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, _borderRadius],
        extrapolate: Extrapolate.CLAMP,
    }), []);

    // status bar style
    useCode((): any => {
        if(toggleStatusBarStyle !== false){
            let _threshold = (viewportHeight - (insets.top * 0.5) * 2) / viewportHeight; // 调0.5这个参数决定threshold
            _threshold = _threshold < 1 ? _threshold : 0.98;
            const statusDark = new Value(1);
            return block([
                cond(
                    and(greaterOrEq(scale, _threshold), neq(statusDark, 1)), 
                    [set(statusDark, 1), call([], () => {
                        StatusBar.setBarStyle('dark-content', true);
                    })]
                ),
                cond(
                    and(lessOrEq(scale, _threshold - 0.005), neq(statusDark, 0)), 
                    [set(statusDark, 0), call([], () => {
                        StatusBar.setBarStyle('light-content', true);
                    })]
                ),
            ])
        }
    }, [insets, toggleStatusBarStyle]);

    // close modal, useRef can avoid unnessary rerender
    const closeModal = (name: string) => {
        if(opened[opened.length - 1] === name){
            setOpened(opened.filter(x => x !== name));
            if(prepared.indexOf(name) === -1){
                clearParams(name);
            }
        }
    }
    const closeRef = useRef(closeModal);
    closeRef.current = closeModal;

    if(forwardRef){
        forwardRef({
            openModal: (name: string, params?: any) => {
                if(modals.findIndex(x => x.name === name) === -1){
                    console.warn(`No modals called ${name}`);
                    return;
                }
                if(opened.indexOf(name) === -1){
                    if(params){
                        addOrSetParams(name, params);
                    }
                    setOpened([...opened, name]);
                }
            },
            closeModal: (name?: string) => {
                if(opened.length === 0){
                    console.warn('No modals opened');
                    return;
                }
                if(name && opened[opened.length - 1] !== name){
                    console.warn(`you should close the last modal first! Now modals stack: ${opened}`);
                    return;
                }
                if(lastModalRef.current){
                    lastModalRef.current.closeLast();
                }
            },
            addPrepared: (name: string, params?: any) => {
                if(modals.findIndex(x => x.name === name) === -1){
                    console.warn(`No modals called ${name}`);
                    return;
                }
                if(prepared.indexOf(name) === -1){
                    if(params){
                        addOrSetParams(name, params);
                    }
                    setPrepared([...prepared, name]);
                }
            },
            clearPrepared: (name: string) => {
                if(prepared.indexOf(name) !== -1){
                    setPrepared(prepared.filter(x => x !== name));
                    if(opened.indexOf(name) === -1){
                        clearParams(name);
                    }
                }
            }
        })
    }

    // console.log('-----------------------------');
    // console.log('opened: ' + opened);
    // console.log('prepared: ' + prepared);

    return (
        <View style={styles.container}>
            <Animated.View style={{flex: 1, overflow: 'hidden', borderRadius, transform: [{scale}] } as StyleProp<Animated.AnimateStyle<ViewStyle>>}>
                {children}
                <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, {backgroundColor: 'black', opacity}]}></Animated.View>
            </Animated.View>
            {concatOpenedAndPrepared(opened, prepared).map((x, i) => {
                const finded = modals.find(y => y.name === x.name);
                if(finded){
                    return (
                        <Modal 
                            key={finded.name} 
                            name={finded.name} 
                            index={i} 
                            title={finded.title} 
                            component={finded.component} 
                            transition={transition}
                            isLast={i === opened.length - 1}
                            closeRef={closeRef}
                            forwardRef={lastModalRefCreate}
                            hideHeaderButton={finded.hideHeaderButton}
                            hideHeader={finded.hideHeader}
                            ready={x.status === 'ready'}
                        />
                    )
                }
                return null;
            })}
        </View>
    )
}

export default Container