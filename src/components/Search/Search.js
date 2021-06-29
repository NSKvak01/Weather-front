import React, { Component } from 'react'
import "../../App.css"
import axios from "axios"
export class Search extends Component {
    state={
        inputValue:"",
        errorMessage:"",
    }


    handleInputOnChange=(event)=>{
        this.setState({
            inputValue:event.target.value
        })
    }

    handleSubmitButton = async (event)=>{
        event.preventDefault()

        if(this.state.inputValue.length===0){
            this.setState({
                errorMessage:"You need to enter location"
            })
        } else {
            try {
                let foundLocations = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.state.inputValue}&APPID=${process.env.REACT_APP_API_KEY}`)
                    this.setState({
                        errorMessage:"",
                        inputValue:""
                    })
                    this.props.handleInfo(foundLocations.data.main.temp, foundLocations.data.name, foundLocations.data.sys.country, foundLocations.data.weather[0].description)
                    console.log(foundLocations)
                    let foundIndex = this.props.locationList.findIndex((item)=>{
                        console.log(item)
                        if(item.location === foundLocations.data.name){
                            return item
                        }
                    })    

                    
                    if(foundIndex === -1){
                        let createLocation = await axios.post(
                            `http://localhost:3000/api/weather/add-location`,
                            {
                                location:foundLocations.data.name
                            }
                            )
                            console.log(createLocation)
                            let newArray = [...this.props.locationList, createLocation.data.payload]
                            this.props.handleLocationList(newArray)
                            // this.setState({
                            //     locationList:newArray
                            // })

                    }
                
                
            } catch (e) {
                this.setState({
                    errorMessage: `Cannot find ${this.state.inputValue} location`
                })
            }
        }
    }



    render() {
        let {inputValue, errorMessage} = this.state
        return (
            <div className="inputDiv">
                <form className="input"
                onSubmit={this.handleSubmitButton}>
                    <div className="inp">
                        <input 
                        name = "locationInput"
                        type="text"
                        value={inputValue}
                        onChange ={this.handleInputOnChange}/>
                        <button type="submit">Submit</button>
                    </div>
                        <br />
                        <span>{errorMessage}</span>
                </form>
            </div>
        )
    }
}


export default Search
