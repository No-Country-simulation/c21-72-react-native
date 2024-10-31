import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
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
import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');

const GradientText = ({ style, twoAnimatedStyle }: { style: any, twoAnimatedStyle: any }) => {
  return (
    <MaskedView
      style={{ 
        height: width * 0.25, 
        width: width * 0.25,
        position: 'absolute',
        right: -width * 0.16,  // Ajustado más a la derecha
        bottom: -height * 0.01,
        zIndex: 1, // Asegura que esté por encima
      }}
      maskElement={
        <Animated.Text 
          style={[
            style,
            twoAnimatedStyle,
            {
              fontSize: width * 0.25,
              color: 'white',
              textAlign: 'center',
            }
          ]}>
          2
        </Animated.Text>
      }>
      <LinearGradient
        colors={['#4facfe', '#00f2fe', '#0099ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Text style={[style, { 
          opacity: 1,
          fontSize: width * 0.25,
          color: '#4facfe',
          textAlign: 'center',
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }]}>
          2
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default function Page() {
  const router = useRouter();
  const logoTranslateX = useSharedValue(-40);
  const logoOpacity = useSharedValue(0);
  const letterAnimations = Array(7).fill(0).map(() => useSharedValue(-20));
  const twoAnimation = useSharedValue(-20);

  const [fontsLoaded] = useFonts({
    'Eracake': require('../assets/fonts/Eracake.ttf'),
  });

  // Crear todos los estilos animados fuera del render
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: logoTranslateX.value }],
    opacity: logoOpacity.value,
  }));

  // Crear los estilos de las letras
  const letterAnimatedStyles = letterAnimations.map((anim) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: anim.value }],
    }))
  );

  // Crear el estilo del número 2
  const twoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: twoAnimation.value },
      { rotate: '20deg' },
    ],
  }));

  useEffect(() => {
    // Animaciones existentes...
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

    // Agregar navegación automática
    const timer = setTimeout(() => {
      router.replace('/auth/LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
              style={[styles.title, letterAnimatedStyles[index]]}
            >
              {letter}
            </Animated.Text>
          ))}
          <GradientText 
            style={[styles.title, styles.rotatedTwo]} 
            twoAnimatedStyle={twoAnimatedStyle}
          />
        </View>
        <Text style={styles.subtitle}>Bienvenido a tu app escolar</Text>
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
    position: 'relative', // Añade esta línea
  },
  title: {
    fontFamily: 'Eracake',
    fontSize: width * 0.14,
    color: 'white',
  },
  rotatedTwo: {
    fontFamily: 'Eracake',
    color: 'white',
    transform: [{ rotate: '20deg' }],
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
