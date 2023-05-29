import * as yup from 'yup';

const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]{2,})?(,[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]{2,}))*$/


export const BasicSchema = yup.object().shape({
    correo_destinatario: yup.string().matches(emailRules, 'Porfavor ingresa un email válido').required('El campo debe ser llenado'),
    asunto: yup.string(),
    mensaje: yup.string().required('El campo debe ser llenado')
})