import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../Header/Header';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  // Regular expression to check that the password contains at least 8 characters,
  // including at least one letter, one digit, and special characters.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%])[A-Za-z\d@#$%]{8,}$/;

  // Test if the provided password matches the regular expression
  return passwordRegex.test(password);
}

function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkSignIn = (mail,password) => {
   console.log('Checking')
    axios.get(`http://localhost:8585/api/users/getUserByMail/${mail}`)
    .then((passwordFromServer) => {
       if(password == passwordFromServer.data){
            nav('/HomePage');       
          }
       else{
        console.log('password mismatch');
       }
    })
    .catch((error) => {
      if(error.response.status === 404)
        nav('/SignUp');
        alert('You do not have an account yet, please register')
    });
  }
  const handleEmailFocus = () => {
    setEmailError(false);
  };

  const handlePasswordFocus = () => {
    setPasswordError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    if (!isEmailValid(email)) {
      setEmailError(true);
      console.error('Invalid email address');
      return;
    }
    setEmailError(false);

    const password = data.get('password');
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      console.error('Invalid password');
      return;
    }
    setPasswordError(false);

    console.log({
      email: email,
      password: password,
    });
    checkSignIn(email,password);
    // Redirect to /HomePage after successful submission

  };

  const defaultTheme = createTheme();

  return (
    <>
      <Header />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                onFocus={handleEmailFocus}
                helperText={emailError ? 'Invalid email address' : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                onFocus={handlePasswordFocus}
                helperText={
                  passwordError
                    ? 'Invalid password'
                    : 'Password must contain at least 8 characters, including letters and numbers'
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => nav('/SignUp')}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignIn;