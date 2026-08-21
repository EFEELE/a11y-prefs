/**
 * Live preview for the settings screen.
 *
 * The panel is position:fixed, so dropping it straight into wp-admin would
 * float it over the whole screen instead of the preview box. An iframe gives
 * it a real viewport to be fixed inside, and lets the mobile width trip the
 * component's own media query rather than us faking a phone.
 *
 * The frame is same-origin (srcdoc inherits the parent origin), so the form
 * talks to the element inside it directly — no postMessage needed.
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

	// Option keys the component takes as attributes, mapped to their names.
	var ATTRIBUTES = {
		position: 'position',
		shape: 'shape',
		size: 'size',
		icon: 'icon',
		accent: 'accent',
		label: 'label',
		offset: 'offset',
		locale: 'locale',
		statement_url: 'statement-url',
		z_index: 'z-index'
	};

	function field( key ) {
		return form.querySelector( '[name="a11y_prefs_options[' + key + ']"]:checked' )
			|| form.querySelector( '[name="a11y_prefs_options[' + key + ']"]' );
	}

	function currentConfig() {
		var config = {};

		Object.keys( ATTRIBUTES ).forEach( function ( key ) {
			var input = field( key );
			var value = input ? String( input.value ).trim() : '';
			if ( value ) {
				config[ ATTRIBUTES[ key ] ] = value;
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
			config.features = checked.join( ',' );
		}

		return config;
	}

	var SAMPLE = [
		'<!doctype html><html lang="en"><head><meta charset="utf-8">',
		'<meta name="viewport" content="width=device-width, initial-scale=1">',
		'<style>',
		'body{font:16px/1.6 system-ui,sans-serif;margin:0;padding:22px 20px 90px;color:#1c1f26;background:#fff}',
		'h1{font-size:1.5rem;margin:0 0 .4rem}h2{font-size:1.1rem;margin:1.4rem 0 .3rem}',
		'p{margin:0 0 .9rem}a{color:#0b57d0}',
		'.thumb{height:88px;border-radius:8px;margin:1rem 0;',
		'background:linear-gradient(90deg,#0b57d0,#d97706)}',
		'.spin{width:34px;height:34px;border-radius:50%;border:4px solid #d7dce5;',
		'border-top-color:#0b57d0;animation:s 1s linear infinite}@keyframes s{to{transform:rotate(360deg)}}',
		'</style></head><body>',
		'<h1>Your page</h1>',
		'<p>A sample paragraph so the text size, spacing and contrast settings ',
		'have something to act on, plus <a href="#">a link</a> for the highlight.</p>',
		'<h2>A heading</h2>',
		'<p>More text under it.</p>',
		'<div class="thumb"></div>',
		'<div class="spin"></div>',
		'</body></html>'
	].join( '' );

	var element = null;

	function apply() {
		if ( ! element ) {
			return;
		}
		var config = currentConfig();

		Object.keys( ATTRIBUTES ).forEach( function ( key ) {
			var attribute = ATTRIBUTES[ key ];
			if ( config[ attribute ] ) {
				element.setAttribute( attribute, config[ attribute ] );
			} else {
				element.removeAttribute( attribute );
			}
		} );

		if ( config.features ) {
			element.setAttribute( 'features', config.features );
		} else {
			element.removeAttribute( 'features' );
		}
	}

	frame.addEventListener( 'load', function () {
		var doc = frame.contentDocument;
		if ( ! doc ) {
			return;
		}

		element = doc.createElement( 'a11y-prefs' );
		doc.body.appendChild( element );

		var script = doc.createElement( 'script' );
		// The component would otherwise mount a second element of its own.
		script.setAttribute( 'data-auto', 'false' );
		script.src = scriptUrl;
		script.onload = apply;
		doc.body.appendChild( script );
	} );

	frame.srcdoc = SAMPLE;

	form.addEventListener( 'change', apply );
	form.addEventListener( 'input', apply );

	preview.querySelectorAll( '.a11yp-devices button' ).forEach( function ( button ) {
		button.addEventListener( 'click', function () {
			var device = button.getAttribute( 'data-device' );
			stage.setAttribute( 'data-device', device );
			preview.querySelectorAll( '.a11yp-devices button' ).forEach( function ( other ) {
				other.setAttribute( 'aria-pressed', String( other === button ) );
			} );
		} );
	} );
}() );
