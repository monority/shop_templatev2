/**
 * Utilitaires de formatage — centralisés pour cohérence dans toute l'app.
 */

/**
 * Formate un prix en USD.
 * @param {number} amount
 * @returns {string} ex: "$189.00"
 */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

/**
 * Formate une date ISO en date lisible.
 * @param {string} dateStr
 * @returns {string} ex: "March 15, 2026"
 */
export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));

/**
 * Tronque un texte à une longueur max.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export const truncate = (text, max = 100) =>
  text.length > max ? `${text.slice(0, max)}…` : text;
