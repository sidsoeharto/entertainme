import React from 'react';
import { Link } from 'react-router-dom'
import { Panel, Button, ButtonGroup } from 'rsuite'

function Card ({ content, from }) {
  return (
    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, justifyContent: "center"}}>
      <img src={content.poster_path} alt={content.id} width="240" />
      <Panel style={{ alignContent: "center"}}>
        <h5 style={{textAlign: "center"}}>{content.title}</h5>
        <ButtonGroup size="sm" style={{ alignContent: "center" }}>
          <Link to={`${from}/${content._id}`}><Button appearance="ghost">Detail</Button></Link>
          <Button appearance="ghost">Favorite</Button>
        </ButtonGroup>
      </Panel>
    </Panel>
  )
}

export default Card