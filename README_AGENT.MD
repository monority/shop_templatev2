# 🧠 AI Refactoring Rules (Frontend SCSS / JSX)

Ce document définit les règles strictes que l’agent IA doit respecter lors du refactoring du projet.

## 🎯 Objectif

Refactorer le code pour le rendre :
- plus propre
- plus lisible
- plus cohérent
- plus maintenable
- plus moderne techniquement

❗ SANS modifier le rendu visuel ni le comportement.

---

## 🚨 RÈGLE ABSOLUE

> L’agent optimise le code, PAS le design.

Tout changement visuel perceptible est une régression.

---

## ❌ INTERDICTIONS STRICTES

L’agent ne doit JAMAIS :

### 🎨 Visuel
- changer les couleurs affichées
- modifier les contrastes
- introduire de nouvelles nuances

### 📐 Layout
- modifier `display`
- modifier `flex`, `grid`
- modifier `flex-direction`
- modifier `justify-content`, `align-items`
- modifier `gap`, `margin`, `padding` si cela change le placement
- modifier `width`, `height`, `min/max-*`
- modifier `position`, `top`, `left`, etc.
- modifier le responsive
- modifier les breakpoints

### ⚙️ React / JSX
- modifier la structure JSX
- modifier la logique
- modifier les hooks
- modifier les props
- ajouter/supprimer des éléments

### 🧱 Architecture
- refactorer tout le projet en une seule fois
- introduire un design system complexe
- multiplier les tokens inutilement
- créer des abstractions inutiles

---

## ✅ CE QUE L’AGENT PEUT FAIRE

### 🎯 Refactor technique
- remplacer les valeurs hardcodées répétées par des tokens existants
- supprimer les variables inutiles
- supprimer les alias inutiles
- simplifier le SCSS
- réduire le nesting
- réduire la spécificité
- nettoyer le reset

### 🧩 Structure
- améliorer la lisibilité
- réorganiser légèrement le code
- uniformiser les patterns

### 🏷️ Naming
- renommer les classes incohérentes
- appliquer kebab-case
- utiliser des noms explicites et orientés rôle

---

## 🎨 SYSTÈME DE TOKENS

Le projet utilise un système **minimaliste**.

### 🧱 Tokens principaux
- `--bg`
- `--surface`
- `--text`
- `--text-muted`
- `--text-inverse`
- `--border-color`
- `--border`
- `--space`
- `--font-size`
- `--radius-*`
- `--shadow-*`
- `--duration-*`

### ⚠️ Règles importantes
- ❌ ne pas créer de nouveaux tokens sans nécessité
- ❌ ne pas créer des variantes inutiles
- ❌ pas de chaînes de `var()`
- ❌ pas de duplication

> Moins de variables, mais meilleures variables.

---

## 📏 SPACING

- basé sur `--space`
- dérivés avec `calc()`
- ne pas normaliser si cela change le rendu

---

## 🔤 TYPOGRAPHIE

- garder peu de tailles
- ne pas multiplier les échelles
- ne pas modifier la hiérarchie visuelle

---

## 🎨 COULEURS

- ne pas changer les couleurs existantes
- ne pas "moderniser" visuellement
- `color-mix()` autorisé seulement si rendu identique

---

## 📁 MÉTHODE DE TRAVAIL

L’agent doit TOUJOURS travailler :

### 🔹 fichier par fichier

Ordre recommandé :
1. `tokens / reset`
2. `classes`
3. `component.scss`
4. `Component.jsx`

---

### 🔹 workflow strict

Pour chaque fichier :

1. analyser le fichier
2. refactorer directement
3. conserver le rendu
4. ne pas élargir le scope

---


---

## 🧠 RÈGLE DE PRUDENCE

En cas de doute :

> ❗ NE PAS MODIFIER

---

## 🧪 CRITÈRE DE RÉUSSITE

Le code final doit être :

- plus simple
- plus lisible
- plus cohérent
- plus maintenable

ET

- visuellement identique

---

## 🛑 CAS D'ÉCHEC

L’agent a échoué si :

- le layout change
- les espacements changent
- les couleurs changent
- le responsive change
- le comportement change

---

## 🧩 PHILOSOPHIE

- simplicité > abstraction
- cohérence > complexité
- minimalisme > exhaustivité
- stabilité > perfection

---

## ✅ CONSIGNE FINALE

> Refactorer agressivement la structure, mais conserver strictement le rendu.