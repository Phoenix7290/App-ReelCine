import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criando o contexto de favoritos
const FavoritesContext = createContext();

// Provider para gerenciar favoritos
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do AsyncStorage quando o app iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  // Carregar favoritos
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  // Adicionar filme aos favoritos
  const addToFavorites = async (movie) => {
    try {
      // Verificar se o filme já está nos favoritos
      const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
      
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, movie];
        setFavorites(updatedFavorites);
        
        // Salvar no AsyncStorage
        await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }
  };

  // Remover filme dos favoritos
  const removeFromFavorites = async (movieId) => {
    try {
      const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
      setFavorites(updatedFavorites);
      
      // Atualizar AsyncStorage
      await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook customizado para usar o contexto de favoritos
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};