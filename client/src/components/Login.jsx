import React, { useCallback, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Home } from '../pages'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../components/Auth'
import { Input } from '../components/Input'
import { useRouter } from '../../Hooks/useRouter'


function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href={<Home />}>
        Henry Proyecto Grupal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Login_comp = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = useCallback(
    async (data) => {
      try {
        await login(data)
        router.push('/account')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  useEffect(() => {
    if (router.query.unauthorized) {
      setError(`To visit the ${router.query.unauthorized} page, you need to be logged in.`)
    }
  }, [router])

  return (
      <Container component='main' maxWidth='xs' sx={{marginTop:'100px'}}>
        <CssBaseline />
        {error && <div className={classes.error}>{error}</div>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
              register={register}
              error={errors.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              register={register}
              error={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login In
            </Button>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 1 }}>
              Google
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Olvidaste el password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to='/registro' variant='body2'>
                  {'No tenes cuenta? Registrate'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  )
}
