import React from 'react';
import { Container, FlexboxGrid, Divider, Icon, Pagination, Button, ButtonToolbar } from 'rsuite';
import { gql, useQuery, useMutation } from "@apollo/client"

import Card from '../components/Card'

const GET_SERIES = gql`
  query {
    series {
      _id
      title
      poster_path
    }
  }
`

function Series () {
  const { loading, error, data, refetch } = useQuery(GET_SERIES)

  if (loading) return (<Container justify="center"><Icon icon="spinner" spin size="5x"/></Container>)
  if (error) return <div>{JSON.stringify(error)}</div>
  return (
    <Container>
      <h1 style={{ alignSelf: "center"}}>EntertainMe Series</h1>
      <Divider />
      <ButtonToolbar style={{ alignSelf: "center" }}>
        <Button appearance="primary">Add Series</Button>
      </ButtonToolbar>
      <FlexboxGrid justify="space-around">
        {data.series.map((serie) => {
          return <Card key={serie._id} content={serie} from={"series"} />;
        })}
      </FlexboxGrid>
    </Container>
  )
}

export default Series