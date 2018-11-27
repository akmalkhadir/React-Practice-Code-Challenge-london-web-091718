import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = ({ sushis, updatePage, eatSushi }) => {
  return (
    <Fragment>
      <div className='belt'>
        {
          sushis.map(sushi => <Sushi sushi={sushi} eatSushi={eatSushi} />)
        }
        <MoreButton updatePage={updatePage} />
      </div>
    </Fragment>
  )
}

export default SushiContainer
