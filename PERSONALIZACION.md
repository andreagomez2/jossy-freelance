# Ejemplos de Personalización - Freelance Travel

## 🎨 Cambiar Colores

### En `styles.css`

Busca la sección `:root` y modifica los valores:

```css
:root {
    --primary: #0066cc;      /* Cambiar azul */
    --secondary: #ffffff;    /* Cambiar blanco */
    --accent: #ffc107;       /* Cambiar dorado */
    --dark: #1a1a1a;         /* Cambiar gris oscuro */
}
```

### Ejemplo: Cambiar a tema Verde y Naranja

```css
:root {
    --primary: #00a86b;      /* Verde */
    --secondary: #ffffff;    /* Blanco */
    --accent: #ff8c00;       /* Naranja */
    --dark: #1a1a1a;         /* Gris oscuro */
}
```

## 📝 Cambiar Textos

### En `index.html`

1. **Nombre de la agencia**: Busca `FREELANCE` y reemplaza
2. **Nombre en el footer**: Busca `Freelance Travel Agency`
3. **Descripción**: Busca el texto en la sección "Quiénes Somos"

Ejemplo:
```html
<!-- De -->
<a class="navbar-brand fw-bold text-warning" href="#home">
    <i class="fas fa-globe"></i> FREELANCE
</a>

<!-- A -->
<a class="navbar-brand fw-bold text-warning" href="#home">
    <i class="fas fa-globe"></i> MI AGENCIA
</a>
```

## 💰 Modificar Precios de Paquetes

En `index.html`, busca la sección de paquetes:

```html
<!-- Cambiar el precio del paquete -->
<span class="text-warning fs-3 fw-bold">$999</span>

<!-- También cambiar en la función JavaScript -->
onclick="addToCart('Aventura Básica', 999)"
```

## 🏖️ Cambiar Imágenes del Carrusel

En `index.html`, busca el carrusel y reemplaza las URLs:

```html
<!-- De -->
<img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop" 
     class="d-block w-100" alt="Playas">

<!-- A -->
<img src="TU_URL_DE_IMAGEN" class="d-block w-100" alt="Playas">
```

## 🔗 Agregar Nuevas Secciones

### Ejemplo: Agregar una nueva sección de Blog

En `index.html`, agrega después de la sección de contacto:

```html
<!-- Sección de Blog -->
<section id="blog" class="py-5 bg-white">
    <div class="container">
        <h2 class="text-center mb-5 text-dark">Últimas Noticias</h2>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow">
                    <img src="..." class="card-img-top" alt="Blog">
                    <div class="card-body">
                        <h5 class="card-title">Título del artículo</h5>
                        <p class="card-text">Descripción breve del artículo</p>
                        <a href="#" class="btn btn-primary">Leer más</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

En `index.html`, agrega al navbar:

```html
<li class="nav-item"><a class="nav-link" href="#blog">Blog</a></li>
```

## 🗺️ Agregar Mapa

En `index.html`, agrega esta sección:

```html
<!-- Sección de Ubicación -->
<section id="map" class="py-5 bg-light">
    <div class="container">
        <h2 class="text-center mb-5 text-dark">Ubícanos</h2>
        <div class="row">
            <div class="col-md-8">
                <iframe src="https://www.google.com/maps/embed?pb=..." 
                        width="100%" height="400" style="border:0;" 
                        allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="col-md-4">
                <h5>Contáctanos</h5>
                <p>📍 Calle Principal 123, Ciudad</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📧 info@freelancetravel.com</p>
            </div>
        </div>
    </div>
</section>
```

## 📧 Agregar Nuevas Funcionalidades en JavaScript

### Ejemplo: Sistema de Wishlist (Lista de Deseos)

En `script.js`, agrega:

```javascript
let wishlist = [];

