# Fotografía directa · Presentación interactiva

**▶ Ver la presentación: https://whafonsecav.github.io/Fotografia_Directa/**

Presentación animada sobre la **fotografía directa** (*straight photography*): la fotografía que muestra el mundo tal como es, nítida, real y sin trucos. Está pensada como un juego de 5 niveles, con explicaciones simples, ejemplos reales y animaciones paso a paso.

| | |
|---|---|
| **Materia** | Taller de Fotografía |
| **Docente** | Cristian Fuentes |
| **Estudiantes** | William Fonseca, Mariana Silva, Karen Montoya, Paula Gutiérrez |
| **Institución** | Politécnico Grancolombiano · Sede Bogotá · Modalidad nocturna presencial, sábados AM |

---

## Cómo usarla

1. Abre el link con **Chrome o Edge** en un computador. Se ve en pantalla completa, en formato 16:9.
2. Elige un modo:
   - **Presentar paso a paso** (para exponer en clase). No tiene voz: cada lámina se arma rápido, sin esperas en blanco, y tú decides cuándo pasar con la flecha →. Abajo, en el pie de página, aparece la frase de cada paso como apoyo.
   - **Reproducir como video**: la presentación completa (unos 12 minutos) con narrador, música y subtítulos, al ritmo original.
3. Las cuentas regresivas (3, 2, 1) siempre van a velocidad real.

| Tecla | Acción |
|---|---|
| `→` · `Espacio` · `Enter` · `Clic` | Siguiente paso. Si la animación aún corre, la termina al instante. |
| `←` · `Retroceso` · `Clic derecho` | Paso anterior |
| `Inicio` · `Fin` | Primer o último paso |
| `R` | Repetir la escena actual |
| `C` | Mostrar u ocultar subtítulos |
| `N` | Voz del narrador en el modo paso a paso (con voz, todo va al ritmo del narrador a 1,15×) |
| `S` | Efectos de sonido |
| `V` | Modo video. `Espacio` pausa y `Esc` vuelve al modo paso a paso. |
| `F` | Pantalla completa |
| `H` | Ayuda |

## Contenido (93 pasos)

0. **Gancho:** «¿Cuál es la foto real?», con cuenta regresiva de 3 segundos. Luego la portada y el mapa de los 5 niveles.
1. **Nivel 1 · ¿Qué es?** La definición en palabras simples, las 3 reglas (nítida, real, sin trucos) y la comparación con el celular (#SinFiltro).
2. **Nivel 2 · ¿Cómo nació?** El problema de 1904 (fotos «disfrazadas» de pintura) y el consejo de Sadakichi Hartmann.
3. **Nivel 3 · Los protagonistas**, como cartas de personaje: Alfred Stieglitz, Paul Strand, Edward Weston, el Grupo f/64 (y qué significa f/64), Ansel Adams (la escalera de grises) e Imogen Cunningham.
4. **Nivel 4 · ¿Cómo se hace?** 7 pasos para hacer fotografía directa con tu celular.
5. **Nivel 5 · ¿Cómo reconocerla?** 4 preguntas, un ejemplo resuelto y un reto final.
6. **Cierre:** resumen en 10 segundos, «¡Te toca!», gracias y referencias en APA 7.ª edición.

## Qué hay en este repositorio

| Ruta | Contenido |
|---|---|
| `index.html` · `assets/` | La presentación: HTML, CSS, JavaScript (GSAP), imágenes, tipografías, voz, efectos y música. Funciona sin servidor ni internet: también se puede descargar y abrir `index.html` desde una USB. |
| `documentos/guion_narrado.md` | El guion completo, paso a paso, con los tiempos del video. |
| `documentos/guion.json` | El mismo guion en formato de datos (texto en pantalla y texto para la voz). |
| `documentos/referencias_APA.md` | Las referencias en APA 7.ª edición y los créditos de las imágenes. |
| `documentos/investigacion_fotografia_directa.md` | La investigación verificada que sustenta el contenido, con el nivel de confianza de cada dato. |
| `documentos/creditos_imagenes.md` | El origen, el autor y la licencia de cada imagen. |

El video final (MP4 Full HD, 12:19) no está en el repositorio porque pesa 725 MB y GitHub no acepta archivos de más de 100 MB. El modo **Reproducir como video** muestra exactamente el mismo contenido.

## Créditos y licencias

- **Imágenes:** fotografías de dominio público o con licencia libre (Wikimedia Commons, The Metropolitan Museum of Art, National Archives y Library of Congress). El detalle está en `documentos/creditos_imagenes.md`. Las versiones «con filtro» que aparecen en el juego son alteraciones digitales hechas solo como ejemplo didáctico; no son obras originales. El recorte de Imogen Cunningham parte de su retrato de graduación de 1907 (Edward Curtis Studio); la punta derecha del birrete, que quedaba fuera del encuadre original, se completó digitalmente.
- **Voz:** narrador sintético en español latino (Microsoft Neural, *es-MX-Jorge*).
- **Música y efectos de sonido:** originales, sintetizados para este proyecto.
- **Tipografías:** Anton, Bodoni Moda, Inter e IBM Plex Mono (SIL Open Font License).
- **Animación:** [GSAP](https://gsap.com/).
- **Logo:** Politécnico Grancolombiano, Institución Universitaria, con uso institucional académico.

Trabajo académico del Taller de Fotografía, Politécnico Grancolombiano.
