import React from 'react';
import banner from './img/banner_amazon.png';
import Product from './Product';
import './css/Home.css';
import dataContext from './states/DataContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    const context = useContext(dataContext);
    const { getNotes, notes } = context;

    useEffect(() => {

        getNotes();

    })


    return (
        <div className='home'>

            <div className="home_container">

                <img className='home_image'
                    src={banner} alt="Nothing" />

            </div>


            <div className='home_head'>

                <div>
                    <h1>Recently Added Cars</h1>
                </div>

                <div>
                    <Link to='/morecars'>

                        <button className="btn-block btn-primary" style={{ color: "black", marginRight: "100px", }}>All cars</button>

                    </Link>

                </div>

            </div>
            <div className="home_row">
                {notes.map((element, index) => {
                    if (index < 3) {

                        return <Product Vmodel={element.Vmodel} Rent={element.Rent} Vnumber={element.Vnumber} Scapacity={element.Scapacity} city={element.city} country={element.country} link={element.image} key={element._id} _id={element._id} status={element.status} />
                    }

                    return null;


                })}

            </div>

            <div className="home_row">
                {notes.map((element, index) => {
                    if (index > 2 && index < 7) {
                        return <Product Vmodel={element.Vmodel} Rent={element.Rent} Vnumber={element.Vnumber} Scapacity={element.Scapacity} city={element.city} country={element.country} link={element.image} key={element._id} _id={element._id} status={element.status} />
                    }

                    return null;
                })}


            </div>

            <div className="home_row">
                {notes.map((element, index) => {
                    if (index > 6) {
                        return <Product Vmodel={element.Vmodel} Rent={element.Rent} Vnumber={element.Vnumber} Scapacity={element.Scapacity} city={element.city} country={element.country} link={element.image} key={element._id} _id={element._id} status={element.status} />
                    }

                    return null;
                })}

            </div>


        </div>
    )
}
