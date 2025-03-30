import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  background: '#121212', // Very Dark Grey (almost Black)
  text: {
    color: '#00FF00', // Neon Green / Lime
  },
  title: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#00FF00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.7)', // Slightly Transparent Black
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00FF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#00FF00',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#00FF00',
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
    backgroundColor: 'rgba(0,0,0,0.7)', // Slightly Transparent Black
    color: '#00FF00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#00FF00',
    borderWidth: 1,
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: '#000', // Black
    borderTopColor: '#00FF00',
    borderTopWidth: 0.5,
  },
  tabLabel: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#000', // Black
    borderBottomColor: '#00FF00',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    color: '#00FF00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: '#00FF00',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  cardTitle: {
    color: '#00FF00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#00FF00',
    fontSize: 14,
  },
  // Add any new theme-specific styles here
});

export const lightTheme = StyleSheet.create({
  background: '#FFFFFF', // White or very light grey
  text: {
    color: '#000000', // Black
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#DDDDDD', // Light Grey
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#FFFFFF', // White
    color: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: '#EEEEEE', // Light Grey
    borderTopColor: '#CCCCCC',
    borderTopWidth: 0.5,
  },
  tabLabel: {
    color: '#000000',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#EEEEEE', // Light Grey
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: '#000000',
  },
  card: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  cardTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#000000',
    fontSize: 14,
  },
  // Add any new theme-specific styles here
});