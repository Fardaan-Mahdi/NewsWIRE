import React, { Component } from 'react'
import spinner from '../../public/spinner.gif'


export class Spinner extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <img src={spinner} alt="loading" />
      </div>
    )
  }
}

export default Spinner