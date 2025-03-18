import { Pressable, Text } from "react-native";
import { handleUpdateStore } from "@/utils/addItemUtils";
import { styles } from "../AddItemStyles";

interface UpdateButtonProps {
    storeId: number;
    newStoreName: string;
    setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    setNewStoreName: React.Dispatch<React.SetStateAction<string>>;
    setEditingStoreIndex: React.Dispatch<React.SetStateAction<number | null>>;

}

const UpdateButton:React.FC<UpdateButtonProps> = ( {
    storeId,
    newStoreName,
    setStoreFetchTrigger,
    setNewStoreName,
    setEditingStoreIndex
} ) => {
  return (
    <Pressable
        onPress={() => handleUpdateStore(
            storeId, 
            newStoreName, 
            setStoreFetchTrigger, 
            setNewStoreName, 
            setEditingStoreIndex)}
        >
        <Text style={styles.buttonText}>Update</Text>
    </Pressable>
  )
}

export default UpdateButton