// Variables globales
let currentUser = null;
let cart = [];
let cartExtras = [];
let users = [];
let contacts = [];

// Cargar datos del localStorage al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    checkUserSession();
    setupEventListeners();
    loadContactForm();
});

// ==================== LOCALSTORAGE ====================
function loadFromLocalStorage() {
    users = JSON.parse(localStorage.getItem('users')) || [];
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartExtras = JSON.parse(localStorage.getItem('cartExtras')) || [];
    contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
}

function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartExtras', JSON.stringify(cartExtras));
    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// ==================== AUTENTICACIÓN ====================
function setupEventListeners() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Checkout
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validar que no estén vacíos
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = { email: user.email, name: user.name };
        saveToLocalStorage();
        
        // Cerrar modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();

        // Limpiar formulario
        document.getElementById('loginForm').reset();

        // Actualizar UI
        updateUserButton();
        showAlert('Bienvenido ' + user.name, 'success');
    } else {
        alert('Correo o contraseña incorrectos');
    }
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    // Validaciones
    if (!name || !email || !password || !passwordConfirm) {
        alert('Por favor completa todos los campos');
        return;
    }

    if (password !== passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
        alert('Este correo ya está registrado');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        registeredDate: new Date().toLocaleString('es-ES')
    };

    users.push(newUser);
    currentUser = { email: newUser.email, name: newUser.name };
    saveToLocalStorage();

    // Cerrar modal
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();

    // Limpiar formulario
    document.getElementById('registerForm').reset();

    // Actualizar UI
    updateUserButton();
    showAlert('Bienvenido ' + name + ', tu cuenta ha sido creada', 'success');
}

function checkUserSession() {
    if (currentUser) {
        updateUserButton();
    }
}

function updateUserButton() {
    const btnUser = document.getElementById('btnUser');
    if (currentUser) {
        btnUser.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name}`;
        btnUser.onclick = function() {
            showUserProfile();
            const modal = new bootstrap.Modal(document.getElementById('userProfileModal'));
            modal.show();
        };
        btnUser.removeAttribute('data-bs-toggle');
        btnUser.removeAttribute('data-bs-target');
    } else {
        btnUser.innerHTML = `<i class="fas fa-user"></i> Iniciar Sesión`;
        btnUser.setAttribute('data-bs-toggle', 'modal');
        btnUser.setAttribute('data-bs-target', '#loginModal');
        btnUser.onclick = null;
    }
}

function logout() {
    currentUser = null;
    cart = [];
    cartExtras = [];
    saveToLocalStorage();
    updateUserButton();
    
    // Cerrar modal
    const profileModal = bootstrap.Modal.getInstance(document.getElementById('userProfileModal'));
    profileModal.hide();
    
    showAlert('Sesión cerrada correctamente', 'info');
}

function showUserProfile() {
    const profileContent = document.getElementById('userProfileContent');
    
    const html = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="text-dark fw-bold mb-3">Información Personal</h6>
                <p><strong>Nombre:</strong> ${currentUser.name}</p>
                <p><strong>Correo:</strong> ${currentUser.email}</p>
                <p><strong>Miembro desde:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            </div>
            <div class="col-md-6">
                <h6 class="text-dark fw-bold mb-3">Resumen de Compras</h6>
                <p><strong>Paquetes comprados:</strong> ${getUserOrders().length}</p>
                <p><strong>Total gastado:</strong> $${getTotalSpent()}</p>
            </div>
        </div>
        <hr>
        <h6 class="text-dark fw-bold mb-3">Historial de Compras</h6>
        <div style="max-height: 300px; overflow-y: auto;">
            ${getUserOrdersHTML()}
        </div>
    `;
    
    profileContent.innerHTML = html;
}

function getUserOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders.filter(o => o.email === currentUser.email);
}

