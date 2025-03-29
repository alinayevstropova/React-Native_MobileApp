import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Very Dark Grey
  },
  text: {
    color: '#00FFFF', // Cyan / Aqua
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#00FFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly transparent Dark Grey
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  levelProgress: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly transparent Dark Grey
    color: '#00FFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#00FFFF',
    borderWidth: 1,
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: '#121212',
    borderTopColor: '#00FFFF',
    borderTopWidth: 0.5,
  },
  tabLabel: {
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#121212',
    borderBottomColor: '#00FFFF',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: '#00FFFF',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  cardTitle: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#00FFFF',
    fontSize: 14,
  },
});
