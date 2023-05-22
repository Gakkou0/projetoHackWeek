import { createTheme, ThemeProvider } from '@mui/material/styles';
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';
import defaultTheme from 'src/components/DefaultTheme/DefaultTheme';
import UserForm from 'src/components/User/UserForm'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`



const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createUser({ variables: { input } })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
    <AnimatedPage>
    <LoadingProgress/>
    <div className="rw-segment">
      <UserForm onSave={onSave} loading={loading} error={error} />
    </div>
    </AnimatedPage>
    </ThemeProvider>
  )
}

export default NewUser
