import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    title: string;
    onBack?: () => void;
    rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, rightComponent }) => {
    return (
        <View style={styles.header}>
            {onBack ? (
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            {rightComponent || <View style={styles.placeholder} />}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#3b5998',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 40,
    },
});

export default Header;