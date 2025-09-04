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
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validaciones básicas
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                showCustomAlert('error','Error','Las contraseñas no coinciden');
                
                return;
            }
            
            // Validar fortaleza de la contraseña
            if (password.length < 8) {
                showCustomAlert('error','Error','La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                showCustomAlert('error','Error','La contraseña debe contener mayúsculas, minúsculas y números');
                return;
            }
            
            // Validar términos
            if (!terms) {
                showCustomAlert('error','Error','Debes aceptar los términos y condiciones');
                return;
            }
            var name = firstName + " " + lastName;

            // Simular envío del formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
            submitBtn.disabled = true;
            
            $.ajax({
                
                    url: AppConfig.apiBaseUrl + "user/register?nombre=" + name + "&email=" + email + "&password=" + password,
                    method: "POST",
                    dataType: "json",
                    success: function (data, status, xhr) {
                        // Simular retraso de red
                        setTimeout(() => {
                            // Simular respuesta exitosa
                            showCustomAlert('success','!Exito¡','¡Cuenta creada exitosamente! Redirigiendo...', 'success');

                            // Restaurar botón
                            submitBtn.textContent = "Crear cuenta";
                            submitBtn.disabled = false;

                            // Simular redirección después de registro exitoso
                            setTimeout(() => {
                                console.log('Registro exitoso. Datos:', data);
                                window.location.href = "dashboard.html";
                            }, 1500);
                        }, 2000);
                    },
                    error: function (jsxhr, status, error) {

                        showCustomAlert('error','Error','Error en el registro, favor de intentarlo mas tarde.', 'error');
                        // Restaurar botón
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
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
            
            // Validación en tiempo real para la contraseña
            if (input.id === 'password') {
                input.addEventListener('input', function() {
                    const password = this.value;
                    const hasLength = password.length >= 8;
                    const hasUpperCase = /[A-Z]/.test(password);
                    const hasLowerCase = /[a-z]/.test(password);
                    const hasNumbers = /\d/.test(password);
                    
                    // Aquí podrías agregar indicadores visuales de fortaleza de contraseña
                });
            }
        });

    