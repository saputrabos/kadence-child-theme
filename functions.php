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
