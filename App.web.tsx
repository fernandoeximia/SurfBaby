import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Card,
  Title,
  Paragraph,
  Button,
  Snackbar,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00BCD4', // Cor do mar/surf
    accent: '#FF9800', // Cor do sol
  },
};

function App(): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="SurfBaby" subtitle="Hello World App" />
        </Appbar.Header>

        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>🏄‍♂️ Bem-vindo ao SurfBaby!</Title>
              <Paragraph style={styles.paragraph}>
                Este é um Hello World usando React Native Paper. 
                O SurfBaby está pronto para navegar nas ondas do desenvolvimento!
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={onToggleSnackBar}
                style={styles.button}
              >
                Mostrar Mensagem
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>🌊 Recursos do App</Title>
              <Paragraph>• React Native 0.80.2</Paragraph>
              <Paragraph>• React Native Paper</Paragraph>
              <Paragraph>• TypeScript</Paragraph>
              <Paragraph>• Tema personalizado</Paragraph>
              <Paragraph>• Versão Web funcionando!</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              onDismissSnackBar();
            },
          }}>
          🏄‍♂️ SurfBaby está funcionando perfeitamente na web!
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4',
    textAlign: 'center',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});

export default App;

