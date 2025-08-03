
const nombreRegex = /^[^\d]+$/; // El nombre no puede incluir números
const urlRegex = /^(ftp|http|https):\/\/[^\s]+$/; // Valida las URL que comienzan con ftp, http, o https, seguido por ://, y luego cualquier caracter que no sea un espacio en blanco
const digito = /^\d+$/;  // Valida que el campo contenga solo números
const alturaMinima = 10;
const alturaMaxima = 2000;
const pesoMinimo = 1;
const pesoMaximo = 500;

const validation = (form, setErrors, errors) =>{

if (!urlRegex.test(form.imagen)) setErrors({ ...errors, imagen: "Debe ser una url / ftp, http, o https"});
   else setErrors({ ...errors, imagen: ""});
 if(!nombreRegex.test(form.nombre)) setErrors({ ...errors, nombre: "No incluyas números"});
 else  setErrors({ ...errors, nombre: ""});
 if (digito.test(form.altura)) setErrors({ ...errors, altura: ""});
  else  setErrors({ ...errors, altura: "Un número para los centímetros"});
  if (digito.test(form.altura)) {
    const alturaNum = parseInt(form.altura);
    if (alturaNum < alturaMinima || alturaNum > alturaMaxima) {
      setErrors({ ...errors, altura: `La altura debe estar entre ${alturaMinima} y ${alturaMaxima} centímetros` });
    } else {
      setErrors({ ...errors, altura: "" });
    }
  } else {
    setErrors({ ...errors, altura: "Ingresa un número para la altura en centímetros" });
  }

   if (digito.test(form.peso)) {
     const pesoNum = parseInt(form.peso);
    if (pesoNum < pesoMinimo || pesoNum > pesoMaximo) {
      setErrors({ ...errors, peso: `El peso debe estar entre ${pesoMinimo} y ${pesoMaximo} kilogramos` });
    } else {
      setErrors({ ...errors, peso: "" });
    }
  } else {
    setErrors({ ...errors, peso: "Ingresa un número para el peso en kilogramos" });
  }

  if (!digito.test(form.anios) || parseInt(form.anios) <= 0) {
    setErrors({ ...errors, anios: "Ingresa un número válido de años de vida" });
  } else {
    setErrors({ ...errors, anios: "" });
  }

  if (!form.temperament || form.temperament.length === 0) {
    setErrors({ ...errors, temperament: "Ingresa al menos un temperamento" });
  } else {
    setErrors({ ...errors, temperament: "" });
  }
};
export default validation