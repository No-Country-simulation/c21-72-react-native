import { View, Text } from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';

interface Option {
  label: string;
  value: number | string;
}

interface FormInputProps {
    name: string;
    placeholder: string;
    control: Control<any>;
    rules: any;
    options: Option[];

}


const FormInputDropdown = ({name, placeholder, control, rules, options}:FormInputProps) => { 

  return (
    <Controller 
    control={control}
    name={name}
    rules={rules}
    render={({
      field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <SelectList 
            setSelected={onChange}
            data={options}
            defaultOption={options.find(option => option.value === value) || null}
            placeholder={placeholder}
            boxStyles={{borderColor: error ? 'red': '#ccc'}}
          />
          {error && <Text style={{color: 'red'}}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

export default FormInputDropdown