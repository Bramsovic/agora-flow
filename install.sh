#!/bin/bash

echo "📦 Installation des dépendances CRM (NestJS) en cours..."

# Installation des dépendances Node.js
npm install

# Dépendances spécifiques utilisées dans le projet
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/typeorm typeorm pg bcrypt class-validator class-transformer
npm install @nestjs/platform-express multer csv-parser csv-writer nodemailer
npm install dotenv

# Pour le dev uniquement
npm install --save-dev @types/passport-jwt @types/bcrypt @types/node ts-node-dev

echo "✅ Installation terminée !"
echo "💡 Pense à créer ton fichier .env à la racine avec les bonnes variables."
