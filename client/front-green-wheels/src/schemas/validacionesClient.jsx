import * as yup from 'yup';

const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]{2,})?(,[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]{2,}))*$/
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/


export const BasicSchema = yup.object().shape({
    person_id: yup.string().trim().required('La identificación es requerida').matches(/^[0-9]{6,10}$/, 'La identificación debe tener entre 6 y 10 dígitos numéricos'),
    id_type: yup.string().required('Selecciona tu tipo de identificación'),
    names: yup.string().required('Se debe ingresar el(los) nombres'),
    last_names: yup.string().required('Se debe ingresar los apellidos'),
    living_address: yup.string().required('Se debe ingresar la dirección'),
    email: yup.string().matches(emailRules, 'Porfavor ingresa un email válido').required('El campo debe ser llenado'),
    password: yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres').matches(passwordRules,'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial'
    ),
})