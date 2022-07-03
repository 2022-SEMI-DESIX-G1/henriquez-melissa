//problema 1
const principal = (() => {

    function palindromo(val) {
        const inverso = val.split("").reverse().join("");
        let b = oso (val);
        const inverso2 = b.split("").reverse().join("");
        if (inverso === val && b === inverso2) {
            return 'Es palindromo de doble base';
        } else {
            return 'No es palindromo de doble base';
        }
    }

    function oso(n) {
        return (n).toString(2);
    }
    console.log(palindromo('3'));

})()

//problema 2
class Problema2 {

    constructor() {

        console.log(this.pb2());

    }
    pb2() {
        let texto = prompt('Escriba una serie de caracteres');
        return [...texto.replace(/\s/g, '')].reduce((objeto, caracter) => {
            objeto[caracter] = objeto[caracter] + 1 || 1;
            console.log(`La cadena ${texto} se divede de la siguente manera`)
            return objeto;
        }, {});
    }

}
var problem2 = new Problema2();

//problema3
function abisiesto(ano) {
    var y = parseInt(ano);
    if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)
    {
        console.log("El año"+" "+ano+" "+"es bisiesto");
    }
    else
    {
        console.log("El año"+" "+ano+" "+"No es bisiesto");
    } 
}
console.log(abisiesto(2016));

//problema4

function sprimo(numero) {
    var i, j, a = 0, b = 0;
    for (i = 1; i <= numero; i++) {
        a = 1;
        for (j = 2; j <= i / 2; j++) {
            if (i % j == 0) {
                a = 0;
                break;
            }
        }
        if (a == 1) {
            b = b + i;
        }
    }
    console.log("la suma del numero es " + b);
}
  
  sprimo(7);