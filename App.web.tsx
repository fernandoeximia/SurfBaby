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
import MapComponent from './components/MapComponent.web';

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
          <Appbar.Content title="SurfBaby" subtitle="Praia do Forte - Cabo Frio" />
        </Appbar.Header>

        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>🏄‍♂️ Bem-vindo ao SurfBaby!</Title>
              <Paragraph style={styles.paragraph}>
                Descubra a Praia do Forte em Cabo Frio - um paraíso para surfistas, 
                kitesurfistas e amantes dos esportes aquáticos!
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={onToggleSnackBar}
                style={styles.button}
              >
                Ver Informações
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.mapCard}>
            <Card.Content>
              <Title style={styles.mapTitle}>📍 Localização da Praia</Title>
              <View style={styles.mapContainer}>
                <MapComponent height={800} />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>🌊 Por que a Praia do Forte?</Title>
              <Paragraph>• Ventos constantes ideais para kitesurf</Paragraph>
              <Paragraph>• Ondas perfeitas para surf</Paragraph>
              <Paragraph>• Praia extensa com muito espaço</Paragraph>
              <Paragraph>• Fácil acesso e infraestrutura</Paragraph>
              <Paragraph>• Comunidade ativa de surfistas</Paragraph>
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
          🏄‍♂️ Praia do Forte: O spot perfeito para seu próximo surf!
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
  mapCard: {
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
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
  mapContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default App;

