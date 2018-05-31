{ 
    master = (function () {
        let color = ["red", "white", "black", "yellow", "orange", "brown", "blue", "green"];
        let colorGenerado;
        //Generamos un numero aleatorio
        let aleatorio = function () {
            return Math.floor((Math.random() * color.length));
        };
        //Generemos 4colores aleatorios
        let generarColor = function () {
            for (let i = 0; i < 4; i++) {
                colorGenerado.push(color[aleatorio()]);
            }
        }
        //mostramos los colores elegidos
        let mostrar = function () {
            console.log(colorGenerado);
        }
        let init = function () {
            colorGenerado = [];
            generarColor();
        }
        //funcion que comprueba la colocacion
        let comprobar = function (colorIntroduce) {
            let copiaColor = colorGenerado.slice();
            let blanco = 0;
            let negro = 0;

            colorIntroduce.forEach(function (element, indice) {
                if (element == copiaColor[indice]) {
                    copiaColor[indice] = undefined;
                    colorIntroduce[indice] = 1;
                    negro++;
                }
            });

            colorIntroduce.forEach(function (element, indice) {
                let indice2 = copiaColor.indexOf(element);
                if (copiaColor.indexOf(colorIntroduce[indice]) != -1) {
                    copiaColor[indice2] = 0;
                    blanco++;
                }
            });
            return {
                negro: negro,
                blanco: blanco
            }
        }
        return {
            init: init,
            mostrar: mostrar,
            comprobar: comprobar
        };
    })();
}