# Configuración y Datos de Ejemplo - Freelance Travel

## 🎯 Instrucciones para Cargar Datos de Ejemplo

### Opción 1: Usar la Consola del Navegador

1. Abre `index.html` en tu navegador
2. Presiona F12 para abrir Developer Tools
3. Ve a la pestaña "Console"
4. Copia y pega el siguiente código:

```javascript
// Crear usuarios de ejemplo
const exampleUsers = [
    {
        id: 1001,
        name: "Juan García",
        email: "juan@example.com",
        password: "123456",
        registeredDate: "01/12/2025"
    },
    {
        id: 1002,
        name: "María López",
        email: "maria@example.com",
        password: "123456",
        registeredDate: "30/11/2025"
    },
    {
        id: 1003,
        name: "Carlos Rodríguez",
        email: "carlos@example.com",
        password: "123456",
        registeredDate: "28/11/2025"
    }
];

// Guardar usuarios
localStorage.setItem('users', JSON.stringify(exampleUsers));

// Crear órdenes de ejemplo
const exampleOrders = [
    {
        id: 2001,
        email: "juan@example.com",
        name: "Juan García",
        phone: "555-1234",
        items: [
            { name: "Aventura Básica", price: 999 },
            { name: "Buceo Profesional", price: 150 }
        ],
        total: "1149.00",
        cardLast4: "4242",
        date: "01/12/2025 14:30",
        status: "Completada"
    },
    {
        id: 2002,
        email: "maria@example.com",
        name: "María López",
        phone: "555-5678",
        items: [
            { name: "Experiencia Premium", price: 1999 },
            { name: "Tour Fotográfico", price: 200 }
        ],
        total: "2199.00",
        cardLast4: "5555",
        date: "30/11/2025 10:15",
        status: "Completada"
    }
];

// Guardar órdenes
localStorage.setItem('orders', JSON.stringify(exampleOrders));

// Crear contactos de ejemplo
const exampleContacts = [
    {
        id: 3001,
        nombre: "Pedro Martínez",
        email: "pedro@example.com",
        telefono: "555-9999",
        asunto: "Consulta sobre paquete personalizado",
        mensaje: "Me gustaría un paquete personalizado para 10 personas. ¿Cuáles son las opciones?",
        fecha: "02/12/2025 09:45"
    },
    {
        id: 3002,
        nombre: "Ana Fernández",
        email: "ana@example.com",
        telefono: "555-1111",
        asunto: "Problema con mi reserva",
        mensaje: "Tengo un problema con mi reserva. Necesito cambiar la fecha.",
        fecha: "01/12/2025 16:20"
    }
];

// Guardar contactos
localStorage.setItem('contacts', JSON.stringify(exampleContacts));

console.log('✅ Datos de ejemplo cargados exitosamente');
console.log('Usuarios:', exampleUsers.length);
console.log('Órdenes:', exampleOrders.length);
console.log('Contactos:', exampleContacts.length);
```

5. Presiona Enter
6. Recarga la página (F5)
7. Ahora verás los datos en el panel de administración

### Opción 2: Importar desde archivo JSON

1. Guarda este JSON en un archivo `datos-ejemplo.json`:

```json
{
  "users": [
    {
      "id": 1001,
      "name": "Juan García",
      "email": "juan@example.com",
      "password": "123456",
      "registeredDate": "01/12/2025"
    },
    {
      "id": 1002,
      "name": "María López",
      "email": "maria@example.com",
      "password": "123456",
      "registeredDate": "30/11/2025"
    }
  ],
  "orders": [
    {
      "id": 2001,
      "email": "juan@example.com",
      "name": "Juan García",
      "phone": "555-1234",
      "items": [
        {"name": "Aventura Básica", "price": 999},
        {"name": "Buceo Profesional", "price": 150}
      ],
      "total": "1149.00",
      "cardLast4": "4242",
      "date": "01/12/2025 14:30",
      "status": "Completada"
    }
  ],
  "contacts": []
}
```

## 📊 Estructura de Datos en LocalStorage

### Users (Usuarios)
```javascript
{
  id: número único,
  name: string (nombre completo),
  email: string (email único),
  password: string (contraseña en texto plano - usar hash en producción),
  registeredDate: string (fecha de registro)
}
```

