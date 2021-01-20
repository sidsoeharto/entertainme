import React, { useState } from 'react';
import { Container, FlexboxGrid, Divider, Icon, Pagination, Button, ButtonToolbar, Modal } from 'rsuite';
import { gql, useQuery, useMutation } from "@apollo/client"
import { Form, FormGroup, FormControl, ControlLabel, InputNumber, HelpBlock } from 'rsuite'
import { Schema } from 'rsuite';

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

const CREATE_SERIES = gql`
  mutation createSeries($inputSeries: SeriesInput) {
    createSeries(series: $inputSeries) {
      title
    }
  }
`

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? 'has-error' : ''}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

function Series () {
  const [createSeries] = useMutation(CREATE_SERIES)
  const [inputTitle, setInputTitle] = useState('')
  const [inputOverview, setInputOverview] = useState('')
  const [inputPoster, setInputPoster] = useState('')
  const [inputPopularity, setInputPopularity] = useState(0)
  const [inputTags, setInputTags] = useState([])

  const [show, setShow] = useState(false)

  function addSeries (e) {
    const inputSeries = {
      title: inputTitle,
      overview: inputOverview,
      poster_path: inputPoster,
      popularity: parseFloat(inputPopularity),
      tags: inputTags.split(",").map((el) => el.trim())
    }
    
    console.log(inputSeries)

    createSeries({
      variables: {
        inputSeries: {
          title: inputSeries.title,
          overview: inputSeries.overview,
          poster_path: inputSeries.poster_path,
          popularity: inputSeries.popularity,
          tags: inputSeries.tags
        }
      }
    })

    setInputTitle('')
    setInputOverview('')
    setInputPoster('')
    setInputPopularity(0)
    setInputTags([])
    setShow(false)
  }

  const handleClose = () => {
    setInputTitle('')
    setInputOverview('')
    setInputPoster('')
    setInputPopularity(0)
    setInputTags([])
    setShow(false)
  }
  const handleShow = () => setShow(true)
  
  const handleTitle = (e) => {
    setInputTitle(e);
  };
  const handleOverview = (e) => {
    setInputOverview(e);
  };
  const handlePoster = (e) => {
    setInputPoster(e);
  };
  const handlePopularity = (e) => {
    setInputPopularity(e);
  };
  const handleTags = (e) => {
    setInputTags(e);
  };

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    title: StringType().isRequired('Title is required'),
    overview: StringType().isRequired('Overview is required'),
    poster_path: StringType().isRequired('Poster is required in URL format'),
    popularity: NumberType(),
    tags: StringType()
  })

  const { loading, error, data, refetch } = useQuery(GET_SERIES)

  if (loading) return (<Container justify="center"><Icon icon="spinner" spin size="5x"/></Container>)
  if (error) return <div>{JSON.stringify(error)}</div>
  return (
    <Container style={{ margin:'2rem' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            fluid 
            onSubmit={addSeries} 
            model={model}
            formValue = {{
              title: inputTitle,
              overview: inputOverview,
              poster_path: inputPoster,
              popularity: inputPopularity,
              tags: inputTags
            }}
          >
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl name="title" type="text" onChange={handleTitle}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Overview</ControlLabel>
              <FormControl name="overview" type="textarea" rows={5} componentClass="textarea" onChange={handleOverview}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Poster Path</ControlLabel>
              <FormControl name="poster_path" type="text" onChange={handlePoster}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Popularity</ControlLabel>
              <CustomField
                name="popularity"
                accepter={InputNumber}
                step={0.1}
                min={0}
                max={10}
                onChange={handlePopularity}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Tags</ControlLabel>
              <FormControl name="tags" type="text" onChange={handleTags}/>
            </FormGroup>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <h1 style={{ alignSelf: "center"}}>EntertainMe Series</h1>
      <ButtonToolbar style={{ alignSelf: "center", marginTop:'1rem'}}>
        <Button appearance="primary" onClick={handleShow}>Add Movie</Button>
      </ButtonToolbar>
      <Divider />
      <FlexboxGrid justify="space-around">
        {data.series.map((serie) => {
          return <Card key={serie._id} content={serie} from={"series"} />;
        })}
      </FlexboxGrid>
    </Container>
  )
}

export default Series