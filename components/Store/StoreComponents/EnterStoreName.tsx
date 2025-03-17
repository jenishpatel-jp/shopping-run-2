import { TextInput } from "react-native";
import { styles } from "../StoreStyles";

interface EnterStoreNameProps {
  storeName: string;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
}

const EnterStoreName: React.FC<EnterStoreNameProps> = ( { storeName, setStoreName } ) => {
  return (
    <TextInput
            style={styles.textInput}
            placeholder="Enter store name..."
            placeholderTextColor={"#F5A418"}
            textAlign="center"
            value={storeName}
            onChangeText={setStoreName}
        />
  )
}

export default EnterStoreName