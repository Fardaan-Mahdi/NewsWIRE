import React, { Component } from 'react'
import spinner from '../../public/spinner.gif'


export class Spinner extends Component {
  render() {
    return (
      <div className="flex justify-center m-10">
        <img src={spinner} alt="loading" width={100}/>
      </div>
    )
  }
}

export default Spinner