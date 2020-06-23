import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { PokemonsContainer } from './container/pokemonContainer';
import './App.scss';

function App() {
	const client = new ApolloClient({
		uri: 'https://graphql-pokemon.now.sh/',
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<main className="main__container">
				<PokemonsContainer />
			</main>
		</ApolloProvider>
	);
}

export default App;
