<?php

include_once('inc/zp_acf.php');
include_once('inc/hexplugins.php');

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Socials',
		'menu_title'	=> 'Follow Us',
	));
}

define('THEME_URL', get_template_directory_uri());

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'widgets_init', array($this,'hex_widgets_init'));
		add_action('wp_enqueue_scripts', array($this, 'load_scripts'));
		add_action('wp_enqueue_scripts', array($this, 'load_styles'));
		add_action('init', array($this,  'removeHeadLinks'));
		register_nav_menus( array(
				'primary' => 'Menu',
				'secondary' => 'Footer',
			) );
		parent::__construct();
	}

	function load_scripts(){
		wp_enqueue_script('jquery');
		wp_enqueue_script( 'modernizr', THEME_URL . '/js/custom.modernizr.js', array('jquery'), false, false);
		wp_enqueue_script( 'main-compressed', THEME_URL . '/js/main-min.js', array('jquery'), '', true);
	}

	function load_styles() {
		wp_enqueue_style( 'custom', THEME_URL . '/css/main.css', false, filemtime(get_stylesheet_directory() .'/css/main.css'));
	}

	function removeHeadLinks() {
			remove_action('wp_head', 'rsd_link');
			remove_action('wp_head', 'wlwmanifest_link');
			remove_action('wp_head', 'wp_generator');
			remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
			remove_action( 'wp_print_styles', 'print_emoji_styles' );
		}

	function hex_widgets_init() {
			register_sidebar(
				array(
					'name' => 'Footer',
					'id' => 'footer_sidebar',
					'before_widget' => '<div class="widget">',
					'after_widget' => '</div>',
					'before_title' => '<h4>',
					'after_title' => '</h4>',
				)
			);
		}
	function add_to_context( $context ) {
		$context['options'] = get_fields('options');

		$context['menu'] = new TimberMenu('primary');
		$context['footer_menu'] = new TimberMenu('secondary');
		$context['footer_sidebar'] = Timber::get_widgets('footer_sidebar');
		$argsWZ = array(
						'post_type' => 'page',
						'child_of' => 7,
						'sort_column' => 'menu_order',
						'sort_order' => 'ASC',
		);
		$argsHZ = array(
						'post_type' => 'page',
						'child_of' => 2,
						'sort_column' => 'menu_order',
						'sort_order' => 'ASC',
		);
		$context ['worldZ'] = get_pages( $argsWZ );
		$context ['houseZ'] = get_pages( $argsHZ );

		$context['site'] = $this;
		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
		return $twig;
	}

}

new StarterSite();

function myfoo( $text ) {
	$text .= ' bar!';
	return $text;
}
