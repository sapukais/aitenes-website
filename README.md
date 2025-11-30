# PROYECTO: Website Corporativo AITENES

Este repositorio contiene el código fuente del sitio web corporativo de AITENES, una landing page moderna con diseño distintivo y sistema de contacto integrado.

## Características

- **Diseño distintivo** con tipografía premium (Syne, Space Grotesk, JetBrains Mono)
- **Animaciones profesionales** con Intersection Observer y micro-interacciones
- **Stack tecnológico showcase** con métricas animadas
- **Glassmorphism y efectos visuales** modernos
- **Formulario de contacto funcional** integrado con Resend API
- **Mobile-first responsive** con menú hamburguesa optimizado
- **Video backgrounds** en hero y product showcase

## Estructura de Archivos

```
/aitenes-website/
├── index.html              (Página única principal)
├── css/
│   ├── reset.css           (Reseteo de estilos básico)
│   └── styles.css          (Estilos principales - tipografía, animaciones, glassmorphism)
├── js/
│   └── main.js             (Interacciones, animaciones, formulario)
├── api/
│   ├── send-email.php      (Endpoint para Resend API)
│   ├── config.php          (⚠️ PRIVADO - credenciales, NO en Git)
│   └── config.example.php  (Plantilla de configuración)
├── images/
│   ├── logo-horizontal.png (Logo para la barra de navegación)
│   ├── logo-icon.png       (Isotipo para favicon y footer)
│   └── placeholders.txt    (URLs de imágenes de stock utilizadas)
├── favicon.ico             (Icono para la pestaña del navegador)
└── README.md               (Este archivo)
```

---

## Instrucciones de Despliegue en Hostinger

Subir el sitio a Hostinger es un proceso sencillo. Sigue estos pasos:

1.  **Accede a tu cPanel de Hostinger.**
2.  Navega al **Administrador de Archivos** (`File Manager`).
3.  Dentro del administrador, ve a la carpeta `public_html`. Esta es la raíz de tu dominio principal.
4.  **Sube los archivos del proyecto:**
    *   Haz clic en el botón `Upload Files` (Subir archivos).
    *   Selecciona **todos los archivos y carpetas** del proyecto (`index.html`, `css/`, `js/`, `images/`, `favicon.ico`) y súbelos.
    *   **Importante:** Asegúrate de mantener la estructura de carpetas. Puedes subir el contenido de la carpeta `aitenes-website`, pero no la carpeta en sí.

5.  **Verifica los permisos (generalmente correctos por defecto):**
    *   Carpetas (`css`, `js`, `images`): Permisos `755`.
    *   Archivos (`.html`, `.css`, `.js`, `.png`): Permisos `644`.
    *   Para verificar, haz clic derecho sobre un archivo/carpeta y selecciona `Permissions`.

6.  **¡Listo!** Tu sitio web debería estar visible en tu dominio.

---

## Configuración del Formulario de Contacto (Resend API)

El formulario de solicitud de beta envía emails usando [Resend](https://resend.com/).

### Configuración inicial

1. **Crear cuenta en Resend** y verificar tu dominio (`aitenes.com`)

2. **Generar API Key** en el dashboard de Resend

3. **Crear archivo de configuración:**
   ```bash
   cp api/config.example.php api/config.php
   ```

4. **Editar `api/config.php`** con tus credenciales:
   ```php
   return [
       'RESEND_API_KEY' => 're_TU_API_KEY_AQUI',
       'FROM_EMAIL' => 'AITENES <noreply@aitenes.com>',
       'TO_EMAIL' => 'contacto@aitenes.com'
   ];
   ```

5. **Subir a Hostinger:**
   - Subir carpeta `api/` completa (incluyendo `config.php`)
   - El archivo `config.php` está en `.gitignore` por seguridad

### Notas importantes

- **Dominio verificado:** El `FROM_EMAIL` debe usar un dominio verificado en Resend
- **Seguridad:** Nunca subas `config.php` a Git (contiene la API key)
- **Testing:** Con dominio no verificado solo puedes enviar a tu propio email

---

## Cómo Reemplazar los Logos (Placeholders)

Actualmente, el sitio utiliza placeholders para los logos. Para reemplazarlos con los logos finales, sigue estas instrucciones:

**Archivo de origen:** Necesitarás el archivo de imagen que contiene las versiones del logo.

1.  **Crear `logo-horizontal.png`:**
    *   Recorta la versión horizontal del logo (isotipo + "AITENES").
    *   El fondo debe ser transparente.
    *   Ajusta el tamaño a un ancho aproximado de **400px**.
    *   Guarda el archivo como `logo-horizontal.png`.
    *   Súbelo a la carpeta `images/` de tu hosting, reemplazando el placeholder.

2.  **Crear `logo-icon.png`:**
    *   Recorta únicamente el isotipo (la "X" azul/cyan).
    *   El fondo debe ser transparente.
    *   Ajusta el tamaño a **512x512px**.
    *   Guarda el archivo como `logo-icon.png`.
    *   Súbelo a la carpeta `images/`, reemplazando el placeholder.

3.  **Crear `favicon.ico`:**
    *   Usando el `logo-icon.png` que acabas de crear, utiliza una herramienta online gratuita (como `favicon.io` o `favicon-generator.org`) para convertirlo a formato `.ico`.
    *   Descarga el archivo `favicon.ico` (generalmente de 32x32px o un paquete).
    *   Súbelo a la **raíz de tu sitio** (`public_html`), reemplazando el placeholder.

---

## Checklist Pre-Lanzamiento

- [ ] Verificar que todos los links internos (`#seccion`) funcionen correctamente.
- [ ] Probar la navegación y la visualización en dispositivos móviles (Chrome DevTools es útil para esto).
- [ ] Validar el código HTML en [validator.w3.org](https://validator.w3.org/).
- [ ] Validar el código CSS en [jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/).
- [ ] Probar el formulario de contacto/beta (si aplica) y confirmar que los envíos funcionen.
- [ ] Revisar que todos los meta tags (`title`, `description`) en `index.html` sean correctos.
- [ ] Confirmar que todas las imágenes de stock tengan la atribución correcta si es necesario.

---

## Créditos de Imágenes

Las imágenes de fondo y mockups utilizadas en este sitio son de Unsplash. Agradecemos a los siguientes creadores:

- **Hero Background:** Photo by [Marek Piwnicki](https://unsplash.com/@marekpiwnicki) on Unsplash.
- **Mockup Amicura:** Photo by [National Cancer Institute](https://unsplash.com/@nci) on Unsplash.
- **Sobre Nosotros:** Photo by [Sigmund](https://unsplash.com/@sigmund) on Unsplash.

Este proyecto fue desarrollado con asistencia de IA.
