import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const checkLogin = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    // what happens if the token doesnt exist
    if (!token) return false;

    const decodedToken = jwt_decode(token);

    if (decodedToken.exp < Date.now() / 1000) {
      await AsyncStorage.removeItem('jwtToken');
      return false;
    }
    return true; 
  } 
  catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};


export const logout = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


export const loading = async () => {
    areturn (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
}