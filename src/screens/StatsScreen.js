import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { AppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useTranslation } from "react-i18next";
import { useGetData } from "../utils/storageUtils";
import { useFocusEffect } from "@react-navigation/native";

const StatsScreen = () => {
  const { theme } = useTheme();
  const { user } = useContext(AppContext);
  const { t } = useTranslation();
  const load = useGetData();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDistance: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    totalEatenPoints: 0,
    visitedCities: [],
    cities90: 0,
    cities100: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      const [
        totalDistance,
        averageSpeed,
        maxSpeed,
        totalEatenPoints,
        visitedCities,
        cities90,
        cities100,
      ] = await Promise.all([
        load("totalDistance"),
        load("averageSpeed"),
        load("maxSpeed"),
        load("totalEatenPoints"),
        load("visitedCities"),
        load("cities90"),
        load("cities100"),
      ]);
      console.log("STATS RAW", {
        totalDistance,
        averageSpeed,
        maxSpeed,
        totalEatenPoints,
        visitedCities,
        cities90,
        cities100,
      });
      setStats({
        totalDistance: Number(totalDistance || 0),
        averageSpeed: Number(averageSpeed || 0),
        maxSpeed: Number(maxSpeed || 0),
        totalEatenPoints: Number(totalEatenPoints || 0),
        visitedCities: visitedCities ? Array.from(new Set(visitedCities)) : [],
        cities90: Number(cities90 || 0),
        cities100: Number(cities100 || 0),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error loading stats:", error);
      // Добавьте обработку ошибок, например, отображение пользователю
    }
  }, [load]);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (global?.endMapSession) {
          await global.endMapSession(); // дождись завершения
        }
        loadStats();
      })();
    }, [loadStats])
  );
  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [loadStats])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.neon} />
        <Text
          style={{
            color: theme.colors.text,
          }}
        >
          {t("loadingStats")}
        </Text>
      </View>
    );
  }

  const statItem = (label, value) => (
    <Animatable.View
      style={styles.statCard}
      animation="fadeInUp"
      duration={1000}
    >
      <Text
        style={[
          styles.statLabel,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.statValue,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {value}
      </Text>
    </Animatable.View>
  );

  return (
    <ImageBackground
      source={require("../../assets/stats_bg.jpg")}
      style={styles.backgroundImage}
      imageStyle={{
        opacity: 0.8,
      }}
    >
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animatable.View
            style={styles.container}
            animation="fadeIn"
            duration={1000}
          >
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.title,
                  textShadowColor: theme.colors.textShadowColor,
                },
              ]}
            >
              {t("stats")}
            </Text>

            {statItem(
              "1. Километров пройдено всего",
             `${(stats.totalDistance / 1000).toFixed(2)} км`
            )}
            {statItem("2. Съедено точек всего", stats.totalEatenPoints)}
            {statItem("3. Городов посещено всего", stats.visitedCities.length)}
            {statItem("4. Городов пройдено >90%", stats.cities90)}
            {statItem("5. Городов пройдено на 100%", stats.cities100)}
            {statItem(
              "6. Средняя скорость",
              `${stats.averageSpeed.toFixed(2)} км/ч`
            )}
            {statItem(
              "7. Максимальная скорость",
              `${stats.maxSpeed.toFixed(2)} км/ч`
            )}

            {user && statItem("Пользователь", user.username)}
          </Animatable.View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 10,
  },
  statCard: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StatsScreen;
