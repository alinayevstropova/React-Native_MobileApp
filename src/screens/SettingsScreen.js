import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { darkTheme } from '../themes';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SettingsScreen() {
    const { logout } = useContext(AuthContext);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <ImageBackground
            source={require('../../assets/settings_bg.jpg')} // Замените на путь к вашему фоновому изображению
            style={styles.backgroundImage}
        >
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']} style={styles.gradient}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Animatable.View style={styles.container} animation="fadeIn" duration={1000}>
                        <Text style={[darkTheme.title, styles.title]}>Настройки</Text>

                        <View style={styles.settingItem}>
                            <Text style={[darkTheme.text, styles.settingText]}>Уведомления</Text>
                            <TouchableOpacity onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
                                <Icon
                                    name={notificationsEnabled ? 'toggle-on' : 'toggle-off'}
                                    size={30}
                                    color={notificationsEnabled ? '#00FFFF' : 'gray'}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={[darkTheme.text, styles.settingText]}>Темный режим</Text>
                            <TouchableOpacity onPress={() => setDarkModeEnabled(!darkModeEnabled)}>
                                <Icon
                                    name={darkModeEnabled ? 'toggle-on' : 'toggle-off'}
                                    size={30}
                                    color={darkModeEnabled ? '#00FFFF' : 'gray'}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={[darkTheme.buttonText, styles.logoutButtonText]}>Выйти</Text>
                        </TouchableOpacity>

                    </Animatable.View>
                </ScrollView>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    settingText: {
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 30,
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});