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

		// Any CSS length is valid, so this only strips markup rather than
		// pretending to validate every possible unit.
		$clean['offset'] = isset( $input['offset'] ) ? sanitize_text_field( $input['offset'] ) : '';

		$clean['z_index'] = isset( $input['z_index'] ) && '' !== $input['z_index']
			? (string) absint( $input['z_index'] )
			: '';

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
