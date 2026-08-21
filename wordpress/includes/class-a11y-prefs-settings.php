<?php
/**
 * Top-level admin screen for the plugin.
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

/**
 * Saving still goes through the Settings API, so the nonce, the capability
 * check and the sanitise callback are WordPress's rather than ours. Only the
 * markup is custom: do_settings_sections() emits the core table layout, which
 * cannot carry a side-by-side live preview.
 */
class A11y_Prefs_Settings {

	const PAGE  = 'a11y-prefs';
	const GROUP = 'a11y_prefs_group';

	public function register() {
		add_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( A11Y_PREFS_FILE ), array( $this, 'action_links' ) );
	}

	/**
	 * A top level entry rather than a child of Settings: the screen is a visual
	 * editor with a preview, not a form of six fields, and people look for it
	 * by name.
	 */
	public function add_page() {
		add_menu_page(
			__( 'Accessibility', 'a11y-prefs' ),
			__( 'Accessibility', 'a11y-prefs' ),
			'manage_options',
			self::PAGE,
			array( $this, 'render_page' ),
			$this->menu_icon(),
			81 // Just under Settings.
		);
	}

	/**
	 * Data URI so the icon ships with the plugin and needs no network request.
	 * Flat black on purpose: WordPress recolours menu icons with a CSS filter.
	 */
	private function menu_icon() {
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" '
			. 'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'
			. '<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.1" r="1.35"/>'
			. '<path d="M6.9 10.1 12 11.1l5.1-1M12 11.1v3.2M12 14.3 9.7 19.6M12 14.3l2.3 5.3"/></svg>';

		return 'data:image/svg+xml;base64,' . base64_encode( $svg );
	}

	/**
	 * @param array $links Existing plugin row links.
	 * @return array
	 */
	public function action_links( $links ) {
		array_unshift(
			$links,
			sprintf(
				'<a href="%s">%s</a>',
				esc_url( admin_url( 'admin.php?page=' . self::PAGE ) ),
				esc_html__( 'Settings', 'a11y-prefs' )
			)
		);

		return $links;
	}

	public function register_settings() {
		register_setting(
			self::GROUP,
			A11y_Prefs_Options::OPTION_NAME,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( 'A11y_Prefs_Options', 'sanitize' ),
				'default'           => A11y_Prefs_Options::defaults(),
			)
		);
	}

	/**
	 * @param string $hook Current admin page hook.
	 */
	public function enqueue( $hook ) {
		if ( 'toplevel_page_' . self::PAGE !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'a11y-prefs-admin',
			plugins_url( 'assets/admin.css', A11Y_PREFS_FILE ),
			array(),
			A11Y_PREFS_VERSION
		);

		wp_enqueue_script(
			'a11y-prefs-admin',
			plugins_url( 'assets/admin.js', A11Y_PREFS_FILE ),
			array(),
			A11Y_PREFS_VERSION,
			array( 'in_footer' => true )
		);
	}

	/* -------------------------------------------------------------- page -- */

	public function render_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$options = A11y_Prefs_Options::all();
		$name    = A11y_Prefs_Options::OPTION_NAME;
		?>
		<div class="a11yp-wrap">
			<form action="options.php" method="post" class="a11yp-form">
				<?php settings_fields( self::GROUP ); ?>

				<header class="a11yp-header">
					<div>
						<h1><?php esc_html_e( 'Accessibility panel', 'a11y-prefs' ); ?></h1>
						<p><?php esc_html_e( 'Visitors choose how they want to read your site. Their choice stays in their own browser.', 'a11y-prefs' ); ?></p>
					</div>
					<button type="submit" class="a11yp-save"><?php esc_html_e( 'Save changes', 'a11y-prefs' ); ?></button>
				</header>

				<div class="a11yp-layout">
					<div class="a11yp-controls">

						<section class="a11yp-card">
							<h2><?php $this->section_icon( 'placement' ); ?><?php esc_html_e( 'Placement', 'a11y-prefs' ); ?></h2>

							<div class="a11yp-field">
								<span class="a11yp-label"><?php esc_html_e( 'Position', 'a11y-prefs' ); ?></span>
								<div class="a11yp-screen" role="radiogroup" aria-label="<?php esc_attr_e( 'Position', 'a11y-prefs' ); ?>">
									<?php foreach ( A11y_Prefs_Options::positions() as $value => $text ) : ?>
										<label class="a11yp-spot a11yp-spot--<?php echo esc_attr( $value ); ?>">
											<input type="radio" name="<?php echo esc_attr( $name ); ?>[position]"
												value="<?php echo esc_attr( $value ); ?>"
												<?php checked( $options['position'], $value ); ?>>
											<span class="screen-reader-text"><?php echo esc_html( $text ); ?></span>
											<span class="a11yp-dot" aria-hidden="true"></span>
										</label>
									<?php endforeach; ?>
								</div>
							</div>

							<div class="a11yp-field">
								<span class="a11yp-label"><?php esc_html_e( 'Distance from the edges', 'a11y-prefs' ); ?></span>
								<?php $this->edge_box( $options, $name ); ?>
								<p class="a11yp-hint">
									<?php esc_html_e( 'The middle box sets all four edges. The outer ones override a single edge each, and the two that apply to the chosen position are highlighted. A bare number is read as pixels.', 'a11y-prefs' ); ?>
								</p>
							</div>
						</section>

						<section class="a11yp-card">
							<h2><?php $this->section_icon( 'look' ); ?><?php esc_html_e( 'Look', 'a11y-prefs' ); ?></h2>

							<?php
							$this->radio_row( 'shape', __( 'Shape', 'a11y-prefs' ), A11y_Prefs_Options::shapes(), $options, $name );
							$this->radio_row( 'size', __( 'Size', 'a11y-prefs' ), A11y_Prefs_Options::sizes(), $options, $name );
							$this->radio_row( 'icon', __( 'Icon', 'a11y-prefs' ), A11y_Prefs_Options::icons(), $options, $name );
							?>

							<div class="a11yp-field">
								<span class="a11yp-label"><?php esc_html_e( 'Corner radius', 'a11y-prefs' ); ?></span>
								<?php $this->corner_box( $options, $name ); ?>
								<p class="a11yp-hint">
									<?php esc_html_e( 'Each corner overrides the shape on its own. Leave them empty to keep the shape.', 'a11y-prefs' ); ?>
								</p>
							</div>

							<div class="a11yp-field a11yp-field--inline">
								<label class="a11yp-label" for="a11yp-accent"><?php esc_html_e( 'Accent colour', 'a11y-prefs' ); ?></label>
								<input type="color" id="a11yp-accent" name="<?php echo esc_attr( $name ); ?>[accent]"
									value="<?php echo esc_attr( $options['accent'] ); ?>">
								<p class="a11yp-hint"><?php esc_html_e( 'Text on top switches between black and white on its own, so contrast holds.', 'a11y-prefs' ); ?></p>
							</div>

							<div class="a11yp-field a11yp-field--split">
								<label class="a11yp-label" for="a11yp-label-text"><?php esc_html_e( 'Button label', 'a11y-prefs' ); ?></label>
								<input type="text" id="a11yp-label-text" name="<?php echo esc_attr( $name ); ?>[label]"
									value="<?php echo esc_attr( $options['label'] ); ?>"
									placeholder="<?php esc_attr_e( 'Accessibility options', 'a11y-prefs' ); ?>">
								<p class="a11yp-hint"><?php esc_html_e( 'Shown by the pill shape only. Empty uses the translated default.', 'a11y-prefs' ); ?></p>
							</div>
						</section>

						<section class="a11yp-card">
							<h2><?php $this->section_icon( 'settings' ); ?><?php esc_html_e( 'Settings', 'a11y-prefs' ); ?></h2>

							<div class="a11yp-field a11yp-field--split">
								<label class="a11yp-label" for="a11yp-locale"><?php esc_html_e( 'Language', 'a11y-prefs' ); ?></label>
								<select id="a11yp-locale" name="<?php echo esc_attr( $name ); ?>[locale]">
									<?php foreach ( A11y_Prefs_Options::locales() as $value => $text ) : ?>
										<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $options['locale'], $value ); ?>>
											<?php echo esc_html( $text ); ?>
										</option>
									<?php endforeach; ?>
								</select>
							</div>

							<div class="a11yp-field a11yp-field--split">
								<label class="a11yp-label" for="a11yp-statement"><?php esc_html_e( 'Accessibility statement', 'a11y-prefs' ); ?></label>
								<input type="url" id="a11yp-statement" name="<?php echo esc_attr( $name ); ?>[statement_url]"
									value="<?php echo esc_attr( $options['statement_url'] ); ?>" placeholder="https://">
								<p class="a11yp-hint"><?php esc_html_e( 'Linked at the foot of the panel. Left out entirely when empty.', 'a11y-prefs' ); ?></p>
							</div>

							<div class="a11yp-field a11yp-field--split">
								<label class="a11yp-label" for="a11yp-zindex"><?php esc_html_e( 'z-index', 'a11y-prefs' ); ?></label>
								<input type="number" id="a11yp-zindex" name="<?php echo esc_attr( $name ); ?>[z_index]"
									value="<?php echo esc_attr( $options['z_index'] ); ?>" placeholder="2147483000" min="0">
								<p class="a11yp-hint"><?php esc_html_e( 'Only worth touching if something covers the button.', 'a11y-prefs' ); ?></p>
							</div>
						</section>

						<section class="a11yp-card">
							<h2><?php $this->section_icon( 'preferences' ); ?><?php esc_html_e( 'Preferences offered', 'a11y-prefs' ); ?></h2>
							<p class="a11yp-hint">
								<?php esc_html_e( 'Unchecking every box brings all of them back. Where a preference exists because of a WCAG success criterion, it is linked.', 'a11y-prefs' ); ?>
							</p>

							<?php
							$selected = (array) $options['features'];
							$all      = empty( $selected );
							$icons    = $this->feature_icons();
							$notes    = A11y_Prefs_Options::feature_notes();
							?>
							<ul class="a11yp-features">
								<?php foreach ( A11y_Prefs_Options::features() as $id => $text ) : ?>
									<?php $note = isset( $notes[ $id ] ) ? $notes[ $id ] : array( 'description' => '', 'source' => '', 'url' => '' ); ?>
									<li class="a11yp-feature">
										<label class="a11yp-feature-main">
											<input type="checkbox" name="<?php echo esc_attr( $name ); ?>[features][]"
												value="<?php echo esc_attr( $id ); ?>"
												<?php checked( $all || in_array( $id, $selected, true ) ); ?>>
											<span class="a11yp-feature-icon" aria-hidden="true">
												<svg viewBox="0 0 24 24" focusable="false"><?php
													echo isset( $icons[ $id ] ) ? wp_kses( $icons[ $id ], self::svg_tags() ) : '';
												?></svg>
											</span>
											<span class="a11yp-feature-text">
												<b><?php echo esc_html( $text ); ?></b>
												<?php if ( $note['description'] ) : ?>
													<span><?php echo esc_html( $note['description'] ); ?></span>
												<?php endif; ?>
											</span>
										</label>
										<?php if ( $note['url'] ) : ?>
											<a class="a11yp-feature-source" href="<?php echo esc_url( $note['url'] ); ?>"
												target="_blank" rel="noopener noreferrer">
												<?php echo esc_html( $note['source'] ); ?>
												<span class="screen-reader-text"><?php esc_html_e( '(opens in a new tab)', 'a11y-prefs' ); ?></span>
											</a>
										<?php endif; ?>
									</li>
								<?php endforeach; ?>
							</ul>

							<p class="a11yp-hint">
								<?php
								printf(
									/* translators: %s: link to The A11Y Project checklist. */
									esc_html__( 'None of this replaces fixing your markup. %s is a good place to start.', 'a11y-prefs' ),
									'<a href="https://www.a11yproject.com/checklist/" target="_blank" rel="noopener noreferrer">'
										. esc_html__( 'The A11Y Project checklist', 'a11y-prefs' ) . '</a>'
								);
								?>
							</p>
						</section>
					</div>

					<aside class="a11yp-preview" data-script="<?php echo esc_url( plugins_url( 'assets/a11y-prefs.js', A11Y_PREFS_FILE ) ); ?>">
						<div class="a11yp-preview-bar">
							<span><?php esc_html_e( 'Live preview', 'a11y-prefs' ); ?></span>
							<div class="a11yp-devices" role="group" aria-label="<?php esc_attr_e( 'Preview size', 'a11y-prefs' ); ?>">
								<button type="button" data-device="desktop" aria-pressed="true"><?php esc_html_e( 'Desktop', 'a11y-prefs' ); ?></button>
								<button type="button" data-device="mobile" aria-pressed="false"><?php esc_html_e( 'Mobile', 'a11y-prefs' ); ?></button>
							</div>
						</div>
						<div class="a11yp-stage" data-device="desktop">
							<iframe class="a11yp-frame" title="<?php esc_attr_e( 'Preview of the accessibility panel', 'a11y-prefs' ); ?>"></iframe>
						</div>
						<p class="a11yp-nojs"><?php esc_html_e( 'The preview needs JavaScript. Every setting still saves without it.', 'a11y-prefs' ); ?></p>
						<p class="a11yp-hint">
							<?php esc_html_e( 'Updates as you edit. Nothing is saved until you press Save changes.', 'a11y-prefs' ); ?>
						</p>
					</aside>
				</div>
			</form>
		</div>
		<?php
	}

	/**
	 * Which SVG bits wp_kses is allowed to keep. The icons are ours, generated
	 * at release time, but they still go through kses rather than being echoed
	 * raw.
	 *
	 * @return array
	 */
	private static function svg_tags() {
		return array(
			'path'   => array( 'd' => true ),
			'circle' => array( 'cx' => true, 'cy' => true, 'r' => true ),
		);
	}

	/**
	 * Icons for the twelve preferences, generated from the component source by
	 * scripts/sync-wordpress.mjs so the settings screen and the panel cannot
	 * show different pictures for the same thing.
	 *
	 * @return array
	 */
	private function feature_icons() {
		static $icons = null;

		if ( null === $icons ) {
			$file  = A11Y_PREFS_DIR . 'includes/feature-icons.php';
			$icons = file_exists( $file ) ? (array) require $file : array();
		}

		return $icons;
	}

	/**
	 * A small icon in front of a section heading.
	 *
	 * @param string $which Section key.
	 */
	private function section_icon( $which ) {
		$icons = array(
			'placement'   => '<rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="17" cy="14" r="2.4"/>',
			'look'        => '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17"/><path d="M8 7.5h8M8 16.5h8"/>',
			'settings'    => '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
			'preferences' => '<path d="M9 6h11M9 12h11M9 18h11M4 6l1.2 1.2L7.5 4.6M4 12l1.2 1.2L7.5 10.6M4 18l1.2 1.2L7.5 16.6"/>',
		);

		if ( ! isset( $icons[ $which ] ) ) {
			return;
		}

		printf(
			'<svg class="a11yp-section-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">%s</svg>',
			wp_kses(
				$icons[ $which ],
				array(
					'path'   => array( 'd' => true ),
					'circle' => array( 'cx' => true, 'cy' => true, 'r' => true ),
					'rect'   => array( 'x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true ),
				)
			)
		);
	}

	/**
	 * The four edges laid out the way a CSS box model editor does it, with the
	 * shorthand in the middle. Which two matter depends on the position, and
	 * the script highlights those, but all four stay editable.
	 *
	 * @param array  $options Current options.
	 * @param string $name    Option name for the input names.
	 */
	private function edge_box( $options, $name ) {
		$edges = array(
			'offset_top'    => __( 'Top', 'a11y-prefs' ),
			'offset_right'  => __( 'Right', 'a11y-prefs' ),
			'offset_bottom' => __( 'Bottom', 'a11y-prefs' ),
			'offset_left'   => __( 'Left', 'a11y-prefs' ),
		);

		echo '<div class="a11yp-box">';

		foreach ( $edges as $key => $label ) {
			$edge = str_replace( 'offset_', '', $key );
			printf(
				'<label class="a11yp-box-edge a11yp-box-edge--%1$s" data-edge="%1$s">'
					. '<span class="a11yp-box-tag">%2$s</span>'
					. '<input type="text" name="%3$s[%4$s]" value="%5$s" placeholder="%6$s" inputmode="text">'
					. '</label>',
				esc_attr( $edge ),
				esc_html( $label ),
				esc_attr( $name ),
				esc_attr( $key ),
				esc_attr( $options[ $key ] ),
				esc_attr__( 'auto', 'a11y-prefs' )
			);
		}

		printf(
			'<label class="a11yp-box-all"><span class="a11yp-box-tag">%1$s</span>'
				. '<input type="text" name="%2$s[offset]" value="%3$s" placeholder="20px"></label>',
			esc_html__( 'All', 'a11y-prefs' ),
			esc_attr( $name ),
			esc_attr( $options['offset'] )
		);

		echo '</div>';
	}

	/**
	 * The four corners, laid out where they sit on the button.
	 *
	 * @param array  $options Current options.
	 * @param string $name    Option name for the input names.
	 */
	private function corner_box( $options, $name ) {
		$corners = array(
			'radius_top_left'     => __( 'Top left', 'a11y-prefs' ),
			'radius_top_right'    => __( 'Top right', 'a11y-prefs' ),
			'radius_bottom_left'  => __( 'Bottom left', 'a11y-prefs' ),
			'radius_bottom_right' => __( 'Bottom right', 'a11y-prefs' ),
		);

		echo '<div class="a11yp-corners">';

		foreach ( $corners as $key => $label ) {
			printf(
				'<label class="a11yp-corner a11yp-corner--%1$s">'
					. '<span class="a11yp-box-tag">%2$s</span>'
					. '<input type="text" name="%3$s[%4$s]" value="%5$s" placeholder="%6$s">'
					. '</label>',
				esc_attr( str_replace( 'radius_', '', $key ) ),
				esc_html( $label ),
				esc_attr( $name ),
				esc_attr( $key ),
				esc_attr( $options[ $key ] ),
				esc_attr__( 'shape', 'a11y-prefs' )
			);
		}

		echo '<span class="a11yp-corners-hint" aria-hidden="true"></span>';
		echo '</div>';
	}

	/**
	 * A row of segmented radio buttons.
	 *
	 * @param string $key     Option key.
	 * @param string $label   Visible label.
	 * @param array  $choices value => label.
	 * @param array  $options Current options.
	 * @param string $name    Option name for the input names.
	 */
	private function radio_row( $key, $label, $choices, $options, $name ) {
		?>
		<div class="a11yp-field">
			<span class="a11yp-label"><?php echo esc_html( $label ); ?></span>
			<div class="a11yp-segmented" role="radiogroup" aria-label="<?php echo esc_attr( $label ); ?>">
				<?php foreach ( $choices as $value => $text ) : ?>
					<label class="a11yp-segment">
						<input type="radio" name="<?php echo esc_attr( $name ); ?>[<?php echo esc_attr( $key ); ?>]"
							value="<?php echo esc_attr( $value ); ?>"
							<?php checked( $options[ $key ], $value ); ?>>
						<span><?php echo esc_html( $text ); ?></span>
					</label>
				<?php endforeach; ?>
			</div>
		</div>
		<?php
	}
}
