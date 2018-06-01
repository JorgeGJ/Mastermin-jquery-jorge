{
    let $circulosComprobar, $circulosRellenar, $paletaJuego, $juegoAcabado, contadorLinea;
    let addCirculo = function () {
        $bolaVacia = getHuecos();
        $bolaVacia.attr(        	{
        		'libre':false,
        		'id':this.id
        	})
        	.css("backgroundColor",this.id)
        	.on('click',quitarColor);
    }
    let getHuecos = function(){
    	return $('.huecos[libre=true]:first');
    } 
    let quitarColor = function () {
        $(this).attr(        	{
        		'libre':true,
        		'id':''
        	})
        	.css("backgroundColor", "transparent");
    }
    let quitarEventoLineaAnterior = function () {
        $circulosRellenar.off("click");
    }
    let crearNuevaLinea = function () {
        quitarEventoLineaAnterior();
        let contenido = "<div class='filaRellenar intento" + contadorLinea + "'>"
        for (let i = 0; i < 4; i++) {
            contenido += "<div class='circuloRellenar circuloRellenar" + contadorLinea + " huecos' libre='true' style='background-color: transparent;'></div>";
        }
        for (let i = 0; i < 4; i++) {
            contenido += "<div class='circuloComprobar circuloComprobar" + contadorLinea + "'></div>";
        }
        contenido += "</div>";
        $paletaJuego.append(contenido);
        $(".intento" + contadorLinea).animate({
            'margin-bottom': '0px'
        }, 600);
        $circulosRellenar = $(".circuloRellenar" + contadorLinea)
            .on("click", quitarColor);
        $circulosComprobar = $(".circuloComprobar" + contadorLinea);
        contadorLinea++;
    }
    let comprobar = function () {
        let arrayColoresComprobar = [];
        let contadorBN = 0;
        $circulosRellenar.each(function (indice, circulo) {
            if (this.id != ""){
                arrayColoresComprobar.push(this.id);
            }
        });
        if (arrayColoresComprobar.length >= 4) {
            objetoComprobar = master.comprobar(arrayColoresComprobar);
            if (objetoComprobar.negro > 0) {
                while (contadorBN < objetoComprobar.negro) {
                    $($circulosComprobar[contadorBN]).css('backgroundColor',"black");
                    contadorBN++;
                }
            }
            if (contadorBN == 4) {
                $juegoAcabado.dialog("open");
                return;
            }
            if (objetoComprobar.blanco > 0) {
                for (let i = 0; i < objetoComprobar.blanco; i++) {
                    $($circulosComprobar[contadorBN]).css('backgroundColor',"white");
                    contadorBN++;
                }
            }
            crearNuevaLinea();
            $paletaJuego.scrollTop(0);
        }
    }
    $(function () {
        master.init();
        master.mostrar();
        contadorLinea = 0;
        $circulosRellenar = $(".circuloRellenar");
        $circulosComprobar = $(".circuloComprobar");
        $paletaJuego = $("#paleta");
        $juegoAcabado = $("#acabado");
        $juegoAcabado.dialog({
            modal: true,
            closeOnEscape: false,
            autoOpen: false,
            open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); },
            show: {
                effect: "blind",
                duration: 1000,
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            buttons: {
                "Reiniciar": function () {
                    $(this).dialog("close");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)

                },
                "Salir": function () {
                    window.close();
                }
            }
        });
        $(".circulo").on("click", addCirculo);
        $("#vereficar").on("click", comprobar);
        crearNuevaLinea();
    })
}