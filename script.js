// Configuration globale associant chaque pays à sa devise et ses passerelles de paiement autorisées
const configurations = {
    'ML': { name: 'Mali', currency: 'XOF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'wave_money', t:'Wave Money'}, {v:'mobicash', t:'Mobicash / Libertis'}] },
    'HT': { name: 'Haïti', currency: 'HTG', providers: [{v:'moncash', t:'Moncash'}, {v:'natcash', t:'Natcash'}] },
    'MG': { name: 'Madagascar', currency: 'MGA', providers: [{v:'telma_mvola', t:'Telma / Mvola'}, {v:'send_cash', t:'Send Cash'}] },
    'ZA': { name: 'Afrique du Sud', currency: 'ZAR', providers: [{v:'send_cash', t:'Send Cash'}, {v:'my_nita', t:'My Nita'}] },
    'GH': { name: 'Ghana', currency: 'GHS', providers: [{v:'moov_money', t:'Moov Money'}, {v:'send_cash', t:'Send Cash'}] },
    'ZM': { name: 'Zambie', currency: 'ZMW', providers: [{v:'send_cash', t:'Send Cash'}] },
    'UG': { name: 'Uganda', currency: 'UGX', providers: [{v:'lumicash', t:'Lumicash'}, {v:'send_cash', t:'Send Cash'}] },
    'CF': { name: 'Centrafrique', currency: 'XAF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'send_cash', t:'Send Cash'}] },
    'KM': { name: 'Comores', currency: 'KMF', providers: [{v:'send_cash', t:'Send Cash'}] },
    'BI': { name: 'Burundi', currency: 'BIF', providers: [{v:'lumicash', t:'Lumicash'}, {v:'send_cash', t:'Send Cash'}] },
    'NE': { name: 'Niger', currency: 'XOF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'mobicash', t:'Mobicash / Libertis'}] },
    'CG': { name: 'Congo Brazzaville', currency: 'XAF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'mobicash', t:'Mobicash / Libertis'}] },
    'CD': { name: 'RDC', currency: 'CDF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'send_cash', t:'Send Cash'}] },
    'TD': { name: 'Tchad', currency: 'XAF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'send_cash', t:'Send Cash'}] },
    'GN': { name: 'Guinée Conakry', currency: 'GNF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'mobicash', t:'Mobicash / Libertis'}] },
    'CI': { name: "Côte d'Ivoire", currency: 'XOF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'wave_money', t:'Wave Money'}] },
    'SN': { name: 'Sénégal', currency: 'XOF', providers: [{v:'wave_money', t:'Wave Money'}, {v:'moov_money', t:'Moov Money'}] },
    'BF': { name: 'Burkina Faso', currency: 'XOF', providers: [{v:'moov_flooz', t:'Moov Togo / Flooz'}, {v:'amana', t:'Amana'}] },
    'BJ': { name: 'Bénin', currency: 'XOF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'amana', t:'Amana'}] },
    'TZ': { name: 'Tanzanie', currency: 'TZS', providers: [{v:'amana', t:'Amana'}, {v:'send_cash', t:'Send Cash'}] },
    'MA': { name: 'Maroc', currency: 'MAD', providers: [{v:'amana', t:'Amana'}, {v:'togocel_tmoney', t:'Togocel / Tmoney'}] },
    'AO': { name: 'Angola', currency: 'AOA', providers: [{v:'send_cash', t:'Send Cash'}] }
};

const countrySelect = document.getElementById('country');
const operatorSelect = document.getElementById('operator');
const phoneInput = document.getElementById('phone');
const currencyLabel = document.getElementById('currencyLabel');
const registrationForm = document.getElementById('registrationForm');
const summaryCard = document.getElementById('summaryCard');

// Écouteur de changement du menu déroulant pays
countrySelect.addEventListener('change', function() {
    const countryCode = this.value;
    
    // Réinitialisation des contrôles dépendants à chaque changement
    operatorSelect.innerHTML = '<option value="">Sélectionnez un mode</option>';
    operatorSelect.disabled = true;
    phoneInput.disabled = true;
    phoneInput.value = '';
    currencyLabel.textContent = '---';
    summaryCard.style.display = 'none';

    if (countryCode && configurations[countryCode]) {
        const config = configurations[countryCode];
        
        // Mise à jour de l'étiquette de la devise locale
        currencyLabel.textContent = config.currency;
        
        // Remplissage dynamique des opérateurs autorisés pour ce pays
        config.providers.forEach(prov => {
            const option = document.createElement('option');
            option.value = prov.v;
            option.text = prov.t;
            operatorSelect.appendChild(option);
        });
        
        operatorSelect.disabled = false;
        phoneInput.disabled = false;
    }
});

// Traitement de l'événement de soumission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rafraîchissement de la page
    
    const selectedCountry = countrySelect.value;
    const config = configurations[selectedCountry];
    const selectedOperatorText = operatorSelect.options[operatorSelect.selectedIndex].text;

    // Remplissage dynamique des nœuds texte du récapitulatif
    document.getElementById('recName').textContent = document.getElementById('fullName').value.trim();
    document.getElementById('recCountry').textContent = config.name;
    document.getElementById('recOperator').textContent = selectedOperatorText;
    document.getElementById('recPhone').textContent = phoneInput.value.trim();
    document.getElementById('recAmount').textContent = `${parseFloat(document.getElementById('amount').value)} ${config.currency}`;

    // Affichage de la carte récapitulative
    summaryCard.style.display = 'block';
    
    // Défilement fluide de l'écran vers le résultat
    summaryCard.scrollIntoView({ behavior: 'smooth' });
});
