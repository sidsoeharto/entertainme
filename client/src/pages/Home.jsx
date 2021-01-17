import React, { useEffect } from 'react';
import { Container, FlexboxGrid, Divider, Icon, Pagination } from 'rsuite';
import HomeCard from '../components/MovieCard'

import { gql, useQuery } from '@apollo/client'

const GET_DATA = gql`
  query {
    movies {
      _id
      title
      poster_path
    }
    series {
      _id
      title
      poster_path
    }
  }
`

function Home () {
  const { loading, error, data, refetch } = useQuery(GET_DATA)

  useEffect(() => {
    refetch()
  }, [data])

  if (loading) return (<Container justify="center"><Icon icon="spinner" spin size="5x"/></Container>)
  if (error) return <div>{JSON.stringify(error)}</div>
  return (
    <Container>
      <h1>Welcome to EntertainMe</h1>
      <Divider />
      <h3> Movie List </h3>
      <FlexboxGrid justify="space-around">
        {data.movies.map((movie) => {
          return <HomeCard key={movie._id} content={movie} from={"movies"} />;
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
        {data.series.map((serie) => {
          return <HomeCard key={serie._id} content={serie} from={"series"} />;
        })}
      </FlexboxGrid>
      <Pagination prev
        last
        next
        first
        size="md"
        pages={10}
        style={{ alignSelf:"center" , marginTop: "20px", marginBottom: "20px"}}
      />
      <button onClick={() => refetch()}>Refetch!</button>
    </Container>
  )
}

export default Home