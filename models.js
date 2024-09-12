import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
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
    const { nombre, apellido, email, password,} = userData;

    if (!nombre || !apellido || !email || !password) {
      throw new Error("Missing data");
    }


    // Contenido nombre
    if ((typeof nombre !== "string") || (typeof apellido !== "string") || (typeof email !== "string")){
      throw new Error("Data not string");
    }


    // Contenido email
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }




    // Validar que el email no exista

    const users = getUsers(PATH_FILE_USER);

    const findEmail = users.find((user) => user.email === email);
    if (findEmail) {
      throw new Error("Email already exists");
    }

    const hash = createHash("sha256").update(password).digest("hex");

    const newUser = 
    {
      id: randomUUID(),
      nombre,
      apellido,
      email,
      password: hash,
      isLoggedIn: false
  }


    users.push(newUser);
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));
    return newUser;



  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};


const obj ={
  nombre: "Thiago",
  apellido: "Cugliari",
  email: "thiago@hotmail.com",
  password: "12345",
}

const resp = addUser(obj);
console.log(resp);




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
