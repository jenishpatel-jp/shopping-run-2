import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './CustomCheckboxStyles';

const CustomCheckbox = () => {
    return (
        <Pressable
            style={[styles.checkboxBase, ]}
        >
        </Pressable>
    )
}

export default CustomCheckbox