function getUserOrdersHTML() {
    const orders = getUserOrders();
    
    if (orders.length === 0) {
        return '<p class="text-muted">No hay compras registradas</p>';
    }
    
    return `
        <table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Paquete</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>${order.items.map(i => i.name).join(', ')}</td>
                        <td>${order.items.length}</td>
                        <td>$${order.total}</td>
                        <td>${order.date}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function getTotalSpent() {
    const orders = getUserOrders();
    return orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0).toFixed(2);
}

// ==================== CARRITO ====================
function addToCart(packageName, price) {
    if (!currentUser) {
        alert('Por favor inicia sesión primero');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    const item = {
        id: Date.now(),
        name: packageName,
        price: price,
        quantity: 1
    };

    cart.push(item);
    saveToLocalStorage();
    showAlert(`${packageName} agregado al carrito`, 'success');
    updateCartCount();
}

function addExtra(extraName, price) {
    if (!currentUser) {
        alert('Por favor inicia sesión primero');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    const extra = {
        id: Date.now(),
        name: extraName,
        price: price,
        quantity: 1
    };

    cartExtras.push(extra);
    saveToLocalStorage();
    showAlert(`${extraName} agregado al carrito`, 'success');
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.length + cartExtras.length;
    // Aquí puedes actualizar un contador de carrito si lo deseas
}

function removeFromCart(itemId, isExtra = false) {
    if (isExtra) {
        cartExtras = cartExtras.filter(item => item.id !== itemId);
    } else {
        cart = cart.filter(item => item.id !== itemId);
    }
    saveToLocalStorage();
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0 && cartExtras.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted">Tu carrito está vacío</p>';
        return;
    }

    let html = '';

    // Agregar paquetes
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h6 class="text-dark">${item.name}</h6>
                    <small class="text-muted">Cantidad: ${item.quantity}</small>
                </div>
                <div class="text-end">
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="btn-remove btn-sm mt-2" onclick="removeFromCart(${item.id}, false)">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    // Agregar extras
    cartExtras.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h6 class="text-dark">${item.name}</h6>
                    <small class="text-muted">Cantidad: ${item.quantity}</small>
                </div>
                <div class="text-end">
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="btn-remove btn-sm mt-2" onclick="removeFromCart(${item.id}, true)">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    updateCartTotal();
}

function updateCartTotal() {
    const total = calculateTotal();
    document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
    document.getElementById('totalAmount').textContent = '$' + total.toFixed(2);
}

function calculateTotal() {
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    cartExtras.forEach(item => {
        total += item.price * item.quantity;
    });
    
    return total;
}

function proceedToCheckout() {
    if (cart.length === 0 && cartExtras.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Llenar datos del usuario
    document.getElementById('checkoutName').value = currentUser.name;
    document.getElementById('checkoutEmail').value = currentUser.email;

    // Mostrar modal de checkout
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();

    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

function handleCheckout(e) {
    e.preventDefault();

    // Validar formulario
    if (!e.target.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('was-validated');
        return;
    }
    
    // Validar el método de pago seleccionado
    if (!validatePaymentData()) {
        return;
    }

    // Simular procesamiento de pago
    const total = calculateTotal();
    
    // Crear orden
    const order = {
        id: Date.now(),
        email: currentUser.email,
        name: document.getElementById('checkoutName').value,
        phone: document.getElementById('checkoutPhone').value,
        items: [...cart, ...cartExtras],
        total: total.toFixed(2),
        paymentMethod: selectedPaymentMethod,
        date: new Date().toLocaleString('es-ES'),
        status: 'Completada'
    };

    // Guardar orden
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Limpiar carrito
    cart = [];
    cartExtras = [];
    saveToLocalStorage();

    // Cerrar modal y mostrar confirmación
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();

    // Limpiar formulario
    e.target.reset();

    // Mostrar mensaje de éxito con método de pago
    const paymentMethodNames = {
        'tarjeta': 'Tarjeta de crédito',
        'pse': 'PSE',
        'nequi': 'Nequi',
        'bancolombia': 'Bancolombia'
    };
    
    const paymentName = paymentMethodNames[selectedPaymentMethod] || 'Tarjeta';

    showAlert(`¡Compra realizada exitosamente! Pagado con: ${paymentName}. Tu orden #${order.id} ha sido confirmada. Te enviaremos los detalles a ${order.email}`, 'success');
}

// Abrir carrito
function openCart() {
    displayCart();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Agregar botón para abrir carrito (opcional)
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón flotante del carrito
    const cartButton = document.createElement('button');
    cartButton.id = 'cartButton';
    cartButton.className = 'btn btn-primary position-fixed';
    cartButton.style.cssText = 'bottom: 30px; right: 30px; z-index: 999; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);';
    cartButton.innerHTML = '<i class="fas fa-shopping-cart fa-lg"></i>';
    cartButton.title = 'Ver carrito';
    cartButton.onclick = openCart;
    
    document.body.appendChild(cartButton);
});

