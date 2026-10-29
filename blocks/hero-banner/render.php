<?php
$heading = isset($attributes['heading']) ? $attributes['heading'] : '';
$description = isset($attributes['description']) ? $attributes['description'] : '';
$button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
$button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '';
$video_url = isset($attributes['videoUrl']) ? $attributes['videoUrl'] : '';
$image_url = isset($attributes['imageUrl']) ? $attributes['imageUrl'] : '';
$background_style = 'background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.16))';

if ($image_url) {
    $background_style .= ', url("' . esc_url($image_url) . '")';
}

$cards = array(
    array(
        'title' => isset($attributes['achievementOneTitle']) ? $attributes['achievementOneTitle'] : '',
        'text' => isset($attributes['achievementOneText']) ? $attributes['achievementOneText'] : '',
    ),
    array(
        'title' => isset($attributes['achievementTwoTitle']) ? $attributes['achievementTwoTitle'] : '',
        'text' => isset($attributes['achievementTwoText']) ? $attributes['achievementTwoText'] : '',
    ),
    array(
        'title' => isset($attributes['achievementThreeTitle']) ? $attributes['achievementThreeTitle'] : '',
        'text' => isset($attributes['achievementThreeText']) ? $attributes['achievementThreeText'] : '',
    ),
);
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'kadence-hero')); ?> style="<?php echo esc_attr($background_style); ?>">
    <div class="kadence-hero__copy">
        <?php if ($heading) : ?>
            <h1 class="kadence-hero__heading"><?php echo esc_html($heading); ?></h1>
        <?php endif; ?>
        <?php if ($description) : ?>
            <p class="kadence-hero__description"><?php echo esc_html($description); ?></p>
        <?php endif; ?>
        <div class="kadence-hero__actions">
            <?php if ($button_text && $button_url) : ?>
                <a class="kadence-hero__button" href="<?php echo esc_url($button_url); ?>"><?php echo esc_html($button_text); ?></a>
            <?php endif; ?>
            <?php if ($video_url) : ?>
                <a class="kadence-hero__play" href="<?php echo esc_url($video_url); ?>" aria-label="<?php echo esc_attr__('Putar video', 'kadence-child-theme'); ?>">
                    <span aria-hidden="true">▶</span>
                </a>
            <?php endif; ?>
        </div>
    </div>
    <div class="kadence-hero__cards">
        <?php foreach ($cards as $index => $card) : ?>
            <div class="kadence-hero__card<?php echo 0 === $index ? ' is-featured' : ''; ?>">
                <?php if (0 === $index) : ?>
                    <span class="kadence-hero__ribbon" aria-hidden="true"></span>
                <?php endif; ?>
                <?php if ($card['title']) : ?>
                    <strong class="kadence-hero__card-title"><?php echo esc_html($card['title']); ?></strong>
                <?php endif; ?>
                <?php if ($card['text']) : ?>
                    <span class="kadence-hero__card-text"><?php echo esc_html($card['text']); ?></span>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</section>
