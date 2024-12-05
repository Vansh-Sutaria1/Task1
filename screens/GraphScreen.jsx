import React from 'react'
import {View, StyleSheet, Dimensions, Text, ScrollView, ActivityIndicator} from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        strokeWidth: 2, 
      },
    ],
};

const pieData = [
    { name: 'January', population: 20, color: 'rgba(255, 99, 132, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'February', population: 45, color: 'rgba(54, 162, 235, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'March', population: 28, color: 'rgba(255, 206, 86, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'April', population: 80, color: 'rgba(75, 192, 192, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'May', population: 99, color: 'rgba(153, 102, 255, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'June', population: 43, color: 'rgba(255, 159, 64, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'July', population: 50, color: 'rgba(255, 99, 132, 0.6)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];  
  
const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, 
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
};
  
const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); 
      return token !== null;
    //   What happens if token not found?
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
      return false; 
    }
};

const GraphScreen = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const validateToken = async () => {
        const isValid = await checkAuthToken(); 
        setIsAuthenticated(isValid); 
    };

    useEffect(() => {     
        validateToken();
    }, []);  

    if (isAuthenticated === null) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if(isAuthenticated) {
        return (
            <ScrollView style={styles.container}>
    
                <View style={styles.graphContainer}>
                    <Text style={styles.heading}>Graph 1: Monthly Data 1</Text>
                    <LineChart
                    data={data}
                    width={Dimensions.get('window').width - 32} // Adjusting width for responsiveness
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chartStyle}
                    />
                </View>
    
                <View style={styles.graphContainer}>
                    <Text style={styles.title}>Pie Chart</Text>
                        <PieChart
                        data={pieData}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        style={styles.chartStyle}
                        />
                </View>
    
                <View style={styles.graphContainer}>
                    <Text style={styles.heading}>Graph 3: Monthly Data 3</Text>
                    <LineChart
                    data={data}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chartStyle}
                    />
                </View>
    
                <View style={styles.graphContainer}>
                    <Text style={styles.heading}>Graph 4: Monthly Data 4</Text>
                    <LineChart
                    data={data}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chartStyle}
                    />
                </View>
            </ScrollView>
        )
    }
    }
    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    graphContainer: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: 20, 
      },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    chartStyle: {
      marginVertical: 8,
      borderRadius: 16,
    },
  });
  
export default GraphScreen;