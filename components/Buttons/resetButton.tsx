import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { styles } from './resetButtonStyles';

interface ResetButtonProps {
  reset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
  return (
    <View style={styles.resetButtonContainer}>
      <Pressable onPress={reset}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
};

export default ResetButton;