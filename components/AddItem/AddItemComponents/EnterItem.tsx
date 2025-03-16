import { TextInput } from "react-native";
import { styles } from "../AddItemStyles";

interface EnterItemTextInputProps {
  itemName: string; 
  setItemName: React.Dispatch<React.SetStateAction<string>>;
}

export const EnterItemTextInput: React.FC<EnterItemTextInputProps> = ({
    itemName,
    setItemName
}
) => {
  return (
    <TextInput
            placeholder="Enter Item"
            style={styles.textInput}
            placeholderTextColor={"#F5A418"}
            textAlign="center"
            value={itemName}
            onChangeText={setItemName}
          />
  )
}
