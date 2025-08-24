

document.addEventListener('DOMContentLoaded', function () {
    const shortenBtn = document.querySelector('.shorten-btn');
    const urlInput = document.querySelector('.url-input');
    const resultContainer = document.querySelector('.result-container');
    const shortUrlElement = document.getElementById('short-url');
    const copyBtn = document.getElementById('copy-btn');

    // Función para acortar URL (simulada)
    shortenBtn.addEventListener('click', function () {
        const originalUrl = urlInput.value.trim();

        if (!originalUrl) {
            alert('Por favor, ingresa una URL válida');
            return;
        }

        // Simulación de llamada a la API
        $.ajax({
            url: AppConfig.apiBaseUrl + "short/free",
            method: "POST",
            contentType: 'application/json', // Tipo de contenido JSON
            data: JSON.stringify(originalUrl),
            success: function (data, status, xhr) {
                console.log(data);
                shortUrlElement.textContent = data.shortUrl;
                shortUrlElement.href = data.shortUrl;
                resultContainer.classList.remove('hidden');

                // Añadir efecto de éxito
                resultContainer.classList.add('success-border');

                // Scroll suave hacia el resultado
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            },
            error: function (jsxhr, status, error) {

                showNotification('Error al generar el link..', 'error');
                resultContainer.classList.add('hidden');
            }
        });
    });

    // Función para copiar al portapapeles
    copyBtn.addEventListener('click', function () {
        const shortUrl = shortUrlElement.textContent;

        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                resultContainer.classList.add('copied');
                setTimeout(() => {
                    resultContainer.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                alert('Error al copiar: ', err);
            });
    });

    // Simulación de la API (reemplazar con llamada real)
    function simulateApiCall(originalUrl) {
        return new Promise((resolve) => {
            // Simulamos un retraso de red
            setTimeout(() => {
                // En una implementación real, esto vendría de tu API
                const baseUrl = 'https://swiftlink.io/';
                const randomId = Math.random().toString(36).substring(2, 8);
                resolve(baseUrl + randomId);
            }, 800);
        });
    }
});