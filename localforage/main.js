
/* 
Structure to create database name and collection (table)

const DATABASE_NAME = '@gameplay';

//@app:collection

const COLLECTION_USERS = `${DATABASE_NAME}:user`;
const COLLECTION_APPOINTMENTS = `${DATABASE_NAME}:appointments`;

export {
  COLLECTION_USERS,
  COLLECTION_APPOINTMENTS
}; 
*/

document.addEventListener("DOMContentLoaded", function () {
    localforage.config({
        driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
        name        : 'gigz_db',
        version     : 1.0,
        size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
        description : 'some description'
    });
    console.log(localforage);

    // Inicializa o localForage
    var localForage = localforage;

    // Define o valor "João" para a chave "nome"
    localForage.setItem("nome", "João").then(function(value) {
        console.log(value); // Output: "João"
    });

    // Obtém o valor para a chave "nome"
    localForage.getItem("nome").then(function(value) {
        console.log(value); // Output: "João"
    });

    // Remove a chave "nome"
    localForage.removeItem("nome").then(function() {
        console.log("Chave removida com sucesso!");
    });
});