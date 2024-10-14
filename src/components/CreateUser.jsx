import React from 'react'
import Page from './Page'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import { Button, Typography, Box, TextField, Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { getUsersInLocalStorage, setUsersInLocalStorage } from '../services/users'
import { Link } from 'react-router-dom'

function CreateUser() {

    const [users, setUsers] = useState([])
    const [newUserName, setNewUserName] = useState('')
    const [newUserImage, setNewUserImage] = useState(image1)

    const handleAddUser = () => {
        const updatedUsers = [...users, { 'name': newUserName, 'avatar': newUserImage, 'pokemon': [] }]
        setUsers(updatedUsers)
        setUsersInLocalStorage(updatedUsers)
    }

    useEffect(() => {
        if (users.length > 0) {
            setUsersInLocalStorage(users)
        }
    }, [users])

    useEffect(() => {
        const users = getUsersInLocalStorage()
        if (users) {
            setUsers(users)
        }
    }, [])

    return (
        <Page>
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h4'>Choisir un avatar</Typography>
            </Box>
            <Box sx={{
                marginBottom: 2,
                display: 'flex'
            }}>
                <Avatar src={image1} sx={{ marginRight: 1, filter: newUserImage === image1 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image1)
                }}></Avatar>
                <Avatar src={image2} sx={{ marginRight: 1, filter: newUserImage === image2 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image2)
                }}></Avatar>
                <Avatar src={image3} sx={{ filter: newUserImage === image3 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image3)
                }}></Avatar>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField label="Nom" fullWidth
                    onChange={(e) => {
                        setNewUserName(e.target.value)
                    }}
                    value={newUserName}
                />
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Link to="/Connexion">
                    <Button variant="contained" fullWidth onClick={handleAddUser}>
                        Créer un compte
                    </Button>
                </Link>
            </Box>
        </Page>
    )
}

export default CreateUser