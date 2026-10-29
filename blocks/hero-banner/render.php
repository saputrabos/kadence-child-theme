<?php
$heading = isset($attributes['heading']) ? $attributes['heading'] : '';
$description = isset($attributes['description']) ? $attributes['description'] : '';
$button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
$button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '';
$video_url = isset($attributes['videoUrl']) ? $attributes['videoUrl'] : '';
$image_url = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
$image_id = isset($attributes['imageId']) ? absint($attributes['imageId']) : 0;
$gradient_start = isset($attributes['buttonGradientStart']) ? sanitize_hex_color($attributes['buttonGradientStart']) : '';
$gradient_end = isset($attributes['buttonGradientEnd']) ? sanitize_hex_color($attributes['buttonGradientEnd']) : '';
$gradient_start = $gradient_start ? $gradient_start : '#3057a7';
$gradient_end = $gradient_end ? $gradient_end : '#0e3362';
$button_style = 'background-image:linear-gradient(135deg, ' . $gradient_start . ', ' . $gradient_end . ');';

$font_families = array(
    'inherit' => 'inherit',
    'Arial, sans-serif' => 'Arial, sans-serif',
    'Georgia, serif' => 'Georgia, serif',
    'Verdana, sans-serif' => 'Verdana, sans-serif',
    '"Times New Roman", serif' => '"Times New Roman", serif',
);
$get_font_family = static function ($key) use ($attributes, $font_families) {
    $value = isset($attributes[$key]) ? $attributes[$key] : 'inherit';
    return isset($font_families[$value]) ? $font_families[$value] : 'inherit';
};
$get_font_size = static function ($key, $default, $min, $max) use ($attributes) {
    $value = isset($attributes[$key]) ? absint($attributes[$key]) : $default;
    return min($max, max($min, $value));
};
$get_font_weight = static function ($key, $default) use ($attributes) {
    $value = isset($attributes[$key]) ? absint($attributes[$key]) : $default;
    return in_array($value, array(400, 500, 600, 700, 750, 800), true) ? $value : $default;
};
$get_color = static function ($key, $default) use ($attributes) {
    $value = isset($attributes[$key]) ? sanitize_hex_color($attributes[$key]) : '';
    return $value ? $value : $default;
};
$make_text_style = static function ($prefix, $color_key, $default_size, $min_size, $max_size, $default_weight, $default_color) use ($get_font_size, $get_font_family, $get_font_weight, $get_color) {
    $font_size = $get_font_size($prefix . 'FontSize', $default_size, $min_size, $max_size);
    $size_property = in_array($prefix, array('description', 'button'), true)
        ? '--kadence-hero-' . $prefix . '-size:'
        : 'font-size:';

    return $size_property . $font_size . 'px;font-family:' . esc_attr($get_font_family($prefix . 'FontFamily'))
        . ';font-weight:' . $get_font_weight($prefix . 'FontWeight', $default_weight)
        . ';color:' . esc_attr($get_color($color_key, $default_color)) . ';';
};

$heading_size = $get_font_size('headingFontSize', 62, 24, 96);
$heading_style = sprintf(
    '--kadence-hero-heading-size:%1$dpx;font-family:%2$s;font-weight:%3$d;color:%4$s;',
    $heading_size,
    esc_attr($get_font_family('headingFontFamily')),
    $get_font_weight('headingFontWeight', 800),
    esc_attr($get_color('headingColor', '#ffffff'))
);
$description_style = $make_text_style('description', 'descriptionColor', 17, 12, 40, 400, '#e0e0e0');
$button_style .= $make_text_style('button', 'buttonTextColor', 17, 12, 32, 600, '#ffffff');
$award_style = $make_text_style('awardText', 'awardTextColor', 14, 10, 28, 600, '#ffffff');
$stat_title_style = $make_text_style('statTitle', 'statTitleColor', 32, 16, 48, 700, '#ffffff');
$stat_text_style = $make_text_style('statText', 'statTextColor', 12, 10, 24, 400, '#e0e0e0');

