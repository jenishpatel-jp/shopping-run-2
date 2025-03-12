export const handleAddStore = async (
    storeName: string, 
    setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    setStoreName: React.Dispatch<React.SetStateAction<string>>,
    addStore: (storeName: string, callback: () => void) => Promise<void>
) => {
  if (!storeName) {
    console.warn("Store name is empty");
    return;
  }
  await addStore(storeName, () => setStoreFetchTrigger((prev) => !prev));
  setStoreName("");
}