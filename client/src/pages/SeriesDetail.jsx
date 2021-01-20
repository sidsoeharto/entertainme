import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FlexboxGrid, Button, ButtonToolbar, ButtonGroup, Container, Panel, Divider, Modal } from 'rsuite';
import { Form, FormGroup, FormControl, ControlLabel, InputNumber, HelpBlock } from 'rsuite'
import { Schema, Alert, Icon } from 'rsuite';

const GET_DETAIL_SERIES = gql`
  query seriesById($id: String!) {
    seriesById(id: $id) {
      title,
      overview,
      poster_path,
      tags,
      popularity
    }
  }
`

const UPDATE_SERIES = gql`
  mutation updateSeries($id: String!, $updates: SeriesInput) {
    updateSeries(id: $id, updates: $updates) {
      title,
      overview,
      poster_path,
      tags,
      popularity
    }
  }
`

const DELETE_SERIES = gql`
  mutation deleteSeries ($id: String!) {
    deleteSeries(id: $id) {
      _id
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

function SeriesDetail () {
  const { id } = useParams()
  const history = useHistory()
  const [inputSeries, setInputSeries] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0,
    tags: []
  })

  const [updateSeries] = useMutation(UPDATE_SERIES)
  const [deleteSeries] = useMutation(DELETE_SERIES)

  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setInputSeries(data.seriesById)
    setShow(true)
  }

  const handleTitle = (e) => {
    setInputSeries({...inputSeries, title: e});
  };
  const handleOverview = (e) => {
    setInputSeries({...inputSeries, overview: e});
  };
  const handlePoster = (e) => {
    setInputSeries({...inputSeries, poster_path: e});
  };
  const handlePopularity = (e) => {
    setInputSeries({...inputSeries, popularity: e});
  };
  const handleTags = (e) => {
    setInputSeries({...inputSeries, tags: e});
  };


  function updateHandler (e) {   
    console.log(inputSeries)

    updateSeries({
      variables: {
        id: id,
        updates: {
          title: inputSeries.title,
          overview: inputSeries.overview,
          poster_path: inputSeries.poster_path,
          popularity: parseFloat(inputSeries.popularity),
          tags: inputSeries.tags.split(",").map((el) => el.trim())
        }
      }
    })

    Alert.success("Success updating series")
    refetch()
    
  }

  async function deleteHandler(e) {
    await deleteSeries({ variables: { id }})
    refetch();
    Alert.success("Success deleting series")
    history.goBack()
  }

  let { loading, error, data, refetch } = useQuery(GET_DETAIL_SERIES, {
    variables: { id: id }
  })

  useEffect(() => {
    refetch()
  }, [])

  console.log(id, typeof(id))
  console.log(loading, error, data)

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    title: StringType().isRequired('Title is required'),
    overview: StringType().isRequired('Overview is required'),
    poster_path: StringType().isRequired('Poster is required in URL format'),
    popularity: NumberType(),
    tags: StringType()
  })

  if(loading) return (<div>Loading...</div>)
  if (error) return (<div>{JSON.stringify(error)}</div>)
  return (
    <FlexboxGrid style={{ marginTop: "75px" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            fluid 
            onSubmit={updateHandler} 
            model={model}
            formDefaultValue={inputSeries}
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
      <Modal backdrop="static" show={showDelete} onHide={() => setShowDelete(false)} size="xs">
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24
            }}
          />
          {'  '}
          Are you sure you want to delete this series?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteHandler} appearance="primary">
            Yes
          </Button>
          <Button onClick={() => setShowDelete(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <FlexboxGrid.Item colspan={8}>
        <Panel shaded bodyFill style={{width: "300px", justifyContent: "center", marginLeft: "75px"}}>
          <img 
            style={{ width: "300px" }}
            src={data.seriesById.poster_path}
          />
        </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={16}>
        <Panel shaded>
          <h3>{data.seriesById.title}</h3>
          <Divider />
          <h5>Overview:</h5>
          <h6>{data.seriesById.overview}</h6>
          <Divider />
          <h5>Popularity:</h5>
          <h6>{data.seriesById.popularity}</h6>
          <Divider />
          <h5>Tags:</h5>
          {data.seriesById.tags.map((el) => {
            return (
              <Button
                disabled
                appearance="subtle"
                key={el}
              >
                {el}
              </Button>
            );
          })}
          <Divider />
          <ButtonToolbar>
            <ButtonGroup>
              <Button appearance="ghost" onClick={handleShow}>Edit</Button>
              <Button appearance="ghost" onClick={() => setShowDelete(true)}>Delete</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default SeriesDetail