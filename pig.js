// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Language Change Handler
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    console.log(`Language changed to: ${selectedLanguage}`);
    // Here you would implement actual language switching logic
    // For now, just show an alert
    alert(`Language switched to: ${getLanguageName(selectedLanguage)}`);
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'hi': 'हिंदी',
        'zh': '中文'
    };
    return languages[code] || 'English';
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Risk Assessment Form Handler
function initializeRiskAssessment() {
    const form = document.getElementById('riskAssessmentForm');
    if (form) {
        form.addEventListener('submit', handleRiskAssessment);
    }
}

function handleRiskAssessment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        farmType: formData.get('farmType'),
        animalCount: parseInt(formData.get('animalCount')),
        location: formData.get('location'),
        nearestFarm: formData.get('nearestFarm'),
        measures: formData.getAll('measures')
    };
    
    // Calculate risk score
    const riskScore = calculateRiskScore(data);
    
    // Show results
    displayRiskResults(riskScore, data);
    
    console.log('Risk Assessment Data:', data);
    console.log('Risk Score:', riskScore);
}

function calculateRiskScore(data) {
    let score = 50; // Base score
    
    // Farm type risk adjustment
    if (data.farmType === 'poultry') score += 10;
    if (data.farmType === 'mixed') score += 15;
    
    // Animal count risk
    if (data.animalCount > 500) score += 20;
    else if (data.animalCount > 100) score += 10;
    
    // Distance to nearest farm
    switch (data.nearestFarm) {
        case '0-1km': score += 25; break;
        case '1-5km': score += 15; break;
        case '5-10km': score += 5; break;
        default: score -= 5; break;
    }
    
    // Biosecurity measures (each reduces risk)
    score -= data.measures.length * 8;
    
    return Math.max(0, Math.min(100, score));
}

