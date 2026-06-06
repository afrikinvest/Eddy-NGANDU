// Matrice des configurations géographiques et financières de Teck Compagnie
const configurations = {
    'ML': { name: 'Mali', currency: 'XOF', providers: [{v:'moov_money', t:'Moov Money'}, {v:'wave_money', t:'Wave Money'}, {v:'mobicash', t:'Mobicash'}] },
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

// Captation des composants structurels via l'arbre DOM
const countrySelect = document.getElementById('country');
const operatorSelect = document.getElementById('operator');
const phoneInput = document.getElementById('phone');
const currencyLabel = document.getElementById('currencyLabel');
const registrationForm = document.getElementById('registrationForm');
const summaryCard = document.getElementById('summaryCard');

// Écouteur d'action : Filtre dynamique des solutions de paiement au choix du pays
countrySelect.addEventListener('change', function() {
    const countryCode = this.value;
    
    // Réinitialisation globale et sécurisée du formulaire
    operatorSelect.innerHTML = '<option value="">-- Sélectionnez un moyen --</option>';
    operatorSelect.disabled = true;
    phoneInput.disabled = true;
    phoneInput.value = '';
    currencyLabel.textContent = '---';
    summaryCard.style.display = 'none';

    // Injection si la clé pays existe dans la base locale
    if (countryCode && configurations[countryCode]) {
        const config = configurations[countryCode];
        
        // Synchronisation textuelle du badge monétaire
        currencyLabel.textContent = config.currency;
        
        // Boucle de peuplement du sélecteur d'opérateurs
        config.providers.forEach(prov => {
            const option = document.createElement('option');
            option.value = prov.v;
            option.text = prov.t;
            operatorSelect.appendChild(option);
        });
        
        // Libération des droits d'écriture utilisateur
        operatorSelect.disabled = false;
        phoneInput.disabled = false;
    }
});

// Écouteur de soumission : Extraction des valeurs et montage du panneau récapitulatif
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Interception du rechargement HTTP standard
    
    const selectedCountry = countrySelect.value;
    const config = configurations[selectedCountry];
    const selectedOperatorText = operatorSelect.options[operatorSelect.selectedIndex].text;

    // Transfert synchrone des chaînes de caractères vers les conteneurs de résumé
    document.getElementById('recName').textContent = document.getElementById('fullName').value.trim();
    document.getElementById('recCountry').textContent = config.name;
    document.getElementById('recOperator').textContent = selectedOperatorText;
    document.getElementById('recPhone').textContent = phoneInput.value.trim();
    
    // Calcul et mise en forme de la valeur monétaire saisie
    const userAmount = parseFloat(document.getElementById('amount').value);
    document.getElementById('recAmount').textContent = `${userAmount.toLocaleString()} ${config.currency}`;

    // Activation de l'affichage du bloc récapitulatif dans le flux CSS
    summaryCard.style.display = 'block';
    
    // Recentrage visuel fluide de l'affichage du navigateur vers le bas de la page
    summaryCard.scrollIntoView({ behavior: 'smooth' });
});
