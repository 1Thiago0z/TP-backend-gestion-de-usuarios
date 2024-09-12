import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
// Averiguar que importar de NODE para realizar el hash del pass
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";

// 1° recuperar variables de entorno
dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// 2° Declarar los metodos

const getUsers = (ulrFile) => {
  try {
    if (!ulrFile) {
      throw new Error("Access denied");
    }

    const exists = existsSync(ulrFile);

    if (!exists) {
      writeFileSync(ulrFile, JSON.stringify([]));
      return [];
    }
    
    const users = JSON.parse(readFileSync(ulrFile))
    return users;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};


//const resp = getUsers(PATH_FILE_USER);
//console.log(resp);


const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_FILE_USER);

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;

    
  } catch (error) {
    const objError = errorLogger(error, PATH_FILE_ERROR);
    return objError;
  }
};



// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  try {
  } catch (error) {}
};





// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
  } catch (error) {}
};

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
