<?php
/**
 * Spanish translation of the admin screen.
 *
 * The PHP translation format WordPress 6.5 added, rather than a compiled .mo:
 * it is readable, diffable in a pull request, and needs no gettext tooling to
 * contribute to.
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

return array(
	'domain'       => 'a11y-prefs',
	'plural-forms' => 'nplurals=2; plural=(n != 1);',
	'language'     => 'es_ES',
	'messages'     => array(
		'Accessibility'                     => 'Accesibilidad',
		'Accessibility panel'               => 'Panel de accesibilidad',
		'Visitors choose how they want to read your site. Their choice stays in their own browser.' => 'Los visitantes eligen cómo quieren leer tu sitio. Su elección se queda en su propio navegador.',
		'Save changes'                      => 'Guardar cambios',
		'Settings'                          => 'Ajustes',

		// Secciones.
		'Placement'                         => 'Ubicación',
		'Look'                              => 'Aspecto',
		'Preferences offered'               => 'Preferencias ofrecidas',

		// Ubicación.
		'Position'                          => 'Posición',
		'Top left'                          => 'Arriba a la izquierda',
		'Top right'                         => 'Arriba a la derecha',
		'Middle left'                       => 'Centro izquierda',
		'Middle right'                      => 'Centro derecha',
		'Bottom left'                       => 'Abajo a la izquierda',
		'Bottom right'                      => 'Abajo a la derecha',
		'Distance from the edges'           => 'Distancia a los bordes',
		'The middle box sets all four edges. The outer ones override a single edge each, and the two that apply to the chosen position are highlighted. A bare number is read as pixels.' => 'La casilla del centro fija los cuatro bordes. Las de alrededor sobrescriben uno cada una, y se resaltan las dos que se aplican a la posición elegida. Un número sin unidad se interpreta como píxeles.',
		'Top'                               => 'Arriba',
		'Right'                             => 'Derecha',
		'Bottom'                            => 'Abajo',
		'Left'                              => 'Izquierda',
		'All'                               => 'Todos',
		'auto'                              => 'auto',

		// Aspecto.
		'Shape'                             => 'Forma',
		'Circle'                            => 'Círculo',
		'Rounded square'                    => 'Cuadrado redondeado',
		'Square'                            => 'Cuadrado',
		'Pill with label'                   => 'Píldora con etiqueta',
		'Size'                              => 'Tamaño',
		'Small (44px)'                      => 'Pequeño (44px)',
		'Medium (52px)'                     => 'Mediano (52px)',
		'Large (62px)'                      => 'Grande (62px)',
		'Icon'                              => 'Icono',
		'Universal access'                  => 'Acceso universal',
		'Person'                            => 'Persona',
		'Eye'                               => 'Ojo',
		'Wheelchair'                        => 'Silla de ruedas',
		'Corner radius'                     => 'Radio de las esquinas',
		'Each corner overrides the shape on its own. Leave them empty to keep the shape.' => 'Cada esquina sobrescribe la forma por su cuenta. Déjalas vacías para conservar la forma.',
		'shape'                             => 'forma',
		'Accent colour'                     => 'Color de acento',
		'Text on top switches between black and white on its own, so contrast holds.' => 'El texto encima cambia solo entre blanco y negro, así que el contraste se mantiene.',
		'Button label'                      => 'Etiqueta del botón',
		'Accessibility options'             => 'Opciones de accesibilidad',
		'Shown by the pill shape only. Empty uses the translated default.' => 'Solo la muestra la forma de píldora. Vacío usa el valor traducido por defecto.',

		// Ajustes del panel.
		'Language'                          => 'Idioma',
		'Follow the site language'          => 'Seguir el idioma del sitio',
		'English'                           => 'Inglés',
		'Spanish'                           => 'Español',
		'Italian'                           => 'Italiano',
		'Accessibility statement'           => 'Declaración de accesibilidad',
		'Linked at the foot of the panel. Left out entirely when empty.' => 'Se enlaza al pie del panel. Si está vacío, no aparece.',
		'z-index'                           => 'z-index',
		'Only worth touching if something covers the button.' => 'Solo merece la pena tocarlo si algo tapa el botón.',
		'A page on your site saying how accessible it is: the standard you aim for, what you know is still broken, and how someone can report a problem or reach a human.' => 'Una página de tu sitio que dice cómo de accesible es: el estándar al que aspiras, qué sabes que sigue roto, y cómo alguien puede avisarte de un problema o hablar con una persona.',
		'Worth having even if nobody obliges you: the visitor who just turned on high contrast because your site was unreadable is exactly the person who needs a way to tell you. Public sector sites in the EU are required to publish one.' => 'Merece la pena aunque nadie te obligue: quien acaba de activar el alto contraste porque tu sitio era ilegible es justo la persona que necesita cómo decírtelo. En la UE, los sitios del sector público están obligados a publicarla.',
		'No statement yet? %s builds one from a short questionnaire.' => '¿Aún no tienes una? %s la genera a partir de un cuestionario corto.',
		'The W3C generator'                 => 'El generador del W3C',
		'Left out of the panel entirely when this is empty.' => 'Si esto queda vacío, no aparece en el panel.',
		'a11y-prefs'                        => 'a11y-prefs',
		'Free software under the MIT licence. The source is public, and so is every issue: read it, fork it, or tell us what is broken.' => 'Software libre con licencia MIT. El código es público y las incidencias también: léelo, bifúrcalo, o cuéntanos qué falla.',
		'Source on GitHub'                  => 'Código en GitHub',
		'Report a problem'                  => 'Reportar un problema',
		'Rate it on WordPress.org'          => 'Valóralo en WordPress.org',

		// Preferencias.
		'Unchecking every box brings all of them back. Where a preference exists because of a WCAG success criterion, it is linked.' => 'Desmarcar todas las casillas las devuelve todas. Cuando una preferencia existe por un criterio de conformidad WCAG, se enlaza.',
		'None of this replaces fixing your markup. %s is a good place to start.' => 'Nada de esto sustituye a arreglar tu HTML. %s es un buen punto de partida.',
		'The A11Y Project checklist'        => 'La lista de comprobación de The A11Y Project',
		'(opens in a new tab)'              => '(se abre en una pestaña nueva)',

		'Text size'                         => 'Tamaño del texto',
		'Scales everything sized in rem, up to twice the normal size.' => 'Escala todo lo definido en rem, hasta el doble del tamaño normal.',
		'Text spacing'                      => 'Espaciado del texto',
		'Opens up line height and the space between letters and words. Level 2 is exactly what the criterion asks for.' => 'Abre el interlineado y el espacio entre letras y palabras. El nivel 2 es exactamente lo que pide el criterio.',
		'Contrast'                          => 'Contraste',
		'High contrast, inverted or grayscale colours across the page.' => 'Contraste alto, invertido o escala de grises en toda la página.',
		'Dyslexia-friendly font'            => 'Fuente para dislexia',
		'Switches to a typeface with more distinct letterforms. Readers ask for it often, though the research on whether it helps is mixed.' => 'Cambia a una tipografía con letras más diferenciadas. Se pide a menudo, aunque la investigación sobre si ayuda no es concluyente.',
		'Highlight links'                   => 'Resaltar enlaces',
		'Underlines and outlines links, so they are not marked by colour alone.' => 'Subraya y perfila los enlaces, para que no se distingan solo por el color.',
		'Highlight headings'                => 'Resaltar títulos',
		'Outlines every heading, which makes the structure of a page visible at a glance.' => 'Perfila cada encabezado, lo que deja la estructura de la página a la vista.',
		'Visible focus'                     => 'Foco visible',
		'Draws a strong outline around whatever has keyboard focus.' => 'Dibuja un contorno marcado alrededor de lo que tenga el foco del teclado.',
		'Stop animations'                   => 'Detener animaciones',
		'Freezes animations and transitions. The panel already respects prefers-reduced-motion; this is for everyone else.' => 'Congela animaciones y transiciones. El panel ya respeta prefers-reduced-motion; esto es para el resto.',
		'Reading help'                      => 'Ayuda de lectura',
		'A ruler that follows the pointer, or a mask that dims everything except the line being read.' => 'Una regla que sigue al puntero, o una máscara que atenúa todo salvo la línea que se está leyendo.',
		'Big cursor'                        => 'Cursor grande',
		'Enlarges the mouse pointer so it is easier to track.' => 'Agranda el puntero del ratón para seguirlo mejor.',
		'Hide images'                       => 'Ocultar imágenes',
		'Hides images and background images while keeping their space, so the layout does not jump.' => 'Oculta las imágenes y los fondos conservando su hueco, así la maquetación no salta.',
		'Align to start'                    => 'Alinear al inicio',
		'Mark new-tab links'                => 'Marcar enlaces externos',
		'Outline form fields'               => 'Perfilar campos de formulario',
		'Unstick fixed bars'                => 'Soltar barras fijas',
		'High-contrast selection'           => 'Selección de alto contraste',
		'Marks links that open somewhere else, so the jump is not a surprise.' => 'Marca los enlaces que abren en otro sitio, para que el salto no sorprenda.',
		'Outlines inputs and buttons. Themes often give them a border far below the required contrast.' => 'Perfila campos y botones. Muchos temas les ponen un borde muy por debajo del contraste exigido.',
		'Unpins sticky headers and floating bars, which swallow the screen once the text is enlarged. Best effort: CSS cannot select every pinned element.' => 'Suelta cabeceras pegajosas y barras flotantes, que se comen la pantalla al ampliar el texto. Hace lo que puede: CSS no puede seleccionar todos los elementos fijados.',
		'Forces a readable colour on selected text, which custom themes often get wrong.' => 'Fuerza un color legible en el texto seleccionado, algo que los temas suelen fallar.',
		'W3C guidance: Help Users Focus'    => 'Guía del W3C: ayudar a centrar la atención',
		'A11Y Project checklist'            => 'Lista de The A11Y Project',
		'WCAG 1.4.10 Reflow'                => 'WCAG 1.4.10 Reajuste',
		'WCAG 1.4.11 Non-text Contrast'     => 'WCAG 1.4.11 Contraste no textual',
		'Removes centred and justified text, which is harder to read in long passages.' => 'Quita el texto centrado y justificado, más difícil de leer en pasajes largos.',

		// Referencias.
		'WCAG 1.4.1 Use of Color'           => 'WCAG 1.4.1 Uso del color',
		'WCAG 1.4.3 Contrast (Minimum)'     => 'WCAG 1.4.3 Contraste (mínimo)',
		'WCAG 1.4.4 Resize Text'            => 'WCAG 1.4.4 Cambio de tamaño del texto',
		'WCAG 1.4.8 Visual Presentation'    => 'WCAG 1.4.8 Presentación visual',
		'WCAG 1.4.12 Text Spacing'          => 'WCAG 1.4.12 Espaciado del texto',
		'WCAG 2.2.2 Pause, Stop, Hide'      => 'WCAG 2.2.2 Poner en pausa, detener, ocultar',
		'WCAG 2.4.6 Headings and Labels'    => 'WCAG 2.4.6 Encabezados y etiquetas',
		'WCAG 2.4.7 Focus Visible'          => 'WCAG 2.4.7 Foco visible',

		// Vista previa.
		'Live preview'                      => 'Vista previa en vivo',
		'Preview size'                      => 'Tamaño de la vista previa',
		'Desktop'                           => 'Escritorio',
		'Mobile'                            => 'Móvil',
		'Preview of the accessibility panel' => 'Vista previa del panel de accesibilidad',
		'Updates as you edit. Nothing is saved until you press Save changes.' => 'Se actualiza mientras editas. No se guarda nada hasta que pulses Guardar cambios.',
		'The preview needs JavaScript. Every setting still saves without it.' => 'La vista previa necesita JavaScript. Todos los ajustes se guardan igual sin él.',
	),
);
