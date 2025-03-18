import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../AddItemStyles";

interface EditButtonProps {
    setEditingStoreIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number;
}

const EditButton: React.FC<EditButtonProps> = ( { setEditingStoreIndex, index } ) => {
  return (
    <Pressable>
        <Feather
            style={styles.edit}
            name="edit"
            size={26}
            color="#F5A418"
            onPress={() => setEditingStoreIndex(index)}
        />
    </Pressable>
  )
}

export default EditButton