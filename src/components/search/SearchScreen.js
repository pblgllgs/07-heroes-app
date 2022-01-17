import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm-";
import { getHeroesByName } from "../../selectores/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import queryString from "query-string";

export const SearchScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { q = '' } = queryString.parse(location.search);

    const initialState = {
        searchText: q,
    };
    const [{ searchText }, handleInputChange, reset] = useForm(initialState);

    const heroesFiltrados = useMemo(() => getHeroesByName(q),[q]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    };

    return (
        <>
            <h1>Busqueda</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Ingresa un nombre..."
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-primary mt-3" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />
                    {
                        (q === '')
                        ? <div className="alert alert-info">Acá se mostrarán las coincidencias</div>
                        : (heroesFiltrados.length === 0 ) && <div className="alert alert-danger">No hay resultados para {q}</div>
                    }
                    {heroesFiltrados.map((heroe) => (
                        <HeroCard key={heroe.id} {...heroe} />
                    ))}
                </div>
            </div>
        </>
    );
};
