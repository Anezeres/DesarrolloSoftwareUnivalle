import * as yup from 'yup';

export const BasicSchema = yup.object().shape({
    asunto: yup.string(),
    mensaje: yup.string().required('El campo debe ser llenado')
})