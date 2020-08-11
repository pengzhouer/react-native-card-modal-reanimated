import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import {openModal, MODAL_PADDDING_BOTTOM, ModalNavigation, addPrepared, clearPrepared} from 'react-native-card-modal-reanimated';

type Props = {
    modalNavigation: ModalNavigation
}

function ModalA(props: Props){
    const {modalNavigation} = props;
    const {params, setParams, onModalDidFocus} = modalNavigation;

    useEffect(() => {
        const offModalDidFocus = onModalDidFocus(() => {
            addPrepared('ModalB', {headerTitle: 'Come From A', count: 0});
        });
        return () => {
            offModalDidFocus();
            clearPrepared('ModalB');
        };
    }, []);

    // console.log('Modal A Update');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal A</Text>
            <Text style={styles.title}>params.count: {params.count}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight style={{borderRadius: 5, marginHorizontal: 4}} onPress={() => {
                    setParams({count: params.count + 1});
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Count++</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{borderRadius: 5, marginHorizontal: 4}} onPress={() => {
                    openModal("ModalB", {headerTitle: 'Come From A', count: 0});
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Open B</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: MODAL_PADDDING_BOTTOM
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

export default React.memo(ModalA)