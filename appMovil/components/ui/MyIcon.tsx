import { type IconProps } from '@expo/vector-icons/build/createIconSet';

import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';
interface Props {
    name: string;
    color?: string;
    white?: boolean;
}

export const MyIcon = ({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
    return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}