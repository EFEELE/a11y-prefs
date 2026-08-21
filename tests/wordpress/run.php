<?php
/**
 * Tests for the plugin logic. Run with:
 *
 *   php tests/wordpress/run.php
 *
 * No PHPUnit, no composer — the plugin has no dependencies and this keeps it
 * that way. Everything under test is pure: option sanitising and turning
 * options into script attributes.
 *
 * @package A11y_Prefs
 */

require_once __DIR__ . '/stubs.php';
require_once dirname( __DIR__, 2 ) . '/wordpress/includes/class-a11y-prefs-options.php';
require_once dirname( __DIR__, 2 ) . '/wordpress/includes/class-a11y-prefs-frontend.php';

$passed = 0;
$failed = 0;

/**
 * @param string $description What is being asserted.
 * @param mixed  $expected    Expected value.
 * @param mixed  $actual      Actual value.
 */
function check( $description, $expected, $actual ) {
	global $passed, $failed;

	if ( $expected === $actual ) {
		++$passed;
		echo "  ok   $description\n";

		return;
	}

	++$failed;
	echo "  FAIL $description\n";
	echo '       expected: ' . var_export( $expected, true ) . "\n";
	echo '       actual:   ' . var_export( $actual, true ) . "\n";
}

echo "sanitising\n";

$defaults = A11y_Prefs_Options::defaults();

$clean = A11y_Prefs_Options::sanitize(
	array(
		'position' => 'middle-left',
		'shape'    => 'pill',
		'size'     => 'lg',
		'icon'     => 'wheelchair',
		'locale'   => 'it',
	)
);
check( 'keeps a valid position', 'middle-left', $clean['position'] );
check( 'keeps a valid shape', 'pill', $clean['shape'] );
check( 'keeps a valid locale', 'it', $clean['locale'] );

$clean = A11y_Prefs_Options::sanitize( array( 'position' => 'somewhere-else', 'shape' => '<script>' ) );
check( 'falls back on an unknown position', $defaults['position'], $clean['position'] );
check( 'falls back on an injected shape', $defaults['shape'], $clean['shape'] );

$clean = A11y_Prefs_Options::sanitize( array( 'accent' => '#b91c1c' ) );
check( 'keeps a valid hex colour', '#b91c1c', $clean['accent'] );

$clean = A11y_Prefs_Options::sanitize( array( 'accent' => 'red; background:url(x)' ) );
check( 'rejects a non-hex colour', $defaults['accent'], $clean['accent'] );

$clean = A11y_Prefs_Options::sanitize( array( 'label' => '  <b>Ajustes</b>  ' ) );
check( 'strips markup from the label', 'Ajustes', $clean['label'] );

$clean = A11y_Prefs_Options::sanitize( array( 'statement_url' => 'javascript:alert(1)' ) );
check( 'drops a javascript: statement url', '', $clean['statement_url'] );

$clean = A11y_Prefs_Options::sanitize( array( 'statement_url' => '/accessibility' ) );
check( 'keeps a relative statement url', '/accessibility', $clean['statement_url'] );

$clean = A11y_Prefs_Options::sanitize( array( 'z_index' => '900000' ) );
check( 'keeps a positive z-index', '900000', $clean['z_index'] );

$clean = A11y_Prefs_Options::sanitize( array( 'z_index' => 'not a number' ) );
check( 'treats a non-numeric z-index as unset, not as 0', '', $clean['z_index'] );

$clean = A11y_Prefs_Options::sanitize( array( 'offset_top' => '6', 'radius_top_left' => '12' ) );
check( 'a bare margin becomes px', '6px', $clean['offset_top'] );
check( 'a bare corner radius becomes px', '12px', $clean['radius_top_left'] );

$clean = A11y_Prefs_Options::sanitize( array( 'offset' => '1.5rem', 'offset_left' => '10%' ) );
check( 'a value with a unit is left alone', '1.5rem', $clean['offset'] );
check( 'a percentage is left alone', '10%', $clean['offset_left'] );

