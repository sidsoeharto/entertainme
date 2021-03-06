import React, { useEffect } from 'react';
import { Container, FlexboxGrid, Divider, Icon, Pagination } from 'rsuite';
import Card from '../components/Card'
import CustomLoader from '../components/CustomLoader'

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

  if (loading) return (<CustomLoader />)
  if (error) return <div>{JSON.stringify(error)}</div>
  return (
    <Container style={{ margin:'2rem' }}>
      <h1 style={{ alignSelf: "center" }}>Welcome to EntertainMe</h1>
      <Divider />
      <h3 style={{ alignSelf: "center", margin:'2rem' }}> Movie List </h3>
      <FlexboxGrid justify="space-around">
        {data.movies.map((movie) => {
          return <Card key={movie._id} content={movie} from={"movies"} />;
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
      <h3 style={{ alignSelf: "center", margin:'2rem' }}> Series List </h3>
      <FlexboxGrid justify="space-around">
        {data.series.map((serie) => {
          return <Card key={serie._id} content={serie} from={"series"} />;
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
    </Container>
  )
}

export default Home