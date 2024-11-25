import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fetchMovies } from '../../services/tmdbService.jsx';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    loadMovies();
  }, []);

  const renderMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>⭐ {item.vote_average}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReelCine</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4500',
    textAlign: 'center',
    marginBottom: 16,
  },
  movieList: {
    alignItems: 'center',
  },
  movieCard: {
    width: 150,
    margin: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 8,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
    textAlign: 'center',
  },
  movieRating: {
    fontSize: 14,
    color: '#ffcc00',
    textAlign: 'center',
  },
});

export default HomeScreen;
