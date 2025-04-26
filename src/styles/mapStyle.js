const mapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }], // Глубокий черный фон карты
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2A2A2A" }], // Тёмный цвет зданий
  },
  {
    featureType: "poi",
    elementType: "geometry.stroke",
    stylers: [{ color: "#444" }, { weight: 1.5 }], // Контуры POI
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#333333" }], // Бизнес-центры чуть ярче
  },
  {
    featureType: "poi.attraction",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#555" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#252525" }], // Парки темнее, чтобы выделялись
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b6b6b" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#00FFFF" }], // 🟢 НЕОНОВЫЕ ДОРОГИ
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#FFFFFF" }, { weight: 1.5 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#00FFFF" }], // 🛣️ НЕОН ДЛЯ ТРАСС
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#333" }, { weight: 1.5 }], // Контур тёмный
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#00FFFF" }], // 💠 НЕОН ДЛЯ МЕСТНЫХ ДОРОГ
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#252525" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d1b39c" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#333" }], // Вода чуть темнее, для контраста
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#444" }, { weight: 2 }], // Контуры зданий темные
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

export default mapStyle;
