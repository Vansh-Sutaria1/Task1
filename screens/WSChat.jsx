// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// const WSChat = (navigation) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     // Initialize WebSocket
//     const websocket = new WebSocket('ws://192.168.1.2:8000/ws');

//     websocket.onopen = () => {
//       console.log('WebSocket connection opened');
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
//       websocket.close();
//     };
//   }, []);

// //   const sendMessage = () => {
// //     if (ws && message.trim()) {
// //       ws.send(message);
// //       setMessage('');
// //     }
// //   };
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


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const WSChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Initialize WebSocket with the corrected IP
    const websocket = new WebSocket('ws://192.168.1.2:8000/ws');

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
      console.log('Ready State:', websocket.readyState);
    };

    websocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(websocket);

    // Cleanup WebSocket on component unmount
    return () => {
      if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
        websocket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage('');
    } else {
      console.log('WebSocket is not open. Current state:', ws?.readyState);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  messageList: {
    flex: 1,
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WSChat;
