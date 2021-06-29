import React, { Component } from 'react'
import "../../App.css"
import axios from "axios"

export class List extends Component {
    handleDeleteByID = async (_id)=>{
        try {
            let deleteItem = await axios.delete(
                `http://localhost:3000/api/weather/delete-location-by-id/${_id}`,
                );
                let filteredArray = this.props.locationList.filter((item)=> item._id !== deleteItem.data.payload._id)
                this.props.handleDelete(filteredArray)
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        const {item} = this.props
        return (
            <div >
                <div className="listLocation">
                    <li className="listItem"
                    onClick={()=>this.props.handleOnClick(item.location)}>
                        {item.location}
                    </li>
                <button className="buttonList"
                onClick = {()=>this.handleDeleteByID(item._id)}
                _id={item._id}
                >Remove
                </button>
                </div>
                
            </div>
        )
    }
}

export default List