// ==================== FORMULARIO DE CONTACTO ====================
function loadContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm && currentUser) {
        document.getElementById('nombre').value = currentUser.name;
        document.getElementById('email').value = currentUser.email;
    }
}

function handleContactSubmit(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('was-validated');
        return;
    }

    const contact = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value,
        fecha: new Date().toLocaleString('es-ES')
    };

    contacts.push(contact);
    saveToLocalStorage();

    showAlert('Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.', 'success');
    document.getElementById('contactForm').reset();
    loadContactForm();
}

// ==================== UTILIDADES ====================
function showAlert(message, type = 'info') {
    // Crear contenedor de alerta si no existe
    let alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alertContainer';
        alertContainer.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; max-width: 400px;';
        document.body.appendChild(alertContainer);
    }

    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${type === 'success' ? '¡Éxito!' : type === 'error' ? '¡Error!' : 'Información'}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = alertHTML;
    alertContainer.appendChild(tempDiv.firstElementChild);

    // Auto remover después de 5 segundos
    setTimeout(() => {
        const alert = document.getElementById(alertId);
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}



// Formatear número de tarjeta
document.addEventListener('DOMContentLoaded', function() {
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = formattedValue;
        });
    }

    const expiryInput = document.getElementById('cardExpiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/gi, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    const cvcInput = document.getElementById('cardCVC');
    if (cvcInput) {
        cvcInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/gi, '');
        });
    }
});

// Validación de formularios de Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});

// Scroll suave para links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cerrar navbar al hacer clic en un link
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggle = document.querySelector('.navbar-toggler');
        if (navbarToggle.offsetParent !== null) { // Si está visible
            navbarToggle.click();
        }
    });
});

// Inicializar tooltips y popovers de Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Función para generar reportes (opcional)
function generateReport() {
    if (!currentUser) {
        alert('Debes iniciar sesión para acceder a esto');
        return;
    }

    const orders = getUserOrders();
    console.log('Órdenes del usuario:', orders);
    console.log('Total gastado:', getTotalSpent());
}

