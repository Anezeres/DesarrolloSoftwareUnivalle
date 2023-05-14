

/**
* @name: CarCard
* @description: Component that acts as an element card to show a car of the list
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

export const CarCard = ({car}) => {
    return (
        <div>
            <hr/>
            <h2>Placa: {car.plate}</h2>
            <h3>Modelo: {car.model_name}</h3>
            <p>Precio: {car.price}</p>
            <hr/>
        </div>
    )
}