document.getElementById('calcular').addEventListener('click', function() {
    const precio = parseFloat(document.getElementById('precio').value.replace(/\./g, '').replace(/,/g, '.'));
    const descuento = parseFloat(document.getElementById('descuento').value.replace(/\./g, '').replace(/,/g, '.'));
    const cantidadCompra = parseInt(document.getElementById('cantidadCompra').value) || 0;
    const segmento = document.getElementById('segmento').value;
    const puntosDesafios = parseInt(document.getElementById('puntosDesafios').value) || 0;

    if (!isNaN(precio) && !isNaN(descuento) && cantidadCompra >= 0) {
        // Calcular el precio total antes del descuento
        const totalCompra = precio * cantidadCompra;

        // Calcular el precio con descuento
        const precioConDescuento = totalCompra - (descuento * cantidadCompra);

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
                break;
            case "CORE CANS":
                puntosPorSegmento = 5; // 5 puntos por cada 10,000
                break;
            case "CORE+":
                puntosPorSegmento = 10; // 10 puntos por cada 10,000
                break;
            default:
                puntosPorSegmento = 0;
        }

        // Cálculos para resultados unitarios
        const puntosAcumuladosSegmentoUnitario = Math.floor(precio / 10000) * puntosPorSegmento;
        const valorPuntosSegmentoUnitario = puntosAcumuladosSegmentoUnitario * 10; // Cada punto equivale a 10 guaraníes
        const valorPuntosDesafiosUnitario = puntosDesafios * 10; // Cada punto por desafío equivale a 10 guaraníes
        const precioFinalUnitario = precio - descuento - valorPuntosSegmentoUnitario - valorPuntosDesafiosUnitario;

        // Resultados Totales
        const puntosAcumuladosSegmentoTotal = Math.floor(precioConDescuento / 10000) * puntosPorSegmento;
        const valorPuntosSegmentoTotal = puntosAcumuladosSegmentoTotal * 10; // Cada punto equivale a 10 guaraníes
        const valorPuntosDesafiosTotal = puntosDesafios * 10; // Cada punto por desafío equivale a 10 guaraníes
        const totalPuntosDesafios = puntosDesafios * cantidadCompra; // Total de puntos por desafíos
        const valorTotalPuntosDesafios = totalPuntosDesafios * 10; // Conversión a guaraníes
        const precioFinalTotal = precioConDescuento - valorPuntosSegmentoTotal - valorTotalPuntosDesafios;

        // Función para formatear números con separadores de miles
        const formatCurrency = (value) => value.toLocaleString('es-PY');

        // Mostrar resultados en guaraníes paraguayos
        document.getElementById('resultadoUnitario').innerHTML = `
            <h4>Precio por Bulto</h4>
            <strong>Precio Inicial:</strong> Gs. ${formatCurrency(precio)} <br>
            <strong>Descuento:</strong> Gs. ${formatCurrency(descuento)} <br>
            <strong>Cantidad de Puntos por Segmento:</strong> ${puntosAcumuladosSegmentoUnitario} (Valor en Gs.: ${formatCurrency(valorPuntosSegmentoUnitario)}) <br>
            <strong>Cantidad de Puntos por Desafíos:</strong> ${puntosDesafios} (Valor en Gs.: ${formatCurrency(valorPuntosDesafiosUnitario)}) <br>
            <strong class="highlight">Precio Final Unitario: Gs. ${formatCurrency(precioFinalUnitario)}</strong>
        `;
        
        document.getElementById('resultadoTotal').innerHTML = `
            <h4>Costo Total</h4>
            <strong>Total Compra:</strong> Gs. ${formatCurrency(totalCompra)} <br>
            <strong>Descuento Total:</strong> Gs. ${formatCurrency(descuento * cantidadCompra)} <br>
            <strong>Cantidad de Compra:</strong> ${cantidadCompra} unidades <br>
            <strong>Cantidad de Puntos por Segmento:</strong> ${puntosAcumuladosSegmentoTotal} (Valor en Gs.: ${formatCurrency(valorPuntosSegmentoTotal)}) <br>
            <strong>Cantidad Total de Puntos por Desafíos:</strong> ${totalPuntosDesafios} (Valor en Gs.: ${formatCurrency(valorTotalPuntosDesafios)}) <br>
            <strong class="highlight">Precio Final Total: Gs. ${formatCurrency(precioFinalTotal)}</strong>
        `;
    } else {
        document.getElementById('resultadoUnitario').innerText = "Por favor, ingrese todos los valores correctamente.";
        document.getElementById('resultadoTotal').innerText = "";
    }
});
