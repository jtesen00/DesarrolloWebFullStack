import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CabeceraPagina from "../componentes/CabeceraPagina.jsx";
import BloqueLateral from "../componentes/BloqueLateral.jsx";
import Saludo from "../componentes/Saludo.jsx";
import { CURSOS } from "../datos/cursos.js";

/* Título de un curso del catálogo a partir de su id: así la recomendación
   nunca queda desfasada si el catálogo cambia el nombre de un curso. */
const tituloDe = (id) => CURSOS.find((curso) => curso.id === id).titulo;

/* Catálogo de recomendaciones según área e inicio o experiencia. */
const CURSOS_ASESOR = {
  "desarrollo-web": { inicial: tituloDe("frontend"), avanzado: tituloDe("react") },
  "datos-ia": { inicial: tituloDe("datos"), avanzado: tituloDe("python") },
  diseno: { inicial: tituloDe("ux-ui"), avanzado: tituloDe("usabilidad") },
  negocios: { inicial: tituloDe("marketing"), avanzado: tituloDe("finanzas") },
};

/* Ritmo estimado de dedicación semanal. */
const RITMO_ASESOR = {
  poco: "unas 8 semanas, dedicándole menos de 3 horas por semana",
  medio: "unas 5 semanas, dedicándole de 3 a 6 horas por semana",
  mucho: "unas 3 semanas, dedicándole más de 6 horas por semana",
};

/* Lista ordenada de los nombres de los seis grupos de preguntas. */
const CAMPOS_PREGUNTAS = ["p1", "p2", "p3", "p4", "p5", "objetivo"];

/* Traduce el estado de validez del campo de nombre a un mensaje en español. */
function validarNombre(input) {
  if (!input) return "";
  const estado = input.validity;
  if (estado.valueMissing) return "Escribe tu nombre para personalizar la ruta.";
  if (estado.tooShort) return "El nombre debe tener al menos " + input.minLength + " letras.";
  if (estado.patternMismatch) return "Empieza con una letra y usa solo letras, espacios, apóstrofo o guion.";
  return "";
}

/* Genera el texto resumen de campos pendientes bajo el botón de envío. */
function construirAviso(faltantes, nombreValido) {
  const pendientes = [];
  if (faltantes.length === 1) pendientes.push("la pregunta " + faltantes[0]);
  if (faltantes.length > 1) pendientes.push("las preguntas " + faltantes.join(", "));
  if (!nombreValido) pendientes.push("tu nombre");

  if (pendientes.length === 0) {
    return {
      texto: "Todo completo. Pulsa «Ver mi ruta completa».",
      esError: false,
    };
  }
  return {
    texto: "Te falta completar " + pendientes.join(" y ") + ".",
    esError: true,
  };
}

