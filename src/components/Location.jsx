import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paginacion from './Paginacion';
import Residents from './Residents';
import loader from "../assets/images/rickMorty2.gif"
import footerImg from "../assets/images/rickMorty4.gif"
import fondo from "../assets/images/fondo3.jpg";

const Location = () => {

    // iniciar estados
    const [location, setLocation] = useState({})  //estado para consumo de api
    const [textId, setTextId] = useState("") //estado para capturar evento en el input por el button
    const [isLoading, setIsLoading] = useState(true) //estado para pantalla de carga

    const [pagina, setPagina] = useState(1) //estado para paginacion
    const [porPagina, setPorPagina] = useState(8) //estado para cant de items por pagina

    // consumo de api
    useEffect(() => {
        const random = Math.floor(Math.random() * 125) + 1
        axios.get(`https://rickandmortyapi.com/api/location/${random}`)
            .then(res => {
                setLocation(res.data)
                setIsLoading(true)
            });
    }, [])

    // max de paginas
    const max = Math.ceil(location.residents?.length / porPagina)

    // funcion para cambiar location con button
    const typeChange = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${textId}`)
            .then(res => setLocation(res.data));
    }

    // funcion para cambiar location con enter
    const onKeyDown = e => {
        if(e.keyCode === 13){
            if(e.target.value !== ""){
            axios.get(`https://rickandmortyapi.com/api/location/${e.target.value}`)
                .then(res => setLocation(res.data));  
            }    
        }
    }


    return (
        <div className='container'>
            {
                isLoading ? (
                    <div className='loading'>
                        <img className='loading--img' src={loader} alt="" />
                        <h1>is loading...</h1>
                    </div>
                ) : (
                    <div className='location'>
                        <header className='header'>
                            <img className='img--header' src={fondo} alt="" />
                            <div className='nav--header'>
                                <input
                                    type="text"                                
                                    className='input--header'
                                    placeholder='type a location id 1-126'
                                    list='location'
                                    onKeyDown={e => onKeyDown(e)}
                                    value={textId}
                                    onChange={e => setTextId(e.target.value)}
                                />
                                <datalist>

                                </datalist>
                                <button
                                    className='button--header'
                                    onClick={typeChange}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </header>

                        <section className='infoCard'>
                            <h2>name:</h2>
                            <h2>type:</h2>
                            <h2>dimension: </h2>
                            <h2>populations:</h2>
                            <h3>{location.name}</h3>
                            <h3>{location.type} </h3>
                            <h3>{location.dimension} </h3>
                            <h3>{location.residents?.length} </h3>
                        </section>

                        <ul className='main'>
                            {
                                location.residents.length === 0 ?
                                    ( <div className='notResidents'>
                                        <h2>there are no inhabitants in this location</h2>
                                        <img className='notResidents--img' src='https://media.giphy.com/media/tJqyalvo9ahykfykAj/giphy.gif' alt="" />
                                    </div> 
                                    ) : (
                                        location.residents?.slice(
                                            (pagina - 1) * porPagina,
                                            (pagina - 1) * porPagina + porPagina
                                        ).map(character => (
                                            <Residents character={character} key={character} />
                                        ))
                                    )
                            }
                        </ul>

                        <Paginacion pagina={pagina} setPagina={setPagina} max={max} />
                        <footer className='footer'>
                            <img src={footerImg} alt="" />
                        </footer>
                    </div>
                )
            };
        </div>
    );
};

export default Location;