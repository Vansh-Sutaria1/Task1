// import 'react-native-get-random-values'; // Ensure this is included
// import 'react-native-randombytes'; // For random bytes generation
// import 'react-native-crypto'; // For crypto
// import 'react-native-buffer'; // For Buffer support
// import 'util'; // For util functions like inherits
// import 'inherits'; // For inherits functionality


import { registerRootComponent } from 'expo';

import MyStack from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(MyStack);
