<?php
$eyebrow = isset($attributes['eyebrow']) ? sanitize_text_field($attributes['eyebrow']) : 'Sosial Media';
$heading = isset($attributes['heading']) ? sanitize_text_field($attributes['heading']) : 'Silahkan Kunjungi Sosial Media Kami';
$description = isset($attributes['description']) ? sanitize_textarea_field($attributes['description']) : '';
$image_url = isset($attributes['imageUrl']) ? esc_url($attributes['imageUrl']) : '';
$platforms = array(
    'facebook' => array(
        'label' => 'Facebook',
        'url' => isset($attributes['facebookUrl']) ? esc_url($attributes['facebookUrl']) : '',
        'class' => 'is-facebook',
    ),
    'instagram' => array(
        'label' => 'Instagram',
        'url' => isset($attributes['instagramUrl']) ? esc_url($attributes['instagramUrl']) : '',
        'class' => 'is-instagram',
    ),
    'youtube' => array(
        'label' => 'YouTube',
        'url' => isset($attributes['youtubeUrl']) ? esc_url($attributes['youtubeUrl']) : '',
        'class' => 'is-youtube',
    ),
    'tiktok' => array(
        'label' => 'TikTok',
        'url' => isset($attributes['tiktokUrl']) ? esc_url($attributes['tiktokUrl']) : '',
        'class' => 'is-tiktok',
    ),
);
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'annur-social')); ?>>
    <div class="annur-social__copy">
        <?php if ($eyebrow) : ?>
            <p class="annur-social__eyebrow"><?php echo esc_html($eyebrow); ?></p>
        <?php endif; ?>
        <?php if ($heading) : ?>
            <h2 class="annur-social__heading"><?php echo esc_html($heading); ?></h2>
        <?php endif; ?>
        <?php if ($description) : ?>
            <p class="annur-social__description"><?php echo esc_html($description); ?></p>
        <?php endif; ?>
        <div class="annur-social__links">
            <?php foreach ($platforms as $platform => $data) : ?>
                <?php if ($data['url']) : ?>
                    <a class="annur-social__icon <?php echo esc_attr($data['class']); ?>" href="<?php echo esc_url($data['url']); ?>" aria-label="<?php echo esc_attr($data['label']); ?>" target="_blank" rel="noopener noreferrer">
                <?php else : ?>
                    <span class="annur-social__icon <?php echo esc_attr($data['class']); ?>" aria-label="<?php echo esc_attr($data['label']); ?>">
                <?php endif; ?>
                    <?php if ('facebook' === $platform) : ?>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z"/></svg>
                    <?php elseif ('instagram' === $platform) : ?>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.8" r="1.2" fill="currentColor"/></svg>
                    <?php elseif ('youtube' === $platform) : ?>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>
                    <?php else : ?>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19.6 8.2a5.7 5.7 0 0 1-3.4-1.1v7.2a5.8 5.8 0 1 1-5-5.7v3a2.8 2.8 0 1 0 2 2.7V2.8h3a5.7 5.7 0 0 0 3.4 3.3v2.1Z"/></svg>
                    <?php endif; ?>
                <?php if ($data['url']) : ?>
                    </a>
                <?php else : ?>
                    </span>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
    <?php if ($image_url) : ?>
        <div class="annur-social__art">
            <img class="annur-social__image" src="<?php echo esc_url($image_url); ?>" alt="" loading="lazy">
        </div>
    <?php endif; ?>
</section>
