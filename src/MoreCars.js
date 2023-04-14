import React from 'react';
import { useState, useEffect } from 'react';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import Product from './Product';

export default function MoreCars() {

    const context = useContext(dataContext);
    const { getNotes, notes } = context;

    useEffect(() => {
        
        getNotes();
                         
    },[])


    return (
        <div>

            <div className='container myNoteitem' style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>

                {notes.map((element) => {
                    return <Product Vmodel = {element.Vmodel} Rent={element.Rent} Vnumber={element.Vnumber} Scapacity = {element.Scapacity} city = {element.city} country={element.country} link = {element.image} key={element._id} _id ={element._id} status={element.status} />
                })}

            </div>

        </div>
    )
}
