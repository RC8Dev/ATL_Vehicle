// Configurazione per il mapping delle immagini
window.imageMapping = {
    // Mapping esplicito per veicoli con nomi di file specifici
    "vantage23": "vantage23.jpg",
    "18rs7": "18rs7.jpg",
    "21rsq8": "21rsq8.jpg",
    "aaq4": "aaq4.jpg",
    "audirs8": "audirs8.jpg",
    "CarsonsPriorRS3": "CarsonsPriorRS3.jpg",
    "gcma4sedan2021": "gcma4sedan2021.jpg",
    "Hycaders6": "Hycaders6.jpg",
    "ikx3abt20": "ikx3abt20.jpg",
    "mansrs6": "mansrs6.jpg",
    "ocnetrongt": "ocnetrongt.jpg",
    "q8hycade": "q8hycade.jpg",
    "q8prior": "q8prior.jpg",
    "r820": "r820.jpg",
    "m4cc": "m4cc.jpg",
    "M4CC": "m4cc.jpg",
    
    // Aggiungi qui altri mapping specifici se necessario
    
    // Fallback per veicoli senza immagine specifica
    "default": "NoImage.png"
};

// Funzione per ottenere il nome del file immagine per un veicolo
window.getImageFileName = function(vehicleName) {
    return window.imageMapping[vehicleName] || window.imageMapping.default;
};
