<?php
/**
 * Just enough WordPress to exercise the plugin's own logic outside WordPress.
 *
 * These are not faithful reimplementations — they only need to behave like the
 * real thing for the inputs the tests use. Anything relying on subtler core
 * behaviour belongs in an integration test against a real install instead.
 *
 * @package A11y_Prefs
 */

define( 'ABSPATH', __DIR__ . '/' );
define( 'A11Y_PREFS_VERSION', '0.1.0' );
define( 'A11Y_PREFS_FILE', dirname( __DIR__, 2 ) . '/wordpress/a11y-prefs.php' );

$GLOBALS['a11y_test_options'] = array();
$GLOBALS['a11y_test_filters'] = array();

function __( $text, $domain = null ) {
	return $text;
}

function esc_attr( $text ) {
	return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
}

function esc_html( $text ) {
	return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
}

function esc_url_raw( $url ) {
	$url = trim( (string) $url );

	return preg_match( '#^(https?:)?//#i', $url ) || 0 === strpos( $url, '/' ) ? $url : '';
}

function sanitize_text_field( $text ) {
	return trim( strip_tags( (string) $text ) );
}

function sanitize_key( $key ) {
	return preg_replace( '/[^a-z0-9_\-]/', '', strtolower( (string) $key ) );
}

function sanitize_hex_color( $color ) {
	return preg_match( '/^#([A-Fa-f0-9]{3}){1,2}$/', (string) $color ) ? $color : null;
}

function absint( $value ) {
	return abs( (int) $value );
}

function wp_parse_args( $args, $defaults ) {
	return array_merge( $defaults, $args );
}

function get_option( $name, $default = false ) {
	return array_key_exists( $name, $GLOBALS['a11y_test_options'] )
		? $GLOBALS['a11y_test_options'][ $name ]
		: $default;
}

function update_option( $name, $value ) {
	$GLOBALS['a11y_test_options'][ $name ] = $value;
}

function add_filter( $hook, $callback, $priority = 10, $args = 1 ) {
	$GLOBALS['a11y_test_filters'][ $hook ][] = $callback;
}

function add_action( $hook, $callback, $priority = 10, $args = 1 ) {
	add_filter( $hook, $callback, $priority, $args );
}

function apply_filters( $hook, $value ) {
	foreach ( $GLOBALS['a11y_test_filters'][ $hook ] ?? array() as $callback ) {
		$value = call_user_func( $callback, $value );
	}

	return $value;
}

function plugins_url( $path, $plugin ) {
	return 'https://example.test/wp-content/plugins/a11y-prefs/' . ltrim( $path, '/' );
}

function wp_enqueue_script() {}
