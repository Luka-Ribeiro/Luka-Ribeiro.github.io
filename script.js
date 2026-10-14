/* ==========================================================================
   1. GESTION DU MODE SOMBRE / MODE CLAIR
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    // Si le thème actuel est "dark", on passe en "light", et inversement
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
});


/* ==========================================================================
   2. TERMINAL INTERACTIF (CLI)
   ========================================================================== */
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// 🔴 [À MODIFIER SI BESOIN] : Voici les réponses que le terminal affiche quand on tape une commande
const commandsData = {
    help: "Commandes disponibles : <br>- <b>whoami</b> : Profil & Alternance<br>- <b>skills</b> : Compétences techniques SISR<br>- <b>renault</b> : Périmètre des 3 concessions<br>- <b>clear</b> : Effacer l'écran",
    whoami: "Luka Ribeiro Da Costa — Alternant Coordinateur des Systèmes d'Information chez Renault. Étudiant en BTS SIO option SISR.",
    skills: "Réseau : VLAN, Routage OSPF, Firewall IPFire, LAN/WAN.<br>Système : Windows Server, Active Directory, GPO, DHCP, Masterisation.<br>Parc & ITSM : PSSoft, GLPI, Onboarding/Offboarding.<br>Dev Web (Polyvalence SLAM) : PHP, SQL, JavaScript, HTML5, CSS3.",
    renault: "Gestion de 3 concessions automobiles : Support N2, maintien des locaux techniques, cartographie SI, gestion de la téléphonie, participation au Codir et reporting RSI Plaque."
};

// Fonction déclenchée quand on clique sur un bouton raccourci ou qu'on appuie sur Entrée
function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();

    if (cleanCmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }

    // Affiche la commande tapée par l'utilisateur
    const userLine = document.createElement('p');
    userLine.className = 'cmd-user';
    userLine.textContent = `luka@si-noc:~$ ${cmd}`;
    terminalOutput.appendChild(userLine);

    // Affiche la réponse correspondante
    const responseLine = document.createElement('p');
    responseLine.className = 'cmd-response';
    
    if (commandsData[cleanCmd]) {
        responseLine.innerHTML = commandsData[cleanCmd];
    } else {
        responseLine.innerHTML = `Commande inconnue : '${cmd}'. Tapez <b>help</b> pour voir la liste.`;
    }

    terminalOutput.appendChild(responseLine);
    // Fait défiler le terminal automatiquement vers le bas
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Écoute la touche "Entrée" dans le champ de texte du terminal
terminalInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && terminalInput.value.trim() !== '') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
    }
});


/* ==========================================================================
   3. TOPOLOGIE RÉSEAU INTERACTIVE (SCHÉMA CLIQUABLE)
   ========================================================================== */
// 🔴 [À MODIFIER SI BESOIN] : Les informations affichées quand on clique sur un élément du schéma réseau
const topologyData = {
    firewall: {
        badge: "ZONE SÉCURITÉ & PÉRIMÈTRE",
        title: "Sécurité & Pare-feu (IPFire)",
        desc: "Protection périmétrique du réseau, filtrage des flux entrants/sortants et application stricte des politiques de sécurité du groupe.",
        items: [
            "Déploiement et configuration de pare-feu IPFire en environnement Lab/École",
            "Veille au respect des règles de sécurité informatique et de la déontologie",
            "Contrôle de cohérence régulier sur les droits et accès des utilisateurs"
        ]
    },
    coeur: {
        badge: "INFRASTRUCTURE RÉSEAU (E5)",
        title: "Cœur de Réseau, LAN/WAN & Routage OSPF",
        desc: "Interconnexion des différents sous-réseaux et maintien de la connectivité entre les établissements et la DSI centrale.",
        items: [
            "Mise en place du routage dynamique inter-VLAN via le protocole OSPF",
            "Assistance à la DSI sur le réseau LAN et participation aux interventions WAN",
            "Coordination avec les équipes centrales DSI RRG et l'opérateur télécom"
        ]
    },
    ad: {
        badge: "ADMINISTRATION SYSTÈME",
        title: "Serveurs Windows, Active Directory & DHCP",
        desc: "Gestion centralisée des identités, des stratégies de groupe et de l'attribution dynamique des adresses IP.",
        items: [
            "Administration des utilisateurs, groupes et Unités d'Organisation (AD DS)",
            "Création et déploiement de GPO pour sécuriser et configurer les postes",
            "Installation et configuration du service DHCP pour les clients du réseau"
        ]
    },
    concessions: {
        badge: "PÉRIMÈTRE RENAULT (3 SITES)",
        title: "Gestion Multisite : 3 Concessions Automobiles",
        desc: "Supervision opérationnelle et administrative de l'ensemble des infrastructures locales sur 3 établissements.",
        items: [
            "Création et mise à jour de la cartographie technique et fonctionnelle du SI",
            "Maintien en conformité des locaux techniques (brassage, câblage, sécurité)",
            "Participation au Codir établissement et reporting hebdomadaire au RSI Plaque"
        ]
    },
    parc: {
        badge: "SUPPORT N2 & GESTION DE PARC (E4)",
        title: "Parc Informatique, Téléphonie & Mobilité",
        desc: "Garantie du bon fonctionnement des équipements matériels, logiciels et téléphoniques pour l'ensemble des métiers.",
        items: [
            "Administration du parc via PSSoft (Renault) et GLPI (École)",
            "Campagnes de masterisation de postes et renouvellement de la flotte smartphones",
            "Gestion complète des entrées/sorties (Onboarding / Offboarding) et support N2"
        ]
    }
};

