import { useState } from 'react'

import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography
} from '@mui/material'
import Swal from 'sweetalert2'

import { Form, FieldError } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'
import { useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'


const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!, $userType: Int!) {
    createUser(input: { name: $name, email: $email, password: $password, userType: $userType}) {
      id
      name
      email
      password
      userType
    }
  }
`

const UserForm = () => {
  const [userType, setUserType] = useState(userType)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      let timerInterval
      Swal.fire({
        title: 'Cadastrado com sucesso!',
        timer: 2000,
        background: '#171717',
        color: 'aliceblue',
        icon: 'success',
        timerProgressBar: true,
        didOpen: () => {
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
    },
    onError: (error) => {
      let timerInterval
      Swal.fire({
        title: 'Erro!',
        html: error.message,
        timer: 2000,
        background: '#171717',
        color: 'aliceblue',
        icon: 'error',
        timerProgressBar: true,
        didOpen: () => {
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
    },
  })

  const onSubmit = async (data) => {
    const {} = data
    const variables = {
      name: name,
      email: email,
      password: password,
      userType: userType,
    }

    try {
      await createUser({ variables })
    } catch (error) {
      console.error(error)
      toast.error('Failed to create user')
    }
  }

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
        <Form onSubmit={onSubmit} className='form'>

        <Typography variant="h4" component="h2">
          Novo usuário
        </Typography>

          <TextField
            name="name"
            label="Nome"
            value={name ? name : "" }
            onChange={handleNameChange}
            className="input"
            style={{ margin: '7px' }}
            validation={{
              required: true,
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Nome é obrigatório'
                }
              },
            }}
          />
          <FieldError name="name" className="error" />

          <FormControl>
            <InputLabel id="demo-simple-select-label" style={{ margin: '7px' }} className="input">Tipo da conta</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="userType"
              value={userType}
              validation={{ required: true }}
              label="Tipo da conta"
              className="input"
              style={{ margin: '7px' }}
              onChange={handleUserTypeChange}
            >
              <MenuItem value={0}>Estudante</MenuItem>
              <MenuItem value={1}>Orientador</MenuItem>
              <MenuItem value={2}>Co-orientador</MenuItem>
            </Select>
          </FormControl>

          <FieldError name="userType" className="rw-field-error" />

          <TextField
            name="email"
            label="Email"
            value={email ? email : "" }
            onChange={handleEmailChange}
            className="input"
            style={{ margin: '7px' }}
            validation={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido',
              },
            }}
          />

          <FieldError name="email" className="rw-field-error" />

          <TextField
            name="password"
            label="Senha"
            value={password ? password : "" }
            onChange={handlePasswordChange}
            className="input"
            style={{ margin: '7px' }}
            validation={{ required: true }}
            type="password"
          />

          <FieldError name="password" className="rw-field-error" />

          <Button variant="contained" type="submit" style={{ margin: '5px' }}>
              Criar conta
          </Button>


          <p>Já possui uma conta?</p>
          <Link to="/login" className="link">
            Entrar
          </Link>
        </Form>
    </>
  )
}

export default UserForm
