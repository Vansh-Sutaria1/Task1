
import React from 'react';
import {View, Button} from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    if (loading) 
        {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
        }  

    return (
        <View style={styles.container}>
            <View style={styles.navbar}> 
                <Button title="Settings" onPress={() => alert("Settings Pressed")} />
                <Button 
                    title="Logout" 
                    onPress={async () => { 
                        useEffect(() => {
                            checkAuthentication();
                            const checkAuthentication = async () => {
                            setIsAuthenticated(await checkLogin());
                            setLoading(false);
                            };
                        }, []);
                    }}
                />
                <Button title="View Graphs" onPress={() => navigation.navigate("Main", { screen: "Graphs" })} />
                </View>   
            </View>
        );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navbar: {
    width: '100%', 
    padding: 20, 
    justifyContent: "flex-start", 
    alignItems: "center", 
    flexDirection: "row", 
    gap: 10, 
  },
});

export default HomeScreen;
