import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

type QualityReport = string; // Você pode mudar esse tipo caso os dados tenham estrutura

const App: React.FC = () => {
  const [qualityReports, setQualityReports] = useState<QualityReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWaterQualityData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://SEU_BACKEND_URL/get-water-quality');
      setQualityReports(response.data.quality_reports);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaterQualityData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Qualidade da Água do Mar</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007aff" />
      ) : (
        <FlatList
          data={qualityReports}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}

      <Button title="Atualizar dados" onPress={fetchWaterQualityData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
