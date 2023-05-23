// import { useState } from 'react';
// import { Modal, TextField, Select, MenuItem, Checkbox, Button } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import '../../modal.css';

// const ModalFormMeeting = ( ) => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     location: '',
//     project: '',
//     datetime: '',
//     observations: '',
//     deliverable: ''
//   });

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     handleClose();
//   };

//   const openModalFromFunction = () => {
//     setOpen(true);
//   };

//   return (
//     <div>
//       {open && (
//         <Modal open={open} onClose={handleClose}>
//           <div className="modal">
//             <h2>Nova Reunião</h2>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 name="title"
//                 label="Título"
//                 value={formData.title}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateTimePicker
//                   name="datetime"
//                   label="Data e hora da reunião"
//                   value={formData.datetime}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </LocalizationProvider>
//               <TextField
//                 name="location"
//                 label="Local"
//                 value={formData.location}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//               <Select
//                 name="project"
//                 label="Projeto"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               >
//                 <MenuItem value={10}>Ten</MenuItem>
//                 <MenuItem value={20}>Twenty</MenuItem>
//                 <MenuItem value={30}>Thirty</MenuItem>
//               </Select>
//               <TextField
//                 name="observations"
//                 label="Observações"
//                 value={formData.observations}
//                 onChange={handleChange}
//                 fullWidth
//               />
//               <Checkbox color="primary" checked={true} onChange={handleChange} />
//               <div>
//                 <Button variant="contained" color="primary" onClick={handleClose}>
//                   Cancelar
//                 </Button>
//                 <Button type="submit" variant="contained" color="primary">
//                   Salvar
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Modal>
//       )}
//       <Button variant="contained" color="primary" onClick={openModalFromFunction}>
//         Abrir Modal
//       </Button>
//     </div>
//   );
// };

// export default ModalFormMeeting;
