import React from 'react'
import { getHeroesByPublisher } from '../../selectores/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    const heroes = getHeroesByPublisher(publisher);

    return (
        <div className='row rows-cols-1 row-cols-3 g-3'>

            {
                heroes.map(hero => (
                    <HeroCard
                        key={hero.id}
                        { ...hero } />
                ))
            }

        </div>
    )
}
