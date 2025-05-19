// Configuration de l'API
const API_URL = 'http://localhost:3002/api/logements';

// Éléments du DOM
const annoncesContainer = document.getElementById('annonces-container');
const searchInput = document.querySelector('input[type="text"]');
const typeFilter = document.querySelector('select');

// Charger les annonces au démarrage
document.addEventListener('DOMContentLoaded', () => {
    fetchAnnonces();
    
    // Écouter les changements de recherche et de filtre
    searchInput?.addEventListener('input', filterAnnonces);
    typeFilter?.addEventListener('change', filterAnnonces);
});

// Récupérer les annonces depuis l'API
async function fetchAnnonces() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erreur de chargement');
        
        const data = await response.json();
        displayAnnonces(data);
    } catch (error) {
        console.error('Erreur:', error);
        annoncesContainer.innerHTML = `
            <div class="alert alert-danger">
                Impossible de charger les annonces. Veuillez réessayer plus tard.
            </div>`;
    }
}

// Afficher les annonces
function displayAnnonces(annonces) {
    if (!annonces || annonces.length === 0) {
        annoncesContainer.innerHTML = '<p class="text-center">Aucune annonce disponible.</p>';
        return;
    }

    const html = annonces.map(annonce => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <img src="${annonce.images?.[0] || 'https://via.placeholder.com/400x300'}" 
                     class="card-img-top" 
                     alt="${annonce.titre}">
                <div class="card-body">
                    <h5 class="card-title">${annonce.titre}</h5>
                    <p class="text-muted">
                        <i class="fas fa-map-marker-alt"></i>
                        ${annonce.adresse.ville}, ${annonce.adresse.codePostal}
                    </p>
                    <p class="card-text">
                        ${annonce.description.substring(0, 100)}${annonce.description.length > 100 ? '...' : ''}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price fw-bold">
                            ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(annonce.prix)}/mois
                        </span>
                        <span class="badge ${annonce.disponibilite ? 'bg-success' : 'bg-danger'}">
                            ${annonce.disponibilite ? 'Disponible' : 'Indisponible'}
                        </span>
                    </div>
                    <div class="mt-2 text-muted small">
                        <span class="me-3"><i class="fas fa-ruler-combined"></i> ${annonce.surface} m²</span>
                        <span><i class="fas fa-door-open"></i> ${annonce.nombrePieces} pièce${annonce.nombrePieces > 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    annoncesContainer.innerHTML = `<div class="row g-4">${html}</div>`;
}

// Filtrer les annonces
function filterAnnonces() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value.toLowerCase();

    fetch(API_URL)
        .then(response => response.json())
        .then(annonces => {
            const filtered = annonces.filter(annonce => {
                const matchesSearch = annonce.titre.toLowerCase().includes(searchTerm) ||
                                    annonce.adresse.ville.toLowerCase().includes(searchTerm) ||
                                    annonce.adresse.codePostal.includes(searchTerm);
                
                const matchesType = !typeValue || annonce.type === typeValue;
                
                return matchesSearch && matchesType;
            });
            
            displayAnnonces(filtered);
        })
        .catch(error => console.error('Erreur:', error));
}
