<?php
/**
 * Item content template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="up-portfolio-layout layout-wave">
    <?php if (
        ($displayCaption && $source['title'] && strlen($source['title']) > 0) ||
        ($displayDescription && $source['description'] && strlen($source['description']) > 0) ||
        ($displayCategory && strlen($filterString) > 0)
    ) { ?>
        <div class="up-overlay">
            <?php echo $svgsname['SvgWave']; ?>

            <div class="up-overlay-content">
                <div class="up-overlay-content-meta">
                    <?php if ($displayCategory && strlen($filterString) > 0) { ?>
                        <span class="item-category">
                            <?php echo esc_html($filterString); ?>
                        </span>
                    <?php } ?>
                    <?php if ($displayCaption && $source['title'] && strlen($source['title']) > 0) { ?>
                        <h2
                            class="up-overlay-content-meta-title <?php echo esc_attr($horizontalAlign); ?> <?php echo esc_attr($verticalAlign); ?>">
                            <a href="<?php echo esc_url($permalink); ?>">
                                <?php echo esc_html($title); ?>
                            </a>
                        </h2>
                    <?php } ?>
                    <?php if ($displayDescription && $source['description'] && strlen($source['description']) > 0) { ?>
                        <div class="up-description">
                            <?php echo esc_html($description); ?>
                        </div>
                    <?php } ?>
                    <div class="up-content-meta-icons"></div>
                </div>
            </div>
        </div>
    <?php } ?>
</div>