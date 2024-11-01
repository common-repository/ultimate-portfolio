<?php
/**
 * Filter template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}

?>
<div
    class="up-portfolio-gallery-filter-wrapper <?php echo esc_attr($filter_layouts); ?> filter-wrapper-<?php echo esc_attr($blockId); ?>">
    <?php if ($filter_layouts === "filter_style_dropdown"): ?>
        <div class="filter-selector">
            <span class="filter-selected">
                <?php esc_html_e("All", "ultimate-portfolio"); ?>
            </span>
            <?php echo wp_kses($svgsname['SvgDown'], $allowed_svg_tags); ?>
        </div>
    <?php endif; ?>

    <ul class="filter-items" data-id="<?php echo esc_attr($blockId); ?>">
        <?php if ($enableFilterAll): ?>
            <li class="filter-item" data-filter="*" data-id="<?php echo esc_attr($blockId); ?>">
                <span class="filter-item-name">
                    <?php echo ($filteralltitle !== "") ? esc_html($filteralltitle) : esc_html_e('All', 'ultimate-portfolio'); ?>
                </span>
            </li>
        <?php endif; ?>
        <?php

        foreach ($filterItems as $index => $item) {
            $filterCounts = [];
            if ($sources) {
                foreach ($sources as $source) {
                    if (isset($source['filter']) && is_array($source['filter'])) {
                        foreach ($source['filter'] as $filter) {
                            $filter = $filter['value'];
                            $filterCounts[$filter] = ($filterCounts[$filter] ?? 0) + 1;
                        }
                    }
                }
            }
            $filterCountlen = $filterCounts[$item['value']] ?? 0;

            // Replace spaces with hyphens in the filter value
            $filterValueHyphenated = strtolower(str_replace(' ', '-', $item['value']));
            ?>
            <li class="filter-item" data-filter=".up-filter-img-<?php echo esc_attr($filterValueHyphenated); ?>"
                data-filter-count="<?php echo esc_attr($filterCountlen); ?>" data-id="<?php echo esc_attr($blockId); ?>">
                <span class="filter-item-name">
                    <?php echo esc_html($item['label']); ?>
                    <?php if ($filtercount) { ?>
                        <?php if ($filterCountlen) { ?>
                            <span class="ul-filter-count">
                                (
                                <?php echo esc_html($filterCountlen); ?>
                                )
                            </span>
                        <?php } ?>
                    <?php } ?>
                </span>
            </li>
            <?php
        }

        ?>
    </ul>
</div>