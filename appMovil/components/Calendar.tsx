import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import Header from '@/components/Header';
interface Evento {
    nombre: string;
    fecha: string;
    dia: string;
}

const VistaCalendario = ({ onBack }: { onBack: () => void }) => {
    const [pestanaActiva, setPestanaActiva] = useState<'ASISTENCIA' | 'EVENTOS'>('ASISTENCIA');
    const [mesSeleccionado, setMesSeleccionado] = useState('NOVIEMBRE 2020');

    const fechasMarcadas = {
        '2020-11-05': { selected: true, selectedColor: 'red' },
        '2020-11-19': { selected: true, selectedColor: 'green' },
        '2020-11-24': { selected: true, selectedColor: 'red' },
    };

    const eventos: Evento[] = [
        { nombre: 'Día de la Independencia', fecha: '14 de Noviembre', dia: 'Sábado' },
        { nombre: 'Día de la Bandera', fecha: '15 de Noviembre', dia: 'Domingo' },
        { nombre: 'Día del Estudiante', fecha: '16 de Noviembre', dia: 'Lunes' },
    ];

    return (
        <SafeAreaView style={estilos.areaSegura}>
            <Header title="Calendario" onBack={onBack} />
            <View style={estilos.contenedor}>
                <View style={estilos.encabezado}>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={estilos.botonAtras}>{'<'}</Text>
                    </TouchableOpacity>
                    <View style={estilos.contenedorPestanas}>
                        <TouchableOpacity
                            style={[estilos.pestana, pestanaActiva === 'ASISTENCIA' && estilos.pestanaActiva]}
                            onPress={() => setPestanaActiva('ASISTENCIA')}
                        >
                            <Text style={estilos.textoPestana}>Asistencia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[estilos.pestana, pestanaActiva === 'EVENTOS' && estilos.pestanaActiva]}
                            onPress={() => setPestanaActiva('EVENTOS')}
                        >
                            <Text style={estilos.textoPestana}>Eventos</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Calendar
                    current={'2020-11-01'}
                    markedDates={fechasMarcadas}
                    onMonthChange={(mes: DateData) => setMesSeleccionado(mes.dateString)}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />

                {pestanaActiva === 'ASISTENCIA' && (
                    <View style={estilos.contenedorLeyenda}>
                        <View style={estilos.itemLeyenda}>
                            <View style={[estilos.colorLeyenda, { backgroundColor: 'red' }]} />
                            <Text>Ausente</Text>
                        </View>
                        <View style={estilos.itemLeyenda}>
                            <View style={[estilos.colorLeyenda, { backgroundColor: 'green' }]} />
                            <Text>Festivos y Vacaciones</Text>
                        </View>
                    </View>
                )}

                {pestanaActiva === 'EVENTOS' && (
                    <ScrollView style={estilos.listaEventos}>
                        <Text style={estilos.tituloEventos}>Lista de Eventos</Text>
                        {eventos.map((evento, index) => (
                            <View key={index} style={estilos.itemEvento}>
                                <Text style={estilos.nombreEvento}>{evento.nombre}</Text>
                                <Text style={estilos.fechaEvento}>{evento.fecha}</Text>
                                <Text style={estilos.diaEvento}>{evento.dia}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const estilos = StyleSheet.create({
    areaSegura: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contenedor: {
        flex: 1,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    botonAtras: {
        fontSize: 24,
        marginRight: 10,
    },
    contenedorPestanas: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    pestana: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    pestanaActiva: {
        borderBottomColor: 'blue',
    },
    textoPestana: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contenedorLeyenda: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    itemLeyenda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorLeyenda: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    listaEventos: {
        padding: 10,
    },
    tituloEventos: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemEvento: {
        marginBottom: 10,
    },
    nombreEvento: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fechaEvento: {
        fontSize: 14,
    },
    diaEvento: {
        fontSize: 14,
        color: 'gray',
    },
});

export default VistaCalendario;