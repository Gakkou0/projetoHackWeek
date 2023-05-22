import { useState } from 'react'
import { Button, FormControl, Modal, TextField } from '@mui/material'
import '../../modal.css'

const ModalForm = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    // inicialize o estado dos campos do formulário aqui
    // por exemplo:
    name: '',
    local: '',
    project: ''
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // lógica para salvar os dados do formulário aqui
    // por exemplo, você pode usar os serviços RedwoodJS para salvar no banco de dados
    // import { db } from 'src/lib/db'
    // db.user.create({ data: formData })
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Abrir Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className='modal'>
          <FormControl size='small' onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name=''
              label=''
              value={formData.email}
              />
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </FormControl>
        </div>
      </Modal>
    </div>
  )
}

export default ModalForm