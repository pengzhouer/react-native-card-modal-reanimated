import React, {useRef, useState, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {TouchableHighlight} from 'react-native-gesture-handler';

import createSlideModal, {openModal} from 'react-native-card-modal-reanimated';
import ModalA from './src/ModalA';
import ModalB from './src/ModalB';
import ModalC from './src/ModalC';

const SlideModalContainer = createSlideModal([
    {name: "ModalA", title: "Modal A", component: ModalA},
    {name: "ModalB", title: (params: any) => (params && params.headerTitle) ? params.headerTitle : 'DEFAULT', component: ModalB},
    {name: "ModalC", title: "Modal C", hideHeader: true, component: ModalC},
]);

const App = () => {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SlideModalContainer>
                <View style={styles.container}>
                    <TouchableHighlight style={{borderRadius: 5}} onPress={() => {
                        openModal("ModalA", {count: 0});
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Press Me</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </SlideModalContainer>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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

export default App