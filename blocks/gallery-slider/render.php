<?php
$items = isset($attributes['galleryItems']) && is_array($attributes['galleryItems'])
    ? $attributes['galleryItems']
    : array();

$items = array_filter($items, static function ($item) {
    return is_array($item) && (
        !empty($item['image']) ||
        !empty($item['title']) ||
        !empty($item['location'])
    );
});
?>
<?php if ($items) : ?>
    <div <?php echo get_block_wrapper_attributes(array('class' => 'gallery-slider')); ?>>
        <div class="gallery-slider__track">
            <?php foreach ($items as $item) : ?>
                <?php
                $image = isset($item['image']) ? esc_url($item['image']) : '';
                $title = isset($item['title']) ? sanitize_text_field($item['title']) : '';
                $location = isset($item['location']) ? sanitize_text_field($item['location']) : '';
                ?>
                <article class="gallery-slider__card">
                    <?php if ($image) : ?>
                        <img class="gallery-slider__image" src="<?php echo $image; ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" decoding="async" draggable="false">
                    <?php else : ?>
                        <div class="gallery-slider__image gallery-slider__image--placeholder" aria-hidden="true"></div>
                    <?php endif; ?>
                    <div class="gallery-slider__info">
                        <?php if ($title) : ?>
                            <h3><?php echo esc_html($title); ?></h3>
                        <?php endif; ?>
                        <?php if ($location) : ?>
                            <p><?php echo esc_html($location); ?></p>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
<?php endif; ?>