function displayRiskResults(score, data) {
    const resultsDiv = document.getElementById('riskResults');
    if (!resultsDiv) return;
    
    let riskLevel = 'Low';
    let alertClass = 'alert-success';
    let recommendations = [
        'Continue current biosecurity practices',
        'Regular health monitoring of animals',
        'Keep vaccination schedules up to date'
    ];
    
    if (score >= 70) {
        riskLevel = 'High';
        alertClass = 'alert-danger';
        recommendations = [
            'Implement immediate biosecurity upgrades',
            'Install proper quarantine facilities',
            'Restrict farm access to essential personnel only',
            'Increase disinfection frequency',
            'Contact veterinary services for consultation'
        ];
    } else if (score >= 40) {
        riskLevel = 'Medium';
        alertClass = 'alert-warning';
        recommendations = [
            'Implement stricter visitor protocols',
            'Upgrade disinfection procedures',
            'Install proper quarantine facilities',
            'Regular health monitoring of animals',
            'Review and update biosecurity plan'
        ];
    }
    
    resultsDiv.innerHTML = `
        <h3>Risk Assessment Results</h3>
        <div class="alert ${alertClass}">
            <span>${riskLevel === 'High' ? '🔴' : riskLevel === 'Medium' ? '⚠️' : '✅'}</span> 
            Your farm has a <strong>${riskLevel} Risk</strong> profile (Score: ${score}/100)
        </div>
        <h4>Recommendations:</h4>
        <ul>
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <div style="margin-top: 1rem;">
            <button class="btn btn-primary" onclick="generateRiskReport('${data.farmType}', ${score}, '${riskLevel}')">
                Generate Detailed Report
            </button>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

function generateRiskReport(farmType, score, riskLevel) {
    alert(`Risk Assessment Report Generated!\n\nFarm Type: ${farmType}\nRisk Score: ${score}/100\nRisk Level: ${riskLevel}\n\nReport saved to your records.`);
}

// Training Module Functions
function continueTraining(moduleId) {
    console.log(`Continuing training module: ${moduleId}`);
    alert(`Starting training module ${moduleId}. This would open the interactive training content.`);
}

function startTraining(moduleId) {
    console.log(`Starting training module: ${moduleId}`);
    alert(`Beginning training module ${moduleId}. Loading interactive content...`);
}

// Compliance Functions
function scheduleAudit() {
    alert('Audit scheduling form would open here. You would select a date and time for your biosecurity audit.');
}

function downloadCertificate() {
    alert('Your compliance certificate would be downloaded as a PDF file.');
}

// Alerts Functions
function markAllAlertsRead() {
    const alertBadge = document.getElementById('alertBadge');
    if (alertBadge) {
        alertBadge.style.display = 'none';
    }
    
    alert('All alerts marked as read.');
}

// Records Functions
function addNewAnimal() {
    const animalData = prompt('Enter animal details (ID, Type, Age):');
    if (animalData) {
        alert(`New animal record added: ${animalData}`);
        updateAnimalStats();
    }
}

function recordVaccination() {
    const vaccinationData = prompt('Enter vaccination details (Animal ID, Vaccine Type, Date):');
    if (vaccinationData) {
        alert(`Vaccination recorded: ${vaccinationData}`);
        updateAnimalStats();
    }
}

function healthCheckEntry() {
    const healthData = prompt('Enter health check details (Animal ID, Status, Notes):');
    if (healthData) {
        alert(`Health check recorded: ${healthData}`);
        updateAnimalStats();
    }
}

function generateReport() {
    alert('Generating comprehensive farm report... This would create a PDF with all animal records, health status, and compliance information.');
}

function updateAnimalStats() {
    // This would update the statistics displayed in the records modal
    console.log('Animal statistics updated');
}

// Real-time Monitoring Functions
function updateMonitoringData() {
    // Simulate real-time data updates
    const temperature = 20 + Math.random() * 10; // 20-30°C
    const humidity = 60 + Math.random() * 20; // 60-80%
    
    const tempElements = document.querySelectorAll('.stat-number');
    if (tempElements.length >= 2) {
        tempElements[0].textContent = `${temperature.toFixed(1)}°C`;
        tempElements[1].textContent = `${humidity.toFixed(0)}%`;
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'danger' ? '🔴' : 'ℹ️'}</span>
        ${message}
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 1.2em; cursor: pointer;">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Weather Integration (Mock)
function checkWeatherAlerts() {
    const weatherConditions = ['clear', 'rainy', 'storm', 'hot', 'cold'];
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    if (condition === 'storm' || condition === 'rainy') {
        showNotification('Weather Alert: Heavy rains expected. Ensure proper drainage and ventilation.', 'warning');
    }
}

// Emergency Protocols
function activateEmergencyProtocol(type) {
    const protocols = {
        'disease': 'Disease outbreak protocol activated. Quarantine procedures initiated.',
        'fire': 'Fire emergency protocol activated. Evacuate animals to safe zones.',
        'flood': 'Flood emergency protocol activated. Move animals to higher ground.',
        'power': 'Power outage protocol activated. Backup systems engaged.'
    };
    
    alert(protocols[type] || 'Emergency protocol activated.');
    console.log(`Emergency protocol activated: ${type}`);
}

// Data Export Functions
function exportData(dataType) {
    const exportData = {
        'records': 'Exporting animal records...',
        'compliance': 'Exporting compliance data...',
        'training': 'Exporting training records...',
        'alerts': 'Exporting alert history...'
    };
    
    alert(exportData[dataType] || 'Exporting data...');
}

// Search and Filter Functions
function searchRecords(query) {
    console.log(`Searching records for: ${query}`);
    // Implement search logic here
}

function filterByStatus(status) {
    console.log(`Filtering by status: ${status}`);
    // Implement filter logic here
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + keys for quick actions
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'r':
                event.preventDefault();
                openModal('recordsModal');
                break;
            case 'a':
                event.preventDefault();
                openModal('alertsModal');
                break;
            case 't':
                event.preventDefault();
                openModal('trainingModal');
                break;
        }
    }
    
    // Escape key to close modals
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// Auto-refresh functions
function startAutoRefresh() {
    // Update monitoring data every 30 seconds
    setInterval(updateMonitoringData, 30000);
    
    // Check for weather alerts every 5 minutes
    setInterval(checkWeatherAlerts, 300000);
    
    // Check for new alerts every 2 minutes
    setInterval(() => {
        // This would fetch new alerts from server
        console.log('Checking for new alerts...');
    }, 120000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('BioSecure Farm Dashboard Initialized');
    
    // Initialize form handlers
    initializeRiskAssessment();
    
    // Start auto-refresh functions
    startAutoRefresh();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to BioSecure Farm Dashboard! Your farm security monitoring is active.', 'success');
    }, 1000);
    
    // Add click handlers for card actions
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle animation when card is clicked
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '#28a745';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'warning');
            }
        });
    });
});