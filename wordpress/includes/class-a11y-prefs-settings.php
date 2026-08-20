<?php
/**
 * Settings screen under Settings > Accessibility panel.
 *
 * @package A11y_Prefs
 */

defined( 'ABSPATH' ) || exit;

/**
 * Plain Settings API. No custom save handler, so nonce checking and the
 * capability gate come from WordPress rather than from us.
 */
class A11y_Prefs_Settings {

	const PAGE  = 'a11y-prefs';
	const GROUP = 'a11y_prefs_group';

	public function register() {
		add_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( A11Y_PREFS_FILE ), array( $this, 'action_links' ) );
	}

	public function add_page() {
		add_options_page(
			__( 'Accessibility panel', 'a11y-prefs' ),
			__( 'Accessibility panel', 'a11y-prefs' ),
			'manage_options',
			self::PAGE,
			array( $this, 'render_page' )
		);
	}

	/**
	 * @param array $links Existing plugin row links.
	 * @return array
	 */
	public function action_links( $links ) {
		$settings = sprintf(
			'<a href="%s">%s</a>',
			esc_url( admin_url( 'options-general.php?page=' . self::PAGE ) ),
			esc_html__( 'Settings', 'a11y-prefs' )
		);

		array_unshift( $links, $settings );

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

		add_settings_section(
			'a11y_prefs_appearance',
			__( 'Appearance', 'a11y-prefs' ),
			function () {
				echo '<p>' . esc_html__( 'Where the button sits and what it looks like.', 'a11y-prefs' ) . '</p>';
			},
			self::PAGE
		);

		$this->add_select( 'position', __( 'Position', 'a11y-prefs' ), A11y_Prefs_Options::positions(), 'a11y_prefs_appearance' );
		$this->add_select( 'shape', __( 'Shape', 'a11y-prefs' ), A11y_Prefs_Options::shapes(), 'a11y_prefs_appearance' );
		$this->add_select( 'size', __( 'Size', 'a11y-prefs' ), A11y_Prefs_Options::sizes(), 'a11y_prefs_appearance' );
		$this->add_select( 'icon', __( 'Icon', 'a11y-prefs' ), A11y_Prefs_Options::icons(), 'a11y_prefs_appearance' );

		add_settings_field(
			'accent',
			__( 'Accent colour', 'a11y-prefs' ),
			array( $this, 'render_accent' ),
			self::PAGE,
			'a11y_prefs_appearance'
		);

		add_settings_field(
			'label',
			__( 'Button label', 'a11y-prefs' ),
			array( $this, 'render_label' ),
			self::PAGE,
			'a11y_prefs_appearance'
		);

		add_settings_field(
			'offset',
			__( 'Distance from the edge', 'a11y-prefs' ),
			array( $this, 'render_offset' ),
			self::PAGE,
			'a11y_prefs_appearance'
		);

		add_settings_section(
			'a11y_prefs_behaviour',
			__( 'Contents', 'a11y-prefs' ),
			function () {
				echo '<p>' . esc_html__( 'Language of the panel and which preferences it offers.', 'a11y-prefs' ) . '</p>';
			},
			self::PAGE
		);

		$this->add_select( 'locale', __( 'Panel language', 'a11y-prefs' ), A11y_Prefs_Options::locales(), 'a11y_prefs_behaviour' );

		add_settings_field(
			'features',
			__( 'Preferences shown', 'a11y-prefs' ),
			array( $this, 'render_features' ),
			self::PAGE,
			'a11y_prefs_behaviour'
		);

		add_settings_field(
			'statement_url',
			__( 'Accessibility statement', 'a11y-prefs' ),
			array( $this, 'render_statement_url' ),
			self::PAGE,
			'a11y_prefs_behaviour'
		);

		add_settings_field(
			'z_index',
			__( 'z-index', 'a11y-prefs' ),
			array( $this, 'render_z_index' ),
			self::PAGE,
			'a11y_prefs_behaviour'
		);
	}

	/* ------------------------------------------------------------ fields -- */

	/**
	 * @param string $key      Option key.
	 * @param string $label    Field label.
	 * @param array  $choices  value => label.
	 * @param string $section  Section id.
	 */
	private function add_select( $key, $label, $choices, $section ) {
		add_settings_field(
			$key,
			$label,
			function () use ( $key, $choices ) {
				$options = A11y_Prefs_Options::all();
				printf( '<select name="%s[%s]">', esc_attr( A11y_Prefs_Options::OPTION_NAME ), esc_attr( $key ) );
				foreach ( $choices as $value => $text ) {
					printf(
						'<option value="%s"%s>%s</option>',
						esc_attr( $value ),
						selected( $options[ $key ], $value, false ),
						esc_html( $text )
					);
				}
				echo '</select>';
			},
			self::PAGE,
			$section
		);
	}

	public function render_accent() {
		$options = A11y_Prefs_Options::all();
		printf(
			'<input type="color" name="%s[accent]" value="%s">',
			esc_attr( A11y_Prefs_Options::OPTION_NAME ),
			esc_attr( $options['accent'] )
		);
		echo '<p class="description">' . esc_html__( 'Text on top of it switches between black and white automatically, so contrast holds.', 'a11y-prefs' ) . '</p>';
	}

	public function render_label() {
		$options = A11y_Prefs_Options::all();
		printf(
			'<input type="text" class="regular-text" name="%s[label]" value="%s" placeholder="%s">',
			esc_attr( A11y_Prefs_Options::OPTION_NAME ),
			esc_attr( $options['label'] ),
			esc_attr__( 'Accessibility options', 'a11y-prefs' )
		);
		echo '<p class="description">' . esc_html__( 'Only shown by the pill shape. Leave empty to use the translated default.', 'a11y-prefs' ) . '</p>';
	}

	public function render_offset() {
		$options = A11y_Prefs_Options::all();
		printf(
			'<input type="text" class="small-text" name="%s[offset]" value="%s" placeholder="20px">',
			esc_attr( A11y_Prefs_Options::OPTION_NAME ),
			esc_attr( $options['offset'] )
		);
		echo '<p class="description">' . esc_html__( 'Any CSS length. Useful when a chat bubble already sits in that corner.', 'a11y-prefs' ) . '</p>';
	}

	public function render_features() {
		$options  = A11y_Prefs_Options::all();
		$features = A11y_Prefs_Options::features();
		$selected = (array) $options['features'];
		// Empty means no restriction, which is stored rather than every key.
		$all      = empty( $selected );

		echo '<fieldset>';
		foreach ( $features as $id => $label ) {
			printf(
				'<label style="display:block;margin-bottom:4px"><input type="checkbox" name="%s[features][]" value="%s"%s> %s</label>',
				esc_attr( A11y_Prefs_Options::OPTION_NAME ),
				esc_attr( $id ),
				checked( $all || in_array( $id, $selected, true ), true, false ),
				esc_html( $label )
			);
		}
		echo '</fieldset>';
		echo '<p class="description">' . esc_html__( 'Unchecking everything brings all of them back.', 'a11y-prefs' ) . '</p>';
	}

	public function render_statement_url() {
		$options = A11y_Prefs_Options::all();
		printf(
			'<input type="url" class="regular-text" name="%s[statement_url]" value="%s" placeholder="https://">',
			esc_attr( A11y_Prefs_Options::OPTION_NAME ),
			esc_attr( $options['statement_url'] )
		);
		echo '<p class="description">' . esc_html__( 'Linked at the bottom of the panel. Left out entirely when empty.', 'a11y-prefs' ) . '</p>';
	}

	public function render_z_index() {
		$options = A11y_Prefs_Options::all();
		printf(
			'<input type="number" class="small-text" name="%s[z_index]" value="%s" placeholder="2147483000" min="0">',
			esc_attr( A11y_Prefs_Options::OPTION_NAME ),
			esc_attr( $options['z_index'] )
		);
		echo '<p class="description">' . esc_html__( 'Only worth touching if another element covers the button.', 'a11y-prefs' ) . '</p>';
	}

	/* -------------------------------------------------------------- page -- */

	public function render_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

			<p>
				<?php esc_html_e( 'This panel lets visitors choose how they want to read your site. It does not make an inaccessible site accessible — that work happens in your theme and your content.', 'a11y-prefs' ); ?>
			</p>

			<form action="options.php" method="post">
				<?php
				settings_fields( self::GROUP );
				do_settings_sections( self::PAGE );
				submit_button();
				?>
			</form>
		</div>
		<?php
	}
}
