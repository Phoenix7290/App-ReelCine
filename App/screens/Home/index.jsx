import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchMovies } from '../../services/tmdbService.jsx';
import { useFavorites } from '../../context/FavoritesContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const { addToFavorites } = useFavorites();

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    loadMovies();
  }, []);

  const MovieCard = ({ item, index }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [null, { dx: pan.x, dy: pan.y }],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
          if (gestureState.dx > SWIPE_THRESHOLD) {
            Animated.parallel([
              Animated.timing(pan.x, {
                toValue: SCREEN_WIDTH,
                duration: 300,
                useNativeDriver: true
              }),
              Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
              })
            ]).start(() => {
              addToFavorites(item);
              
              const newMovies = [...movies];
              newMovies.splice(index, 1);
              setMovies(newMovies);
            });
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true
            }).start();
          }
        }
      })
    ).current;

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.movieCard,
          Platform.select({
            ios: styles.movieCardIOS,
            android: styles.movieCardAndroid
          }),
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              {
                rotate: pan.x.interpolate({
                  inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                  outputRange: ['-30deg', '0deg', '30deg']
                })
              }
            ],
            opacity: opacity
          }
        ]}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={[
            styles.movieImage,
            Platform.select({
              ios: styles.movieImageIOS,
              android: styles.movieImageAndroid
            })
          ]}
        />
        <Text style={[
          styles.movieTitle,
          Platform.select({
            ios: styles.movieTitleIOS,
            android: styles.movieTitleAndroid
          })
        ]}>
          {item.title}
        </Text>
        <Text style={styles.movieRating}>⭐ {item.vote_average}</Text>
        
        <View style={styles.swipeIndicator}>
          <Text style={styles.swipeText}>Arraste para a direita → </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[
      styles.container,
      Platform.select({
        ios: styles.containerIOS,
        android: styles.containerAndroid
      })
    ]}>
      <Text style={[
        styles.header,
        Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      ]}>
        ReelCine
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <MovieCard item={item} index={index} />
        )}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  containerIOS: {
    paddingTop: 50, // Ajuste para a área segura do iOS
  },
  containerAndroid: {
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4500',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerIOS: {
    fontFamily: 'Arial-BoldMT', // Fonte típica do iOS
  },
  headerAndroid: {
    fontFamily: 'sans-serif-medium', // Fonte típica do Android
  },
  movieList: {
    alignItems: 'center',
  },
  movieCard: {
    width: 250,
    margin: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  movieCardIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  movieCardAndroid: {
    elevation: 5,
  },
  movieImage: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  movieImageIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  movieImageAndroid: {
    elevation: 3,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
    textAlign: 'center',
  },
  movieTitleIOS: {
    fontFamily: 'Helvetica',
  },
  movieTitleAndroid: {
    fontFamily: 'sans-serif',
  },
  movieRating: {
    fontSize: 14,
    color: '#ffcc00',
    textAlign: 'center',
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  swipeText: {
    color: 'white',
    fontSize: 12,
  }
});

export default HomeScreen;