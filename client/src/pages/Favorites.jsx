import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
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
  if (!data.favorites) return (<Container><h1 style={{ alignSelf: "center" }}>You have no Favorites!</h1></Container>)
  return (
    <Container>
      <h1 style={{ alignSelf: "center" }}>Your Favorites</h1>
      <Divider />
      <p>{JSON.stringify(data.favorites)}</p>
      {/* <h3> Movie List </h3>
      <FlexboxGrid justify="space-around">
        {data.favorites.map((favorite) => {
          if (favorite.type == 'movies') {
            return <Card key={favorite._id} content={favorite} from={'movies'} favorite={true}/>;
          }
        })}
      </FlexboxGrid>
      <Pagination prev
        last
        next
        first
        size="md"
        pages={10}
        style={{ alignSelf:"center" , marginTop: "20px"}}
      />
      <Divider />
      <h3> Series List </h3>
      <FlexboxGrid justify="space-around">
        {data.favorites.map((favorite) => {
          if (favorite.type == 'series') {
            return <Card key={favorite._id} content={favorite} from={'series'} favorite={true}/>;
          }
        })}
      </FlexboxGrid>
      <Pagination prev
        last
        next
        first
        size="md"
        pages={10}
        style={{ alignSelf:"center" , marginTop: "20px", marginBottom: "20px"}}
      /> */}
    </Container>
  )
}

export default Favorites