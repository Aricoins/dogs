// Mapeo completo de temperamentos de inglés a español
// Basado en todos los 124 temperamentos únicos de la API de TheDogAPI
const temperamentMap = {
  // A
  'Active': 'Activo',
  'Adaptable': 'Adaptable',
  'Adventurous': 'Aventurero',
  'Affectionate': 'Cariñoso',
  'Aggressive': 'Agresivo',
  'Agile': 'Ágil',
  'Alert': 'Alerta',
  'Aloof': 'Distante',
  'Amiable': 'Amable',
  'Assertive': 'Asertivo',
  'Athletic': 'Atlético',
  'Attentive': 'Atento',
  
  // B
  'Benevolent': 'Benevolente',
  'Boisterous': 'Bullicioso',
  'Bold': 'Audaz',
  'Bossy': 'Dominante',
  'Brave': 'Valiente',
  'Bright': 'Brillante',
  'Bubbly': 'Burbujeante',
  
  // C
  'Calm': 'Tranquilo',
  'Cat-like': 'Felino',
  'Cautious': 'Cauteloso',
  'Charming': 'Encantador',
  'Cheerful': 'Alegre',
  'Clever': 'Astuto',
  'Clownish': 'Payaso',
  'Companionable': 'Compañero',
  'Composed': 'Sereno',
  'Confident': 'Confiado',
  'Cooperative': 'Cooperativo',
  'Courageous': 'Valiente',
  'Cunning': 'Astuto',
  'Curious': 'Curioso',
  
  // D
  'Determined': 'Determinado',
  'Devoted': 'Devoto',
  'Dignified': 'Digno',
  'Diligent': 'Diligente',
  'Docile': 'Dócil',
  'Dominant': 'Dominante',
  'Dutiful': 'Cumplidor',
  
  // E
  'Eager': 'Ansioso',
  'Easygoing': 'Relajado',
  'Energetic': 'Enérgico',
  'Even tempered': 'Temperamento Equilibrado',
  'Excitable': 'Excitable',
  'Extroverted': 'Extrovertido',
  
  // F
  'Faithful': 'Fiel',
  'Familial': 'Familiar',
  'Fast': 'Rápido',
  'Fearless': 'Intrépido',
  'Feisty': 'Luchador',
  'Fierce': 'Feroz',
  'Friendly': 'Amigable',
  'Fun-loving': 'Divertido',
  
  // G
  'Gay': 'Alegre',
  'Generous': 'Generoso',
  'Gentle': 'Gentil',
  'Good-natured': 'Bondadoso',
  'Good-tempered': 'Buen Temperamento',
  'Great-hearted': 'Gran Corazón',
  
  // H
  'Happy': 'Feliz',
  'Hard-working': 'Trabajador',
  'Hardworking': 'Trabajador',
  'Hardy': 'Resistente',
  
  // I
  'Independent': 'Independiente',
  'Inquisitive': 'Inquisitivo',
  'Intelligent': 'Inteligente',
  
  // J
  'Joyful': 'Gozoso',
  
  // K
  'Keen': 'Entusiasta',
  'Kind': 'Amable',
  
  // L
  'Lively': 'Vivaz',
  'Lovable': 'Adorable',
  'Loving': 'Amoroso',
  'Loyal': 'Leal',
  
  // M
  'Merry': 'Jovial',
  'Mischievous': 'Travieso',
  
  // O
  'Obedient': 'Obediente',
  'Opinionated': 'Terco',
  'Outgoing': 'Extrovertido',
  
  // P
  'Patient': 'Paciente',
  'People-oriented': 'Orientado a las Personas',
  'Playful': 'Juguetón',
  'Powerful': 'Poderoso',
  'Protective': 'Protector',
  'Proud': 'Orgulloso',
  
  // Q
  'Quick': 'Rápido',
  'Quiet': 'Silencioso',
  
  // R
  'Rational': 'Racional',
  'Receptive': 'Receptivo',
  'Refined': 'Refinado',
  'Reliable': 'Confiable',
  'Reserved': 'Reservado',
  'Respectful': 'Respetuoso',
  'Responsible': 'Responsable',
  'Responsive': 'Receptivo',
  'Rugged': 'Robusto',
  
  // S
  'Self-assured': 'Seguro de sí mismo',
  'Self-confidence': 'Confianza en sí mismo',
  'Self-important': 'Presumido',
  'Sensitive': 'Sensible',
  'Sociable': 'Sociable',
  'Spirited': 'Animado',
  'Spunky': 'Vivaz',
  'Stable': 'Estable',
  'Steady': 'Constante',
  'Strong': 'Fuerte',
  'Strong willed': 'Voluntarioso',
  'Stubborn': 'Terco',
  'Sturdy': 'Robusto',
  'Suspicious': 'Desconfiado',
  'Sweet-tempered': 'Dulce',
  
  // T
  'Tenacious': 'Tenaz',
  'Territorial': 'Territorial',
  'Thoughtful': 'Reflexivo',
  'Tolerant': 'Tolerante',
  'Trainable': 'Entrenable',
  'Trusting': 'Confiado',
  'Trustworthy': 'Confiable',
  
  // U
  'Unflappable': 'Imperturbable',
  
  // V
  'Vigilant': 'Vigilante',
  'Vocal': 'Vocal',
  
  // W
  'Watchful': 'Vigilante',
  'Wild': 'Salvaje',
  'Willful': 'Obstinado'
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

/**
 * Traduce de español a inglés (traducción inversa)
 * @param {string} spanishTemperament - Temperamento en español
 * @returns {string} - Temperamento en inglés o el original si no se encuentra
 */
export const translateToEnglish = (spanishTemperament) => {
  if (!spanishTemperament) return '';
  
  // Crear mapeo inverso en tiempo de ejecución
  const reverseMap = Object.fromEntries(
    Object.entries(temperamentMap).map(([english, spanish]) => [spanish, english])
  );
  
  return reverseMap[spanishTemperament] || spanishTemperament;
};

/**
 * Obtiene temperamentos para el formulario (en español para mostrar, en inglés como valor)
 * @param {Array} englishTemperaments - Array de temperamentos en inglés de la API
 * @returns {Array} - Array de objetos {display: 'español', value: 'english'}
 */
export const getTemperamentsForForm = (englishTemperaments) => {
  return englishTemperaments
    .map(temp => ({
      display: translateTemperaments(temp.name || temp), // Para mostrar
      value: temp.name || temp, // Para enviar al backend
      id: temp.id || temp.ID
    }))
    .sort((a, b) => a.display.localeCompare(b.display));
};

export default temperamentMap;