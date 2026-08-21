<?php
/**
 * Option storage, defaults and sanitising.
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

/**
 * Everything the plugin knows about its own settings lives here, so the
 * frontend and the settings screen cannot drift apart.
 */
class A11y_Prefs_Options {

	const OPTION_NAME = 'a11y_prefs_options';

	/**
	 * Keys match the JavaScript config, converted to snake_case. The empty
	 * string means "not set", which lets the component fall back to its own
	 * default rather than us duplicating it here.
	 */
	public static function defaults() {
		return array(
			'locale'        => 'auto',
			'position'      => 'bottom-right',
			'shape'         => 'circle',
			'size'          => 'md',
			'accent'        => '#0b57d0',
			'icon'          => 'universal',
			'label'         => '',
			'offset'        => '',
			'offset_top'    => '',
			'offset_right'  => '',
			'offset_bottom' => '',
			'offset_left'   => '',
			'radius_top_left'     => '',
			'radius_top_right'    => '',
			'radius_bottom_right' => '',
			'radius_bottom_left'  => '',
			'statement_url' => '',
			'z_index'       => '',
			'features'      => array(),
		);
	}

	public static function positions() {
		return array(
			'bottom-right' => __( 'Bottom right', 'a11y-prefs' ),
			'bottom-left'  => __( 'Bottom left', 'a11y-prefs' ),
			'top-right'    => __( 'Top right', 'a11y-prefs' ),
			'top-left'     => __( 'Top left', 'a11y-prefs' ),
			'middle-right' => __( 'Middle right', 'a11y-prefs' ),
			'middle-left'  => __( 'Middle left', 'a11y-prefs' ),
		);
	}

	public static function shapes() {
		return array(
			'circle'  => __( 'Circle', 'a11y-prefs' ),
			'rounded' => __( 'Rounded square', 'a11y-prefs' ),
			'square'  => __( 'Square', 'a11y-prefs' ),
			'pill'    => __( 'Pill with label', 'a11y-prefs' ),
		);
	}

	public static function sizes() {
		return array(
			'sm' => __( 'Small (44px)', 'a11y-prefs' ),
			'md' => __( 'Medium (52px)', 'a11y-prefs' ),
			'lg' => __( 'Large (62px)', 'a11y-prefs' ),
		);
	}

	public static function icons() {
		return array(
			'universal'  => __( 'Universal access', 'a11y-prefs' ),
			'person'     => __( 'Person', 'a11y-prefs' ),
			'eye'        => __( 'Eye', 'a11y-prefs' ),
			'wheelchair' => __( 'Wheelchair', 'a11y-prefs' ),
		);
	}

	/**
	 * "auto" reads the lang attribute WordPress already prints on <html>, which
	 * is the right answer on a multilingual site. The rest are the dictionaries
	 * bundled with the component.
	 */
	public static function locales() {
		return array(
			'auto' => __( 'Follow the site language', 'a11y-prefs' ),
			'en'   => __( 'English', 'a11y-prefs' ),
			'es'   => __( 'Spanish', 'a11y-prefs' ),
			'it'   => __( 'Italian', 'a11y-prefs' ),
		);
	}

	/** Must stay in step with FEATURE_IDS in the JavaScript package. */
	public static function features() {
		return array(
			'fontSize'       => __( 'Text size', 'a11y-prefs' ),
			'textSpacing'    => __( 'Text spacing', 'a11y-prefs' ),
			'contrast'       => __( 'Contrast', 'a11y-prefs' ),
			'dyslexia'       => __( 'Dyslexia-friendly font', 'a11y-prefs' ),
			'links'          => __( 'Highlight links', 'a11y-prefs' ),
			'headings'       => __( 'Highlight headings', 'a11y-prefs' ),
			'focusOutline'   => __( 'Visible focus', 'a11y-prefs' ),
			'stopAnimations' => __( 'Stop animations', 'a11y-prefs' ),
			'readingHelp'    => __( 'Reading help', 'a11y-prefs' ),
			'bigCursor'      => __( 'Big cursor', 'a11y-prefs' ),
			'hideImages'     => __( 'Hide images', 'a11y-prefs' ),
			'alignStart'     => __( 'Align to start', 'a11y-prefs' ),
		);
	}

