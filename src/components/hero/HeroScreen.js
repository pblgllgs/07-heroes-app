import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroeById } from '../../selectores/getHeroeById';

export const HeroScreen = () => {

    const navigate = useNavigate();

    const handleReturn = ()=> {
        navigate(-1);
    }

    const { heroeId } = useParams();

    //Asi no se vuelve a llamar la funcion cada vez que se carga la pantalla,
    // y solo se actualiza si cambia el valor de heroeId
    const heroe = useMemo(() => getHeroeById(heroeId),[heroeId]);

    if (!heroe) {
        return <Navigate to='/' />
    }

    const { id, superhero, publisher, alter_ego, first_appearance, characters } = heroe

    const imgPath = `/assets/${heroe.id}.jpg`;
    
    return (
        <div className='row mt-5'>
            <div className='col-4 animate__animated animate__bounceInLeft'>
                <img src={imgPath} alt={superhero} className='img-thumbnail' />
            </div>
            <div className='col-8 animate__animated animate__fadeInRight'>
                <h1>{id}</h1>
                <h3>{superhero}</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter ego: </b>{alter_ego} </li>
                    <li className='list-group-item'><b>Publisher: </b>{publisher} </li>
                    <li className='list-group-item'><b>First Appearance: </b>{first_appearance} </li>
                </ul>
                <h5 className='mt-3'>Characters</h5>
                <p>{characters}</p>

                <button className='btn btn-outline-info' onClick={handleReturn}>
                    Regresar
                </button>

            </div>
        </div>
    )
}
