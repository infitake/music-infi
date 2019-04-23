import React from 'react'
import {Consumer} from '../../context'
import Spinner from '../layout/Spinner'
import Track from './Track'

const Tracks =(props) => {
  return (
        <Consumer>
            {value => {
                const { track_list, heading } = value;
                if(track_list.length === 0 || track_list === undefined){
                    return <Spinner />
                }
                else {
                return(
                    <React.Fragment>
                        <h3 className="text-center md-4">{heading}</h3>
                        <div className="row">
                        {track_list.map(item => (
                        <Track key={item.track.track_id} track={item.track} />
                        ))}
                        </div>
                    </React.Fragment>
                )
                }
            }}
        </Consumer>
  )
}
export default Tracks;
