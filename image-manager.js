// Gestore Immagini per Atlantide 2.0
// File per gestire facilmente le immagini note e le corrispondenze

// Lista delle immagini che esistono effettivamente nella cartella image/
const EXISTING_IMAGES = [
    'm4cc.jpg',
    'NoImage.png'
    // Aggiungi qui tutte le immagini che esistono nella cartella image/
    // Esempio:
    // 'golf7.jpg',
    // 'passat.png',
    // 'bmwm4.jpg',
    // etc.
];

// Corrispondenze dirette veicolo -> immagine
const VEHICLE_IMAGE_MAPPINGS = [
    // Formato: ['nome_veicolo', 'nome_immagine']
    ['m4cc', 'm4cc.jpg'],
    // Aggiungi qui le corrispondenze che conosci
    // Esempio:
    // ['golf7', 'golf7.jpg'],
    // ['passat', 'passat.png'],
    // etc.
];

// Funzione per inizializzare il sistema di immagini
function initializeImageSystem() {
    console.log('🔄 Inizializzazione sistema immagini...');
    
    // Aggiungi tutte le immagini esistenti
    EXISTING_IMAGES.forEach(imageName => {
        window.addKnownImage(imageName);
    });
    
    // Aggiungi tutte le corrispondenze veicolo-immagine
    VEHICLE_IMAGE_MAPPINGS.forEach(([vehicleName, imageName]) => {
        window.addVehicleImageMapping(vehicleName, imageName);
    });
    
    console.log(`✅ Sistema immagini inizializzato con ${EXISTING_IMAGES.length} immagini e ${VEHICLE_IMAGE_MAPPINGS.length} corrispondenze`);
}

// Funzione per aggiungere una nuova immagine
function addNewImage(imageName) {
    EXISTING_IMAGES.push(imageName);
    window.addKnownImage(imageName);
    console.log(`📝 Nuova immagine aggiunta: ${imageName}`);
}

// Funzione per aggiungere una nuova corrispondenza
function addNewMapping(vehicleName, imageName) {
    VEHICLE_IMAGE_MAPPINGS.push([vehicleName, imageName]);
    window.addVehicleImageMapping(vehicleName, imageName);
    console.log(`📝 Nuova corrispondenza aggiunta: ${vehicleName} -> ${imageName}`);
}

// Funzione per ottenere la lista delle immagini esistenti
function getExistingImages() {
    return [...EXISTING_IMAGES];
}

// Funzione per ottenere la lista delle corrispondenze
function getVehicleMappings() {
    return [...VEHICLE_IMAGE_MAPPINGS];
}

// Esporta le funzioni per uso globale
window.initializeImageSystem = initializeImageSystem;
window.addNewImage = addNewImage;
window.addNewMapping = addNewMapping;
window.getExistingImages = getExistingImages;
window.getVehicleMappings = getVehicleMappings;

// Inizializza automaticamente quando il file viene caricato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeImageSystem);
} else {
    initializeImageSystem();
}
