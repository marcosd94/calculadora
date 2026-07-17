document.getElementById('calcular').addEventListener('click', function() {
    const precio = parseFloat(document.getElementById('precio').value);
    const descuento = parseFloat(document.getElementById('descuento').value) || 0; // Tomar 0 si no se ingresa un valor
    const segmento = document.getElementById('segmento').value;
    const cantidadCompra = parseInt(document.getElementById('cantidadCompra').value) || 0;
    const puntosDesafios = parseInt(document.getElementById('puntosDesafios').value) || 0; // Tomar 0 si no se ingresa un valor
	const gs_por_puntos = 10.57;
	const caja_litro = 75800;
	
	const base_foco = document.getElementById("base_foco");

	// Returns true if checked, false if not
	const baseFocoIsChecked = base_foco.checked; 
	console.log(baseFocoIsChecked);

    if (!isNaN(precio) && !isNaN(descuento) && cantidadCompra >= 0) {
        // Calcular el precio total antes del descuento
        const totalCompra = precio * cantidadCompra;

        // Calcular el precio con descuento
		const descuentoAccion = (descuento * cantidadCompra);
        const precioConDescuento = totalCompra - descuentoAccion;

        // Asegurarse de que el precio no sea negativo
        if (precioConDescuento < 0) {
            document.getElementById('resultadoUnitario').innerText = "El descuento no puede ser mayor que el precio total.";
            document.getElementById('resultadoTotal').innerText = "";
            return;
        }

        // Resultados Unitarios
        let puntosPorSegmento;
        switch (segmento) {
            case "RETORNABLES":
                puntosPorSegmento = 2; // 2 puntos por cada 10,000
				incluyeBaseFoco = 0;
                break;
            case "BUC_269":
                puntosPorSegmento = 2; // 2 puntos por cada 10,000
				incluyeBaseFoco = 0.01;
                break;
            case "CORE CANS":
                puntosPorSegmento = 5; // 5 puntos por cada 10,000
				incluyeBaseFoco = 0.015;
                break;
            case "MICH_SKOL":
                puntosPorSegmento = 5; // 5 puntos por cada 10,000
				incluyeBaseFoco = 0.015;
                break;
            case "PREMIUM":
                puntosPorSegmento = 10; // 10 puntos por cada 10,000
				incluyeBaseFoco = 0.015;
                break;
            default:
                puntosPorSegmento = 0;
				incluyeBaseFoco = 0.015;
        }

        // Cálculos para resultados unitarios
        const puntosAcumuladosSegmentoUnitario = Math.floor(precio / 10000) * puntosPorSegmento;
        const valorPuntosSegmentoUnitario = puntosAcumuladosSegmentoUnitario * gs_por_puntos; // Cada punto equivale a 10 guaraníes
        const valorPuntosDesafiosUnitario = puntosDesafios * gs_por_puntos; // Cada punto por desafío equivale a 10 guaraníes
		
		
		var descuentoBaseFocoUnitario =  0;
		if(baseFocoIsChecked){ 
			descuentoBaseFocoUnitario = precio* incluyeBaseFoco;
			} else { 
			descuentoBaseFocoUnitario = 0;
		} 
		
        const precioFinalUnitario = precio - descuento - valorPuntosSegmentoUnitario - valorPuntosDesafiosUnitario - descuentoBaseFocoUnitario;
		
        // Resultados Totales
        const puntosAcumuladosSegmentoTotal = Math.floor(precioConDescuento / 10000) * puntosPorSegmento;
        const valorPuntosSegmentoTotal = puntosAcumuladosSegmentoTotal * gs_por_puntos; // Cada punto equivale a 10 guaraníes
        const valorPuntosDesafiosTotal = puntosDesafios * gs_por_puntos; // Cada punto por desafío equivale a 10 guaraníes
        const totalPuntosDesafios = puntosDesafios * cantidadCompra; // Total de puntos por desafíos
        const valorTotalPuntosDesafios = totalPuntosDesafios * gs_por_puntos; // Conversión a guaraníes
		var descuentoBaseFocoTotal =  0;
		if(baseFocoIsChecked){ 
			descuentoBaseFocoTotal = totalCompra* incluyeBaseFoco;
			} else { 
			descuentoBaseFocoTotal = 0;
		}
		
		const descuentoTotal = descuentoAccion + valorPuntosSegmentoTotal + valorTotalPuntosDesafios + descuentoBaseFocoTotal;
        const cajasBeneficio = descuentoTotal/caja_litro;
        const precioFinalTotal = precioConDescuento - valorPuntosSegmentoTotal - valorTotalPuntosDesafios - descuentoBaseFocoTotal;
        const precioFinalUnitarioTotal = precioFinalTotal/cantidadCompra;

        // Función para formatear números con separadores de miles
        const formatCurrency = (value) => value.toLocaleString('es-PY');
		document.getElementById('resultadoLitros').innerHTML = `
            <h4>Benificio en Litros</h4>
            <strong class="highlight">Cant. cajas litro: ${formatCurrency(cajasBeneficio.toFixed(1))}</strong>
        `;
        // Mostrar resultados en guaraníes paraguayos
        document.getElementById('resultadoUnitario').innerHTML = `
            <h4>Precio por Bulto</h4>
            <strong>Precio Inicial:</strong> Gs. ${formatCurrency(precio)} <br>
            <strong>Descuento:</strong> Gs. ${formatCurrency(descuento)} <br>
            <strong>Puntos por Compra:</strong> ${puntosAcumuladosSegmentoUnitario} (Valor en Gs.: ${formatCurrency(valorPuntosSegmentoUnitario)}) <br>
            <strong>Puntos por Desafíos:</strong> ${puntosDesafios} (Valor en Gs.: ${formatCurrency(valorPuntosDesafiosUnitario)}) <br>
            <strong>Retorno BF:</strong>  (Valor en Gs.: ${formatCurrency(descuentoBaseFocoUnitario)}) <br>
            <strong class="highlight">Precio Final Unitario: Gs. ${formatCurrency(precioFinalUnitario)}</strong>
        `;
        
        document.getElementById('resultadoTotal').innerHTML = `
            <h4>Costo Total</h4>
            <strong>Total Compra:</strong> Gs. ${formatCurrency(totalCompra)} <br>
            <strong>Descuento Total:</strong> Gs. ${formatCurrency(descuento * cantidadCompra)} <br>
            <strong>Bultos de Compra:</strong> ${cantidadCompra} unidades <br>
            <strong>Puntos por Compra:</strong> ${puntosAcumuladosSegmentoTotal} (Valor en Gs.: ${formatCurrency(valorPuntosSegmentoTotal)}) <br>
            <strong>Puntos por Desafíos:</strong> ${totalPuntosDesafios} (Valor en Gs.: ${formatCurrency(valorTotalPuntosDesafios)}) <br>
            <strong>Retorno BF:</strong>  (Valor en Gs.: ${formatCurrency(descuentoBaseFocoTotal)}) <br>
            <strong class="highlight">Precio Final Total: Gs. ${formatCurrency(precioFinalTotal)}</strong> <br>
            <strong class="highlight">Precio Unitario por cantidad: Gs. ${formatCurrency(precioFinalUnitarioTotal)}</strong>
        `;
    } else {
        document.getElementById('resultadoUnitario').innerText = "Por favor, ingrese todos los valores correctamente.";
        document.getElementById('resultadoTotal').innerText = "";
    }
});


// Agregar evento para el botón de limpiar
document.getElementById('limpiar').addEventListener('click', function() {
    document.getElementById('precio').value = '';
    document.getElementById('descuento').value = '';
    document.getElementById('cantidadCompra').value = '';
    document.getElementById('puntosDesafios').value = '';
    document.getElementById('resultadoUnitario').innerHTML = '';
    document.getElementById('resultadoTotal').innerHTML = '';
	document.getElementById('base_foco').checked = false;
});