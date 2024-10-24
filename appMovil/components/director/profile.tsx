import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '@/components/parents/profile';

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

export default function DirectorProfile({ onBack }: { onBack: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(require('@/assets/images/react-logo.png'));
    const [profileData, setProfileData] = useState({
        name: "Bernard Taylor",
        emailAddress: "director@example.com",
        office: "Main Office"
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
                title="Perfil del Director" 
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
                    <ProfileItem icon="business" label="Office" value={profileData.office} editable={isEditing} onChangeText={(text) => setProfileData({...profileData, office: text})} />
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

