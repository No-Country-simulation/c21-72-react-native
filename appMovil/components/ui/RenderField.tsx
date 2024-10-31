import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateTimePickerForm = ({ control }) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            <Controller
                control={control}
                name="date_of_admission" // Nombre del campo en el formulario
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TouchableOpacity onPress={showDatepicker}>
                            <Text> {value ? new Date(value).toLocaleDateString() : 'Selecciona una fecha'}</Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={value ? new Date(value) : new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShow(false);
                                    if (selectedDate) {
                                        setDate(selectedDate);
                                        onChange(selectedDate); // Actualiza el valor en el formulario
                                    }
                                }}
                            />
                        )}
                    </View>
                )}
            />
        </View>
    );
};
