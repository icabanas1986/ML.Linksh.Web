// Función para mostrar/ocultar contraseña
        function togglePassword(inputId) {
            const passwordInput = document.getElementById(inputId);
            const toggleIcon = passwordInput.nextElementSibling.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
        
        // Validación del formulario
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Obtener valores
            debugger;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validaciones básicas
            if (!email) {
                alert('Por favor, ingresa tu correo electrónico');
                return;
            }
            
            if (!password) {
                alert('Por favor, ingresa tu contraseña');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido');
                return;
            }
            
            // Simular envío del formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
            submitBtn.disabled = true;
            
            // Simular retraso de red
            setTimeout(() => {
               $.ajax({
                    url: "https://linksh.somee.com/user/login?email=" + email + "&password=" + password,
                    method: "POST",
                    dataType: "json",
                    success: function (data, status, xhr) {
                            showCustomAlert("success","!Exito¡","Inicio de sesión correcto. </br> Redirigiendo al dashboard..");
                            // Simular redirección
                            setTimeout(() => {
                                window.location.href = "dashboard.html";
                            }, 1500);
                    },
                    error: function (jsxhr, status, error) {

                        showCustomAlert('warning',"Advertencia",'Correo o contraseña incorrectos....');
                    }
                });
                submitBtn.innerHTML = 'Iniciar sesión';
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Mejorar la experiencia de usuario
        document.querySelectorAll('input').forEach(input => {
            // Agregar estilos cuando el input tiene contenido
            input.addEventListener('blur', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
        
        // Credenciales de demo para facilitar pruebas
        // document.addEventListener('DOMContentLoaded', function() {
        //     // Auto-rellenar credenciales de demo (solo para desarrollo)
        //     document.getElementById('email').value = 'demo@swiftlink.com';
        //     document.getElementById('password').value = 'demo123';
        //     document.getElementById('remember').checked = true;
        // });