function selectNode(nodeKey, buttonElement) {
    // Retire la classe 'active' de tous les boutons du schéma
    document.querySelectorAll('.topo-node').forEach(btn => btn.classList.remove('active'));
    // Ajoute la classe 'active' sur le bouton cliqué
    buttonElement.classList.add('active');

    // Met à jour le panneau de droite avec les données correspondantes
    const data = topologyData[nodeKey];
    document.getElementById('topo-badge').textContent = data.badge;
    document.getElementById('topo-title').textContent = data.title;
    document.getElementById('topo-desc').textContent = data.desc;

    const listElement = document.getElementById('topo-list');
    listElement.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');
}


/* ==========================================================================
   4. SYSTÈME DE FILTRES DES PROJETS E4 / E5
   ========================================================================== */
function filterProjects(category, btnElement) {
    // Met à jour le bouton actif dans la barre de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Affiche ou masque les cartes de projets selon leur catégorie
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}


/* ==========================================================================
   5. BASE DE DONNÉES DES POP-UPS PROJETS (MODALES)
   ========================================================================== */
// 🔴 [À MODIFIER / COMPLÉTER] : C'est ici que tu détailles chaque projet pour l'oral E4/E5
// 🔗 [LIENS À REMPLACER] : Change la valeur de 'docLink' par le nom de tes fichiers PDF de documentation
const projectsDetails = {
    prj1: {
        title: "Administration de Parc & Cycle de Vie Utilisateur (PSSoft)",
        tags: ["Entreprise : Renault", "Épreuve E4", "PSSoft & IAM"],
        context: "Au sein de mes 3 concessions Renault, il est indispensable de maintenir une base de gestion de parc fiable à 100% et de garantir que chaque collaborateur dispose uniquement des accès correspondant à son métier.",
        tasks: [
            "Tenue rigoureuse de la base de Gestion de Parc sur PSSoft et réceptions administratives des matériels.",
            "Gestion complète du processus d'Onboarding (création des accès, préparation matériel) et d'Offboarding (récupération, révocation).",
            "Réalisation de contrôles de cohérence réguliers sur les droits d'accès aux SI et les équipements attribués."
        ],
        skills: "Gérer le patrimoine informatique • Répondre aux incidents et aux demandes d'assistance • Organiser son développement professionnel",
        docLink: "doc_pssoft.pdf" // 🔗 Nom de ta future documentation PDF
    },
    prj2: {
        title: "Campagne de Masterisation de Postes & Renouvellement Smartphones",
        tags: ["Entreprise : Renault", "Épreuve E4", "Déploiement"],
        context: "Afin d'assurer la performance et la sécurité du parc informatique des concessions, j'ai piloté le renouvellement matériel et logiciel des équipements fixes et mobiles des collaborateurs.",
        tasks: [
            "Préparation et déploiement de masters standardisés sur les nouveaux postes de travail.",
            "Organisation de la campagne de renouvellement de la flotte de smartphones professionnels.",
            "Accompagnement des utilisateurs lors de la prise en main et mise à jour de l'inventaire PSSoft."
        ],
        skills: "Mettre à disposition des utilisateurs un service informatique • Gérer le patrimoine informatique",
        docLink: "doc_masterisation.pdf" // 🔗 Nom de ta future documentation PDF
    },
    prj3: {
        title: "Déploiement Active Directory, GPO & Service DHCP",
        tags: ["École / Homelab", "Épreuves E4 & E5", "Windows Server"],
        context: "Création d'une infrastructure système centralisée permettant d'authentifier les utilisateurs d'une entreprise, d'automatiser la configuration de leurs postes et d'attribuer dynamiquement la configuration IP.",
        tasks: [
            "Installation de Windows Server et promotion en Contrôleur de Domaine (AD DS).",
            "Structuration de l'annuaire (Unités d'Organisation, Groupes de sécurité, Utilisateurs).",
            "Création de stratégies de groupe (GPO) pour sécuriser les postes et déploiement d'étendues DHCP."
        ],
        skills: "Administrer les systèmes et le réseau • Concevoir une solution d'infrastructure réseau",
        docLink: "doc_ad_dhcp.pdf" // 🔗 Nom de ta future documentation PDF
    },
    prj4: {
        title: "Routage Dynamique Inter-VLAN avec le Protocole OSPF",
        tags: ["École / Homelab", "Épreuve E5", "Cisco / Réseau"],
        context: "Segmentation d'un réseau d'entreprise en plusieurs sous-réseaux logiques (VLANs) isolés et mise en place d'un routage dynamique évolutif.",
        tasks: [
            "Création et nommage des VLANs sur les commutateurs et configuration des liens Trunk (802.1Q).",
            "Activation et configuration du protocole de routage dynamique OSPF pour assurer la communication inter-VLAN.",
            "Tests de connectivité, vérification des tables de routage et validation de la redondance."
        ],
        skills: "Installer, tester et déployer une solution d'infrastructure réseau • Exploiter, dépanner et superviser",
        docLink: "doc_ospf.pdf" // 🔗 Nom de ta future documentation PDF
    },
    prj5: {
        title: "Mise en Place d'un Réseau Sécurisé avec Pare-feu IPFire",
        tags: ["École / Homelab", "Épreuve E5 Cyber", "Sécurité Réseau"],
        context: "Protection d'une infrastructure locale contre les menaces externes par l'intégration d'une solution de pare-feu Open Source dédiée.",
        tasks: [
            "Installation et configuration des interfaces réseau d'IPFire (Zones Rouge/WAN et Verte/LAN).",
            "Définition des règles de filtrage pare-feu (Moindre privilège) et gestion du NAT.",
            "Surveillance des journaux d'événements (Logs) et tests d'étanchéité du réseau."
        ],
        skills: "Sécuriser les équipements et les usages des utilisateurs • Administrer un pare-feu",
        docLink: "doc_ipfire.pdf" // 🔗 Nom de ta future documentation PDF
    },
   prj6: {
        title: "Déploiement d'une Solution de Gestion de Parc & Ticketing GLPI",
        tags: ["École / Homelab", "Épreuve E4", "ITSM / Linux"],
        context: "Mise en œuvre en environnement d'école d'un outil Open Source d'inventaire et de gestion des incidents, permettant de comparer son fonctionnement avec l'outil PSSoft utilisé chez Renault.",
        tasks: [
            "Installation du serveur web/base de données et déploiement de la plateforme GLPI.",
            "Configuration de l'inventaire automatisé et structuration des catégories de tickets d'assistance.",
            "Simulation du traitement d'incidents N1/N2 et suivi des indicateurs de résolution (SLA)."
        ],
        skills: "Gérer le patrimoine informatique • Répondre aux incidents et aux demandes d'assistance et d'évolution",
        docLink: "doc_glpi.pdf"
    }, // ⚠️ N'oublie pas cette virgule après prj6 !

    // 🟢 NOUVEAU PROJET 7 : LEBONCOIN (SLAM)
    prj7: {
        title: "Développement & Hébergement d'une Plateforme Type 'Leboncoin'",
        tags: ["École / Projet Web", "Épreuve E4", "Polyvalence SLAM"],
        // 🔴 [À MODIFIER SI BESOIN] : Adapte selon les fonctionnalités exactes de ton site
        context: "Conception d'une plateforme web dynamique de publication et de consultation de petites annonces, démontrant ma polyvalence technique (Dev & Infra) acquise en BTS SIO.",
        tasks: [
            "Développement Front-End de l'interface utilisateur et des filtres interactifs (HTML5, CSS3, JavaScript).",
            "Développement Back-End en PHP : système d'inscription/connexion, dépôt d'annonces et liaison avec la base de données SQL.",
            "Mise en place de l'environnement serveur web local (Apache / MySQL) et sécurisation des entrées utilisateurs."
        ],
        skills: "Développer la présence en ligne de l'organisation • Travailler en mode projet • Mettre à disposition des utilisateurs un service informatique",
        // 🔗 [LIEN À REMPLACER] : Tu peux mettre le lien vers un PDF de présentation OU le lien vers ton dépôt GitHub du projet Leboncoin !
        docLink: "doc_leboncoin.pdf"
    }
};

function openProjectModal(projectId) {
    const data = projectsDetails[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-context').textContent = data.context;
    document.getElementById('modal-skills').textContent = data.skills;
    document.getElementById('modal-doc-link').href = data.docLink;

    // Affiche les badges
    document.getElementById('modal-tags').innerHTML = data.tags
        .map(tag => `<span class="badge badge-cyan">${tag}</span>`).join('');

    // Affiche les tâches réalisées
    document.getElementById('modal-tasks').innerHTML = data.tasks
        .map(task => `<li>${task}</li>`).join('');

    // Ouvre la fenêtre
    document.getElementById('project-modal').classList.add('open');
}

function closeModalDirect() {
    document.getElementById('project-modal').classList.remove('open');
}

function closeProjectModal(event) {
    if (event.target.id === 'project-modal') {
        closeModalDirect();
    }
}
