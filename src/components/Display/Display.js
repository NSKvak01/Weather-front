import React, { Component } from 'react'
import "../../App.css"

export class Display extends Component {
    render() {
        return (
            <div className="mainDisplay">
                <h2>{this.props.name}      {this.props.country}</h2>
                <div className = "display">
                    <h3>{this.props.temperature}</h3>
                    <h3>{this.props.description}</h3>
                </div>
            </div>
        )
    }
}

export default Display
