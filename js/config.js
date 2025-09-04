var AppConfig = {
    apiBaseUrl: "https://linksh.somee.com/",
    apiBaseUrls: "https://localhost:7105/",
    apiUrlShor: "https://sftl.io/",
    timeout: 5000,
    enableLogs: true
};

// Función para mostrar alertas
function showAlert(type, title, messages, duration = 5000) {
    const alertContainer = document.getElementById('alert-container');
    const alertId = 'alert-' + Date.now();

    // Icono según el tipo
    let iconClass;
    switch (type) {
        case 'success':
            iconClass = 'fas fa-check-circle';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-triangle';
            break;
        case 'info':
            iconClass = 'fas fa-info-circle';
            break;
        default:
            iconClass = 'fas fa-info-circle';
    }

    // Crear elemento de alerta
    const alertElement = document.createElement('div');
    alertElement.id = alertId;
    alertElement.className = `alert alert-${type}`;
    alertElement.innerHTML = `
                <div class="alert-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${title}</div>
                    <div class="alert-message">${messages}</div>
                </div>
                <button class="alert-close" onclick="closeAlert('${alertId}')">
                    <i class="fas fa-times"></i>
                </button>
                <div class="alert-progress">
                    <div class="alert-progress-bar"></div>
                </div>
            `;

    // Agregar al contenedor
    alertContainer.appendChild(alertElement);

    // Auto-cerrar después de la duración especificada
    if (duration > 0) {
        setTimeout(() => {
            closeAlert(alertId);
        }, duration);
    }

    // Devolver ID para control manual
    return alertId;
}

// Función para cerrar alertas
function closeAlert(alertId) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
        alertElement.classList.add('hide');
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 300);
    }
}

// Función para mostrar alerta personalizada
function showCustomAlert(type, titulo, cMessage) {
    debugger;
    const messageInput = cMessage;
    //const message = messageInput.value.trim();

    if (cMessage) {
        showAlert(type, titulo, messageInput);
        messageInput.value = '';
    };
}