### Orders (Órdenes)
```javascript
{
  id: número único,
  email: string (email del cliente),
  name: string (nombre del cliente),
  phone: string (teléfono),
  items: array de objetos {name, price},
  total: string (monto total),
  cardLast4: string (últimos 4 dígitos de la tarjeta),
  date: string (fecha y hora),
  status: string ("Completada", "Pendiente", "Cancelada")
}
```

### Contacts (Contactos)
```javascript
{
  id: número único,
  nombre: string,
  email: string,
  telefono: string,
  asunto: string,
  mensaje: string (mensaje completo),
  fecha: string (fecha y hora)
}
```

### Cart (Carrito)
```javascript
{
  id: número único,
  name: string (nombre del paquete/extra),
  price: number (precio unitario),
  quantity: number (cantidad)
}
```

## 🎨 Paleta de Colores

```css
/* Colores principales */
--primary: #0066cc      (Azul)
--secondary: #ffffff    (Blanco)
--accent: #ffc107       (Dorado)
--dark: #1a1a1a         (Gris oscuro)

/* Colores secundarios */
Success: #28a745
Warning: #ffc107
Danger: #dc3545
Info: #17a2b8
Light: #f8f9fa
Dark: #2d2d2d
```

## 🔐 Medidas de Seguridad (Importante para Producción)

### ⚠️ NUNCA HAGAS ESTO EN PRODUCCIÓN:

❌ Guardar contraseñas en texto plano
❌ Almacenar información de tarjetas completas
❌ Confiar solo en validación del lado del cliente
❌ Guardar datos sensibles en localStorage

### ✅ LO QUE DEBES HACER EN PRODUCCIÓN:

✅ Usar HTTPS
✅ Hash de contraseñas (bcrypt, argon2)
✅ Nunca guardar datos de tarjetas
✅ Usar tokenización de pagos
✅ Validación del lado del servidor
✅ Rate limiting
✅ CORS configurado correctamente
✅ Autenticación de dos factores

## 🚀 Paso a Producción

Para llevar este sitio a producción:

### 1. Backend
- Crear API REST con Node.js, Python, PHP, etc.
- Base de datos (MySQL, PostgreSQL, MongoDB)
- Autenticación (JWT, OAuth)

### 2. Pagos
- Integrar Stripe, PayPal, MercadoPago
- Usar webhooks para confirmar pagos

### 3. Hosting
- AWS, Heroku, DigitalOcean, Vercel
- Certificado SSL
- CDN para imágenes

### 4. Seguridad
- Headers de seguridad
- CORS
- Rate limiting
- Validación de entrada

## 📱 Funciones de Utilidad (JavaScript)

```javascript
// Exportar todos los datos
exportAllData()

// Imprimir recibo
printReceipt()

// Generar reporte
generateReport()

// Limpiar localStorage
localStorage.clear()

// Ver datos de usuario actual
console.log(JSON.parse(localStorage.getItem('currentUser')))

// Ver todas las órdenes
console.log(JSON.parse(localStorage.getItem('orders')))
```

## 🧪 Testing Manual

### Pruebas de Funcionalidad

1. **Registro**: Crear nueva cuenta con datos válidos
2. **Login**: Iniciar sesión con credenciales correctas
3. **Compra**: Agregar paquete y completar compra
4. **Carrito**: Agregar/eliminar items
5. **Contacto**: Enviar mensaje de contacto
6. **Admin**: Ver estadísticas y reportes

### Pruebas de Responsive

- Móvil: 375px ancho
- Tablet: 768px ancho
- Desktop: 1200px ancho

## 📈 Métricas para Seguimiento

En el panel de admin puedes ver:
- Total de usuarios registrados
- Total de órdenes completadas
- Ingresos totales
- Mensajes de contacto recibidos
- Paquetes más vendidos
- Tours extras más solicitados

## 🔗 URLs Clave

- **Sitio principal**: `index.html`
- **Panel de admin**: `admin.html`
- **Estilos**: `styles.css`
- **Lógica**: `script.js`

## 📞 Contacto y Soporte

Para una aplicación real, crear:
- Formulario de soporte
- Chat en vivo
- Ticket system
- Email automático

---

**Documentación versión 1.0**
**Última actualización: Diciembre 2025**
