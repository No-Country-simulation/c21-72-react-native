import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
interface Asignatura {
    nombre: string;
    calificacion: number;
}

const Results = ({ onBack }: { onBack: () => void }) => {
    const nombreEstudiante = "nombre estudiante";
    const calificacionPromedio = 8.5;
    const grado = "A";

    const asignaturas: Asignatura[] = [
        { nombre: "Español", calificacion: 7.5 },
        { nombre: "Matemáticas", calificacion: 8.7 },
        { nombre: "Ciencias", calificacion: 9.2 },
        { nombre: "Historia", calificacion: 9.5 },
        { nombre: "Geografía", calificacion: 8.8 },
        { nombre: "Computación", calificacion: 9.6 },
    ];

    return (
        <SafeAreaView style={styles.container}>
                        <Header 
                title="Resultados" 
                onBack={onBack} 
                rightComponent={
                    <TouchableOpacity>
                        <Ionicons name="share-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="share-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.backgroundContainer}>
                    <ImageBackground
                        source={require('@/assets/images/Results.bg.png')}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.circleContainer}>
                            <View style={styles.circleSilver}>
                                <View style={styles.circleOuter}>
                                    <View style={styles.circleInner}>
                                        <Text style={styles.percentageText}>{calificacionPromedio.toFixed(2)}</Text>
                                        <Text style={styles.gradeText}>Promedio {grado}</Text>
                                    </View>
                                </View>
                            </View>
                            <LinearGradient
                                colors={['#FFA500', '#FF4500']}
                                style={styles.starContainer}
                            >
                                <Ionicons name="star" size={20} color="white" />
                            </LinearGradient>
                        </View>
                    </ImageBackground>
                </View>


                <View style={styles.resultContainer}>
                    <Text style={styles.excellentText}>¡Excelente,</Text>
                    <Text style={styles.nameText}>{nombreEstudiante}!</Text>

                    <View style={styles.subjectsContainer}>
                        {asignaturas.map((asignatura, index) => (
                            <View key={index} style={styles.subjectRow}>
                                <Text style={styles.subjectName}>{asignatura.nombre}</Text>
                                <Text style={styles.subjectMarks}>
                                    {asignatura.calificacion.toFixed(1)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.downloadButton}>
                        <Text style={styles.downloadButtonText}>DESCARGAR PDF</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flexGrow: 1,
    },
    backButton: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    backgroundContainer: {
        height: 300, // Ajusta este valor según necesites
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleContainer: {
        alignItems: 'center',
    },
    circleSilver: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: 'silver',
    },
    circleOuter: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleInner: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'black',
    },
    gradeText: {
        fontSize: 18,
        color: 'black',
    },
    starContainer: {
        position: 'absolute',
        bottom: 16,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -30, // Esto hace que el contenedor se superponga ligeramente al fondo
    },
    excellentText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3b5998',
        marginBottom: 20,
    },
    subjectsContainer: {
        marginTop: 20,
    },
    subjectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subjectName: {
        fontSize: 16,
    },
    subjectMarks: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    downloadButton: {
        backgroundColor: '#3b5998',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    downloadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default Results;