// Exportar datos (backup)
function exportData() {
    const data = {
        users: users,
        orders: JSON.parse(localStorage.getItem('orders')) || [],
        contacts: contacts,
        exportDate: new Date().toLocaleString('es-ES')
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'freelance-travel-backup.json';
    link.click();
}

// Imprimir comprobante
function printReceipt() {
    const orders = getUserOrders();
    if (orders.length === 0) {
        alert('No hay órdenes para imprimir');
        return;
    }

    const lastOrder = orders[orders.length - 1];
    const printContent = `
        <html>
            <head>
                <title>Comprobante de Compra</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .receipt { max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; }
                    h2 { text-align: center; color: #0066cc; }
                    .item { display: flex; justify-content: space-between; padding: 5px 0; }
                    .total { border-top: 2px solid #0066cc; margin-top: 10px; padding-top: 10px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <h2>FREELANCE TRAVEL</h2>
                    <p>Orden #${lastOrder.id}</p>
                    <p>Fecha: ${lastOrder.date}</p>
                    <p>Cliente: ${lastOrder.name}</p>
                    <hr>
                    ${lastOrder.items.map(item => `<div class="item"><span>${item.name}</span><span>$${item.price}</span></div>`).join('')}
                    <div class="total">
                        Total: $${lastOrder.total}
                    </div>
                </div>
                <script>
                    window.print();
                </script>
            </body>
        </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// ==================== MÉTODOS DE PAGO ====================
let selectedPaymentMethod = 'tarjeta';

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Ocultar todos los formularios
    document.getElementById('cardPaymentForm').style.display = 'none';
    document.getElementById('psePaymentForm').style.display = 'none';
    document.getElementById('nequiPaymentForm').style.display = 'none';
    document.getElementById('bancolombiaPaymentForm').style.display = 'none';
    
    // Mostrar el formulario seleccionado
    switch(method) {
        case 'tarjeta':
            document.getElementById('cardPaymentForm').style.display = 'block';
            break;
        case 'pse':
            document.getElementById('psePaymentForm').style.display = 'block';
            break;
        case 'nequi':
            document.getElementById('nequiPaymentForm').style.display = 'block';
            break;
        case 'bancolombia':
            document.getElementById('bancolombiaPaymentForm').style.display = 'block';
            break;
    }
}

function validatePaymentData() {
    switch(selectedPaymentMethod) {
        case 'tarjeta':
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVC = document.getElementById('cardCVC').value;
            
            if (!cardNumber || !cardExpiry || !cardCVC) {
                showAlert('Por favor completa los datos de la tarjeta', 'error');
                return false;
            }
            
            if (cardNumber.replace(/\s/g, '').length < 13) {
                showAlert('Número de tarjeta inválido', 'error');
                return false;
            }
            break;
            
        case 'pse':
            const peseBanco = document.getElementById('peseBanco').value;
            if (!peseBanco) {
                showAlert('Por favor selecciona un banco', 'error');
                return false;
            }
            break;
            
        case 'nequi':
            const nequiPhone = document.getElementById('nequiPhone').value;
            if (!nequiPhone || nequiPhone.length < 10) {
                showAlert('Por favor ingresa un número de celular válido', 'error');
                return false;
            }
            break;
            
        case 'bancolombia':
            const bancolombiaAccount = document.getElementById('bancolombiaAccount').value;
            if (!bancolombiaAccount) {
                showAlert('Por favor ingresa tu número de cuenta', 'error');
                return false;
            }
            break;
    }
    
    return true;
}

// Modificar handleCheckout para validar método de pago
// Ya está actualizado arriba

// ============================================
// RECUPERACIÓN DE CONTRASEÑA - FLUJO CON LINK
// ============================================

let correoRecuperacion = '';
let tokensRecuperacion = {}; // Almacenar tokens de recuperación

// Generar token único simulado
function generarTokenRecuperacion() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Función para enviar el enlace de recuperación
function enviarLinkRecuperacion() {
    let correo = document.getElementById('cajacorreoRecuperacion').value;
    
    if(!correo) {
        Swal.fire({
            title: "Error",
            text: "Por favor ingresa tu correo",
            icon: "error"
        });
        return;
    }

    // Validar que el correo exista
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioEncontrado = usuarios.find(u => u.correo === correo);

    if(!usuarioEncontrado) {
        Swal.fire({
            title: "Error",
            text: "No encontramos una cuenta con ese correo",
            icon: "error"
        });
        return;
    }

    // Generar token único
    let token = generarTokenRecuperacion();
    correoRecuperacion = correo;
    tokensRecuperacion[token] = {
        correo: correo,
        fechaCreacion: new Date(),
        usado: false
    };

    // Guardar tokens en localStorage
    localStorage.setItem('tokensRecuperacion', JSON.stringify(tokensRecuperacion));

    // Crear el enlace de recuperación (simulado)
    let enlaceRecuperacion = `${window.location.href}?resetToken=${token}`;

    // Mostrar el enlace en un alert (en producción se enviaría por correo real)
    Swal.fire({
        title: "✉️ Enlace de recuperación enviado",
        html: `
            <p><strong>Se ha enviado un correo a:</strong></p>
            <p style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; font-weight: bold;">${correo}</p>
            <p style="margin-top: 15px; font-size: 12px; color: #666;">El enlace es válido por 24 horas</p>
            <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: left;">
                <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;"><strong>Para simular la recuperación:</strong></p>
                <p style="font-size: 11px; color: #666; margin: 0; word-break: break-all; background-color: white; padding: 8px; border-radius: 3px;">
                    <code>${enlaceRecuperacion}</code>
                </p>
            </div>
            <p style="margin-top: 15px; font-size: 12px; color: #666;">O continúa con el siguiente paso en el modal</p>
        `,
        icon: "success",
        confirmButtonText: "Continuar"
    }).then(() => {
        // Mostrar interfaz para cambiar contraseña
        document.getElementById('paso1-correo').style.display = 'none';
        document.getElementById('paso2-cambiar').style.display = 'block';
        document.getElementById('btnEnviarLink').style.display = 'none';
        document.getElementById('btnCambiarContraseña').style.display = 'inline-block';
        
        // Guardar el token actual para el cambio de contraseña
        localStorage.setItem('tokenActual', token);
        localStorage.setItem('correoRecuperacion', correo);
    });
}

// Función para cambiar la contraseña
function cambiarContraseña() {
    let nuevaContraseña = document.getElementById('cajaContraseñaNueva').value;
    let confirmar = document.getElementById('cajaContraseñaConfirm').value;

    if(!nuevaContraseña || !confirmar) {
        Swal.fire({
            title: "Error",
            text: "Por favor completa ambos campos",
            icon: "error"
        });
        return;
    }

    if(nuevaContraseña !== confirmar) {
        Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error"
        });
        return;
    }

    if(nuevaContraseña.length < 4) {
        Swal.fire({
            title: "Error",
            text: "La contraseña debe tener al menos 4 caracteres",
            icon: "error"
        });
        return;
    }

    // Obtener token actual
    let tokenActual = localStorage.getItem('tokenActual');
    let correoActual = localStorage.getItem('correoRecuperacion');

    if(!tokenActual || !correoActual) {
        Swal.fire({
            title: "Error",
            text: "La sesión ha expirado. Intenta nuevamente.",
            icon: "error"
        });
        return;
    }

    // Actualizar contraseña en localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioIndex = usuarios.findIndex(u => u.correo === correoActual);
    
    if(usuarioIndex !== -1) {
        usuarios[usuarioIndex].contraseña = nuevaContraseña;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Marcar token como usado
        tokensRecuperacion[tokenActual].usado = true;
        localStorage.setItem('tokensRecuperacion', JSON.stringify(tokensRecuperacion));
    }

    // Mostrar mensaje de éxito
    document.getElementById('mensajeExitoRecuperacion').style.display = 'block';
    document.getElementById('paso2-cambiar').style.display = 'none';
    document.getElementById('btnCambiarContraseña').style.display = 'none';

    setTimeout(() => {
        // Cerrar modal
        let modal = document.getElementById('modalRecuperarContraseña');
        if(modal) {
            let bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
            bsModal.hide();
        }

        // Esperar a que se cierre el modal
        setTimeout(() => {
            // Reset del modal
            document.getElementById('cajacorreoRecuperacion').value = '';
            document.getElementById('cajaContraseñaNueva').value = '';
            document.getElementById('cajaContraseñaConfirm').value = '';
            document.getElementById('paso1-correo').style.display = 'block';
            document.getElementById('paso2-cambiar').style.display = 'none';
            document.getElementById('mensajeExitoRecuperacion').style.display = 'none';
            document.getElementById('btnEnviarLink').style.display = 'inline-block';
            document.getElementById('btnCambiarContraseña').style.display = 'none';

            // Limpiar localStorage
            localStorage.removeItem('tokenActual');
            localStorage.removeItem('correoRecuperacion');

            Swal.fire({
                title: "¡Éxito!",
                text: "Tu contraseña ha sido cambiada correctamente. Ya puedes ingresar con tu nueva contraseña.",
                icon: "success"
            });
        }, 300);
    }, 1000);
}

// Verificar si hay token en la URL para recuperación
window.addEventListener('load', function() {
    // Evitar duplicados
    if(window.recuperacionIniciada) return;
    window.recuperacionIniciada = true;
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('resetToken');

    if(token) {
        let tokensRecuperacion = JSON.parse(localStorage.getItem('tokensRecuperacion')) || {};
        
        if(tokensRecuperacion[token] && !tokensRecuperacion[token].usado) {
            // Token válido y no usado
            let correo = tokensRecuperacion[token].correo;
            localStorage.setItem('tokenActual', token);
            localStorage.setItem('correoRecuperacion', correo);

            // Abrir modal y mostrar formulario de cambio de contraseña
            let modal = document.getElementById('modalRecuperarContraseña');
            if(modal) {
                let bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                
                document.getElementById('paso1-correo').style.display = 'none';
                document.getElementById('paso2-cambiar').style.display = 'block';
                document.getElementById('btnEnviarLink').style.display = 'none';
                document.getElementById('btnCambiarContraseña').style.display = 'inline-block';
            }

            // Limpiar URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if(token) {
            Swal.fire({
                title: "Enlace inválido",
                text: "El enlace de recuperación ha expirado o ya fue usado.",
                icon: "error"
            });
        }
    }
});
