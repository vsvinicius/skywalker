const fs = require('fs');

class Movie {
    constructor(codigo,titulo,tituloBr,ano,diretor,razao,cnpj,data) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.tituloBr = tituloBr;
        this.ano = ano;
        this.diretor = diretor;
        this.razao = razao;
        this.cnpj = cnpj;
        this.data = data;
    }
}
fs.readFile('Tabela_Obras_Cinema.txt','utf-8',(error,data) => {
    let fileData = [];
    let newData = data.split('\n');
    for(let i=1, length=newData.length; i < length;i++){
        const movie = newData[i].split(';');
        fileData.push(new Movie(movie[0],movie[1],movie[2],movie[3],movie[4],movie[5],movie[6],movie[7]));
    }
    fs.writeFile('output.json',JSON.stringify(fileData),(error) => {
        if(error !== null)
            console.log(error)
    });
});