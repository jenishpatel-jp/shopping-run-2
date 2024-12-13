import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({

    card: {
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10, 
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

    buttonText:{
        color:"#F5A418",
        fontSize: 18,
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20, 
        paddingVertical: 6,
    },
});
