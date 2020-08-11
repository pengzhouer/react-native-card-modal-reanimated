import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import {openModal, MODAL_PADDDING_BOTTOM, ModalNavigation} from 'react-native-card-modal-reanimated';

type Props = {
    modalNavigation: ModalNavigation
}

function ModalB(props: Props){
    const {modalNavigation} = props;
    const {params, setParams} = modalNavigation;

    // console.log('Modal B Update');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>I'm Modal B, exist with Modal A</Text>
            <Text style={styles.title}>params.count: {params.count}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight style={{borderRadius: 5, marginHorizontal: 4}} onPress={() => {
                    setParams({...params, count: params.count + 1});
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Count++</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{borderRadius: 5, marginHorizontal: 4}} onPress={() => {
                    openModal("ModalC");
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Open C</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginVertical: 8,
        alignSelf: 'center',
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

export default React.memo(ModalB)