<?php
/**
 * load more template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="pagination" class="up-pagination pagination-load-more">

    <?php if ($maxImages < $totalItems) { ?>
        <button id="load-more">
            <?php echo esc_html($loadMoreText); ?>
        </button>
    <?php } ?>
    <span class="no-to-load" <?php echo ($maxImages < $totalItems) ? 'style="display: none;"' : 'style="display: block;"'; ?>>
        <?php echo esc_html($loadMoreEndText); ?>
    </span>
    <div class="up-loader-spinner" style="display:none">
        <?php echo wp_kses($svgsname['SvgSpinner'], $allowed_svg_tags); ?>
    </div>

</div>