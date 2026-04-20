/**
 * Utilitaires de formatage — centralisés pour cohérence dans toute l'app.
 */

/**
 * Formate un prix en USD.
 * @param amount
 * @returns ex: "$189.00"
 */
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

/**
 * Formate une date ISO en date lisible.
 * @param dateStr
 * @returns ex: "March 15, 2026"
 */
export const formatDate = (dateStr: string): string =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));

/**
 * Tronque un texte à une longueur max.
 * @param text
 * @param max
 * @returns
 */
export const truncate = (text: string, max = 100): string =>
  text.length > max ? `${text.slice(0, max)}…` : text;
