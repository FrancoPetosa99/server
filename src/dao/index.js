/*
    Este patrón de diseño Factory permite importar el DAO de cada recurso y exportarlo.
    En caso de que se tenga que modificar la fuente persistencia de algún recurso las demás capas no se ven afectadas 
    ya que solo hay que modificar este archivo que pertenece a la capa de persitencia.
*/

import userDB from "./mongodb/Users.mongodb.js";
import cartDB from "./mongodb/Carts.mongodb.js";
import productDB from "./mongodb/Products.mongodb.js";
import paymentDB from "./mongodb/Payments.mongodb.js";

export {
    userDB,
    cartDB,
    productDB,
    paymentDB
};