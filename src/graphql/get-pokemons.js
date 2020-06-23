import gql from 'graphql-tag';

export const GET_POKEMONS = gql`
	query pokemons($first: Int!) {
		pokemons(first: $first) {
			id
			name
			image
			maxCP
			maxHP
			attacks {
				special {
					name
					damage
				}
			}
		}
	}
`;

export const GET_POKEMONS_FILTER = gql`
	query pokemonfilter($name: String!) {
		pokemon(name: $name) {
			id
			name
			image
			maxCP
			maxHP
			attacks {
				special {
					name
					damage
				}
			}
		}
	}
`;
