import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'

import { Form, FormError, FieldError, Submit } from '@redwoodjs/forms'

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <TextField
          name="name"
          defaultValue={props.user?.name}
          label="Nome"
          validation={{ required: true }}
          style={{ width: '300px' }}
        />

        <FieldError name="name" className="rw-field-error" />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Tipo da conta</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="userType"
            value={props.user?.userType}
            label="Tipo da conta"
            style={{ width: '300px' }}
            // onChange={handleChange}
          >
            <MenuItem value={0}>Estudante</MenuItem>
            <MenuItem value={1}>Orientador</MenuItem>
            <MenuItem value={2}>Co-orientador</MenuItem>
          </Select>
        </FormControl>

        <FieldError name="userType" className="rw-field-error" />

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <TextField
          name="password"
          defaultValue={props.user?.password}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="password" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
