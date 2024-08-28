import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#F5A418',
        backgroundColor: 'transparent',
        marginRight: 3

      },
    checkboxChecked: {
        backgroundColor: '#F5A418',
        alignItems: 'center',
        justifyContent: 'center',
      },
    appContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    appTitle: {
        marginVertical: 16,
        fontWeight: 'bold',
        fontSize: 24,
      },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    checkboxLabel: {
        marginLeft: 8,
        fontWeight: '500',
        fontSize: 18,
      },
    checkBoxTick: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});