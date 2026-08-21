<?php
/**
 * Plugin Name:       a11y-prefs
 * Plugin URI:        https://github.com/EFEELE/a11y-prefs
 * Description:       Lets visitors adjust text size, spacing, contrast, motion and more. Their choice is remembered in their own browser. No external requests, no tracking.
 * Version:           0.3.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            EFEELE
 * Author URI:        https://efeele.dev
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       a11y-prefs
 * Domain Path:       /languages
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

define( 'A11Y_PREFS_VERSION', '0.3.0' );
define( 'A11Y_PREFS_FILE', __FILE__ );
define( 'A11Y_PREFS_DIR', plugin_dir_path( __FILE__ ) );

require_once A11Y_PREFS_DIR . 'includes/class-a11y-prefs-options.php';
require_once A11Y_PREFS_DIR . 'includes/class-a11y-prefs-frontend.php';
require_once A11Y_PREFS_DIR . 'includes/class-a11y-prefs-settings.php';

/**
 * The admin screen follows the WordPress language. Spanish and Italian ship
 * with the plugin as PHP translation files, the format WordPress 6.5 added:
 * readable, reviewable in a pull request, and no gettext tooling needed to
 * contribute one. A locale without a file falls back to English.
 *
 * On `init` because translations must not be loaded before it.
 */
add_action(
	'init',
	function () {
		load_plugin_textdomain(
			'a11y-prefs',
			false,
			dirname( plugin_basename( A11Y_PREFS_FILE ) ) . '/languages'
		);
	}
);

add_action(
	'plugins_loaded',
	function () {
		( new A11y_Prefs_Frontend() )->register();

		if ( is_admin() ) {
			( new A11y_Prefs_Settings() )->register();
		}
	}
);
