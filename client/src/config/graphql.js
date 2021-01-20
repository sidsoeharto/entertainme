import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favoritesVar } from '../cache';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favorites: {
            read() {
              return favoritesVar()
            }
          }
        }
      }
    }
  })
});

export default client