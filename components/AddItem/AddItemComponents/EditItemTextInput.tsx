import { TextInput } from "react-native"
import { styles } from "../AddItemStyles";
import { store } from "expo-router/build/global-state/router-store";

interface EditItemTextInputProps {
    newStoreName: string;
    setNewStoreName: React.Dispatch<React.SetStateAction<string>>;
    storeName: string;
}

const EditItemTextInput: React.FC<EditItemTextInputProps> = ( { newStoreName, setNewStoreName, storeName } ) => {
  return (
    <TextInput
      style={styles.editTextInput}
      value={newStoreName}
      onChangeText={setNewStoreName}
      placeholderTextColor={"#F5A418"}
      placeholder={storeName}
    />
  )
}

export default EditItemTextInput