// Cargar wishlist
function loadWishlist() {
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Agregar a wishlist
function addToWishlist(packageName, price) {
    const item = {
        id: Date.now(),
        name: packageName,
        price: price,
        addedDate: new Date().toLocaleString('es-ES')
    };
    
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showAlert(`${packageName} agregado a tu lista de deseos`, 'success');
}

// Ver wishlist
function viewWishlist() {
    console.log('Wishlist:', wishlist);
}
```

En `index.html`, agrega un botón en cada paquete:

```html
<button class="btn btn-outline-warning w-100" 
        onclick="addToWishlist('Aventura Básica', 999)">
    <i class="fas fa-heart"></i> Agregar a Deseos
</button>
```

## 🎯 Ejemplo: Agregar Sistema de Código de Descuento

En `script.js`, modifica la función de checkout:

```javascript
let discountCode = null;
let discountPercent = 0;

function applyDiscount() {
    const code = document.getElementById('discountCode').value;
    
    // Códigos de descuento válidos
    const validCodes = {
        'HOLIDAY2025': 20,  // 20% descuento
        'FRIEND': 10,       // 10% descuento
        'EARLY': 15         // 15% descuento
    };
    
    if (validCodes[code]) {
        discountPercent = validCodes[code];
        showAlert(`¡Descuento de ${discountPercent}% aplicado!`, 'success');
        updateCartTotal();
    } else {
        showAlert('Código de descuento inválido', 'error');
    }
}

function calculateTotal() {
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    cartExtras.forEach(item => {
        total += item.price * item.quantity;
    });
    
    // Aplicar descuento
    if (discountPercent > 0) {
        total = total * (1 - discountPercent / 100);
    }
    
    return total;
}
```

## 🌍 Cambiar Idioma

Crea un archivo `lang/es.json`:

```json
{
  "home": "Inicio",
  "about": "Quiénes Somos",
  "services": "Servicios",
  "packages": "Paquetes",
  "contact": "Contacto",
  "login": "Iniciar Sesión",
  "register": "Registrarse",
  "logout": "Cerrar Sesión",
  "buyPackage": "Comprar Paquete",
  "addToCart": "Agregar al Carrito"
}
```

Y en `script.js`:

```javascript
let currentLanguage = 'es';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    location.reload();
}

function translate(key) {
    const translations = {
        'es': { /* contenido en español */ },
        'en': { /* contenido en inglés */ }
    };
    
    return translations[currentLanguage][key] || key;
}
```

## 🎬 Agregar Video en la Sección de Hero

En `index.html`:

```html
<!-- Reemplazar el carrusel con video -->
<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" 
            src="https://www.youtube.com/embed/VIDEO_ID" 
            allowfullscreen></iframe>
</div>
```

## 📱 Agregar Push Notifications

En `script.js`:

```javascript
// Solicitar permiso para notificaciones
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

// Enviar notificación
function sendNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            icon: 'https://example.com/icon.png',
            ...options
        });
    }
}

// Usar al completar una compra
function handleCheckout(e) {
    // ... código de compra ...
    sendNotification('¡Compra completada!', {
        body: 'Tu pedido ha sido confirmado'
    });
}
```

## 🔔 Agregar Nuevas Funcionalidades del Admin

En `admin.html`, agrega nuevas secciones:

```html
<li class="nav-item">
    <a class="nav-link" href="#invoices" data-section="invoices">
        <i class="fas fa-file-invoice"></i> Facturas
    </a>
</li>
```

## 📊 Agregar Gráficos

Incluye Chart.js:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="revenueChart"></canvas>

<script>
const ctx = document.getElementById('revenueChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [{
            label: 'Ingresos',
            data: [1000, 2000, 1500],
            borderColor: '#0066cc',
            backgroundColor: 'rgba(0, 102, 204, 0.1)'
        }]
    }
});
</script>
```

## 🎨 Personalizar Fuentes

En `styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
    font-family: 'Poppins', 'Segoe UI', sans-serif;
}
```

## 🚀 Desplegar en un Servidor

### Opción 1: Netlify
1. Sube los archivos a un repositorio de GitHub
2. Ve a netlify.com
3. Conecta tu repositorio
4. ¡Listo! Tu sitio está en vivo

### Opción 2: Vercel
1. Instala Vercel CLI
2. Ejecuta `vercel`
3. Sigue las instrucciones
4. Tu sitio estará en vivo

### Opción 3: GitHub Pages
1. Crea un repositorio llamado `username.github.io`
2. Sube los archivos
3. Tu sitio estará en `https://username.github.io`

---

**Para más ejemplos y documentación, consulta:**
- Bootstrap: https://getbootstrap.com
- Font Awesome: https://fontawesome.com
- MDN Web Docs: https://developer.mozilla.org

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
