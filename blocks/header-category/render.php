<?php
$heading = isset($attributes['heading']) ? sanitize_text_field($attributes['heading']) : 'Kategori';
$show_heading_dot = !isset($attributes['showHeadingDot']) || (bool) $attributes['showHeadingDot'];
$heading_alignment = isset($attributes['headingAlignment']) ? sanitize_key($attributes['headingAlignment']) : 'left';
$heading_alignment = in_array($heading_alignment, array('left', 'center', 'right'), true) ? $heading_alignment : 'left';
$show_next_button = !isset($attributes['showNextButton']) || (bool) $attributes['showNextButton'];
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'annur-articles')); ?>>
    <div class="annur-articles__header annur-articles__header--<?php echo esc_attr($heading_alignment); ?>">
        <h2 class="annur-articles__heading">
            <?php if ($show_heading_dot) : ?>
                <span class="annur-articles__heading-dot" aria-hidden="true"></span>
            <?php endif; ?>
            <?php echo esc_html($heading); ?>
        </h2>
        <?php if ($show_next_button) : ?>
            <span class="annur-articles__next" aria-hidden="true">
                <img
                    src="https://annur2.net/wp-content/uploads/2026/10/gambar_100kb.jpg"
                    alt=""
                    width="30"
                    height="30"
                >
            </span>
        <?php endif; ?>
    </div>
</section>
