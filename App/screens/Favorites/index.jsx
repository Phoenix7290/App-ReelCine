import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  
  const renderFavoriteMovie = ({ item }) => (
    <View 
      style={[
        styles.movieCard, 
        Platform.select({
          ios: styles.movieCardIOS,
          android: styles.movieCardAndroid
        })
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
      <View style={styles.movieInfo}>
        <Text 
          style={[
            styles.movieTitle,
            Platform.select({
              ios: styles.movieTitleIOS,
              android: styles.movieTitleAndroid
            })
          ]}
        >
          {item.title}
        </Text>
        <Text style={styles.movieRating}>⭐ {item.vote_average}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromFavorites(item.id)}
      >
        <Ionicons name="trash" size={24} color="#ff4500" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View 
      style={[
        styles.container,
        Platform.select({
          ios: styles.containerIOS,
          android: styles.containerAndroid
        })
      ]}
    >
      <Text 
        style={[
          styles.header,
          Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid
          })
        ]}
      >
        Meus Favoritos
      </Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum filme favorito ainda</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteMovie}
          contentContainerStyle={styles.favoritesList}
        />
      )}
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
  favoritesList: {
    alignItems: 'center',
  },
  movieCard: {
    width: 300,
    flexDirection: 'row',
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
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
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
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
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
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Favorites;