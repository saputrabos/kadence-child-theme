<?php
$heading = isset($attributes['heading']) ? sanitize_text_field($attributes['heading']) : 'Artikel Terbaru';
$posts_to_show = isset($attributes['postsToShow']) ? absint($attributes['postsToShow']) : 6;
$posts_to_show = min(12, max(1, $posts_to_show));

$articles = new WP_Query(array(
    'post_type'           => 'post',
    'post_status'         => 'publish',
    'posts_per_page'      => $posts_to_show,
    'ignore_sticky_posts' => true,
    'no_found_rows'       => true,
));

$block_id = wp_unique_id('annur-articles-');
?>
<section <?php echo get_block_wrapper_attributes(array('class' => 'annur-articles')); ?>>
    <div class="annur-articles__header">
        <h2 class="annur-articles__heading">
            <span class="annur-articles__heading-dot" aria-hidden="true"></span>
            <?php echo esc_html($heading); ?>
        </h2>
        <button
            class="annur-articles__next"
            type="button"
            aria-label="<?php echo esc_attr__('Geser ke artikel berikutnya', 'kadence-child-theme'); ?>"
            aria-controls="<?php echo esc_attr($block_id); ?>"
        >
            <span aria-hidden="true">›</span>
        </button>
    </div>

    <?php if ($articles->have_posts()) : ?>
        <div
            class="annur-articles__track"
            id="<?php echo esc_attr($block_id); ?>"
            tabindex="0"
            aria-label="<?php echo esc_attr__('Daftar artikel terbaru', 'kadence-child-theme'); ?>"
        >
            <?php while ($articles->have_posts()) : ?>
                <?php
                $articles->the_post();
                $categories = get_the_category();
                $category_name = !empty($categories) ? $categories[0]->name : __('Artikel', 'kadence-child-theme');
                ?>
                <article class="annur-articles__card">
                    <a class="annur-articles__image-link" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php
                            echo get_the_post_thumbnail(
                                get_the_ID(),
                                'large',
                                array(
                                    'class' => 'annur-articles__image',
                                    'alt'   => '',
                                )
                            );
                            ?>
                        <?php else : ?>
                            <span class="annur-articles__image annur-articles__image--placeholder"></span>
                        <?php endif; ?>
                    </a>
                    <div class="annur-articles__content">
                        <span class="annur-articles__category"><?php echo esc_html($category_name); ?></span>
                        <h3 class="annur-articles__title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="annur-articles__meta">
                            <div class="annur-articles__byline">
                                <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(get_the_date('j M Y')); ?></time>
                                <span class="annur-articles__author"><?php echo esc_html(get_the_author()); ?></span>
                            </div>
                            <a class="annur-articles__comments" href="<?php echo esc_url(get_comments_link()); ?>" aria-label="<?php echo esc_attr(sprintf(__('Lihat %s komentar', 'kadence-child-theme'), number_format_i18n(get_comments_number()))); ?>">
                                <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
                                    <path d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7l-3.5 2v-2H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"></path>
                                </svg>
                                <span><?php echo esc_html(number_format_i18n(get_comments_number())); ?></span>
                            </a>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <?php wp_reset_postdata(); ?>
    <?php else : ?>
        <p class="annur-articles__empty"><?php echo esc_html__('Belum ada artikel untuk ditampilkan.', 'kadence-child-theme'); ?></p>
    <?php endif; ?>
</section>