export default function AsesorVirtual() {
  const [respuestas, setRespuestas] = useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    objetivo: "",
  });
  const [nombre, setNombre] = useState("");
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [preguntasFaltantes, setPreguntasFaltantes] = useState([]);
  const [errorNombre, setErrorNombre] = useState("");
  const [aviso, setAviso] = useState("");
  const [avisoError, setAvisoError] = useState(false);
  const [rutaCalculada, setRutaCalculada] = useState(null);

  const refFormulario = useRef(null);
  const refNombre = useRef(null);

  function alCambiarRadio(evento) {
    const { name, value } = evento.target;
    const nuevasRespuestas = { ...respuestas, [name]: value };
    setRespuestas(nuevasRespuestas);

    // Se retira la advertencia visual del grupo en cuanto se responde.
    const numeroPregunta = CAMPOS_PREGUNTAS.indexOf(name) + 1;
    const nuevasFaltantes = preguntasFaltantes.filter((num) => num !== numeroPregunta);
    setPreguntasFaltantes(nuevasFaltantes);

    // Actualiza en tiempo real los mensajes solo si ya se intentó enviar.
    if (intentoEnvio) {
      const errorNom = validarNombre(refNombre.current);
      const nombreValido = errorNom === "";
      const resultadoAviso = construirAviso(nuevasFaltantes, nombreValido);
      setAviso(resultadoAviso.texto);
      setAvisoError(resultadoAviso.esError);
    }
  }

  function alCambiarNombre(evento) {
    const nuevoNombre = evento.target.value;
    setNombre(nuevoNombre);

    // Con cada tecla se actualiza el error del nombre tras el primer envío.
    if (intentoEnvio) {
      const errorNom = validarNombre(evento.target);
      setErrorNombre(errorNom);
      const nombreValido = errorNom === "";
      const resultadoAviso = construirAviso(preguntasFaltantes, nombreValido);
      setAviso(resultadoAviso.texto);
      setAvisoError(resultadoAviso.esError);
    }
  }

  function alEnviar(evento) {
    evento.preventDefault();
    setIntentoEnvio(true);

    // Revisar qué preguntas faltan responder de las seis.
    const faltantes = [];
    CAMPOS_PREGUNTAS.forEach((campo, indice) => {
      if (!respuestas[campo]) {
        faltantes.push(indice + 1);
      }
    });
    setPreguntasFaltantes(faltantes);

    // Validar el campo de texto con la Constraint Validation API.
    const errorNom = validarNombre(refNombre.current);
    setErrorNombre(errorNom);
    const nombreValido = errorNom === "";

    // Si existen campos pendientes, mostrar advertencias y enfocar el primero inválido.
    if (faltantes.length > 0 || !nombreValido) {
      const resultadoAviso = construirAviso(faltantes, nombreValido);
      setAviso(resultadoAviso.texto);
      setAvisoError(resultadoAviso.esError);
      setRutaCalculada(null);

      // :invalid es marcado por el navegador según required, minlength y pattern.
      refFormulario.current?.querySelector(":invalid")?.focus();
      return;
    }

    // Validación exitosa: calcular y exhibir la ruta.
    setAviso("Listo: cruzamos tus seis respuestas.");
    setAvisoError(false);

    const area = CURSOS_ASESOR[respuestas.p1];
    const curso = respuestas.p3 === "experiencia" ? area.avanzado : area.inicial;
    const ritmo = RITMO_ASESOR[respuestas.p2];

    setRutaCalculada({
      nombre: nombre.trim(),
      curso,
      ritmo,
    });
  }

  return (
    <div className="contenedor disposicion">
      <main id="contenido" className="pagina pagina--en-rejilla">
        <CabeceraPagina titulo="Asesor virtual de ruta de aprendizaje" miga="Asesor virtual">
          Seis preguntas sobre tus intereses, tu tiempo disponible y tu objetivo. La última te muestra
          una recomendación apenas la respondes; cuando las hayas contestado todas y nos digas tu nombre,
          el botón del final cruza las seis y te propone una ruta con curso y ritmo de estudio.
        </CabeceraPagina>

        <div className="pagina__contenido">
        <form
          ref={refFormulario}
          className="test"
          id="form-asesor"
          aria-label="Test del asesor virtual"
          noValidate
          onSubmit={alEnviar}
        >
          <div
            className={`test__pregunta${preguntasFaltantes.includes(1) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p1-titulo"
          >
            <h2 className="test__titulo" id="p1-titulo">1. ¿Qué área te interesa más?</h2>
            <div className="test__opciones">
              <label>
                <input
                  type="radio"
                  name="p1"
                  value="desarrollo-web"
                  checked={respuestas.p1 === "desarrollo-web"}
                  onChange={alCambiarRadio}
                  required
                />{" "}
                Desarrollo web
              </label>
              <label>
                <input
                  type="radio"
                  name="p1"
                  value="datos-ia"
                  checked={respuestas.p1 === "datos-ia"}
                  onChange={alCambiarRadio}
                />{" "}
                Datos e inteligencia artificial
              </label>
              <label>
                <input
                  type="radio"
                  name="p1"
                  value="diseno"
                  checked={respuestas.p1 === "diseno"}
                  onChange={alCambiarRadio}
                />{" "}
                Diseño
              </label>
              <label>
                <input
                  type="radio"
                  name="p1"
                  value="negocios"
                  checked={respuestas.p1 === "negocios"}
                  onChange={alCambiarRadio}
                />{" "}
                Negocios digitales
              </label>
            </div>
          </div>

          <div
            className={`test__pregunta${preguntasFaltantes.includes(2) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p2-titulo"
          >
            <h2 className="test__titulo" id="p2-titulo">2. ¿Cuánto tiempo puedes dedicar por semana?</h2>
            <div className="test__opciones">
              <label>
                <input
                  type="radio"
                  name="p2"
                  value="poco"
                  checked={respuestas.p2 === "poco"}
                  onChange={alCambiarRadio}
                  required
                />{" "}
                Menos de 3 horas
              </label>
              <label>
                <input
                  type="radio"
                  name="p2"
                  value="medio"
                  checked={respuestas.p2 === "medio"}
                  onChange={alCambiarRadio}
                />{" "}
                Entre 3 y 6 horas
              </label>
              <label>
                <input
                  type="radio"
                  name="p2"
                  value="mucho"
                  checked={respuestas.p2 === "mucho"}
                  onChange={alCambiarRadio}
                />{" "}
                Más de 6 horas
              </label>
            </div>
          </div>

          <div
            className={`test__pregunta${preguntasFaltantes.includes(3) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p3-titulo"
          >
            <h2 className="test__titulo" id="p3-titulo">3. ¿Cuál es tu nivel actual?</h2>
            <div className="test__opciones">
              <label>
                <input
                  type="radio"
                  name="p3"
                  value="cero"
                  checked={respuestas.p3 === "cero"}
                  onChange={alCambiarRadio}
                  required
                />{" "}
                Nunca programé ni diseñé nada
              </label>
              <label>
                <input
                  type="radio"
                  name="p3"
                  value="basico"
                  checked={respuestas.p3 === "basico"}
                  onChange={alCambiarRadio}
                />{" "}
                Ya sé lo básico
              </label>
              <label>
                <input
                  type="radio"
                  name="p3"
                  value="experiencia"
                  checked={respuestas.p3 === "experiencia"}
                  onChange={alCambiarRadio}
                />{" "}
                Tengo experiencia previa
              </label>
            </div>
          </div>

          <div
            className={`test__pregunta${preguntasFaltantes.includes(4) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p4-titulo"
          >
            <h2 className="test__titulo" id="p4-titulo">4. ¿Cómo prefieres aprender?</h2>
            <div className="test__opciones">
              <label>
                <input
                  type="radio"
                  name="p4"
                  value="teoria"
                  checked={respuestas.p4 === "teoria"}
                  onChange={alCambiarRadio}
                  required
                />{" "}
                Con la teoría primero
              </label>
              <label>
                <input
                  type="radio"
                  name="p4"
                  value="practica"
                  checked={respuestas.p4 === "practica"}
                  onChange={alCambiarRadio}
                />{" "}
                Con proyectos prácticos desde el inicio
              </label>
            </div>
          </div>

          <div
            className={`test__pregunta${preguntasFaltantes.includes(5) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p5-titulo"
          >
            <h2 className="test__titulo" id="p5-titulo">5. ¿Qué certificación buscas?</h2>
            <div className="test__opciones">
              <label>
                <input
                  type="radio"
                  name="p5"
                  value="constancia"
                  checked={respuestas.p5 === "constancia"}
                  onChange={alCambiarRadio}
                  required
                />{" "}
                Constancia de horas
              </label>
              <label>
                <input
                  type="radio"
                  name="p5"
                  value="certificado"
                  checked={respuestas.p5 === "certificado"}
                  onChange={alCambiarRadio}
                />{" "}
                Certificado digital verificable
              </label>
              <label>
                <input
                  type="radio"
                  name="p5"
                  value="ambas"
                  checked={respuestas.p5 === "ambas"}
                  onChange={alCambiarRadio}
                />{" "}
                Ambas
              </label>
            </div>
          </div>

          <div
            className={`test__final${preguntasFaltantes.includes(6) ? " test__grupo--falta" : ""}`}
            role="group"
            aria-labelledby="p6-titulo"
          >
            <h2 className="test__titulo" id="p6-titulo">6. ¿Cuál es tu objetivo principal ahora mismo?</h2>
            <div className="test__opciones">
              <div className="test__opcion">
                <input
                  type="radio"
                  name="objetivo"
                  value="empleo"
                  id="obj-empleo"
                  checked={respuestas.objetivo === "empleo"}
                  onChange={alCambiarRadio}
                  required
                />
                <label htmlFor="obj-empleo">Conseguir mi primer empleo en tecnología</label>
              </div>
              <div className="test__opcion">
                <input
                  type="radio"
                  name="objetivo"
                  value="mejora"
                  id="obj-mejora"
                  checked={respuestas.objetivo === "mejora"}
                  onChange={alCambiarRadio}
                />
                <label htmlFor="obj-mejora">Mejorar en mi trabajo actual</label>
              </div>
              <div className="test__opcion">
                <input
                  type="radio"
                  name="objetivo"
                  value="emprender"
                  id="obj-emprender"
                  checked={respuestas.objetivo === "emprender"}
                  onChange={alCambiarRadio}
                />
                <label htmlFor="obj-emprender">Emprender mi propio proyecto</label>
              </div>
              <div className="test__opcion">
                <input
                  type="radio"
                  name="objetivo"
                  value="curiosidad"
                  id="obj-curiosidad"
                  checked={respuestas.objetivo === "curiosidad"}
                  onChange={alCambiarRadio}
                />
                <label htmlFor="obj-curiosidad">Aprender por curiosidad, sin apuro</label>
              </div>
            </div>
          </div>

          <div className="test__dato">
            <label className="test__etiqueta" htmlFor="nombre-asesor">
              Por último, ¿cómo te llamas?
            </label>
            <p className="test__ayuda" id="nombre-ayuda">
              Solo lo usamos para escribirte la ruta en esta página. No se envía a ningún lado.
            </p>
            <input
              ref={refNombre}
              className="test__campo"
              type="text"
              id="nombre-asesor"
              name="nombre"
              value={nombre}
              onChange={alCambiarNombre}
              required
              minLength={2}
              maxLength={40}
              pattern="\p{L}[\p{L} '\-]*"
              autoComplete="given-name"
              aria-describedby="nombre-ayuda nombre-error"
              aria-invalid={errorNombre !== "" ? "true" : "false"}
            />
            <p className="test__error" id="nombre-error">{errorNombre}</p>
          </div>

          <div className="test__accion">
            <button type="submit" className="boton boton--primario boton--flecha boton--grande" id="ver-ruta">
              Ver mi ruta completa
            </button>
            <p
              className={`test__aviso-validacion${avisoError ? " test__aviso-validacion--error" : ""}`}
              id="aviso-ruta"
              role="status"
            >
              {aviso}
            </p>
          </div>
        </form>
        </div>
      </main>

      <aside className="lateral" aria-label="Tu recomendación">
        <div className="lateral__bloque lateral__bloque--fijo lateral__bloque--recomendacion">
          <h2 className="lateral__titulo">Tu recomendación</h2>

          <p className="lateral__texto test__aviso">
            Responde la pregunta 6 y tu ruta aparece aquí mismo, sin recargar la página.
          </p>

          <div className="test__resultados" hidden={Boolean(rutaCalculada)}>
            <p className="test__resultado" id="resultado-empleo">
              Tu ruta: empieza con <strong>Frontend con HTML5, CSS3 y JavaScript</strong> y sigue con{" "}
              <strong>React desde cero</strong> — es la combinación que más piden las vacantes junior.
            </p>
            <p className="test__resultado" id="resultado-mejora">
              Tu ruta: un curso intermedio como <strong>React desde cero</strong> o{" "}
              <strong>Fundamentos de análisis de datos</strong>, según el área en la que ya trabajas.
            </p>
            <p className="test__resultado" id="resultado-emprender">
              Tu ruta: <strong>Marketing digital para emprendedores</strong> primero, y{" "}
              <strong>Frontend con HTML5, CSS3 y JavaScript</strong> para poder construir tu propia página.
            </p>
            <p className="test__resultado" id="resultado-curiosidad">
              Tu ruta: sin apuro, empieza por una <Link to="/clase-muestra">clase muestra gratis</Link>{" "}
              y decide desde ahí qué curso completo te interesa más.
            </p>
          </div>

          {/* <div> y no <p>: Saludo ya trae su propio párrafo. */}
          <div className="test__ruta" id="ruta-completa" hidden={!rutaCalculada}>
            {rutaCalculada && (
              <>
                <Saludo nombre={rutaCalculada.nombre} mensaje="Esta es tu ruta:" />
                <p className="test__ruta-texto">
                  Empieza por <strong>{rutaCalculada.curso}</strong>. Al ritmo que indicaste, te llevaría {rutaCalculada.ritmo}.
                </p>
              </>
            )}
          </div>
        </div>

        <BloqueLateral titulo="Cómo funciona">
          <p className="lateral__texto">
            La sexta pregunta calcula una recomendación al instante con el selector CSS{" "}
            <strong>:has()</strong>, sin JavaScript. El botón del final va más allá: comprueba
            que hayas respondido las seis y cruza área, nivel y tiempo disponible para proponerte un ritmo.
          </p>
        </BloqueLateral>
      </aside>
    </div>
  );
}
