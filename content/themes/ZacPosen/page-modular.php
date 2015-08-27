<?php
/*
	* Template Name: Page Builder
	*
	*/


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

if ( $post->post_parent ) {
	$context ['childpages'] =  wp_list_pages("sort_column=menu_order&title_li=&child_of=" . $post->post_parent . "&depth=1&&echo=0");
} else {
	$args = array(
					'post_type' => 'page',
					'child_of' => $post->ID,
					'sort_column' => 'menu_order',
					'sort_order' => 'ASC',
	);
	$context['pages'] = get_pages( $args );
}
Timber::render(array('page-modular.twig'), $context);
