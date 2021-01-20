import React from 'react';
import { Link } from 'react-router-dom'
import { Panel, Button, ButtonGroup, ButtonToolbar, Alert } from 'rsuite'
import { favoritesVar } from "../cache"
import { useHistory } from 'react-router-dom'

function Card ({ content, from, favorite }) {

  const addFavorites = (data) => {
    const prevData = favoritesVar()
    if (!prevData.some(el => el._id == data._id)) {
      favoritesVar([data, ...prevData])
      Alert.success("Added to favorites")
    } else {
      Alert.error("Already added to favorites")
    }
  }


  const history = useHistory()
  

  return (
    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, justifyContent: "center", minHeight: "500px"}}>
      <img src={content.poster_path} alt={content.id} width="240" />
      <Panel style={{ alignContent: "center"}}>
        <h5 style={{textAlign: "center"}}>{content.title}</h5>
        <ButtonGroup size="sm" style={{ alignContent: "center", alignSelf: "center", marginTop:'1rem' }} justified>
          <Button appearance="ghost" onClick={() => history.push(`/${from}/${content._id}`)}>Detail</Button>
          {(!favorite) && <Button appearance="ghost" color="red" onClick={() => addFavorites(content)}>Favorite</Button>}
        </ButtonGroup>
      </Panel>
    </Panel>
  )
}

export default Card