import React, { Component } from 'react'
import Navbar from './components/NavBar'
import News from './components/News'

export default class App extends Component {
  render() {
    return (
      <>
       <Navbar/>
       <News/>
      </>
    )
  }
}
