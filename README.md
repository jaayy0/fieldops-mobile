# FieldOps Mobile - Aplicación de Gestión de Incidencias

Aplicación móvil desarrollada con React Native y Expo para la gestión de incidencias en campo.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo Go app instalada en tu dispositivo móvil (disponible en Play Store o App Store)

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar la IP del servidor backend

Antes de ejecutar la aplicación, necesitas configurar la dirección IP de tu computadora para que el dispositivo móvil pueda conectarse al servidor backend.

#### Obtener tu dirección IP local:

**En Windows:**
```bash
ipconfig
```
Busca la línea que dice "Dirección IPv4" en la sección de tu adaptador de red activo (WiFi o Ethernet). Por ejemplo: `192.150.1.1`

**En Windows:**
```bash
ipconfig
```
Busca la dirección IP en la sección de tu adaptador de red activo.

#### Actualizar el archivo de configuración:

Abre el archivo `src/services/api.js` y cambia la IP en la línea 1:

```javascript
const API_BASE_URL = "http://TU_IP_AQUI:8080";
```

Por ejemplo:
```javascript
const API_BASE_URL = "http://192.150.1.1:8080";
```

**Importante:** Asegúrate de que tu dispositivo móvil y tu computadora estén conectados a la misma red WiFi.

## Ejecutar la Aplicación

### Iniciar el servidor de desarrollo

```bash
npm run start
```

o

```bash
npx expo start
```

### Abrir en tu dispositivo móvil

1. Una vez que el servidor esté corriendo, verás un código QR en la terminal
2. Abre la app **Expo Go** en tu dispositivo móvil
3. Escanea el código QR:
   - **Android:** Usa el escáner de Expo Go
   - **iOS:** Usa la cámara del iPhone

La aplicación se cargará en tu dispositivo.

## Estructura del Proyecto

```
fieldops-mobile/
├── src/
│   ├── screens/
│   │   ├── CreateIncidentScreen.js  # Pantalla para crear incidencias
│   │   └── IncidentListScreen.js    # Pantalla con lista de incidencias
│   └── services/
│       └── api.js                    # Configuración de API y llamadas al backend
├── app.js                            # Configuración de navegación
├── index.js                          # Punto de entrada de la aplicación
└── package.json                      # Dependencias del proyecto
```

## Funcionalidades

- Ver lista de incidencias
- Crear nuevas incidencias con título, descripción y nivel de urgencia
- Navegación entre pantallas
- Indicadores de carga durante operaciones

## Scripts Disponibles

- `npm run start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Abre la app en un emulador Android
- `npm run ios` - Abre la app en un simulador iOS (solo macOS)
- `npm run web` - Abre la app en el navegador web

## Solución de Problemas

### La app no se conecta al backend

1. Verifica que tu dispositivo móvil y tu computadora estén en la misma red WiFi
2. Asegúrate de haber actualizado la IP en `src/services/api.js`
3. Verifica que el servidor backend esté corriendo en el puerto 8080
4. Revisa que no haya un firewall bloqueando la conexión

### Error al instalar dependencias

Intenta limpiar la caché de npm:
```bash
npm cache clean --force
npm install
```

### La app no se recarga automáticamente

Presiona `r` en la terminal donde está corriendo Expo para recargar manualmente.

## Decisiones y supuestos
1. **Configuración de IP Manual**: Se decidió configurar la IP del servidor backend manualmente en `api.js` en lugar de usar variables de entorno complejas o detección automática para simplificar el MVP y evitar problemas de conectividad en redes locales durante el desarrollo.
2. **Uso de Expo Framework**: Se eligió Expo sobre React Native CLI puro para acelerar el desarrollo, facilitar las pruebas en dispositivos físicos (Android/iOS) sin necesidad de compilaciones nativas constantes y reducir la fricción inicial de configuración.
3. **Navegación Stack Simple**: Se implementó una navegación basada en Stack simple (`createNativeStackNavigator`) en lugar de Tabs o Drawer, asumiendo que el flujo de usuario actual (Lista -> Crear) es lineal y directo, lo cual es suficiente para esta primera iteración.
4. **Estilos en Línea**: Se optó por usar estilos en línea y objetos de estilo simples en los componentes en lugar de una hoja de estilos global o librerías externas como TailwindCSS. Esto mantiene los componentes autocontenidos y facilita la iteración rápida en un proyecto pequeño.
5. **Fetch API Nativa**: Se utilizó `fetch` nativo para las peticiones HTTP en lugar de instalar librerías adicionales como `axios` para mantener las dependencias al mínimo, ya que los requerimientos de red son básicos (GET/POST).
6. **Alertas Nativas**: El feedback al usuario (éxito al crear, errores) se maneja con `Alert.alert` nativo del sistema operativo en lugar de componentes modales personalizados ("Toast"), asumiendo que la interfaz nativa es suficiente y familiar para el usuario de campo.

## Uso de IA

**Prompt 1 (Éxito):**
> "Generame una pantalla en React Native para crear incidencias con titulo, descripción y urgencia."
- **Resultado**: La IA generó correctamente el componente `CreateIncidentScreen` con los campos solicitados y el estado local (`useState`), lo cual sirvió como base sólida para la funcionalidad principal.

**Prompt 2 (Fallo y Refinamiento):**
> "Conecta la app al backend localhost para guardar los datos."
- **Fallo**: La IA sugirió usar `http://localhost:8080`, lo cual falló al probar en el dispositivo físico (Android) porque `localhost` se refiere al propio teléfono, no a la PC de desarrollo.
- **Refinamiento**: "Como conectar mi app React Native expo a mi servidor local corriendo en mi PC si estoy probando en mi celular Android conectado al mismo wifi."
- **Resultado**: La IA explicó correctamente que se debe usar la IP local de la máquina (ej: `192.168.x.x`) y ayudó a crear el archivo `src/services/api.js` para centralizar esta configuración.

## Tecnologías Utilizadas

- React Native
- Expo
- React Navigation
- Fetch API para llamadas HTTP

