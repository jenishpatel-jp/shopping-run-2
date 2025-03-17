import { View, Text, Pressable } from "react-native";
import { styles } from "../StoreStyles";
import { handleAddStore } from "@/utils/storeUtils";
import { addStore } from "@/models/StoreModel";

interface AddStoreButtonProps {
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
  setButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
  storeName: string;
  buttonPressed: boolean;
}

const AddStoreButton: React.FC<AddStoreButtonProps> = ( { setStoreFetchTrigger, setStoreName, storeName, setButtonPressed, buttonPressed } ) => {
  return (
    <View style={styles.addButtonContainer}>
      <Pressable
        onPress={()=> handleAddStore(storeName, setStoreFetchTrigger, setStoreName, addStore)}
        onPressIn={() => setButtonPressed(true)}
        onPressOut={() => setButtonPressed(false)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#5200A3" : "#40146B",
          },
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  )
}

export default AddStoreButton