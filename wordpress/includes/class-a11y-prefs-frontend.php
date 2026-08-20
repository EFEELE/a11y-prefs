<?php
/**
 * Loads the component on the public side of the site.
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

/**
 * The script ships inside the plugin rather than from a CDN. WordPress.org
 * requires it, and it is also the only way the panel works on sites behind a
 * strict CSP or with no outbound access at all.
 */
class A11y_Prefs_Frontend {

	const HANDLE = 'a11y-prefs';

	public function register() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		add_filter( 'script_loader_tag', array( $this, 'add_config_attributes' ), 10, 2 );
	}

	public function enqueue() {
		/**
		 * Filters whether the panel loads on the current request. Return false
		 * to hide it, for example on a landing page or for logged-in editors.
		 *
		 * @param bool $enabled Whether to enqueue the panel.
		 */
		if ( ! apply_filters( 'a11y_prefs_enabled', true ) ) {
			return;
		}

		wp_enqueue_script(
			self::HANDLE,
			plugins_url( 'assets/a11y-prefs.js', A11Y_PREFS_FILE ),
			array(),
			A11Y_PREFS_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);
	}

	/**
	 * The component reads its configuration from data-* attributes on its own
	 * script tag. That avoids an inline <script>, which is what tends to break
	 * on sites with a Content-Security-Policy.
	 *
	 * @param string $tag    The full <script> markup.
	 * @param string $handle Script handle being filtered.
	 * @return string
	 */
	public function add_config_attributes( $tag, $handle ) {
		if ( self::HANDLE !== $handle ) {
			return $tag;
		}

		$attributes = '';
		foreach ( $this->config_attributes() as $name => $value ) {
			$attributes .= sprintf( ' data-%s="%s"', esc_attr( $name ), esc_attr( $value ) );
		}

		if ( '' === $attributes ) {
			return $tag;
		}

		$opening = strpos( $tag, '<script' );
		if ( false === $opening ) {
			return $tag;
		}

		// substr_replace rather than a regex: the replacement is built from user
		// input and backreference sequences in it would be interpreted.
		return substr_replace( $tag, '<script' . $attributes, $opening, strlen( '<script' ) );
	}

	/**
	 * Settings translated into the attribute names the component expects.
	 * Empty values are dropped so the component keeps its own defaults.
	 *
	 * @return array
	 */
	private function config_attributes() {
		$options = A11y_Prefs_Options::all();

		$attributes = array(
			'locale'        => $options['locale'],
			'position'      => $options['position'],
			'shape'         => $options['shape'],
			'size'          => $options['size'],
			'accent'        => $options['accent'],
			'icon'          => $options['icon'],
			'label'         => $options['label'],
			'offset'        => $options['offset'],
			'statement-url' => $options['statement_url'],
			'z-index'       => $options['z_index'],
			'features'      => implode( ',', (array) $options['features'] ),
		);

		/**
		 * Filters the data-* attributes printed on the script tag. Use it to
		 * add a locale of your own via `messages`, or to vary the panel per
		 * template.
		 *
		 * @param array $attributes Attribute name => value, without the data- prefix.
		 */
		$attributes = apply_filters( 'a11y_prefs_config', $attributes );

		return array_filter(
			$attributes,
			function ( $value ) {
				return '' !== $value && null !== $value;
			}
		);
	}
}
