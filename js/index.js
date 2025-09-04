
$(document).ready(function () {
    $("#urlCount").val("0");
});

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
            showCustomAlert('error','Error.','Por favor, ingresa una URL válida');
            return;
        }
        if ($("#urlCount").val() == "1") {
            openModal();
        }
        else {  
            shortenBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            shortenBtn.disabled = true;

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
                    shortenBtn.innerHTML = 'Acortar';
                    shortenBtn.disabled = false;
                    $("#urlCount").val("1");
                },
                error: function (jsxhr, status, error) {

                    showNotification('Error al generar el link..', 'error');
                    resultContainer.classList.add('hidden');
                }
            });
        }

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
});

function registro()
{
    $("#urlCount").val("0");
    location.href="singup.html";
}

function Login()
{
    $("#urlCount").val("0");
        location.href="login.html";
    
}

function openModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    return;
}
// Función para cerrar el modal
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.body.style.overflow = 'auto'; // Permitir scroll
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Simular inicio de sesión
        function simulateLogin() {
            alert('Redirigiendo a la página de inicio de sesión...\n\nEn una implementación real, esto te llevaría al formulario de login.');
            closeModal();
        }
        
        // Simular registro
        function simulateRegister() {
            alert('Redirigiendo a la página de registro...\n\nEn una implementación real, esto te llevaría al formulario de registro.');
            closeModal();
        }
        
        // Ejemplo: Abrir automáticamente después de 1 segundo para demo
        //setTimeout(openModal, 1000);