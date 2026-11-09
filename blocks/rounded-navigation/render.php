<?php
$items = array();

foreach (array('One', 'Two', 'Three', 'Four', 'Five', 'Six') as $key) {
    $label = isset($attributes['link' . $key . 'Label'])
        ? sanitize_text_field($attributes['link' . $key . 'Label'])
        : '';
    $url = isset($attributes['link' . $key . 'Url'])
        ? esc_url($attributes['link' . $key . 'Url'])
        : '#';

    if ($label) {
        $items[] = array(
            'label' => $label,
            'url' => $url ? $url : '#',
        );
    }
}
?>
<?php if ($items) : ?>
    <nav <?php echo get_block_wrapper_attributes(array('class' => 'subject-menu')); ?> aria-label="<?php esc_attr_e('Navigasi mata pelajaran', 'kadence-child-theme'); ?>">
        <?php foreach ($items as $item) : ?>
            <a href="<?php echo esc_url($item['url']); ?>" class="subject-item"><?php echo esc_html($item['label']); ?></a>
        <?php endforeach; ?>
    </nav>
<?php endif; ?>