$award_image = isset($attributes['achievementOneImage']) ? $attributes['achievementOneImage'] : '';
$award_image_id = isset($attributes['achievementOneImageId']) ? absint($attributes['achievementOneImageId']) : 0;
$award_title = isset($attributes['achievementOneText']) ? $attributes['achievementOneText'] : '';
$award_url = isset($attributes['achievementOneUrl']) ? $attributes['achievementOneUrl'] : '';
$stats = array(
    array(
        'title' => isset($attributes['achievementTwoTitle']) ? $attributes['achievementTwoTitle'] : '',
        'text' => isset($attributes['achievementTwoText']) ? $attributes['achievementTwoText'] : '',
        'url' => isset($attributes['achievementTwoUrl']) ? $attributes['achievementTwoUrl'] : '',
    ),
    array(
        'title' => isset($attributes['achievementThreeTitle']) ? $attributes['achievementThreeTitle'] : '',
        'text' => isset($attributes['achievementThreeText']) ? $attributes['achievementThreeText'] : '',
        'url' => isset($attributes['achievementThreeUrl']) ? $attributes['achievementThreeUrl'] : '',
    ),
);
$video_dialog_id = wp_unique_id('kadence-hero-video-');
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'kadence-hero')); ?>>
    <?php if ($image_id) : ?>
        <?php
        echo wp_get_attachment_image(
            $image_id,
            'full',
            false,
            array(
                'class' => 'kadence-hero__background',
                'alt' => '',
                'loading' => 'eager',
                'fetchpriority' => 'high',
                'decoding' => 'async',
            )
        );
        ?>
    <?php elseif ($image_url) : ?>
        <img class="kadence-hero__background" src="<?php echo esc_url($image_url); ?>" alt="" width="1200" height="720" loading="eager" fetchpriority="high" decoding="async">
    <?php endif; ?>
    <div class="kadence-hero__overlay" aria-hidden="true"></div>

    <?php if ($award_image || $award_title) : ?>
        <div class="kadence-hero__award">
            <?php if ($award_url) : ?>
                <a class="kadence-hero__award-link" href="<?php echo esc_url($award_url); ?>" aria-label="<?php echo esc_attr($award_title); ?>">
            <?php else : ?>
                <div class="kadence-hero__award-link">
            <?php endif; ?>
                <?php if ($award_image_id) : ?>
                    <?php
                    echo wp_get_attachment_image(
                        $award_image_id,
                        'medium',
                        false,
                        array(
                            'class' => 'kadence-hero__award-image',
                            'alt' => '',
                            'loading' => 'lazy',
                            'decoding' => 'async',
                        )
                    );
                    ?>
                <?php elseif ($award_image) : ?>
                    <img class="kadence-hero__award-image" src="<?php echo esc_url($award_image); ?>" alt="" loading="lazy" decoding="async">
                <?php endif; ?>
                <span class="kadence-hero__award-title" style="<?php echo esc_attr($award_style); ?>"><?php echo nl2br(esc_html($award_title)); ?></span>
                <?php if ($award_url) : ?>
                    <span class="kadence-hero__card-action" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false"><path d="m9 5 7 7-7 7"/></svg>
                    </span>
                <?php endif; ?>
            <?php if ($award_url) : ?>
                </a>
            <?php else : ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="kadence-hero__stats">
        <?php foreach ($stats as $stat) : ?>
            <?php if ($stat['title'] || $stat['text']) : ?>
                <?php if ($stat['url']) : ?>
                    <a class="kadence-hero__stat" href="<?php echo esc_url($stat['url']); ?>" aria-label="<?php echo esc_attr(trim($stat['title'] . ' ' . $stat['text'])); ?>">
                <?php else : ?>
                    <div class="kadence-hero__stat">
                <?php endif; ?>
                    <?php if ($stat['url']) : ?>
                        <span class="kadence-hero__card-action" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false"><path d="m9 5 7 7-7 7"/></svg>
                        </span>
                    <?php endif; ?>
                    <?php if ($stat['title']) : ?>
                        <strong class="kadence-hero__stat-title" style="<?php echo esc_attr($stat_title_style); ?>"><?php echo nl2br(esc_html($stat['title'])); ?></strong>
                    <?php endif; ?>
                    <?php if ($stat['text']) : ?>
                        <span class="kadence-hero__stat-text" style="<?php echo esc_attr($stat_text_style); ?>"><?php echo nl2br(esc_html($stat['text'])); ?></span>
                    <?php endif; ?>
                <?php if ($stat['url']) : ?>
                    </a>
                <?php else : ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>

    <div class="kadence-hero__copy">
        <?php if ($heading) : ?>
            <h1 class="kadence-hero__heading" style="<?php echo esc_attr($heading_style); ?>"><?php echo nl2br(esc_html($heading)); ?></h1>
        <?php endif; ?>
        <?php if ($description) : ?>
            <p class="kadence-hero__description" style="<?php echo esc_attr($description_style); ?>"><?php echo nl2br(esc_html($description)); ?></p>
        <?php endif; ?>
    </div>
    <div class="kadence-hero__shape" aria-hidden="true"></div>
    <div class="kadence-hero__actions">
        <?php if ($button_text && $button_url) : ?>
            <a class="kadence-hero__button" href="<?php echo esc_url($button_url); ?>" style="<?php echo esc_attr($button_style); ?>"><?php echo nl2br(esc_html($button_text)); ?></a>
        <?php endif; ?>
        <?php if ($video_url) : ?>
            <a
                class="kadence-hero__play"
                href="<?php echo esc_url($video_url); ?>"
                target="_blank"
                rel="noopener noreferrer"
                data-video-url="<?php echo esc_url($video_url); ?>"
                aria-label="<?php echo esc_attr__('Putar video', 'kadence-child-theme'); ?>"
                aria-controls="<?php echo esc_attr($video_dialog_id); ?>"
            >
                <span class="kadence-hero__play-icon" aria-hidden="true"></span>
            </a>
        <?php endif; ?>
    </div>

    <?php if ($video_url) : ?>
        <dialog class="kadence-hero__video" id="<?php echo esc_attr($video_dialog_id); ?>" aria-label="<?php echo esc_attr__('Video Pondok Pesantren An-Nur II', 'kadence-child-theme'); ?>">
            <button class="kadence-hero__video-close" type="button" aria-label="<?php echo esc_attr__('Tutup video', 'kadence-child-theme'); ?>">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg>
            </button>
            <div class="kadence-hero__video-frame"></div>
        </dialog>
    <?php endif; ?>
</section>
