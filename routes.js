const express = require('express');
const router = express.Router();

// Simulação de um banco de dados em memória
let trustedContacts = [];
let locationSharingActive = false;

// Rota para verificar o status do ônibus
router.get('/verificar_onibus', (req, res) => {
    // Simulação de status do ônibus
    const statuses = [
        "Ônibus a caminho",
        "Ônibus chegando em 5 minutos",
        "Ônibus atrasado"
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    res.json({ status: randomStatus });
});

// Rota para ativar/desativar o compartilhamento de localização
router.post('/toggle_location_sharing', (req, res) => {
    locationSharingActive = !locationSharingActive;
    res.json({ active: locationSharingActive });
});

// Rota para adicionar um contato de confiança
router.post('/add_contact', (req, res) => {
    const { name, phone } = req.body;
    if (name && phone) {
        trustedContacts.push({ name, phone });
        res.status(201).json({ message: "Contato adicionado com sucesso!", contacts: trustedContacts });
    } else {
        res.status(400).json({ message: "Nome e telefone são obrigatórios." });
    }
});

// Rota para obter contatos de confiança
router.get('/trusted_contacts', (req, res) => {
    res.json(trustedContacts);
});

// Rota para remover um contato de confiança
router.delete('/remove_contact/:phone', (req, res) => {
    const { phone } = req.params;
    trustedContacts = trustedContacts.filter(contact => contact.phone !== phone);
    res.json({ message: "Contato removido com sucesso!", contacts: trustedContacts });
});

module.exports = router;
