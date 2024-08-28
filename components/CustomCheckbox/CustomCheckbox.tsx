import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './CustomCheckboxStyles';

interface CustomCheckboxProps {
    checked: boolean;
    onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onPress }) => {

    return (
        <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={onPress}
            >
            { checked && <Ionicons name='checkmark' size={24} color='white' /> }
        </Pressable>
    )
}

export default CustomCheckbox