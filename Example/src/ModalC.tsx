import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableHighlight, PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {ModalNavigation, MODAL_PADDDING_BOTTOM} from 'react-native-card-modal-reanimated'

type Props = {
    modalNavigation: ModalNavigation
}

function ModalC(props: Props){
    const {modalNavigation} = props;
    const {close, gestureHandler} = modalNavigation;

    // console.log('Modal C Update');

    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={styles.header}>
                    <Image style={{width: 60, height: 60, borderRadius: 30}} source={require('./avator.jpeg')}/>
                </Animated.View>
            </PanGestureHandler>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>Modal C</Text>
                <TouchableHighlight style={{borderRadius: 5}} onPress={() => {
                    close();
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Close Me</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: MODAL_PADDDING_BOTTOM,
    },
    header: {
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        borderBottomColor: "#ceced3",
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    button: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
    }
})

export default React.memo(ModalC)