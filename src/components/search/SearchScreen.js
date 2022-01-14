import React from 'react'
import { useForm } from '../../hooks/useForm-';

export const SearchScreen = () => {

    const initialState= {
        searchText: ''
    }
    const [{searchText}, handleInputChange, reset] = useForm(initialState);

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(searchText)
        reset();
    }

    return (
        <>
            <h1>Busqueda</h1>
            <hr />
            <div className='row'>
                <div className='col-5'>
                    <h4>Buscar</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Ingresa un id'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button className='btn btn-primary mt-3' type='submit'>
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
