import React from 'react';
import { Link } from 'react-router-dom'
import { Panel, Button } from 'rsuite'

function SeriesCard ({ content, from }) {
  return (
    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
      <img src={content.poster_path} alt={content.id} width="240" />
      <Panel header={content.title}>
        <Button appearance="ghost">Ghost</Button>
      </Panel>
    </Panel>
  )
}

export default SeriesCard