const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https:", "data:"],
        },
    },
}));

// Compresión gzip
app.use(compression());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname), {
    maxAge: '1d', // Cache por 1 día
    etag: true
}));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HMS_Business_Canvas_Complete.html'));
});

// Ruta para el canvas (alias)
app.get('/canvas', (req, res) => {
    res.sendFile(path.join(__dirname, 'HMS_Business_Canvas_Complete.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'HMS_Business_Canvas_Complete.html'));
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HMS Business Canvas server running on port ${PORT}`);
    console.log(`📊 Canvas available at: http://localhost:${PORT}`);
});
