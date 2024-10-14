import React from 'react'
import Page from './Page'
import { Button, Box, FormGroup, FormControl } from '@mui/material'
import { getCurrentUser } from '../services/users'
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemonSpriteUrl, fetchPokemon } from '../services/APIPokmeon';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addPokemonToCurrentUserInLocalStorage, deletePokemonToCurrentUserInLocalStorage, setUsersInLocalStorage, getUsersInLocalStorage } from '../services/users'

function Pokemon() {

    const [user, setUser] = useState(null);

    const { id } = useParams();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const userData = getCurrentUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        if (user !== null) {
            const updatedUsers = getUsersInLocalStorage().map(u => u.id === user.id ? user : u);
            setUsersInLocalStorage(updatedUsers);
        }
    }, [user])

    useEffect(() => {
        async function fetchData() {
            const pokemonData = await fetchPokemon(id);
            if (pokemonData) {
                setPokemon(pokemonData);
            }
        }
        fetchData();
    }, []);

    const handleAddPokemon = () => {
        addPokemonToCurrentUserInLocalStorage(id, pokemon);
        setUser(getCurrentUser());
    }

    const handleDeletePokemon = () => {
        deletePokemonToCurrentUserInLocalStorage(id);
        setUser(getCurrentUser());
    }

    return (
        <Page>
            <Box>
                <Box>
                    {user && pokemon && pokemon.name && (
                        <PokemonCard name={pokemon.name} stats={pokemon.stats} types={pokemon.types} id={id} image={getPokemonSpriteUrl(id)} />
                    )}
                </Box>
                <FormGroup>
                    <FormControl sx={{ marginBottom: 2 }}>
                        <Link>
                            {user && user.pokemon.some(userPokemon => userPokemon.id === id) ? (
                                <Button onClick={() => { handleDeletePokemon() }} variant="contained" fullWidth>Supprimer du pokedex</Button>
                            ) : (
                                <Button onClick={() => { handleAddPokemon() }} variant="contained" fullWidth>Ajouter dans le pokedex</Button>
                            )}
                        </Link>
                    </FormControl>
                    <FormControl>
                        <Link to="/Pokedex">
                            <Button variant="outlined" fullWidth>Retour au pokedex</Button>
                        </Link>
                    </FormControl>
                </FormGroup>

            </Box>
        </Page >
    )
}

export default Pokemon