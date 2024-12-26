// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// const WSChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     // Initialize WebSocket with the corrected IP
//     const websocket = new WebSocket('ws://192.168.1.2:8000/ws');

//     websocket.onopen = () => {
//       console.log('WebSocket connection opened');
//       console.log('Ready State:', websocket.readyState);
//     };

//     websocket.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     websocket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setWs(websocket);

//     // Cleanup WebSocket on component unmount
//     return () => {
//       if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
//         websocket.close();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(message);
//       setMessage('');
//     } else {
//       console.log('WebSocket is not open. Current state:', ws?.readyState);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>WebSocket Chat</Text>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message"
//           value={message}
//           onChangeText={setMessage}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   messageList: {
//     flex: 1,
//     marginVertical: 10,
//   },
//   message: {
//     fontSize: 16,
//     backgroundColor: '#d3d3d3',
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     height: 40,
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   sendButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default WSChat;

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

const WSChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Use your actual local IP or appropriate address
    // const websocket = new WebSocket('ws://192.168.1.2:8000/api/ws/chat');
    const websocket = new WebSocket('ws://10.0.2.2:8000/api/ws/chat');

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus('Connected');
    };

    websocket.onmessage = (event) => {
      // Parse the message and add a timestamp
      const newMessage = {
        text: event.data,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection Error');
    };

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Disconnected');
    };

    setWs(websocket);

    // Cleanup WebSocket on component unmount
    return () => {
      if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
        websocket.close();
      }
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (message.trim() === '') return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      
      // Optimistically add the sent message to the messages list
      const sentMessage = {
        text: `You: ${message}`,
        timestamp: new Date().toLocaleTimeString(),
        sent: true
      };
      
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setMessage('');
    } else {
      console.log('WebSocket is not open. Current state:', ws?.readyState);
    }
  }, [ws, message]);

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer, 
      item.sent && styles.sentMessageContainer
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>WebSocket Chat</Text>
      <Text style={styles.connectionStatus}>{connectionStatus}</Text>
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={message.trim() === ''}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#007BFF',
    color: 'white',
  },
  connectionStatus: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  sentMessageContainer: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WSChat;