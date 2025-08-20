// Configurazione automatica per il caricamento delle immagini
// Le immagini vengono caricate automaticamente basandosi sul nome del modello del veicolo

// Cache globale per le immagini esistenti
window.imageCache = new Map();

// Lista delle immagini disponibili (da popolare all'avvio)
window.availableImages = new Set();

// Funzione per ottenere il nome del file immagine per un veicolo
window.getImageFileName = function(vehicleName) {
    // Rimuovi spazi e caratteri speciali per creare un nome file valido
    const cleanName = vehicleName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Prova diversi formati di immagine
    const formats = ['jpg', 'jpeg', 'png', 'webp'];
    
    // Restituisce il primo formato disponibile o NoImage.png come fallback
    return formats.map(format => `${cleanName}.${format}`).concat(['NoImage.png']);
};

// Funzione per verificare se un'immagine esiste
window.checkImageExists = function(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
    });
};

// Funzione per pre-caricare tutte le immagini disponibili
window.preloadAvailableImages = async function() {
    console.log('🔄 Pre-caricamento delle immagini disponibili...');
    
    // Lista delle immagini da controllare (espandibile)
    const commonImages = [
        'm4cc.jpg', 'NoImage.png',
        // Aggiungi qui altre immagini che sai esistere
        // Esempi di possibili nomi file basati sui veicoli:
        'mkivsupra.webp', 'suprapandem.webp', 'golf1.webp', 'golf7.webp',
        'golf75r.webp', 'golf8gti.webp', 'passat.webp', 'golf91wideprzemo.webp',
        'polo2018.webp', 'rmodmk7.webp', 'brz13varis.webp', 'v60hr.webp',
        'wmfenyr.webp'
    ];
    
    // Controlla anche le varianti con diversi formati
    const baseNames = ['m4cc', 'mkivsupra', 'suprapandem', 'golf1', 'golf7', 'golf75r', 'golf8gti', 'passat'];
    const formats = ['jpg', 'jpeg', 'png', 'webp'];
    
    for (const baseName of baseNames) {
        for (const format of formats) {
            commonImages.push(`${baseName}.${format}`);
        }
    }
    
    let foundCount = 0;
    for (const imageName of commonImages) {
        const imagePath = `image/${imageName}`;
        const exists = await window.checkImageExists(imagePath);
        if (exists) {
            window.availableImages.add(imageName);
            foundCount++;
            console.log(`✅ Immagine trovata: ${imageName}`);
        }
    }
    
    console.log(`📊 Pre-caricamento completato. Immagini disponibili: ${foundCount}`);
};

// Funzione per caricare l'immagine migliore disponibile (OTTIMIZZATA)
window.loadBestImage = async function(vehicleName, vehicleBrand) {
    // Se abbiamo già trovato un'immagine per questo veicolo, usala dalla cache
    const cacheKey = `${vehicleName}_${vehicleBrand}`;
    if (window.imageCache.has(cacheKey)) {
        return window.imageCache.get(cacheKey);
    }
    
    const imageNames = window.getImageFileName(vehicleName);
    
    // Prova prima con il nome esatto del veicolo
    for (const imageName of imageNames) {
        // Se l'immagine è già nella lista delle disponibili, usala direttamente
        if (window.availableImages.has(imageName)) {
            const imagePath = `image/${imageName}`;
            window.imageCache.set(cacheKey, imagePath);
            return imagePath;
        }
        
        // Altrimenti, controlla se esiste (solo se non l'abbiamo già controllato)
        const imagePath = `image/${imageName}`;
        const exists = await window.checkImageExists(imagePath);
        if (exists) {
            window.availableImages.add(imageName);
            window.imageCache.set(cacheKey, imagePath);
            return imagePath;
        }
    }
    
    // Se non trova nulla, prova con combinazioni brand + nome
    const brandName = vehicleBrand.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const vehicleNameClean = vehicleName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    const combinedNames = [
        `${brandName}_${vehicleNameClean}`,
        `${vehicleNameClean}_${brandName}`,
        `${brandName}${vehicleNameClean}`,
        `${vehicleNameClean}${brandName}`
    ];
    
    for (const combinedName of combinedNames) {
        for (const format of ['jpg', 'jpeg', 'png', 'webp']) {
            const imageName = `${combinedName}.${format}`;
            
            // Se l'immagine è già nella lista delle disponibili, usala direttamente
            if (window.availableImages.has(imageName)) {
                const imagePath = `image/${imageName}`;
                window.imageCache.set(cacheKey, imagePath);
                return imagePath;
            }
            
            // Altrimenti, controlla se esiste
            const imagePath = `image/${imageName}`;
            const exists = await window.checkImageExists(imagePath);
            if (exists) {
                window.availableImages.add(imageName);
                window.imageCache.set(cacheKey, imagePath);
                return imagePath;
            }
        }
    }
    
    // Fallback finale: NoImage.png
    const fallbackPath = 'image/NoImage.png';
    window.imageCache.set(cacheKey, fallbackPath);
    return fallbackPath;
};

// Inizializza il pre-caricamento quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    window.preloadAvailableImages();
});
