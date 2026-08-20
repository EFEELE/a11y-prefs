<?php
/**
 * Removes the plugin's only stored option when it is deleted.
 *
 * Visitor preferences live in each visitor's own localStorage, so there is
 * nothing else of ours to clean up.
 *
 * @package A11y_Prefs
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

delete_option( 'a11y_prefs_options' );
