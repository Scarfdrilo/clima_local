// ===== DESCRIPCIONES DEL CLIMA =====
const weatherDescriptions = {
    0: { description: 'Despejado', icon: '☀️' },
    1: { description: 'Mayormente despejado', icon: '🌤️' },
    2: { description: 'Parcialmente nublado', icon: '⛅' },
    3: { description: 'Nublado', icon: '☁️' },
    45: { description: 'Niebla', icon: '🌫️' },
    48: { description: 'Niebla helada', icon: '🌫️' },
    51: { description: 'Llovizna ligera', icon: '🌦️' },
    53: { description: 'Llovizna moderada', icon: '🌦️' },
    55: { description: 'Llovizna intensa', icon: '🌧️' },
    61: { description: 'Lluvia ligera', icon: '🌧️' },
    63: { description: 'Lluvia moderada', icon: '🌧️' },
    65: { description: 'Lluvia intensa', icon: '🌧️' },
    71: { description: 'Nevada ligera', icon: '🌨️' },
    73: { description: 'Nevada moderada', icon: '🌨️' },
    75: { description: 'Nevada intensa', icon: '❄️' },
    80: { description: 'Chubascos ligeros', icon: '🌦️' },
    81: { description: 'Chubascos moderados', icon: '🌧️' },
    82: { description: 'Chubascos intensos', icon: '⛈️' },
    95: { description: 'Tormenta', icon: '⛈️' },
    96: { description: 'Tormenta con granizo', icon: '⛈️' },
    99: { description: 'Tormenta severa', icon: '🌩️' },
};

function getWeatherInfo(code) {
    return weatherDescriptions[code] || { description: 'Desconocido', icon: '🌡️' };
}

// ===== RELOJ =====
function updateClock() {
    const now = new Date();
    
    document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('date').textContent = now.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

setInterval(updateClock, 1000);
updateClock();

// ===== ANIMACIONES DEL CLIMA =====
function createWeatherAnimation(weatherCode, isDay) {
    const container = document.getElementById('weather-animation');
    container.innerHTML = '';
    
    const app = document.getElementById('app');
    app.className = isDay ? 'day' : 'night';
    
    const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
    const isSnowy = [71, 73, 75].includes(weatherCode);
    const isStormy = [95, 96, 99].includes(weatherCode);
    const isCloudy = [2, 3, 45, 48].includes(weatherCode);
    const isClear = [0, 1].includes(weatherCode);
    
    // Estrellas de noche
    if (!isDay && isClear) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 60 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(star);
        }
    }
    
    // Sol de día
    if (isDay && isClear) {
        const sun = document.createElement('div');
        sun.className = 'sun';
        container.appendChild(sun);
    }
    
    // Luna de noche
    if (!isDay && isClear) {
        const moon = document.createElement('div');
        moon.className = 'moon';
        container.appendChild(moon);
    }
    
    // Nubes
    if (isCloudy || isRainy || isStormy) {
        for (let i = 1; i <= 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud-${i}`;
            container.appendChild(cloud);
        }
    }
    
    // Lluvia
    if (isRainy || isStormy) {
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
            container.appendChild(drop);
        }
    }
    
    // Nieve
    if (isSnowy) {
        for (let i = 0; i < 50; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.style.left = Math.random() * 100 + '%';
            flake.style.animationDelay = Math.random() * 5 + 's';
            flake.style.animationDuration = (3 + Math.random() * 2) + 's';
            container.appendChild(flake);
        }
    }
    
    // Rayos
    if (isStormy) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        container.appendChild(lightning);
    }
}

// ===== PRONÓSTICO =====
function createForecastCards(hourlyData) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';
    
    const currentHour = new Date().getHours();
    
    for (let i = currentHour; i < currentHour + 8 && i < hourlyData.time.length; i++) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const hour = new Date(hourlyData.time[i]).getHours();
        const { icon } = getWeatherInfo(hourlyData.weatherCode[i]);
        const temp = Math.round(hourlyData.temperature[i]);
        
        card.innerHTML = `
            <span class="hour">${hour}:00</span>
            <span class="icon">${icon}</span>
            <span class="temp">${temp}°</span>
        `;
        
        container.appendChild(card);
    }
}

// ===== OBTENER CLIMA =====
async function getWeather() {
    try {
        // Obtener ubicación
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Obtener nombre de la ciudad
        const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const geoData = await geoResponse.json();
        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Tu ubicación';
        
        // Obtener clima
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=1`
        );
        const weatherData = await weatherResponse.json();
        
        const isDay = weatherData.current.is_day === 1;
        const weatherCode = weatherData.current.weather_code;
        const { description, icon } = getWeatherInfo(weatherCode);
        
        // Actualizar UI
        document.getElementById('city').textContent = city;
        document.getElementById('temp').textContent = Math.round(weatherData.current.temperature_2m);
        document.getElementById('description').textContent = description;
        document.getElementById('weather-icon').textContent = icon;
        document.getElementById('humidity').textContent = weatherData.current.relative_humidity_2m;
        document.getElementById('wind').textContent = Math.round(weatherData.current.wind_speed_10m);
        
        // Crear pronóstico
        createForecastCards({
            time: weatherData.hourly.time,
            temperature: weatherData.hourly.temperature_2m,
            weatherCode: weatherData.hourly.weather_code
        });
        
        // Animaciones
        createWeatherAnimation(weatherCode, isDay);
        
        // Mostrar clima, ocultar loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('weather').style.display = 'block';
        
    } catch (error) {
        console.error(error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error-message').textContent = 
            'No se pudo obtener tu ubicación. Por favor permite el acceso.';
        
        // Mostrar animación por defecto (día despejado)
        createWeatherAnimation(0, true);
    }
}

// Iniciar
getWeather();
