import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../graphql/get-pokemons';
import { Pokemon } from '../components/Pokemon';

export const PokemonsContainer = () => {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');

	const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
		variables: { first: 50 }
	});

	const onChange = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		if (pokemons) {
			setFilter(
				pokemons.filter((pok) =>
					pok.name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}

		console.log('search');
	}, [pokemons, search]);

	return (
		<div className="container">
			<div className="filtro">
				<input type="text" placeholder="Procurar" onChange={onChange} />
			</div>

			{filter &&
				filter.map((pokemon) => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
		</div>
	);
};
