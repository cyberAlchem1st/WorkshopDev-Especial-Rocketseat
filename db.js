// SQL = Structured Query Language

//configurações do banco de dados

const sqlite3 = require('sqlite3').verbose() 
// require ~= import or include, serve para carregar modulos
// verbose - comunicação com o terminal
const db = new sqlite3.Database('./workshopdev.db')

// linha 6: acredito que seja o estanciamento de um objeto (localizado na raiz do projeto no arquivo workshopdev.db)
// colocando o nome db
//função Database -> recebe origem do arquivo para banco de dados

db.serialize(function () { //serialize: permite a execução de varios métodos do objeto db

    // criar tabela
    db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT

    );
    
    `) // `` -> template literals (permite quebrar uma string e outras coisas)
    // inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`;

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non felis maximus, interdum orci quis, egestas mauris. Donec sit amet nisi et nulla rhoncus feugiat. ",
        "https://rocketseat.com.br"
    ];

/*    db.run(query, values, function(err) { //função callback
        if (err) return console.log(err); //caso ocorra um erro retornar a msg de erro
       
        console.log(this); //retorne a resposta
        
    })
 */

    // deletar dado da tabela

/*    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
        if (err) return console.log(err);

        console.log("Deletei", this);
        
        
    })
  */

    // consultar dados

/*    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)

    }) // * = todas os registros
*/
    

})

module.exports = db // exportando o banco de dados p/ usar no server

