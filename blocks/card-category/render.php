<?php
$cards = array();
$keys = array('One', 'Two', 'Three', 'Four');

foreach ($keys as $key) {
    $prefix = 'card' . $key;
    $cards[] = array(
        'tag' => isset($attributes[$prefix . 'Tag']) ? sanitize_text_field($attributes[$prefix . 'Tag']) : '',
        'title' => isset($attributes[$prefix . 'Title']) ? sanitize_text_field($attributes[$prefix . 'Title']) : '',
        'description' => isset($attributes[$prefix . 'Description']) ? sanitize_text_field($attributes[$prefix . 'Description']) : '',
        'image' => isset($attributes[$prefix . 'Image']) ? esc_url($attributes[$prefix . 'Image']) : '',
        'image_id' => isset($attributes[$prefix . 'ImageId']) ? absint($attributes[$prefix . 'ImageId']) : 0,
        'url' => isset($attributes[$prefix . 'Url']) ? esc_url($attributes[$prefix . 'Url']) : '',
        'button_text' => isset($attributes[$prefix . 'ButtonText']) ? sanitize_text_field($attributes[$prefix . 'ButtonText']) : '',
    );
}

$icon_paths = array(
    '<path d="M4 20l5-5 3 2 5-7"/><path d="M13 5l5 1-1 5"/><path d="M7 4l2 5-3 3"/><path d="M4 20h5"/>',
    '<path d="M4 8h16v12H4z"/><path d="M7 8V5h10v3"/><circle cx="12" cy="14" r="3"/><path d="M2 11v5M22 11v5"/>',
    '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 19c0-3.3 3-5 7-5s7 1.7 7 5"/><path d="M15 15c3.5-.5 6 1 6 4"/>',
    '<path d="M3 20h18"/><path d="M5 20l2-7h10l2 7"/><path d="M8 13l-2-5"/><path d="M12 13V4"/><path d="M16 13l2-5"/><path d="M9 7l3-3 3 3"/>',
);
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'card-category')); ?>>
    <div class="card-category__grid">
        <?php foreach ($cards as $index => $card) : ?>
            <article class="card-category__card">
                <?php if ($card['image_id']) : ?>
                    <?php
                    echo wp_get_attachment_image(
                        $card['image_id'],
                        'large',
                        false,
                        array(
                            'class' => 'card-category__image',
                            'alt' => esc_attr($card['title']),
                            'loading' => 'lazy',
                            'decoding' => 'async',
                        )
                    );
                    ?>
                <?php elseif ($card['image']) : ?>
                    <img class="card-category__image" src="<?php echo esc_url($card['image']); ?>" alt="<?php echo esc_attr($card['title']); ?>" loading="lazy" decoding="async">
                <?php endif; ?>
                <div class="card-category__overlay" aria-hidden="true"></div>
                <div class="card-category__top">
                    <?php if ($card['tag']) : ?>
                        <span class="card-category__tag"><?php echo esc_html($card['tag']); ?></span>
                    <?php endif; ?>
                    <span class="card-category__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false"><?php echo $icon_paths[$index]; ?></svg>
                    </span>
                </div>
                <div class="card-category__content">
                    <?php if ($card['title']) : ?>
                        <h3><?php echo esc_html($card['title']); ?></h3>
                    <?php endif; ?>
                    <?php if ($card['description']) : ?>
                        <p><?php echo esc_html($card['description']); ?></p>
                    <?php endif; ?>
                    <?php if ($card['button_text']) : ?>
                        <?php if ($card['url']) : ?>
                            <a class="card-category__button" href="<?php echo esc_url($card['url']); ?>">
                        <?php else : ?>
                            <span class="card-category__button">
                        <?php endif; ?>
                            <span><?php echo esc_html($card['button_text']); ?></span>
                            <span class="card-category__arrow" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                                    <path d="M7 17L17 7"/>
                                    <path d="M7 7h10v10"/>
                                </svg>
                            </span>
                        <?php if ($card['url']) : ?>
                            </a>
                        <?php else : ?>
                            </span>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
