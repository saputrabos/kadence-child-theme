<?php
if (!defined('ABSPATH')) {
    exit;
}

function widget_hero_render($atts) {
    $atts = shortcode_atts([
        'title'    => 'Judul Hero',
        'subtitle' => 'Deskripsi singkat di sini',
        'btn_text' => 'Klik Disini',
        'btn_link' => '#',
        'bg_image' => '',
    ], $atts, 'hero_widget');

    ob_start();
    ?>
    <section class="wh-hero" <?php if ($atts['bg_image']) : ?>
        style="background-image:url('<?php echo esc_url($atts['bg_image']); ?>');"
    <?php endif; ?>>
        <div class="wh-hero__inner">
            <h1 class="wh-hero__title"><?php echo esc_html($atts['title']); ?></h1>
            <p class="wh-hero__subtitle"><?php echo esc_html($atts['subtitle']); ?></p>
            <a href="<?php echo esc_url($atts['btn_link']); ?>" class="wh-hero__btn">
                <?php echo esc_html($atts['btn_text']); ?>
            </a>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('hero_widget', 'widget_hero_render');

function widget_hero_enqueue_assets() {
    global $post;

    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'hero_widget')) {
        $css_path = get_stylesheet_directory() . '/assets/css/widget-hero.css';

        wp_enqueue_style(
            'widget-hero-css',
            get_stylesheet_directory_uri() . '/assets/css/widget-hero.css',
            [],
            filemtime($css_path)
        );
    }
}
add_action('wp_enqueue_scripts', 'widget_hero_enqueue_assets');
