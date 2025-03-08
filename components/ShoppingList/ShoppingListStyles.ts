import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 1,
        ...Platform.select({
            ios: {
                shadowOffset: {width: 2, height: 2},
                shadowColor: "black",
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            }
        })
    },
    item: {
        color: "#F5A418",
        fontSize: 18,
        padding: 2,

    },

    storeName: {
        color: "#F5A418",
        fontSize: 24,
        fontWeight: "bold",
        padding: 2,
        margin: 2,
    },

    checkboxContainer: {
        flexDirection: "row",
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkbox: {
        marginTop: 7,
        padding: 3,
        marginLeft: 10,
        marginRight: 2,
        width: 24,
        height: 24,
        alignItems:'center',
        justifyContent: 'center',

    },

    checkboxText: {
        color:"#F5A418",
        fontSize: 18,
        padding: 2,
        margin: 2,
    },

    editTextInput: {
        color:"#F5A418",
        fontSize: 18,
        backgroundColor: "#5200A3",
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop:8,
        marginRight:10,
        flex: 1,
    },

    updateView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 10,
    },

    edit: {
        marginVertical: 6,
        padding: 2,
        alignItems: "center",
        marginRight: 5,

    },

    delete: {
        marginVertical: 5,
        padding: 2,
        alignItems: "center",

    },

    itemsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 1,
    },

    buttonText: {
        color:"#F5A418",
        fontSize: 18,
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20, 
        paddingVertical: 6,
    },

    completedTitle: {
        color:"#F5A418",
        fontSize: 22,
        fontWeight:"bold", 
        marginTop: 5,
        padding: 2, 
        marginLeft: 5

    },
    completedItems: {
        color:"#F5A418",
        fontSize: 18, 
        textDecorationLine:"line-through",
        marginLeft: 10,
        padding: 2, 
        marginVertical: 2,
    },

    completedContainer: {
        borderColor: "#F5A418",
        borderTopWidth: 2,
        borderRadius: 5,
    }
});