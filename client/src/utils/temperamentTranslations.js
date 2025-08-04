// Mapeo de temperamentos de inglés a español
const temperamentMap = {
  // Temperamentos comunes de perros
  'Stubborn': 'Terco',
  'Curious': 'Curioso',
  'Playful': 'Juguetón',
  'Adventurous': 'Aventurero',
  'Active': 'Activo',
  'Fun-loving': 'Divertido',
  'Aloof': 'Distante',
  'Clownish': 'Payaso',
  'Dignified': 'Digno',
  'Independent': 'Independiente',
  'Happy': 'Feliz',
  'Friendly': 'Amigable',
  'Affectionate': 'Cariñoso',
  'Devoted': 'Devoto',
  'Sweet-Tempered': 'Dulce',
  'Gentle': 'Gentil',
  'Energetic': 'Enérgico',
  'Loyal': 'Leal',
  'Confident': 'Confiado',
  'Alert': 'Alerta',
  'Intelligent': 'Inteligente',
  'Protective': 'Protector',
  'Brave': 'Valiente',
  'Courageous': 'Valiente',
  'Fearless': 'Intrépido',
  'Bold': 'Audaz',
  'Calm': 'Tranquilo',
  'Quiet': 'Silencioso',
  'Patient': 'Paciente',
  'Even Tempered': 'Temperamento Equilibrado',
  'Good-natured': 'Bondadoso',
  'Loving': 'Amoroso',
  'Obedient': 'Obediente',
  'Trainable': 'Entrenable',
  'Responsive': 'Receptivo',
  'Eager': 'Ansioso',
  'Keen': 'Entusiasta',
  'Lively': 'Vivaz',
  'Spirited': 'Animado',
  'Cheerful': 'Alegre',
  'Merry': 'Jovial',
  'Joyful': 'Gozoso',
  'Outgoing': 'Extrovertido',
  'Sociable': 'Sociable',
  'Companionable': 'Compañero',
  'Reliable': 'Confiable',
  'Stable': 'Estable',
  'Steady': 'Constante',
  'Reserved': 'Reservado',
  'Docile': 'Dócil',
  'Submissive': 'Sumiso',
  'Trusting': 'Confiado',
  'Faithful': 'Fiel',
  'Strong Willed': 'Voluntarioso',
  'Dominant': 'Dominante',
  'Assertive': 'Asertivo',
  'Territorial': 'Territorial',
  'Aggressive': 'Agresivo',
  'Feisty': 'Luchador',
  'Tenacious': 'Tenaz',
  'Determined': 'Determinado',
  'Hardworking': 'Trabajador',
  'Dutiful': 'Cumplidor',
  'Responsible': 'Responsable',
  'Adaptable': 'Adaptable',
  'Versatile': 'Versátil',
  'Hardy': 'Resistente',
  'Rugged': 'Robusto',
  'Athletic': 'Atlético',
  'Agile': 'Ágil',
  'Quick': 'Rápido',
  'Swift': 'Veloz',
  'Graceful': 'Elegante',
  'Dignified': 'Distinguido',
  'Noble': 'Noble',
  'Regal': 'Regio',
  'Proud': 'Orgulloso',
  'Majestic': 'Majestuoso',
  'Elegant': 'Elegante',
  'Refined': 'Refinado',
  'Sophisticated': 'Sofisticado',
  'Composed': 'Sereno',
  'Self-assured': 'Seguro de sí mismo',
  'Self-confidence': 'Confianza en sí mismo',
  'Powerful': 'Poderoso',
  'Strong': 'Fuerte',
  'Muscular': 'Musculoso',
  'Robust': 'Robusto',
  'Vigorous': 'Vigoroso',
  'Enduring': 'Resistente',
  'Tireless': 'Incansable',
  'Indefatigable': 'Infatigable',
  'Persistent': 'Persistente',
  'Persevering': 'Perseverante',
  'Dedicated': 'Dedicado',
  'Committed': 'Comprometido',
  'Focused': 'Concentrado',
  'Attentive': 'Atento',
  'Observant': 'Observador',
  'Vigilant': 'Vigilante',
  'Watchful': 'Vigilante',
  'Cautious': 'Cauteloso',
  'Careful': 'Cuidadoso',
  'Prudent': 'Prudente',
  'Sensible': 'Sensato',
  'Wise': 'Sabio',
  'Thoughtful': 'Reflexivo',
  'Contemplative': 'Contemplativo',
  'Peaceful': 'Pacífico',
  'Serene': 'Sereno',
  'Tranquil': 'Tranquilo',
  'Relaxed': 'Relajado',
  'Easy-going': 'Relajado',
  'Laid-back': 'Tranquilo',
  'Mellow': 'Apacible',
  'Mild': 'Suave',
  'Sweet': 'Dulce',
  'Kind': 'Amable',
  'Benevolent': 'Benevolente',
  'Compassionate': 'Compasivo',
  'Empathetic': 'Empático',
  'Understanding': 'Comprensivo',
  'Tolerant': 'Tolerante',
  'Forgiving': 'Perdonador',
  'Great-hearted': 'Gran corazón'
};

/**
 * Traduce temperamentos de inglés a español
 * @param {string} temperamentString - String con temperamentos separados por comas
 * @returns {string} - String con temperamentos traducidos
 */
export const translateTemperaments = (temperamentString) => {
  if (!temperamentString || typeof temperamentString !== 'string') {
    return temperamentString || '';
  }

  // Dividir por comas y limpiar espacios
  const temperaments = temperamentString
    .split(',')
    .map(temp => temp.trim())
    .filter(temp => temp.length > 0);

  // Traducir cada temperamento
  const translatedTemperaments = temperaments.map(temperament => {
    // Buscar traducción exacta
    const exactMatch = temperamentMap[temperament];
    if (exactMatch) {
      return exactMatch;
    }

    // Buscar traducción case-insensitive
    const lowerTemp = temperament.toLowerCase();
    const caseInsensitiveMatch = Object.keys(temperamentMap).find(
      key => key.toLowerCase() === lowerTemp
    );
    
    if (caseInsensitiveMatch) {
      return temperamentMap[caseInsensitiveMatch];
    }

    // Si no se encuentra traducción, devolver el original
    return temperament;
  });

  return translatedTemperaments.join(', ');
};

/**
 * Obtiene todos los temperamentos disponibles en español
 * @returns {Array} - Array con todos los temperamentos en español
 */
export const getSpanishTemperaments = () => {
  return Object.values(temperamentMap).sort();
};

/**
 * Obtiene todos los temperamentos disponibles en inglés
 * @returns {Array} - Array con todos los temperamentos en inglés
 */
export const getEnglishTemperaments = () => {
  return Object.keys(temperamentMap).sort();
};

/**
 * Verifica si un temperamento tiene traducción disponible
 * @param {string} temperament - Temperamento a verificar
 * @returns {boolean} - True si tiene traducción
 */
export const hasTranslation = (temperament) => {
  if (!temperament) return false;
  return temperamentMap[temperament] !== undefined ||
         Object.keys(temperamentMap).some(key => 
           key.toLowerCase() === temperament.toLowerCase()
         );
};

export default temperamentMap;