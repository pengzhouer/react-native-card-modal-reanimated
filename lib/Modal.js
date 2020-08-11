import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import Animated, { Extrapolate, spring } from 'react-native-reanimated';
import { PanGestureHandler, TouchableOpacity, State } from 'react-native-gesture-handler';
import { onGestureEvent, snapPoint } from 'react-native-redash';
import { viewportHeight, IS_ANDROID } from './helper';
import { getParams } from './paramsManager';
import styles, { _top, _scale, _scaleBehind } from './styles';
const { lessOrEq, lessThan, greaterOrEq, neq, interpolate, Value, useCode, cond, set, eq, block, and, not, call, add, Clock, clockRunning, startClock, stopClock } = Animated;
function Modal(props) {
    const { ready, title, transition, index, component: Component, name, isLast, closeRef, forwardRef, hideHeaderButton, hideHeader } = props;
    // modal params
    const [params, setParams] = useState(getParams(name));
    // first open
    const firstOpen = useMemo(() => new Value(1), [ready]);
    // did focus animated value
    const didFocusV = useMemo(() => new Value(0), []);
    // did focus callback ref
    const didFocusCallbackRef = useRef();
    // on closing the modal
    const onClosing = useMemo(() => new Value(0), []);
    // gesture relevant
    const translationY = useMemo(() => new Value(0), []);
    const velocityY = useMemo(() => new Value(0), []);
    const state = useMemo(() => new Value(State.UNDETERMINED), []);
    const gestureHandler = useMemo(() => onGestureEvent({ state, translationY, velocityY }), []);
    // spring state
    const springState = useMemo(() => ({
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(viewportHeight),
        time: new Value(0),
    }), []);
    // modal translate y
    const translateY = useMemo(() => new Value(viewportHeight), []);
    const scale = useMemo(() => interpolate(transition, {
        inputRange: [index + 1, index + 2, index + 3],
        outputRange: [1, _scale, _scaleBehind],
        extrapolate: Extrapolate.CLAMP,
    }), [index]);
    const opacity = useMemo(() => interpolate(transition, {
        inputRange: [index + 1, index + 2, index + 3],
        outputRange: [0, 0.2, 0.4],
        extrapolate: Extrapolate.CLAMP,
    }), [index]);
    if (forwardRef && isLast) {
        forwardRef({
            closeLast: () => onClosing.setValue(1)
        });
    }
    // modals component params
    const modalNavigation = useMemo(() => ({
        params,
        setParams,
        close: () => {
            if (isLast) {
                onClosing.setValue(1);
            }
            else {
                console.warn(`you should close the last modal first!`);
            }
        },
        gestureHandler,
        onModalDidFocus: (callback) => {
            didFocusCallbackRef.current = callback;
            return () => {
                didFocusCallbackRef.current = null;
            };
        }
    }), [name, isLast, params, gestureHandler]);
    useCode(() => {
        if (isLast && ready) {
            const openClock = new Clock();
            const closeClock = new Clock();
            const snapClock = new Clock();
            const shouldToSnap = new Value(0);
            const canClose = new Value(0);
            const snapPointV = new Value(0);
            const springConfig = {
                toValue: new Value(_top),
                damping: new Value(200),
                mass: 1,
                stiffness: new Value(400),
                overshootClamping: false,
                restSpeedThreshold: 0.01,
                restDisplacementThreshold: 0.01,
            };
            return block([
                cond(and(firstOpen, neq(state, State.ACTIVE)), [
                    cond(not(clockRunning(openClock)), [
                        set(springState.position, translateY),
                        set(springState.time, 0),
                        set(springState.finished, 0),
                        set(springConfig.damping, 200),
                        set(springConfig.stiffness, 400),
                        startClock(openClock),
                    ]),
                    spring(openClock, springState, springConfig),
                    set(translateY, springState.position),
                    cond(springState.finished, [
                        stopClock(openClock),
                        set(firstOpen, 0),
                    ]),
                ]),
                cond(and(onClosing, neq(state, State.ACTIVE)), [
                    cond(clockRunning(openClock), [
                        stopClock(openClock),
                        set(firstOpen, 0),
                    ]),
                    cond(clockRunning(snapClock), [
                        stopClock(snapClock),
                        set(shouldToSnap, 0),
                    ]),
                    cond(not(clockRunning(closeClock)), [
                        set(springState.finished, 0),
                        set(springState.velocity, 0),
                        set(springState.time, 0),
                        set(springState.position, translateY),
                        set(springConfig.toValue, viewportHeight),
                        set(springConfig.damping, 6),
                        set(springConfig.stiffness, 80),
                        startClock(closeClock),
                    ]),
                    spring(closeClock, springState, springConfig),
                    set(translateY, springState.position),
                    cond(springState.finished, [
                        stopClock(closeClock),
                        set(onClosing, 0),
                    ]),
                ]),
                cond(eq(state, State.ACTIVE), [
                    cond(not(shouldToSnap), set(shouldToSnap, 1)),
                    cond(clockRunning(openClock), [
                        stopClock(openClock),
                        set(firstOpen, 0),
                    ]),
                    cond(clockRunning(closeClock), [
                        stopClock(closeClock),
                        set(onClosing, 0),
                    ]),
                    cond(clockRunning(snapClock), [
                        stopClock(snapClock),
                    ]),
                    set(translateY, interpolate(add(springState.position, translationY), {
                        inputRange: [0, _top, viewportHeight],
                        outputRange: [_top - 12, _top, viewportHeight],
                        extrapolate: Extrapolate.CLAMP,
                    })),
                ]),
                cond(and(eq(state, State.END), shouldToSnap), [
                    cond(not(clockRunning(snapClock)), [
                        set(springState.finished, 0),
                        set(springState.time, 0),
                        set(springState.velocity, velocityY),
                        set(springState.position, translateY),
                        set(snapPointV, snapPoint(translateY, velocityY, [_top, viewportHeight])),
                        set(springConfig.toValue, snapPointV),
                        cond(eq(snapPointV, viewportHeight), [
                            set(springConfig.damping, 6),
                            set(springConfig.stiffness, 80),
                        ], [
                            set(springConfig.damping, 200),
                            set(springConfig.stiffness, 400),
                        ]),
                        startClock(snapClock),
                    ]),
                    spring(snapClock, springState, springConfig),
                    set(translateY, springState.position),
                    cond(springState.finished, [
                        stopClock(snapClock),
                        set(shouldToSnap, 0),
                    ]),
                ]),
                set(transition, interpolate(translateY, {
                    inputRange: [_top, viewportHeight],
                    outputRange: [index + 1, index],
                    extrapolate: Extrapolate.CLAMP,
                })),
                cond(lessThan(translateY, viewportHeight), set(canClose, 1)),
                cond(and(greaterOrEq(translateY, viewportHeight), canClose), [
                    stopClock(closeClock),
                    stopClock(snapClock),
                    set(springState.finished, 1),
                    set(springState.position, viewportHeight),
                    call([], () => {
                        closeRef.current(name);
                    })
                ]),
            ]);
        }
        else {
            return block([
                set(translateY, interpolate(transition, {
                    inputRange: [index, index + 1, index + 2],
                    outputRange: [viewportHeight, _top, 0],
                    extrapolate: Extrapolate.CLAMP,
                }))
            ]);
        }
    }, [isLast, index, name, ready]);
    useCode(() => block([
        cond(and(lessOrEq(translateY, _top), not(didFocusV)), [
            set(didFocusV, 1),
            call([], () => {
                if (didFocusCallbackRef.current) {
                    didFocusCallbackRef.current();
                }
            })
        ])
    ]), []);
    useEffect(() => {
        // add android back handler
        if (IS_ANDROID && isLast) {
            const handleBackButtonPressAndroid = () => {
                onClosing.setValue(1);
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
            return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
        }
    }, [isLast]);
    // useCode(() => block([
    //     call([state], (state) => console.log(state))
    // ]), []);
    // console.log(`${name} update`);
    return (<Animated.View style={[StyleSheet.absoluteFill, styles.modal, { transform: [{ translateY, scale }] }]}>
            {!hideHeader && (<PanGestureHandler {...gestureHandler}>
                    <Animated.View style={styles.header}>
                        <Text style={styles.title}>
                            {typeof title === 'string' ? title : title(params)}
                        </Text>
                        {!hideHeaderButton && (<View style={styles.headerRight}>
                                <TouchableOpacity onPress={() => {
        if (isLast) {
            onClosing.setValue(1);
        }
    }}>
                                    <View style={styles.okContainer}>
                                        <Text style={styles.okButton}>{'完成'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>)}
                    </Animated.View>
                </PanGestureHandler>)}
            <Component modalNavigation={modalNavigation}/>
            {useMemo(() => <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity }]}></Animated.View>, [])}
        </Animated.View>);
}
export default React.memo(Modal);