	/**
	 * What each preference actually does, and where the idea comes from.
	 *
	 * The references are W3C Understanding pages, which are the normative
	 * explanation of each success criterion. Four of the twelve have no
	 * criterion behind them: they are comfort settings people ask for, and
	 * saying so is more honest than inventing a citation.
	 *
	 * @return array
	 */
	public static function feature_notes() {
		$w3c = 'https://www.w3.org/WAI/WCAG22/Understanding/';

		return array(
			'fontSize'       => array(
				'description' => __( 'Scales everything sized in rem, up to twice the normal size.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 1.4.4 Resize Text', 'a11y-prefs' ),
				'url'         => $w3c . 'resize-text.html',
			),
			'textSpacing'    => array(
				'description' => __( 'Opens up line height and the space between letters and words. Level 2 is exactly what the criterion asks for.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 1.4.12 Text Spacing', 'a11y-prefs' ),
				'url'         => $w3c . 'text-spacing.html',
			),
			'contrast'       => array(
				'description' => __( 'High contrast, inverted or grayscale colours across the page.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 1.4.3 Contrast (Minimum)', 'a11y-prefs' ),
				'url'         => $w3c . 'contrast-minimum.html',
			),
			'dyslexia'       => array(
				'description' => __( 'Switches to a typeface with more distinct letterforms. Readers ask for it often, though the research on whether it helps is mixed.', 'a11y-prefs' ),
				'source'      => '',
				'url'         => '',
			),
			'links'          => array(
				'description' => __( 'Underlines and outlines links, so they are not marked by colour alone.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 1.4.1 Use of Color', 'a11y-prefs' ),
				'url'         => $w3c . 'use-of-color.html',
			),
			'headings'       => array(
				'description' => __( 'Outlines every heading, which makes the structure of a page visible at a glance.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 2.4.6 Headings and Labels', 'a11y-prefs' ),
				'url'         => $w3c . 'headings-and-labels.html',
			),
			'focusOutline'   => array(
				'description' => __( 'Draws a strong outline around whatever has keyboard focus.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 2.4.7 Focus Visible', 'a11y-prefs' ),
				'url'         => $w3c . 'focus-visible.html',
			),
			'stopAnimations' => array(
				'description' => __( 'Freezes animations and transitions. The panel already respects prefers-reduced-motion; this is for everyone else.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 2.2.2 Pause, Stop, Hide', 'a11y-prefs' ),
				'url'         => $w3c . 'pause-stop-hide.html',
			),
			'readingHelp'    => array(
				'description' => __( 'A ruler that follows the pointer, or a mask that dims everything except the line being read.', 'a11y-prefs' ),
				'source'      => '',
				'url'         => '',
			),
			'bigCursor'      => array(
				'description' => __( 'Enlarges the mouse pointer so it is easier to track.', 'a11y-prefs' ),
				'source'      => '',
				'url'         => '',
			),
			'hideImages'     => array(
				'description' => __( 'Hides images and background images while keeping their space, so the layout does not jump.', 'a11y-prefs' ),
				'source'      => '',
				'url'         => '',
			),
			'alignStart'     => array(
				'description' => __( 'Removes centred and justified text, which is harder to read in long passages.', 'a11y-prefs' ),
				'source'      => __( 'WCAG 1.4.8 Visual Presentation', 'a11y-prefs' ),
				'url'         => $w3c . 'visual-presentation.html',
			),
		);
	}

	/**
	 * Stored settings merged over the defaults.
	 *
	 * @return array
	 */
	public static function all() {
		$stored = get_option( self::OPTION_NAME, array() );

		return wp_parse_args( is_array( $stored ) ? $stored : array(), self::defaults() );
	}

	/**
	 * Nothing reaches the database without passing through here. Anything
	 * unrecognised falls back to the default instead of being stored.
	 *
	 * @param mixed $input Raw submitted values.
	 * @return array
	 */
	public static function sanitize( $input ) {
		$defaults = self::defaults();
		$input    = is_array( $input ) ? $input : array();
		$clean    = array();

		$clean['locale']   = self::pick( $input, 'locale', self::locales(), $defaults );
		$clean['position'] = self::pick( $input, 'position', self::positions(), $defaults );
		$clean['shape']    = self::pick( $input, 'shape', self::shapes(), $defaults );
		$clean['size']     = self::pick( $input, 'size', self::sizes(), $defaults );
		$clean['icon']     = self::pick( $input, 'icon', self::icons(), $defaults );

		$accent          = isset( $input['accent'] ) ? sanitize_hex_color( $input['accent'] ) : '';
		$clean['accent'] = $accent ? $accent : $defaults['accent'];

		$clean['label']         = isset( $input['label'] ) ? sanitize_text_field( $input['label'] ) : '';
		$clean['statement_url'] = isset( $input['statement_url'] ) ? esc_url_raw( $input['statement_url'] ) : '';

		// Any CSS length is valid, so these only strip markup rather than
		// pretending to validate every possible unit. A bare number gets px,
		// because that is what someone typing "20" into a margin box means.
		$lengths = array(
			'offset',
			'offset_top',
			'offset_right',
			'offset_bottom',
			'offset_left',
			'radius_top_left',
			'radius_top_right',
			'radius_bottom_right',
			'radius_bottom_left',
		);
		foreach ( $lengths as $key ) {
			$clean[ $key ] = isset( $input[ $key ] ) ? self::length( $input[ $key ] ) : '';
		}

		// absint() turns anything non-numeric into 0, and a z-index of 0 would
		// quietly bury the launcher. Treat that as "not set" instead.
		$z_index          = isset( $input['z_index'] ) ? absint( $input['z_index'] ) : 0;
		$clean['z_index'] = $z_index > 0 ? (string) $z_index : '';

		$allowed            = array_keys( self::features() );
		$submitted          = isset( $input['features'] ) && is_array( $input['features'] ) ? $input['features'] : array();
		$clean['features']  = array_values( array_intersect( $allowed, $submitted ) );

		// All of them selected means "no restriction", which keeps the payload
		// smaller and lets a future release add features without an admin visit.
		if ( count( $clean['features'] ) === count( $allowed ) ) {
			$clean['features'] = array();
		}

		return $clean;
	}

	/**
	 * A CSS length. "20" becomes "20px"; anything with a unit, a percentage or
	 * a calc() is left alone.
	 *
	 * @param string $value Raw value.
	 * @return string
	 */
	public static function length( $value ) {
		$value = trim( sanitize_text_field( $value ) );

		if ( '' === $value ) {
			return '';
		}

		return preg_match( '/^-?\d+(\.\d+)?$/', $value ) ? $value . 'px' : $value;
	}

	/**
	 * @param array  $input    Submitted values.
	 * @param string $key      Field name.
	 * @param array  $choices  Allowed values as keys.
	 * @param array  $defaults Default values.
	 * @return string
	 */
	private static function pick( $input, $key, $choices, $defaults ) {
		$value = isset( $input[ $key ] ) ? sanitize_key( $input[ $key ] ) : '';

		return isset( $choices[ $value ] ) ? $value : $defaults[ $key ];
	}
}
