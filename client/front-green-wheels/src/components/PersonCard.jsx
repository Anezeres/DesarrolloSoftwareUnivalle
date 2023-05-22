/**
* @name: PersonCard
* @description: Component that acts as an element card to show a person of the list
* @author: Paul Rodrigo Rojas G
* @email: paul.rojas@correounivalle.edu.co, PaulRodrigoRojasECL@gmail.com
*/

export const PersonCard = ({person}) => {
    return (
        <div>
            <hr/>
                <h2>{person.person_id}</h2>
                <h3>{person.email}</h3>
            <hr/>
        </div>
    )
}