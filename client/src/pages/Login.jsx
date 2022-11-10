import { Login_comp } from '../components/Login'
import React from 'react'
import Container from '@mui/material/Container';
import { Header_comp } from '../components/Header';

export const Login = () => {
  return (
    <>
    <Header_comp />
    <Container >
      <Login_comp/>
    </Container>
    </>
  )
}