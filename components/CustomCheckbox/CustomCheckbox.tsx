import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
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
            hitSlop={5}
            >
            { checked && <Entypo name='check' size={24} color='white' /> }
        </Pressable>
    )
}

export default CustomCheckbox