// Sistema ULTRA-NO-GET per evitare completamente le richieste 404
// Usa solo immagini note e fallback immediato a NoImage

// Cache globale per le immagini esistenti
window.imageCache = new Map();

// Lista delle immagini disponibili (solo quelle che sappiamo esistere)
window.availableImages = new Set();

// Configurazione delle immagini note - AGGIUNGI QUI SOLO LE IMMAGINI CHE SAI ESISTERE
window.knownImages = new Set([
    'm4cc.jpg',
    'NoImage.png'
    // Aggiungi qui solo le immagini che sai esistere nella cartella image/
    // Esempio: 'golf7.jpg', 'passat.png', etc.
]);

// Mappa delle corrispondenze veicolo-immagine (da popolare manualmente)
window.vehicleImageMap = new Map([
    // Esempi di corrispondenze dirette
    ['m4cc', 'm4cc.jpg'],
    // Aggiungi qui le corrispondenze che conosci
    // ['nomeveicolo', 'nomeimmagine.jpg'],
]);

// Funzione per ottenere il nome del file immagine per un veicolo
window.getImageFileName = function(vehicleName) {
    // Rimuovi spazi e caratteri speciali per creare un nome file valido
    const cleanName = vehicleName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Prova solo i formati più comuni
    const formats = ['jpg', 'png', 'webp'];
    
    return formats.map(format => `${cleanName}.${format}`);
};

// Funzione per verificare se un'immagine esiste (solo per immagini note)
window.checkImageExists = function(imagePath) {
    return new Promise((resolve) => {
        const imageName = imagePath.split('/').pop();
        
        // Se l'immagine è nella lista delle note, ritorna true
        if (window.knownImages.has(imageName)) {
            window.availableImages.add(imageName);
            resolve(true);
            return;
        }
        
        // Altrimenti ritorna false (non fare richieste GET)
        resolve(false);
    });
};

// Funzione per pre-caricare solo le immagini note
window.preloadKnownImages = async function() {
    console.log('🔄 Pre-caricamento delle immagini note...');
    
    let foundCount = 0;
    for (const knownImage of window.knownImages) {
        const imagePath = `image/${knownImage}`;
        const exists = await window.checkImageExists(imagePath);
        if (exists) {
            foundCount++;
            console.log(`✅ Immagine nota: ${knownImage}`);
        }
    }
    
    console.log(`📊 Pre-caricamento completato. Immagini disponibili: ${foundCount}`);
};

// Funzione per caricare l'immagine migliore disponibile (ULTRA-NO-GET)
window.loadBestImage = async function(vehicleName, vehicleBrand) {
    // Se abbiamo già trovato un'immagine per questo veicolo, usala dalla cache
    const cacheKey = `${vehicleName}_${vehicleBrand}`;
    if (window.imageCache.has(cacheKey)) {
        return window.imageCache.get(cacheKey);
    }
    
    // Controlla prima la mappa delle corrispondenze dirette
    const vehicleNameClean = vehicleName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    if (window.vehicleImageMap.has(vehicleNameClean)) {
        const imageName = window.vehicleImageMap.get(vehicleNameClean);
        const imagePath = `image/${imageName}`;
        if (window.knownImages.has(imageName)) {
            window.imageCache.set(cacheKey, imagePath);
            return imagePath;
        }
    }
    
    // Prova con le immagini note per corrispondenza parziale
    for (const knownImage of window.knownImages) {
        const knownImageName = knownImage.split('.')[0];
        if (vehicleNameClean.includes(knownImageName) || knownImageName.includes(vehicleNameClean)) {
            const imagePath = `image/${knownImage}`;
            window.imageCache.set(cacheKey, imagePath);
            return imagePath;
        }
    }
    
    // Prova con il nome del veicolo pulito
    const imageNames = window.getImageFileName(vehicleName);
    
    for (const imageName of imageNames) {
        // Controlla solo se è nelle immagini note
        if (window.knownImages.has(imageName)) {
            const imagePath = `image/${imageName}`;
            window.imageCache.set(cacheKey, imagePath);
            return imagePath;
        }
    }
    
    // Prova con combinazioni brand + nome (solo se nelle immagini note)
    const brandName = vehicleBrand.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    const combinedNames = [
        `${brandName}_${vehicleNameClean}`,
        `${vehicleNameClean}_${brandName}`,
        `${brandName}${vehicleNameClean}`,
        `${vehicleNameClean}${brandName}`
    ];
    
    for (const combinedName of combinedNames) {
        for (const format of ['jpg', 'png', 'webp']) {
            const imageName = `${combinedName}.${format}`;
            
            // Controlla solo se è nelle immagini note
            if (window.knownImages.has(imageName)) {
                const imagePath = `image/${imageName}`;
                window.imageCache.set(cacheKey, imagePath);
                return imagePath;
            }
        }
    }
    
    // Fallback finale: NoImage.png (che sappiamo esistere)
    const fallbackPath = 'image/NoImage.png';
    window.imageCache.set(cacheKey, fallbackPath);
    return fallbackPath;
};

// Funzione per aggiungere immagini note dinamicamente
window.addKnownImage = function(imageName) {
    window.knownImages.add(imageName);
    console.log(`📝 Immagine aggiunta alla lista note: ${imageName}`);
};

// Funzione per aggiungere corrispondenze veicolo-immagine
window.addVehicleImageMapping = function(vehicleName, imageName) {
    window.vehicleImageMap.set(vehicleName.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''), imageName);
    console.log(`📝 Corrispondenza aggiunta: ${vehicleName} -> ${imageName}`);
};

// Inizializza il pre-caricamento quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    window.preloadKnownImages();
    console.log('🚀 Sistema ULTRA-NO-GET inizializzato');
});
