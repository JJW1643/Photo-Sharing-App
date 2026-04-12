
// This is the camera screen of the app. It will be used to take photos and videos. English - Create a screen called Camera containing the text 'Camera'
// This is a simple functional component that renders a view with some text. This will be the camera screen of the app.
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { use, useRef, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { insertAsset } from '@/services/assets';
import { useQueryClient } from '@tanstack/react-query';

// This function decleares your screen as a function and exports it so other files can use it. Every single screen in your app is a functio like this.
export default function CameraScreen() {
    // Creates a piece of state called facing that will be used to toggle between the front and back cameras. The initial value is set to 'back' which means the back camera will be used when the screen is first opened.
  const [facing, setFacing] = useState<CameraType>('back');
  // This hook is used to request camera permissions from the user. It returns the current permission status and a function to request permissions if they are not granted.
  const [permission, requestPermission] = useCameraPermissions();

  const {id} = useLocalSearchParams<{ id: string }>();
  const {user} = useAuth();
  const queryClient = useQueryClient();

  // This mutation will be used to insert a new asset into the database after a photo is taken and uploaded to Cloudinary. The mutationFn is a function that takes an assetID and calls the insertAsset function with the event_id, user_id, and asset_id to save the new asset in the database.

  const insertAssetMutation = useMutation({
    mutationFn: (assetID: string) => 
      insertAsset({ event_id: id, user_id: user?.id, asset_id: assetID }),
    onSuccess: () => {
        // Invalidate and refetch the event query to update the list of assets in the event details screen after a new asset is added. This ensures that when a user takes a photo and it gets uploaded and saved to the database, the event details screen will show the new photo without needing to manually refresh.
        queryClient.invalidateQueries({ queryKey: ['Events', id] });
    }
  });

  const camera =useRef<CameraView>(null);

  // the ! means "not", so this reads as 'if permission doesn't exist yet'. When the screen first loads, the permission status hasn't been checked so its null.
  if (!permission) {
    // Camera permissions are still loading. Shows a loading indicator, screen stops and renders nothing until permission status is known.
    return <ActivityIndicator />;
  }

    // if the user hasn't granted camera permission yet, show a message instead of the camera
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>

        // a button that when pressed calls requestPermission, which triggers the permission request prompt to the user. If the user grants permission, the screen will re-render and show the camera. If they deny, it will keep showing this message and button.
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    // function toggleCameraFacing() — defines a function that flips between front and back camera
    // setFacing(current => ...) — calls setFacing with the current value of facing
    // current === 'back' ? 'front' : 'back' — this is a ternary operator, which is a compact if/else. It reads as: "if the current value is 'back', change it to 'front', otherwise change it to 'back'". Every time this runs it simply flips to the opposite camera
function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // the async keyword means this function can wait for things to finish before moving on. Taking a photo isn't instant so it needs to wait
  async function takePhoto() {
        // This function will be used to take a photo when the user presses the button. It will use the CameraView component to capture a photo and save it to the device's photo library.
        
        const photo = await camera.current?.takePictureAsync();
        // if there is no photo or the photo doesn't have a uri, return early and don't try to upload to Cloudinary
        if (!photo?.uri) return;

        // if photo has a uri, upload to Cloudinary returning a response with the details of the uploaded photo, including a secure_url which is the URL where the photo can be accessed on Cloudinary's servers. We can use this URL to display the photo in our app or share it with others.
        const cloudinaryResponse = await uploadToCloudinary(photo.uri);
        console.log(JSON.stringify(cloudinaryResponse, null, 2));

        // Save it to the database assets table
        insertAssetMutation.mutate(cloudinaryResponse.public_id);



  }

  return (
    // This is the main view of the camera screen. It contains the camera view and a button to toggle between the front and back cameras. The camera view is styled to take up the entire screen, and the button is positioned at the bottom of the screen.

    // <View style={styles.container}> — the outermost container that wraps everything on screen, styled with flex: 1 so it fills the entire screen
    <View style={styles.container}>
        {/* The CameraView component is what displays the camera feed on the screen. It takes several props to configure it: */}
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View className='absolute bottom-0 bg-neutral-900/20 w-full p-4'>
            <Ionicons 
                name='camera-reverse' 
                size={24} 
                color='white' 
                onPress={toggleCameraFacing} 
            />
        </View>
        </CameraView>

    {/*Footer */}
      <SafeAreaView 
        edges={['bottom']}
        className='flex-row bg-transparent w-full p-4 justify-center items-center'>
            <Pressable onPress={takePhoto} className='bg-white rounded-full w-20 h-20' />
      </SafeAreaView>
    </View>
  );
}

//React Native's way of defining styles, similar to CSS but written in JavaScript objects. Each key in the object (container, message, camera, button, text) corresponds to a style that can be applied to a component using the style prop. For example, style={styles.container} applies the styles defined in the container key to that component.

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
