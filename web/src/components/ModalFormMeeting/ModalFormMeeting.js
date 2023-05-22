import { useState } from 'react'
import { Button, Modal, TextField, Select, MenuItem} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import '../../modal.css'

const ModalForm = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    // inicialize o estado dos campos do formulário aqui
    // por exemplo:
    title: '',
    location: '',
    project: '',
    datetime:'',
    observations: '',
    deliverable: ''
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
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Título"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="datetime"
                label="Data e hora da reunião"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                />
            </LocalizationProvider>
            <TextField
              name="location"
              label="Local"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <Select
              name='project'
              label="Projeto"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <TextField
              name="observations"
              label="Observações"
              value={formData.email}
              onChange={handleChange}
              fullWidth/>
            <Button variant="contained" color="primary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default ModalForm