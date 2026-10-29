<?php
$heading = isset($attributes['heading']) ? sanitize_text_field($attributes['heading']) : 'BUMP Ponpes An-Nur II Al-Murtadlo';
$items = array();

foreach (array('One', 'Two', 'Three', 'Four', 'Five') as $key) {
    $items[] = array(
        'label' => isset($attributes['item' . $key . 'Label']) ? sanitize_text_field($attributes['item' . $key . 'Label']) : '',
        'image' => isset($attributes['item' . $key . 'Image']) ? esc_url($attributes['item' . $key . 'Image']) : '',
        'url'   => isset($attributes['item' . $key . 'Url']) ? esc_url($attributes['item' . $key . 'Url']) : '',
    );
}
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'annur-bump')); ?>>
    <div class="annur-bump__header">
        <h2 class="annur-bump__heading">
            <span class="annur-bump__heading-dot" aria-hidden="true"></span>
            <?php echo esc_html($heading); ?>
        </h2>
    </div>
    <ul class="annur-bump__list">
        <?php foreach ($items as $item) : ?>
            <?php if ($item['label'] || $item['image']) : ?>
                <li class="annur-bump__item">
                    <?php if ($item['url']) : ?>
                        <a class="annur-bump__link" href="<?php echo esc_url($item['url']); ?>">
                    <?php else : ?>
                        <div class="annur-bump__link">
                    <?php endif; ?>
                        <span class="annur-bump__logo">
                            <?php if ($item['image']) : ?>
                                <img class="annur-bump__image" src="<?php echo esc_url($item['image']); ?>" alt="" loading="lazy">
                            <?php else : ?>
                                <span class="annur-bump__image annur-bump__image--placeholder"></span>
                            <?php endif; ?>
                        </span>
                        <?php if ($item['label']) : ?>
                            <span class="annur-bump__label"><?php echo esc_html($item['label']); ?></span>
                        <?php endif; ?>
                    <?php if ($item['url']) : ?>
                        </a>
                    <?php else : ?>
                        </div>
                    <?php endif; ?>
                </li>
            <?php endif; ?>
        <?php endforeach; ?>
    </ul>
</section>
