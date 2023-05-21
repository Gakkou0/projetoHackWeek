import { MetaTags } from '@redwoodjs/web'
import { TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { Form, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react';

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
  const [userType, setUserType] = useState(userType);
  const [name , setName] = useState("teste");
  const [email, setEmail] = useState("teste");
  const [password, setPassword] = useState("teste");

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create user')
      console.error(error)
    },
  })

  const onSubmit = async (data) => {
    const {} = data;
    const variables = {
      name: name ,
      email: email,
      password: password,
      userType: userType
    };

    try {
      await createUser({ variables });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="rw-form-wrapper">
        <Form onSubmit={onSubmit}>
          <TextField
            name="name"
            label="Nome"
            value={name}
            onChange={handleNameChange}
            errorClassName="error"
            style={{ width: '300px' }}
            validation={{
              required: true,
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Nome é obrigatório';
                }
              },
            }}
          />
          <FieldError name="name" className="error" />

          <FormControl>
            <InputLabel id="demo-simple-select-label">Tipo da conta</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="userType"
              value={userType}
              validation={{required: true}}
              label="Tipo da conta"
              style={{ width: '300px' }}
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
            value={email}
            onChange={handleEmailChange}            className="rw-input"
            errorClassName="rw-input rw-input-error"
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
            value={password}
            onChange={handlePasswordChange}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}

            type="password"
          />

          <FieldError name="password" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit>Save</Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default UserForm
