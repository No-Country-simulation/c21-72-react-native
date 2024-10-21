import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { BarChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const subjects = [
    "Matemáticas", "Lenguaje", "Ciencias", "Historia", "Inglés",
    "Educación Física", "Arte", "Música", "Tecnología", "Filosofía"
];

const subjectData = subjects.map(subject => ({
    subject,
    data: [
        Math.random() * 9 + 1,
        Math.random() * 9 + 1,
        Math.random() * 9 + 1
    ].map(num => Number(num.toFixed(1)))
}));

const SubjectCard = ({ item }: { item: any }) => (
    <View style={styles.subjectCard}>
        <Text style={styles.subjectTitle}>{item.subject}</Text>
        <LineChart
            data={{
                labels: ["1er Corte", "2do Corte", "3er Corte"],
                datasets: [{ data: item.data }]
            }}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={styles.chart}
        />
    </View>
);

const SimpleCarousel = ({ data, renderItem }: { data: any[], renderItem: (item: any) => React.ReactNode }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.round(contentOffset.x / screenWidth);
        setCurrentIndex(index);
    };

    const scrollToIndex = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    };

    return (
        <View style={styles.carouselContainer}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {data.map((item, index) => (
                    <View key={index} style={[styles.carouselItem, { width: screenWidth }]}>
                        {renderItem(item)}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentIndex === index && styles.paginationDotActive
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </View>
    );
};

export default function AcademicProgress({ onBack }: { onBack: () => void }) {
    try {
        const data = {
            labels: subjects,
            datasets: [
                {
                    data: subjects.map(() => Math.random() * 9 + 1)
                }
            ]
        };

        return (
            <SafeAreaView style={styles.safeArea}>
                <Header title="Progreso Académico" onBack={onBack} />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.title}>Calificaciones por Asignatura</Text>
                    <View style={styles.chartContainer}>
                        <BarChart
                            data={{
                                labels: subjects.slice(0, 5), // Mostrar solo las primeras 5 asignaturas
                                datasets: [
                                    {
                                        data: subjects.slice(0, 5).map(() => Math.random() * 9 + 1)
                                    }
                                ]
                            }}
                            width={screenWidth - 40}
                            height={300} // Aumentar la altura
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                barPercentage: 0.7,
                            }}
                            style={styles.chart}
                            verticalLabelRotation={30} 
                        />
                    </View>
                    <Text style={styles.averageText}>Promedio General: 7.6</Text>
                    <Text style={styles.commentText}>Ana muestra un excelente desempeño en Inglés y Ciencias. Se recomienda reforzar Lenguaje.</Text>

                    <Text style={styles.title}>Rendimiento por Materia</Text>
                    <SimpleCarousel
                        data={subjectData}
                        renderItem={(item) => <SubjectCard item={item} />}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    } catch (error) {
        console.error('Error en AcademicProgress:', error);
        return <Text>Error al cargar el progreso académico</Text>;
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3b5998',
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    chart: {
        borderRadius: 16,
        marginVertical: 8,
    },
    averageText: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentText: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    subjectCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    subjectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    carouselContainer: {
        height: 300, // Ajusta según tus necesidades
        marginBottom: 20,
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: '#3b5998',
    },
});