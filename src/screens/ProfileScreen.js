import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getRoute } from '../utils/storage';
import { calculateLevel, calculateExperience } from '../utils/levelSystem';
import CircularProgress from 'react-native-circular-progress-indicator';
import { darkTheme } from '../themes';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileScreen() {
    const { user, loading } = useContext(AuthContext);
    const [route, setRoute] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);
    const [level, setLevel] = useState(1);
    const [experience, setExperience] = useState(0);
    const [nextLevelExperience, setNextLevelExperience] = useState(1000); // Примерное значение

    useEffect(() => {
        const loadProfileData = async () => {
            const userRoute = await getRoute();
            setRoute(userRoute);
            const distance = calculateTotalDistance(userRoute);
            setTotalDistance(distance);
            const lvl = calculateLevel(distance);
            setLevel(lvl);
            const xp = calculateExperience(distance);
            setExperience(xp);
            setNextLevelExperience(calculateExperience(getNextLevelDistance(lvl)));
        };

        loadProfileData();
    }, []);

    const calculateTotalDistance = (route) => {
        let distance = 0;
        if (route && route.length > 1) {
            for (let i = 1; i < route.length; i++) {
                const prevPoint = route[i - 1];
                const currPoint = route[i];
                if (prevPoint && currPoint) {
                    distance += calculateDistance(
                        prevPoint.latitude,
                        prevPoint.longitude,
                        currPoint.latitude,
                        currPoint.longitude
                    );
                }
            }
        }
        return distance;
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const getNextLevelDistance = (currentLevel) => {
        // Примерная логика для расчета расстояния до следующего уровня
        return 100 * Math.pow(2, currentLevel);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <LoadingIndicator />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/profile_bg.jpg')} // Замените на путь к вашему фоновому изображению
            style={styles.backgroundImage}
        >
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']} style={styles.gradient}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Animatable.View style={styles.container} animation="fadeIn" duration={1000}>
                        <Text style={[darkTheme.title, styles.title]}>Профиль пользователя</Text>
                        {user && <Text style={[darkTheme.text, styles.text]}>Имя пользователя: {user.username}</Text>}
                        <Text style={[darkTheme.text, styles.text]}>Пройденное расстояние: {totalDistance.toFixed(2)} м</Text>
                        <View style={styles.levelContainer}>
                            <CircularProgress
                                value={experience}
                                maxValue={nextLevelExperience}
                                radius={80}
                                activeStrokeColor="#00FFFF"
                                inActiveStrokeColor="#333"
                                title={`Уровень ${level}`}
                                titleColor="#FFF"
                                valueSuffix=" XP"
                                valueSuffixTextStyle={darkTheme.text}
                                progressValueStyle={darkTheme.text}
                                activeStrokeWidth={12}
                                inActiveStrokeWidth={12}
                            />
                            <Text style={[darkTheme.text, styles.levelText]}>
                                {experience} / {nextLevelExperience} XP
                            </Text>
                        </View>
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
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    levelContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    levelText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});