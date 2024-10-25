import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientProps {
    style?: ViewStyle;
    children: ReactNode;
}

export const BlueGradient = ({ style, children }: GradientProps) => (
    <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.gradient, style]}
    >
        {children}
    </LinearGradient>
);

export const GreenRedGradient = ({ style, children }: GradientProps) => (
    <LinearGradient
        colors={['#4CAF50', '#FFC107', '#F44336']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, style]}
    >
        {children}
    </LinearGradient>
);

export const SkyBlueGradient = ({ style, children }: GradientProps) => (
    <LinearGradient
        colors={['#2855AE', '#7292CF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, style]}
    >
        {children}
    </LinearGradient>
);

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        borderRadius: 10,
    },
});