$clean = A11y_Prefs_Options::sanitize( array( 'offset_right' => '  8  ' ) );
check( 'whitespace is trimmed before the unit goes on', '8px', $clean['offset_right'] );

$clean = A11y_Prefs_Options::sanitize( array( 'radius_bottom_left' => 'calc(50% - 2px)' ) );
check( 'calc() survives', 'calc(50% - 2px)', $clean['radius_bottom_left'] );

$clean = A11y_Prefs_Options::sanitize( array( 'features' => array( 'fontSize', 'nope', 'contrast' ) ) );
check( 'drops unknown feature ids', array( 'fontSize', 'contrast' ), $clean['features'] );

$all   = array_keys( A11y_Prefs_Options::features() );
$clean = A11y_Prefs_Options::sanitize( array( 'features' => $all ) );
check( 'collapses "all selected" to no restriction', array(), $clean['features'] );

$clean = A11y_Prefs_Options::sanitize( 'not an array at all' );
check( 'survives a non-array payload', $defaults['position'], $clean['position'] );

echo "\nscript tag\n";

update_option(
	A11y_Prefs_Options::OPTION_NAME,
	array(
		'locale'        => 'es',
		'position'      => 'middle-left',
		'shape'         => 'pill',
		'accent'        => '#b91c1c',
		'label'         => 'Accesibilidad',
		'statement_url' => '/accesibilidad',
		'features'      => array( 'fontSize', 'contrast' ),
	)
);

$frontend = new A11y_Prefs_Frontend();
$tag      = "<script src='https://example.test/a11y-prefs.js' id='a11y-prefs-js' defer></script>\n";
$result   = $frontend->add_config_attributes( $tag, 'a11y-prefs' );

check( 'leaves other handles alone', $tag, $frontend->add_config_attributes( $tag, 'jquery' ) );
check( 'keeps the original src', true, false !== strpos( $result, "src='https://example.test/a11y-prefs.js'" ) );
check( 'keeps defer', true, false !== strpos( $result, 'defer' ) );
check( 'prints the locale', true, false !== strpos( $result, 'data-locale="es"' ) );
check( 'prints the position', true, false !== strpos( $result, 'data-position="middle-left"' ) );
check( 'prints the label', true, false !== strpos( $result, 'data-label="Accesibilidad"' ) );
check( 'joins the feature list', true, false !== strpos( $result, 'data-features="fontSize,contrast"' ) );
check( 'hyphenates statement-url', true, false !== strpos( $result, 'data-statement-url="/accesibilidad"' ) );
check( 'omits empty values', false, strpos( $result, 'data-offset' ) );
check( 'omits an unset z-index', false, strpos( $result, 'data-z-index' ) );
check( 'produces one opening tag', 1, substr_count( $result, '<script' ) );

update_option( A11y_Prefs_Options::OPTION_NAME, array( 'label' => 'He said "hi" & left' ) );
$escaped = $frontend->add_config_attributes( $tag, 'a11y-prefs' );
check( 'escapes quotes in a label', true, false !== strpos( $escaped, 'data-label="He said &quot;hi&quot; &amp; left"' ) );

// A replacement built from user input must never be run through a regex; this
// would come back as a backreference if it were.
update_option( A11y_Prefs_Options::OPTION_NAME, array( 'label' => '$1 \\0 $0' ) );
$literal = $frontend->add_config_attributes( $tag, 'a11y-prefs' );
check( 'treats $1 in a label literally', true, false !== strpos( $literal, 'data-label="$1 \\0 $0"' ) );

add_filter(
	'a11y_prefs_config',
	function ( $attributes ) {
		$attributes['messages'] = '{"pt":{"ui.title":"Acessibilidade"}}';

		return $attributes;
	}
);
$filtered = $frontend->add_config_attributes( $tag, 'a11y-prefs' );
check( 'the config filter can add attributes', true, false !== strpos( $filtered, 'data-messages=' ) );

echo "\n$passed passed, $failed failed\n";

exit( $failed > 0 ? 1 : 0 );
