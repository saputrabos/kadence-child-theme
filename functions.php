<?php
/**
 * Kadence Child Theme functions
 */

add_action('wp_enqueue_scripts', 'kadence_child_enqueue_assets');

function kadence_child_enqueue_assets() {
    wp_enqueue_style(
        'kadence-parent-style',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme(get_template())->get('Version')
    );

    wp_enqueue_style(
        'kadence-child-style',
        get_stylesheet_uri(),
        array('kadence-parent-style'),
        wp_get_theme()->get('Version')
    );
}

add_action('init', 'kadence_child_register_hero_block');

function kadence_child_register_hero_block() {
    register_block_type(__DIR__ . '/blocks/hero-banner');
    register_block_type(__DIR__ . '/blocks/post-slider');
    register_block_type(__DIR__ . '/blocks/logo-slider');
    register_block_type(__DIR__ . '/blocks/social-media');
}

add_filter('block_categories_all', 'kadence_child_add_block_category', 10, 2);

function kadence_child_add_block_category($categories, $editor_context) {
    $categories[] = array(
        'slug'  => 'kadence-child',
        'title' => __('Kadence Child', 'kadence-child-theme'),
        'icon'  => null,
    );

    return $categories;
}
