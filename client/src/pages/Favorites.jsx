import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, FlexboxGrid, Divider, Icon, Pagination } from 'rsuite';
import Card from '../components/Card'

const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`

function Favorites () {
  const {loading, error, data} = useQuery(GET_FAVORITES)

  console.log(data.favorites)
  
  if (loading) return (<Container justify="center"><Icon icon="spinner" spin size="5x"/></Container>)
  if (error) return <div>{JSON.stringify(error)}</div>
  if (data.favorites.length === 0) return (<Container><h1 style={{ alignSelf: "center", margin:'2rem' }}>You have no Favorites!</h1></Container>)
  return (
    <Container style={{ margin:'2rem' }}>
      <h1 style={{ alignSelf: "center" }}>Your Favorites</h1>
      <Divider />
      <h3 style={{ alignSelf: "center", margin:'2rem' }}> Movie List </h3>
      <FlexboxGrid justify="space-around">
        {data.favorites.map((favorite) => {
          if (favorite.__typename == 'Movies') {
            return <Card key={favorite._id} content={favorite} from={'movies'} favorite={true}/>;
          }
        })}
      </FlexboxGrid>
      <Divider />
      <h3 style={{ alignSelf: "center", margin:'2rem' }}> Series List </h3>
      <FlexboxGrid justify="space-around">
        {data.favorites.map((favorite) => {
          if (favorite.__typename == 'Series') {
            return <Card key={favorite._id} content={favorite} from={'series'} favorite={true}/>;
          }
        })}
      </FlexboxGrid>
    </Container>
  )
}

export default Favorites