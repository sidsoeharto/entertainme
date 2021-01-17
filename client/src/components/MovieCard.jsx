import React from 'react';
import { Link } from 'react-router-dom'
import { Panel, Button } from 'rsuite'

function HomeCard ({ content, from }) {
  return (
    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 200, justifyContent: "center"}}>
      <img src={content.poster_path} alt={content.id} width="200" />
      <Panel header={content.title}>
        <Button appearance="ghost">Detail</Button>
      </Panel>
    </Panel>
  )
}

export default HomeCard