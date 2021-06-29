import React, { Component } from 'react'
import RecentlySearchedLocations from "./components/RecentlySearchedLocations/RecentlySearchedLocations"
import Search from "./components/Search/Search"
import Display from "./components/Display/Display"
import axios from "axios"
import "./App.css"
import List from './components/RecentlySearchedLocations/List'
export class App extends Component {
  state = {
    locationList:[],
    temperature:"",
    name:"Weather",
    country:"",
    description:"",
  }

  async componentDidMount() {
    try {
        let allLocations = await axios.get(
            `http://localhost:3000/api/weather/get-all-searched-locations`
        );
        this.setState({
          locationList:allLocations.data.payload
        })
      
        console.log(this.state.locationList);
    } catch (e) {
        console.log(e);
    }
}    
  handleInfo = (temp, name, country, description)=>{
    this.setState({
      temperature:temp,
      name:name,
      description:description,
      country:country
    })
  }

handleDelete = (filteredArray)=>{
  this.setState({
    locationList:filteredArray
  })
}
  handleLocationList = (location)=>{
    console.log(location)
    this.setState({
      locationList:location,
    })
  }

  handleOnClick = async (location)=>{
    try {
      let foundLocations = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&APPID=${process.env.REACT_APP_API_KEY}`)
          this.setState({
              errorMessage:"",
          })
          console.log(foundLocations)
          this.handleInfo(foundLocations.data.main.temp, foundLocations.data.name, foundLocations.data.sys.country, foundLocations.data.weather[0].description)
  } catch (e) {
      console.log(e)
  }
}

  render() {
    let {temperature, name, country, description} = this.state
    return (
      <div className="main-div">
        <h1>Weather App</h1>
        <Search 
        handleInfo = {this.handleInfo}
        handleLocationList = {this.handleLocationList}
        locationList={this.state.locationList}
        />
        <div className = "main">
          <div className="column">
          <RecentlySearchedLocations />
            {this.state.locationList.map((item) => {
              return <List
                  key={item._id} 
                  item={item} 
                  _id={item._id}
                  locationList={this.state.locationList}
                  handleDelete={this.handleDelete}
                  handleOnClick = {this.handleOnClick}
                  />
                })}
          </div>
          <Display 
          className = "display"
          temperature = {temperature}
          country = {country}
          description = {description}
          name={name}
          />
        </div>
      </div>
    )
  }
}

export default App
