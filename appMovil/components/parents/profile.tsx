import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import * as ImagePicker from 'expo-image-picker';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ProfileItemProps = {
    icon: IconName;
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    editable: boolean;
};

const ProfileItem = ({ icon, label, value, onChangeText, editable }: ProfileItemProps) => (
    <View style={styles.profileItem}>
        <Ionicons name={icon} size={24} color="#666" style={styles.icon} />
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.value, editable && styles.editableInput]}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
            />
        </View>
    </View>
);

export default function ParentProfile({ onBack }: { onBack: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(require('@/assets/images/react-logo.png'));
    const [profileData, setProfileData] = useState({
        name: "Monica Larson",
        emailAddress: "parentboth@gmail.com",
        address: "Karol Bagh, Delhi"
    });

    const handleUpdate = async () => {
        try {
            Alert.alert("Éxito", "Perfil actualizado correctamente");
            setIsEditing(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el perfil");
        }
    };

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
        }
    };

    const handleCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
        }
    };

    const handleImageSelection = () => {
        Alert.alert(
            "Cambiar foto de perfil",
            "¿Cómo quieres cambiar tu foto de perfil?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Tomar foto",
                    onPress: handleCamera
                },
                {
                    text: "Elegir de la galería",
                    onPress: handleImagePicker
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Perfil del Padre" 
                onBack={onBack}
                rightComponent={
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        <Text style={styles.editButton}>{isEditing ? "CANCELAR" : "EDITAR"}</Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView style={styles.container}>
                <View style={styles.profileCard}>
                    <Image
                        source={profileImage}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <TextInput
                            style={[styles.name, isEditing && styles.editableInput]}
                            value={profileData.name}
                            onChangeText={(text) => setProfileData({...profileData, name: text})}
                            editable={isEditing}
                        />
                    </View>
                    <TouchableOpacity onPress={handleImageSelection} style={styles.cameraIconContainer}>
                        <Ionicons name="camera" size={24} color="#666" style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <ProfileItem icon="mail" label="Email Address" value={profileData.emailAddress} editable={isEditing} onChangeText={(text) => setProfileData({...profileData, emailAddress: text})} />
                    <ProfileItem icon="home" label="Address" value={profileData.address} editable={isEditing} onChangeText={(text) => setProfileData({...profileData, address: text})} />
                </View>

                {isEditing && (
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.updateButtonText}>ACTUALIZAR</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#3b5998', 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#3b5998',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
  
        fontWeight: 'bold',
    },
    cameraIconContainer: {
        position: 'absolute',
        right: 16,
        top: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    editButton: {
        color: '#fff',
        fontSize: 14,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    classInfo: {
        color: '#666',
    },
    cameraIcon: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 16,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    editableInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#3b5998',
    },
    inputContainer: {
        flex: 1,
    },
    updateButton: {
        backgroundColor: '#3b5998',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 16,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 16,
    },
    label: {
        color: '#666',
        fontSize: 12,
    },
    value: {
        fontSize: 16,
    },
});