import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EditForm from './EditForm';
import BackDrop from '../components/Backdrop/Backdrop';

export const Pokemon = ({ pokemon }) => {
	const client = useApolloClient();
	const [isEdit, setEdit] = useState(false);
	const [newName, setNewName] = useState('');

	const CHANGE_POKEMON = gql`
		fragment myPokemon on pokemons {
			id
			name
		}
	`;

	const startEdit = () => {
		setEdit(true);
	};

	const modalConfirmHandler = () => {
		setEdit(false);
		const previous = client.readFragment({
			id: 'Pokemon:' + pokemon.id,
			fragment: CHANGE_POKEMON
		});

		client.writeFragment({
			id: 'Pokemon:' + pokemon.id,
			fragment: CHANGE_POKEMON,
			data: {
				name: newName,
				__typename: 'Pokemon',
				id: pokemon.id
			}
		});
	};

	const modalCancelhandler = () => {
		setEdit(false);
	};

	return (
		<>
			{isEdit && (
				<>
					<BackDrop />
					<EditForm
						title=" Editar Pokemon"
						canCancel
						canConfirm
						onCancel={modalCancelhandler}
						onConfirm={modalConfirmHandler}
						confirmText="Confirm"
					>
						<form onSubmit={(e) => e.preventDefault()}>
							<div className="form-control">
								<label htmlFor="title">Pokemon</label>
								<input
									type="text"
									id="title"
									placeholder={pokemon.name}
									onChange={(e) => setNewName(e.target.value)}
								></input>
							</div>
						</form>
					</EditForm>
				</>
			)}
			<div className="pokemon">
				<div className="pokemon__name">
					<p>{pokemon.name}</p>
				</div>
				<div className="pokemon__meta">
					<span> {pokemon.maxHP}</span>
					<span> {pokemon.maxCP}</span>
				</div>
				<div className="pokemon__image">
					<img src={pokemon.image} alt={pokemon.name} />
				</div>
				<div className="pokemon__attacks">
					{pokemon &&
						pokemon.attacks &&
						pokemon.attacks.special
							.slice(0, 3)
							.map((attack) => (
								<span key={`${attack.name}-${attack.damage}`}>
									{attack.name}
								</span>
							))}
				</div>
				<div className="pokemon__edit">
					<button onClick={startEdit}>Editar</button>
				</div>
			</div>
		</>
	);
};
