import { StyleSheet } from 'react-native';
import { viewportHeight } from './helper';
export const _scale = 0.9;
export const _borderRadius = 10;
export const _top = viewportHeight * (1 - _scale) * 0.5 + 10;
export const _scaleBehind = 0.87;
export const SNAP_TOP = 0;
export const SNAP_BOTTOM = viewportHeight - _top;
const headerHeight = 52;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    modal: {
        borderTopLeftRadius: _borderRadius,
        borderTopRightRadius: _borderRadius,
        zIndex: 200,
        backgroundColor: '#f2f2f7',
        overflow: 'hidden',
    },
    header: {
        width: '100%',
        height: headerHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "#ceced3",
        borderBottomWidth: 1,
        borderTopLeftRadius: _borderRadius,
        borderTopRightRadius: _borderRadius,
    },
    headerRight: {
        position: 'absolute',
        right: 0,
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: "black",
    },
    okButton: {
        fontSize: 17,
        fontWeight: '500',
        color: '#007afe',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        overflow: 'hidden',
    },
    defaultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    okContainer: {
        // width: 50,
        height: headerHeight,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    }
});
