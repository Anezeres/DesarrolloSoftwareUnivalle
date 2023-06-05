import React from "react";
import "../../CSS/product.css";
import imageUrl from "../../pages/Media/captiva.png";

/*{ name, price, description, imageUrl }*/

const Product = () => {

  const car = {
    brand: 'Tesla',
    model: 'Model S',
    year: 2022,
    color: 'Black',
    price: 80000,
    mileage: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
  };
  return (
    <div className="contenedorGeneral">
      <div className="product">
        
        <div className="product-image">
          <img src={imageUrl} alt="Nombre" />
        </div>
        <div className="product-details">
        <div>
      <h1>{car.brand} {car.model}</h1>
      <p>Year: {car.year}</p>
      <p>Color: {car.color}</p>
      <p>Price: ${car.price}</p>
      <p>Mileage: {car.mileage} miles</p>
      <p>Fuel Type: {car.fuelType}</p>
      <p>Transmission: {car.transmission}</p>
      {/* Otros detalles del auto */}
    </div>
          {/* Agrega aquí cualquier otro detalle o funcionalidad relacionada con el producto */}
        </div>
        </div>
    </div>
  );
};

export default Product;
