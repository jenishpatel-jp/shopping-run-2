import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './CustomCheckboxStyles';

const CustomCheckbox = () => {

    const [checked, setChecked] = useState(false);

    return (
        <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}
            >
            { checked && <Ionicons name='checkmark' size={24} color='white' /> }
        </Pressable>
    )
}

export default CustomCheckbox