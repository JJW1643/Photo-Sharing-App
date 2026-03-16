
// This is the camera screen of the app. It will be used to take photos and videos. English - Create a screen called Camera containing the text 'Camera'
// This is a simple functional component that renders a view with some text. This will be the camera screen of the app.
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  // This hook is used to request camera permissions from the user. It returns the current permission status and a function to request permissions if they are not granted.
  const [permission, requestPermission] = useCameraPermissions();

  const camera =useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
        // This function will be used to take a photo when the user presses the button. It will use the CameraView component to capture a photo and save it to the device's photo library.
        console.log('takePhoto');
        const photo = await camera.current?.takePictureAsync();
        console.log(JSON.stringify(photo, null, 2));
        
  }

  return (
    // This is the main view of the camera screen. It contains the camera view and a button to toggle between the front and back cameras. The camera view is styled to take up the entire screen, and the button is positioned at the bottom of the screen.
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing} />

    {/*Footer */}
      <SafeAreaView 
        edges={['bottom']}
        className='flex-row bg-transparent w-full p-4 justify-center items-center'>
            <Pressable className='bg-white rounded-full w-20 h-20' />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: 'gray',
  },

  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
