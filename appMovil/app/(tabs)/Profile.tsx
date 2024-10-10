import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/components/styles/global';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ProfileItemProps = {
    icon: IconName;
    label: string;
    value: string;
};

const ProfileItem = ({ icon, label, value }: ProfileItemProps) => (
    <View style={styles.profileItem}>
        <Ionicons name={icon} size={24} color="#666" style={styles.icon} />
        <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

export default function Profile() {
    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
                <Text style={styles.headerTitle}>My Profile</Text>
                <Text style={styles.editButton}>EDIT</Text>
            </View>

            <View style={styles.profileCard}>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Akshay Syal</Text>
                    <Text style={styles.classInfo}>Class XI-B | Roll no: 04</Text>
                </View>
                <Ionicons name="camera" size={24} color="#666" style={styles.cameraIcon} />
            </View>

            <View style={styles.detailsContainer}>
                <ProfileItem icon="card" label="Admission Number" value="1234 5678 9012 1234" />
                <ProfileItem icon="calendar" label="Academic Year" value="2020-2021" />
                <ProfileItem icon="male-female" label="Gender" value="Male" />
                <ProfileItem icon="calendar" label="Date of Admission" value="01 Apr 2018" />
                <ProfileItem icon="calendar" label="Date of Birth" value="22 July 1996" />
                <ProfileItem icon="mail" label="Email Address" value="parentboth@gmail.com" />
                <ProfileItem icon="person" label="Mother Name" value="Monica Larson" />
                <ProfileItem icon="person" label="Father Name" value="Bernard Taylor" />
                <ProfileItem icon="home" label="Address" value="Karol Bagh, Delhi" />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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