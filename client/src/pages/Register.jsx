import { Register_comp } from '../components/Register'
import React from 'react'
import Container from '@mui/material/Container';
import { Footer_comp } from '../components/Footer';
import { Header_comp } from '../components/Header';

export const Register = () => {
  return (
    <>
      <Header_comp />
      <Register_comp/>
      <Footer_comp />
    </>
  )
}
