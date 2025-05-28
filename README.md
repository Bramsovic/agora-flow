# 📄 Cahier des Charges — IndieCRM

## 1. Présentation du projet

**IndieCRM** est une application web minimaliste de gestion de relation client (CRM) destinée aux **indépendants**, **freelances**, **artisans** et **TPE**.
L'objectif est de proposer une solution simple, rapide et efficace pour gérer les clients, suivre les interactions, organiser les relances et centraliser les communications.

---

## 2. Objectifs

* Offrir un outil CRM **simple et accessible**, adapté aux petites structures.
* Centraliser la **gestion des clients**, **tâches** et **notes**.
* Permettre le **suivi des relances** et **historique des échanges**.
* Proposer un **dashboard clair** pour un aperçu rapide de l’activité.
* Intégrer des fonctionnalités essentielles (authentification, emailing, exports).

---

## 3. Fonctionnalités attendues

### 3.1 Authentification

* Inscription / Connexion sécurisées
* Gestion des sessions via **JWT**
* Récupération des erreurs (mauvais identifiants, accès protégé…)

### 3.2 Gestion des clients

* CRUD complet (Créer, Lire, Modifier, Supprimer)
* Champs : Nom, Email, Téléphone, Entreprise, Statut (prospect, client, perdu…), Date de création
* Historique associé à chaque client (notes, appels, tâches)

### 3.3 Historique des interactions

* Ajout de **notes internes**
* Suivi des **appels**, **emails envoyés**, **actions réalisées**
* Visualisation sous forme de timeline sur la fiche client

### 3.4 Tâches et relances

* Création de tâches à faire (exemple : "relancer un devis", "envoyer un email")
* Planification d’échéances
* Vue des tâches du jour
* Notification sur dashboard

### 3.5 Envoi d’emails

* Intégration d'un service SMTP (NodeMailer)
* Envoi d’emails personnalisés aux clients
* Templates basiques de mails de relance

### 3.6 Dashboard

* Vue d'ensemble :

  * Nombre total de clients
  * Clients à relancer aujourd’hui
  * Derniers échanges récents
  * Taux de conversion (prospects → clients)

### 3.7 Exportation

* Export des données clients en fichier CSV

### 3.8 Logs d’activité

* Traces des actions réalisées (ajout, modification, suppression)
* Logs côté serveur pour le suivi et debug

---

## 4. Stack technique
```bash
| Composant        | Technologie                                    |
| ---------------- | ---------------------------------------------- |
| Front-end        | Vue.js 3, Pinia, Vue Router                    |
| Back-end         | NestJS (Node.js)                               |
| Base de données  | PostgreSQL                                     |
| Authentification | JWT                                            |
| Emailing         | NodeMailer (SMTP)                              |
| Déploiement      | Vercel (Front), Railway (Back), Supabase (BDD) |
```
---

## 5. Architecture technique

```bash
indiecrm/
├── client/          # Frontend Vue.js
├── server/          # Backend NestJS
├── db/              # Scripts SQL, données de test
├── docs/            # Documentation projet
└── README.md
```

* Front-end basé sur Vue 3 Composition API
* Backend API RESTful en NestJS
* Gestion des tokens via `Authorization: Bearer`
* Communication sécurisée entre le front et l'API

---

## 6. MVP (Minimum Viable Product)

* Authentification fonctionnelle
* Gestion de clients (CRUD)
* Création de tâches et affichage sur dashboard
* Historique des notes
* Dashboard récapitulatif
* Export CSV des clients
* Envoi d’un email simple via SMTP
* Logs serveur de base

---

## 7. Améliorations futures possibles

* Gestion multi-utilisateurs (équipes)
* Envoi de SMS de rappel (Twilio)
* Notifications en temps réel (Websockets)
* Système de tagging avancé pour les clients
* Automatisations simples (ex: email automatique X jours après création client)

---

## 8. Contraintes techniques

* Interface légère et rapide
* Responsive Design (mobile friendly)
* Sécurisation basique des accès API
* Code scalable et propre (possibilité d'évolution SaaS)
* Respect des standards REST et bonnes pratiques

---

## 👨‍💻 Auteur

Développé avec ❤️ par **Brahim et Gabriel**

---
