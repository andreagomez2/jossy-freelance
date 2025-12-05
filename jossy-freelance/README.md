# Freelance Travel Agency - Sitio Web

Bienvenido a **Freelance Travel Agency**, una plataforma moderna y responsive para la reserva de paquetes de viaje.

## 📋 Características Principales

### 1. **Autenticación de Usuarios**
- Registro de nuevos usuarios
- Inicio de sesión seguro
- Perfil de usuario con historial de compras
- Datos guardados en localStorage

### 2. **Catálogo de Servicios**
- **Vuelos**: Reserva de vuelos internacionales y nacionales
- **Hospedaje**: Hoteles y resorts en destinos preferidos
- **Tours**: Tours guiados a lugares fascinantes
- **Actividades**: Experiencias y actividades únicas

### 3. **Paquetes de Viaje**
- **Aventura Básica**: $999/persona (3 noches)
- **Experiencia Premium**: $1,999/persona (5 noches) - Más popular
- **Lujo Total**: $4,999/persona (7 noches)

### 4. **Tours y Actividades Extras**
- Buceo Profesional: +$150
- Senderismo Aventura: +$100
- Tour Gastronómico: +$120
- Tour Nocturno: +$80
- Tour Fotográfico: +$200
- Spa y Relajación: +$175

### 5. **Sistema de Compras**
- Carrito de compras flotante
- Agregar/eliminar items
- Información de pago segura
- Confirmación de compra
- Historial de órdenes

### 6. **Formulario de Contacto**
- Envío de mensajes de consulta
- Datos guardados en localStorage
- Validación de campos

## 🎨 Diseño y Colores

- **Color Primario**: Azul (#0066cc)
- **Color Secundario**: Blanco (#ffffff)
- **Color Acentuado**: Dorado (#ffc107)
- **Color Oscuro**: Gris oscuro (#1a1a1a)
- **Tipografía**: Sans-serif (Segoe UI)

## 📱 Responsividad

El sitio es completamente responsive y se adapta a:
- Dispositivos de escritorio (1200px+)
- Tablets (768px - 1199px)
- Móviles (menos de 768px)

## 🚀 Cómo Usar

### Instalación
1. Descarga los archivos:
   - `index.html` - Página principal
   - `styles.css` - Estilos
   - `script.js` - Funcionalidad

2. Abre `index.html` en tu navegador

### Flujo de Compra

1. **Registrarse/Iniciar Sesión**
   - Haz clic en "Iniciar Sesión" en la esquina superior derecha
   - Completa el formulario de registro o inicio de sesión
   - Tus datos se guardarán automáticamente

2. **Explorar Paquetes**
   - Desplázate hasta la sección "Paquetes"
   - Haz clic en "Comprar Paquete" para agregar al carrito

3. **Agregar Extras**
   - Desplázate hasta "Tours y Actividades Extras"
   - Haz clic en "Añadir" para agregar actividades adicionales

4. **Ver Carrito**
   - Haz clic en el botón de carrito flotante en la esquina inferior derecha
   - Revisa los items y precios totales

5. **Proceder al Pago**
   - Haz clic en "Proceder al Pago"
   - Completa los datos personales y de pago
   - Confirma la compra

### Gestionar tu Perfil

1. Una vez registrado, haz clic en tu nombre en la esquina superior derecha
2. Ver tu información personal
3. Revisar historial de compras
4. Total gastado en viajes

## 💾 LocalStorage

El sitio almacena la siguiente información en localStorage:

```javascript
- users: Array de usuarios registrados
- currentUser: Usuario actualmente logueado
- cart: Paquetes en el carrito
- cartExtras: Tours extras en el carrito
- contacts: Mensajes de contacto
- orders: Historial de compras
```

## 🔒 Seguridad

- Las contraseñas se validan localmente (en producción usar backend)
- Los datos están almacenados en el navegador (localStorage)
- Para un sitio en producción, se recomienda usar un servidor backend

## 📧 Contacto

- **Email**: info@freelancetravel.com
- **Teléfono**: +1 (555) 123-4567
- **Redes Sociales**: Facebook, Twitter, Instagram

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura
- **CSS3**: Estilos y animaciones
- **Bootstrap 5**: Framework responsive
- **JavaScript Vanilla**: Funcionalidad
- **Font Awesome**: Iconos
- **LocalStorage**: Almacenamiento de datos

## 📝 Notas

- Este es un prototipo front-end
- Para un sitio en producción, integra con un backend
- Las imágenes son de ejemplo de Unsplash
- Los datos de prueba se guardan localmente

## ✨ Características Avanzadas

- Validación de formularios
- Animaciones suaves
- Carrusel de imágenes
- Efectos hover en tarjetas
- Scroll suave
- Alertas personalizadas
- Formateo automático de tarjetas de crédito

## 🎯 Próximas Mejoras

- Integración con pasarela de pagos real
- Backend con base de datos
- Sistema de autenticación avanzado
- Notificaciones por email
- Mapa interactivo de destinos
- Chat en vivo con atención al cliente

---

**Versión**: 1.0.0  
**Desarrollado para**: Agencia Freelance Travel  
**Última actualización**: Diciembre 2025
