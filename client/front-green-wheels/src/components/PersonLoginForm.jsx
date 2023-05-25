import {useForm} from 'react-hook-form';


export const PersonLoginForm = () => {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm();

    return (<div>
        <form onSubmit="">
        <input type="number" placeholder="ID"
                {...register("person_id", {required: true})}/>
        {errors.title && <span>ID is required</span>}
        <input type="text" placeholder="Enter your names"
                {...register("names", {required: false})}/>
        <input type="text" placeholder="Enter your lastnames"
                {...register("lastnames", {required: false})}/>
        <input type="email" placeholder="Enter your email address"
                {...register("email", {required: false})}/>
        {errors.title && <span>Email address is required</span>}
        <input type="password" placeholder="Enter your password"
                {...register("password", {required: false})}/>
        {errors.title && <span>Password is required</span>}
        </form>
    </div>)
}