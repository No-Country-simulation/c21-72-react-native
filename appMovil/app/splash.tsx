import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withDelay,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();
  const logoTranslateX = useSharedValue(-40);
  const logoOpacity = useSharedValue(0);
  const letterAnimations = Array(7).fill(0).map(() => useSharedValue(-20));
  const twoAnimation = useSharedValue(-20);

  const [fontsLoaded] = useFonts({
    'Eracake': require('../assets/fonts/Eracake.ttf'),
  });

  useEffect(() => {
    logoTranslateX.value = withSequence(
      withTiming(40, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) })
    );
    logoOpacity.value = withTiming(1, { duration: 1000 });

    letterAnimations.forEach((anim, index) => {
      anim.value = withDelay(
        index * 100,
        withSpring(0, { damping: 5, stiffness: 100 })
      );
    });

    twoAnimation.value = withDelay(
      700,
      withSpring(0, { damping: 5, stiffness: 100 })
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: logoTranslateX.value }],
    opacity: logoOpacity.value,
  }));

  const handleNext = () => {
    router.push('/auth/LoginScreen');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['white', '#3b5998']}
      style={styles.container}
      start={{ x: 0, y: 0.01 }}
      end={{ x: 0, y: 0.445 }}
    >
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image
          source={require('@/assets/images/Login.png')}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {'CONECTA'.split('').map((letter, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.title,
                useAnimatedStyle(() => ({
                  transform: [{ translateY: letterAnimations[index].value }],
                })),
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
          <Animated.Text
            style={[
              styles.title,
              styles.rotatedTwo,
              useAnimatedStyle(() => ({
                transform: [
                  { translateY: twoAnimation.value },
                  { rotate: '20deg' },
                ],
              })),
            ]}
          >
            2
          </Animated.Text>
        </View>
        <Text style={styles.subtitle}>Bienvenido a tu app escolar</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/FooterImage.png')}
        style={styles.footerImage}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  logoContainer: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  title: {
    fontFamily: 'Eracake',
    fontSize: width * 0.14,
    color: 'white',
  },
  rotatedTwo: {
    fontSize: width * 0.20,
    color: '	#3DA7CB',
    marginLeft: -width * 0.02,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.02,
    borderRadius: 25,
  },
  buttonText: {
    color: '#3b5998',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  footerImage: {
    width: '100%',
    height: height * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
  },
});