/**
 * Live preview for the settings screen.
 *
 * The panel is position:fixed, so dropping it straight into wp-admin would
 * float it over the whole screen instead of the preview box. An iframe gives it
 * a real viewport to be fixed inside.
 *
 * The frame is rendered at a full device width and then scaled down to fit the
 * column, rather than being made narrow. Making it narrow was the first attempt
 * and it was wrong: the sidebar is about 420px, so the component's own 600px
 * breakpoint fired in both modes and desktop looked exactly like mobile.
 *
 * srcdoc inherits the parent origin, so the form talks to the element inside
 * the frame directly and there is no postMessage dance.
 */
( function () {
	'use strict';

	var form = document.querySelector( '.a11yp-form' );
	var preview = document.querySelector( '.a11yp-preview' );
	if ( ! form || ! preview ) {
		return;
	}

	var frame = preview.querySelector( '.a11yp-frame' );
	var stage = preview.querySelector( '.a11yp-stage' );
	var scriptUrl = preview.getAttribute( 'data-script' );

	// A narrow desktop rather than a wide one: it is still far above the
	// component's 600px breakpoint, and it scales down less, so the preview
	// stays readable instead of turning into grey mush.
	var DEVICES = {
		desktop: { width: 1024, height: 720 },
		mobile: { width: 390, height: 760 }
	};

	// Kept apart from the visitor-facing key on purpose. See the note where it
	// is applied.
	var PREVIEW_STORAGE_KEY = 'a11y-prefs-admin-preview';

	// Option key -> attribute name on the element.
	var ATTRIBUTES = {
		position: 'position',
		shape: 'shape',
		size: 'size',
		icon: 'icon',
		accent: 'accent',
		label: 'label',
		offset: 'offset',
		offset_top: 'offset-top',
		offset_right: 'offset-right',
		offset_bottom: 'offset-bottom',
		offset_left: 'offset-left',
		radius_top_left: 'radius-top-left',
		radius_top_right: 'radius-top-right',
		radius_bottom_right: 'radius-bottom-right',
		radius_bottom_left: 'radius-bottom-left',
		locale: 'locale',
		statement_url: 'statement-url',
		z_index: 'z-index'
	};

	// Which two edges a position actually uses.
	var EDGES = {
		'top-left': [ 'top', 'left' ],
		'top-right': [ 'top', 'right' ],
		'bottom-left': [ 'bottom', 'left' ],
		'bottom-right': [ 'bottom', 'right' ],
		'middle-left': [ 'left' ],
		'middle-right': [ 'right' ]
	};

	function field( key ) {
		return form.querySelector( '[name="a11y_prefs_options[' + key + ']"]:checked' )
			|| form.querySelector( '[name="a11y_prefs_options[' + key + ']"]' );
	}

	// Same rule the PHP applies on save, so the preview shows what will be
	// stored rather than something that only works after a reload. Only the
	// length fields: z-index is a bare number on purpose.
	var BARE_NUMBER = /^-?\d+(\.\d+)?$/;
	var LENGTHS = [
		'offset', 'offset_top', 'offset_right', 'offset_bottom', 'offset_left',
		'radius_top_left', 'radius_top_right', 'radius_bottom_right', 'radius_bottom_left'
	];

	function valueOf( key ) {
		var input = field( key );
		if ( ! input ) {
			return '';
		}
		var value = String( input.value ).trim();
		if ( value && LENGTHS.indexOf( key ) !== -1 && BARE_NUMBER.test( value ) ) {
			return value + 'px';
		}
		return value;
	}

	/* ------------------------------------------------------------- scale -- */

	function fit() {
		var device = stage.getAttribute( 'data-device' ) || 'desktop';
		var size = DEVICES[ device ] || DEVICES.desktop;
		var available = stage.clientWidth || preview.clientWidth;
		if ( ! available ) {
			return;
		}

		var scale = Math.min( 1, available / size.width );
		var painted = size.width * scale;

		frame.style.width = size.width + 'px';
		frame.style.height = size.height + 'px';
		stage.style.setProperty( '--a11yp-scale', scale );
		// The stage has to shrink with the scaled frame or it leaves a gap.
		stage.style.height = Math.round( size.height * scale ) + 'px';
		// A phone does not fill the stage, so centre it rather than leaving a
		// wide empty strip down the right hand side.
		frame.style.left = Math.max( 0, Math.round( ( available - painted ) / 2 ) ) + 'px';
	}

	/* ----------------------------------------------------------- preview -- */

	// Deliberately colourful. The first version was white with dark text and a
	// single link, which read as a document rather than a website and made the
	// preview look monochrome.
	var SAMPLE = [
		'<!doctype html><html lang="en"><head><meta charset="utf-8">',
		'<meta name="viewport" content="width=device-width, initial-scale=1">',
		'<style>',
		'*{box-sizing:border-box}',
		'body{font:16px/1.6 system-ui,sans-serif;margin:0;color:#1b2030;background:#fdfdff}',
		'header{display:flex;align-items:center;justify-content:space-between;gap:16px;',
		'padding:14px 22px;background:#12203f;color:#fff}',
		'header b{font-size:17px}nav{display:flex;gap:16px;font-size:14px;opacity:.85}',
		'.hero{padding:30px 22px;background:linear-gradient(120deg,#1d4ed8,#7c3aed 55%,#db2777)}',
		'.hero h1{margin:0 0 8px;font-size:30px;color:#fff;line-height:1.15}',
		'.hero p{margin:0 0 16px;color:#e7e9ff;max-width:46ch}',
		'.cta{display:inline-block;padding:10px 20px;border-radius:8px;background:#fbbf24;',
		'color:#3b2708;font-weight:700;text-decoration:none}',
		'main{padding:22px}',
		'.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin:18px 0}',
		'.card{padding:14px;border:1px solid #e2e6f0;border-radius:12px;background:#fff}',
		'.card i{display:block;width:34px;height:34px;border-radius:9px;margin-bottom:9px}',
		'.c1 i{background:#16a34a}.c2 i{background:#ea580c}.c3 i{background:#0891b2}',
		'.card b{display:block;margin-bottom:3px}',
		'.card span{font-size:13.5px;color:#5b6472}',
		'h2{font-size:20px;margin:22px 0 6px}',
		'a{color:#1d4ed8}',
		'.shot{height:120px;border-radius:12px;margin:14px 0;',
		'background:linear-gradient(60deg,#0ea5e9,#22c55e 45%,#facc15)}',
		'.spin{width:32px;height:32px;border-radius:50%;border:4px solid #dfe4ee;',
		'border-top-color:#7c3aed;animation:s 1s linear infinite}',
		'@keyframes s{to{transform:rotate(360deg)}}',
		'footer{padding:18px 22px;margin-top:24px;background:#12203f;color:#aab4cc;font-size:14px}',
		'</style></head><body>',
		'<header><b>Your site</b><nav><span>Home</span><span>Shop</span><span>About</span></nav></header>',
		'<div class="hero"><h1>A page to try the panel on</h1>',
		'<p>Real colours, headings and links, so contrast, spacing and text size ',
		'have something to actually change.</p>',
		'<a class="cta" href="#">Get started</a></div>',
		'<main>',
		'<div class="cards">',
		'<div class="card c1"><i></i><b>Fast</b><span>Some supporting copy.</span></div>',
		'<div class="card c2"><i></i><b>Simple</b><span>Some supporting copy.</span></div>',
		'<div class="card c3"><i></i><b>Open</b><span>Some supporting copy.</span></div>',
		'</div>',
		'<h2>A heading</h2>',
		'<p>A paragraph with <a href="#">a link inside it</a> and enough words to ',
		'show what the spacing settings do to a real block of text.</p>',
		'<div class="shot"></div>',
		'<div class="spin"></div>',
		'</main>',
		'<footer>&copy; Your site</footer>',
		'</body></html>'
	].join( '' );

	var element = null;

	function apply() {
		if ( ! element ) {
			return;
		}

		Object.keys( ATTRIBUTES ).forEach( function ( key ) {
			var attribute = ATTRIBUTES[ key ];
			var value = valueOf( key );
			if ( value ) {
				element.setAttribute( attribute, value );
			} else {
				element.removeAttribute( attribute );
			}
		} );

		var boxes = form.querySelectorAll( '[name="a11y_prefs_options[features][]"]' );
		var checked = [];
		boxes.forEach( function ( box ) {
			if ( box.checked ) {
				checked.push( box.value );
			}
		} );
		// Same rule as the PHP: everything ticked means no restriction.
		if ( checked.length && checked.length !== boxes.length ) {
			element.setAttribute( 'features', checked.join( ',' ) );
		} else {
			element.removeAttribute( 'features' );
		}

		highlightEdges();
	}

	function highlightEdges() {
		var active = EDGES[ valueOf( 'position' ) ] || [];
		form.querySelectorAll( '.a11yp-box-edge' ).forEach( function ( label ) {
			var edge = label.getAttribute( 'data-edge' );
			label.setAttribute( 'data-active', String( active.indexOf( edge ) !== -1 ) );
		} );
	}

	frame.addEventListener( 'load', function () {
		var doc = frame.contentDocument;
		if ( ! doc ) {
			return;
		}

		element = doc.createElement( 'a11y-prefs' );
		// The frame is same-origin, so without its own key the preview would
		// read and write the very localStorage entry real visitors use on this
		// site: clicking around in here changed your own browsing preferences,
		// and a stray grayscale left the whole preview grey for good.
		element.setAttribute( 'storage-key', PREVIEW_STORAGE_KEY );
		doc.body.appendChild( element );

		try {
			doc.defaultView.localStorage.removeItem( PREVIEW_STORAGE_KEY );
		} catch ( error ) {
			// Storage blocked: the component copes on its own.
		}

		var script = doc.createElement( 'script' );
		// Otherwise the component mounts a second element of its own.
		script.setAttribute( 'data-auto', 'false' );
		script.src = scriptUrl;
		script.onload = function () {
			apply();
			stage.setAttribute( 'data-ready', '' );
		};
		doc.body.appendChild( script );
	} );

	fit();
	frame.srcdoc = SAMPLE;
	highlightEdges();

	form.addEventListener( 'change', apply );
	form.addEventListener( 'input', apply );
	window.addEventListener( 'resize', fit );

	preview.querySelectorAll( '.a11yp-devices button' ).forEach( function ( button ) {
		button.addEventListener( 'click', function () {
			stage.setAttribute( 'data-device', button.getAttribute( 'data-device' ) );
			preview.querySelectorAll( '.a11yp-devices button' ).forEach( function ( other ) {
				other.setAttribute( 'aria-pressed', String( other === button ) );
			} );
			fit();
		} );
	} );
}() );
