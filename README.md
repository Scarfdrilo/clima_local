# 🌤️ Clima Local

Aplicación web del clima con animaciones dinámicas según el estado del tiempo y la hora del día.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Características

- 🕐 **Reloj en tiempo real** con fecha en español
- 🌡️ **Clima de tu ubicación** usando tu GPS
- 🌙 **Tema día/noche automático** - cambia según la hora local
- 📊 **Pronóstico por hora** de las próximas 8 horas
- 🎨 **Animaciones CSS** según el clima:
  - ☀️ Sol brillante con resplandor
  - 🌙 Luna con efecto de brillo
  - ⭐ Estrellas titilantes de noche
  - ☁️ Nubes flotantes
  - 🌧️ Gotas de lluvia cayendo
  - ❄️ Copos de nieve
  - ⛈️ Rayos en tormentas

## 🚀 Demo

[Ver demo en vivo](https://comment-stars-mono-reserves.trycloudflare.com)

## 📦 Estructura

```
clima_local/
├── index.html    ← Estructura de la página
├── styles.css    ← Estilos y animaciones CSS
├── script.js     ← Lógica y API del clima
└── README.md     ← Este archivo
```

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos, gradientes y animaciones
- **JavaScript** - Lógica y consumo de APIs
- **Open-Meteo API** - Datos del clima (gratis, sin API key)
- **Nominatim API** - Geolocalización inversa

## 📱 Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Scarfdrilo/clima_local.git
   ```

2. Abre `index.html` en tu navegador

3. Permite el acceso a tu ubicación cuando el navegador lo solicite

¡Listo! Verás el clima de tu ubicación actual.

## 🌐 Deploy

Puedes subir estos 3 archivos a cualquier hosting:

- **GitHub Pages** - Gratis, directo desde tu repo
- **Netlify** - Arrastra y suelta la carpeta
- **Vercel** - Conecta tu GitHub
- **Cualquier hosting** - Solo necesitas servir archivos estáticos

## 📄 APIs utilizadas

| API | Uso | Costo |
|-----|-----|-------|
| [Open-Meteo](https://open-meteo.com/) | Datos meteorológicos | Gratis |
| [Nominatim](https://nominatim.org/) | Nombre de la ciudad | Gratis |
| [Geolocation API](https://developer.mozilla.org/es/docs/Web/API/Geolocation_API) | Coordenadas GPS | Nativo del navegador |

## 🎨 Personalización

### Cambiar colores del tema

En `styles.css`, busca las clases `.day` y `.night`:

```css
#app.day {
    background: linear-gradient(135deg, #56ccf2, #3a8dde, #4a5dc9);
}

#app.night {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
}
```

### Agregar más animaciones

Las animaciones están en `styles.css` con `@keyframes`. Puedes modificarlas o agregar nuevas.

## 📝 Licencia

MIT - Usa este proyecto como quieras.

---

Hecho con ❤️ en **VibeCoding Bootcamp** - [Frutero Club](https://frutero.club)
