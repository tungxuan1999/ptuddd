1. create project:
expo init confusion
cd confusion

2. install libraries:
npm install react-native-elements --save
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer --save
expo install react-native-gesture-handler react-native-reanimated react-native-screens @react-native-community/masked-view react-native-safe-area-context
npm install redux react-redux redux-thunk redux-logger --save
npm install @react-native-picker/picker --save
expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
npm install date-fns --save
npm install https://github.com/krakz999/react-native-swipeout --save (Open node_modules/react-native-swipeout/dist/index.js then edit to UNSAFE_componentWillMount and UNSAFE_componentWillReceiveProps)
npm install react-native-animatable --save
npm install redux-persist @react-native-community/async-storage --save

3. start json-server:
json-server --watch db.json --delay 2000 --port 3001 --host 0.0.0.0