import { AppRegistry } from 'react-native';
import App from './App.web';

// Registra o componente principal
AppRegistry.registerComponent('SurfBabyApp', () => App);

// Renderiza o app no DOM
AppRegistry.runApplication('SurfBabyApp', {
  rootTag: document.getElementById('root'),
});

