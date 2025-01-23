export const getUsersInLocalStorage = () => {
    const localStorageUsers = localStorage.getItem('users')
    return localStorageUsers ? JSON.parse(localStorageUsers) : []
}

export const setUsersInLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}

export const getCurrentUser = () => {
    const localStorageCurrentUser = localStorage.getItem('currentUser')
    return localStorageCurrentUser ? JSON.parse(localStorageCurrentUser) : null
}

export const removeCurrentUser = () => {
    localStorage.removeItem('currentUser')
}

export const setCurrentUserInLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
}

export const addPokemonToCurrentUserInLocalStorage = (id, pokemon) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        currentUser.pokemon.push({ id, pokemon });
        setCurrentUserInLocalStorage(currentUser);
    }
}

export const deletePokemonFromCurrentUserInLocalStorage = (id) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const updatedPokemons = currentUser.pokemon.filter(pokemon => pokemon.id !== id);
        currentUser.pokemon = updatedPokemons;
        setCurrentUserInLocalStorage(currentUser);
    }
}