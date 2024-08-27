import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({ 

    card: {
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 1,
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

    text: {
        color: "#F5A418",
        fontSize: 24,
    },

    textInput: {
        color:"#F5A418",
        fontSize: 18,
        backgroundColor: "#5200A3",
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    addButtonContainer: {
        alignItems:'flex-end',
        justifyContent: 'center',
        paddingTop: 5,
        marginTop: 4,
        marginBottom: 1,
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

    buttonText:{
        color:"#F5A418",
        fontSize: 18,
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20, 
        paddingVertical: 6,
    },

    checkboxContainer: {
        flexDirection: "row",
        margin: 2,
        flex: 1,
        alignItems: "flex-end",
    },

    checkboxText: {
        color:"#F5A418",
        fontSize: 20,
        padding: 2,
        margin: 2,
        textAlignVertical: 'bottom'
    },

    storeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginVertical: 1,

    },

    updateView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        
    },

    edit: {
        marginVertical: 6,
        padding: 2,
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5

    },

    delete: {
        marginVertical: 5,
        padding: 2,
        alignItems: "center"

    },

    checkbox: {
        marginTop: 11,
        marginHorizontal: 4,
        alignItems: "flex-end",
        marginBottom: 7,
    },

    storeButtons: {
        flexDirection: "row",
        flex: 1,
        padding: 2,
        margin: 1,
        alignItems: "center",
    }
});