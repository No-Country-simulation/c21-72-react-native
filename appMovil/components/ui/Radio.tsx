import { Pressable, View, Text, StyleSheet } from "react-native";

interface RadioButtonProps {
    value: number;          // Valor que se asigna al botón
    label: string;          // Texto a mostrar
    selected: boolean;      // Indica si el botón está seleccionado
    onPress?: (value: number) => void; // Función de callback al presionar
}

export const RadioButton = ({ value, label, selected, onPress }: RadioButtonProps) => {
    const handleOnPress = () => {
        if (onPress) {
            onPress(value); // Llama a la función onPress con el valor correspondiente
        }
    };

    return (
        <Pressable onPress={handleOnPress}>
            <View style={styles.wrap}>
                <Dot selected={selected} />
                <View>
                    <Text style={styles.label}>{label}</Text>

                </View>
            </View>
        </Pressable>
    );
};

// Componente Dot

interface DotProps {
    selected: boolean; // Indica si el punto está seleccionado
}

const Dot = ({ selected }: DotProps) => {
    return (
        <View style={styles.radio}>
            <View
                style={{
                    ...styles.dot,
                    backgroundColor: selected ? "#3b5998" : "transparent", // Cambia el color según si está seleccionado
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        gap: 10,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#3b5998",
        alignItems: "center",
        justifyContent: "center",
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "transparent",
    },
    label: {
        fontSize: 20,
        color: "#000",
    },
});