//comandos usados no terminal
// npm init -y
// npm i express
// npm start
// npm i nodemon (monitoramento do node)
// npm i nunjucks (permite usar variaveis no html)
// npm i sqlite3 (banco de dados)

// no package.json (json = java script object notation) 
// "start": "nodemon server.js" antes era node agr eh nodemon

//usei o express para criar e configurar o servidor

const express = require('express');
const server = express();

const db = require("./db")

/*
const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non felis maximus, interdum orci quis, egestas mauris. Donec sit amet nisi et nulla rhoncus feugiat. ",
        url: "https://rocketseat.com.br"
    },
    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non felis maximus, interdum orci quis, egestas mauris. Donec sit amet nisi et nulla rhoncus feugiat. ",
        url: "https://rocketseat.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Autoconhecimento",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non felis maximus, interdum orci quis, egestas mauris. Donec sit amet nisi et nulla rhoncus feugiat. ",
        url: "https://rocketseat.com.br"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729017.svg",
        title: "Jardinagem",
        category: "Lazer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non felis maximus, interdum orci quis, egestas mauris. Donec sit amet nisi et nulla rhoncus feugiat. ",
        url: "https://rocketseat.com.br"
    },
]
*/

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({ extended: true}))

//criei uma rota /
//e capturo o pedido do cliente para responder


server.get("/", function(req, res) {
    
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeas = [...rows].reverse() //espalahr o conteudo de ideas dentro desse array

        const lastIdeas = []
        
        for (idea of reversedIdeas) {
            
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas})
        //segundo parametro: como passar variaveis {chave: title valor: h1}
    })

});

server.get("/ideias", function(req, res) {

    //req.query // ?title=doskdso&category=345643634...
    


    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse() //espalahr o conteudo de ideas dentro desse array
    
        return res.render("ideias.html", {ideas: reversedIdeas})
        //segundo parametro: como passar variaveis {chave: title valor: h1}
    })

});

server.post("/", function(req, res) {
    //req.body objeto com os campos do formulario

    //inserção de dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?); 
    `; // VALUES -> placeholders

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ];

    db.run(query, values, function(err) { //função callback
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!")
        } //caso ocorra um erro retornar a msg de erro
       
        //o que faz após salvar os dados no banco de dados

        return res.redirect("/ideias")
        
    })

})

server.get("/id", function(req, res) {
    const id = req.query.id

    db.run(`DELETE FROM ideas WHERE id = ?`, [id], function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!")
        }
        return res.redirect("/ideias");
    })
})


server.listen(3000); //liguei o servidor na porta 3000

//configuração do nunjucks

const nunjucks = require("nunjucks")





nunjucks.configure("views", {
    express: server,
    noCache: true, //nao guardar informacoes no cache
}) //primeiro parametro: pasta que ficaram os html, segundo parametro: objeto de configuração
