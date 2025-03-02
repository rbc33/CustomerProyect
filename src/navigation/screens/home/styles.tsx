const welcomeStyles = () => {
  return {
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
      flex: 1, // Usar flex en lugar de height fija
      padding: 20,
      width: '100%', // Asegurar que ocupa todo el ancho
    },
    welcome: {
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 30, // Añadir espacio debajo del título
    },
    buttonContainer: {
      width: '100%', // Contenedor para los botones
      alignItems: 'center',
    },
  };
};

export default welcomeStyles;
