# react-native-card-modal-reanimated
react-native-card-modal-reanimated is a cross-platform, pure js component. Modal transition vertically slides the modal view up from the bottom of the screen and back down when it's dismissed.

<img width="280" src='https://raw.githubusercontent.com/13773753970/images/master/bottom-button.gif'/>

### Dependencies

`react-native-reanimated` : https://github.com/software-mansion/react-native-reanimated

`react-native-gesture-handler` : https://github.com/software-mansion/react-native-gesture-handler

`react-native-safe-area-context` : https://github.com/th3rdwave/react-native-safe-area-context

`react-native-redash` : https://github.com/wcandillon/react-native-redash

### Installation
```
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-redash
```
```
cd ios && pod install
```
```
yarn add react-native-card-modal-reanimated
```

## Usage

### Basic

```jsx
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import createSlideModal, {openModal} from 'react-native-card-modal-reanimated';

const SlideModalContainer = createSlideModal([
    {name: "ModalA", title: "Modal A", component: ModalA},
    {name: "ModalB", title: "Modal B", component: ModalB},
    {name: "ModalC", title: "Modal C", component: ModalC},
]);

const App = () => {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SlideModalContainer>
                // main page, such as react-navigation container etc.
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
```

### Open Modal, Close Modal

```jsx
import {openModal} from 'react-native-card-modal-reanimated';

export declare const openModal: (name: string, params?: any) => void | undefined;
export declare const closeModal: (name?: string) => void | undefined;
```

### Prepare Modal
#### prepared modal exsit always

```jsx
import {openModal} from 'react-native-card-modal-reanimated';

export declare const addPrepared: (name: string, params?: any) => void | undefined;
export declare const clearPrepared: (name: string) => void | undefined;
```

### createSlideModal
```jsx
declare const createSlideModal: (modals: Array<ModalType>) => (props: {
    children: React.ReactNode;  // main page
    toggleStatusBarStyle?: boolean;  // toggle status bar style, default true
}) => JSX.Element;

declare type ModalType = {
    name: string;
    title: string | ((params: any) => string);
    hideHeaderButton?: boolean;  // default false
    hideHeader?: boolean; // default false
    component: any; // modal component
};
```

### Modal props
```jsx
declare type ModalNavigation = {
    params: any;  // params state
    setParams: (params: any) => void; // like setState
    close: () => void; // close self
    gestureHandler: {  // gesture controller
        onHandlerStateChange: (...args: any[]) => void;
        onGestureEvent: (...args: any[]) => void;
    };
    onModalDidFocus: (callback: () => void) => (() => void);  // invoke callback on modal did focus
};
```

### Custom Header
[Modal C example](https://github.com/13773753970/react-native-card-modal-reanimated/)

## Example

The source code for the example (showcase) app is under the Example/ directory. If you want to play with the API but don't feel like trying it on a real app, you can run the example project. Clone the repo, go to the Example/ folder and run:

```
yarn
```

### Running on iOS

Before running the app, install the cocoapods dependencies:

```
cd ios && pod install && cd ..
```

Now, you can start the app:

```
react-native run-ios
```

### Running on Android

Run the react native's cli command:

```
react-native run-android
```

#### Important: 
You will need to have an Android or iOS device or emulator connected as well as react-native-cli package installed globally.

## License

MIT. Copyright (c) 2020 Daniel Bryan.
