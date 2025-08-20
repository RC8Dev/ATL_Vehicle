// Configurazione per il mapping delle immagini
window.imageMapping = {
    // Mapping esplicito per veicoli con nomi di file specifici
    "M4CC": "m4cc.jpg",
    
    // Aggiungi qui altri mapping specifici se necessario
    
    // Fallback per veicoli senza immagine specifica
    "default": "NoImage.png"
};

// Funzione per ottenere il nome del file immagine per un veicolo
window.getImageFileName = function(vehicleName) {
    return window.imageMapping[vehicleName] || window.imageMapping.default;
};

