<?php
/**
 * Item search template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="up-search">
    <?php echo wp_kses($svgsname['SvgSearch'], $allowed_svg_tags); ?>
    <input type="text" class="quicksearch" placeholder="Search" />
    <div class="up-search-close">
        <?php echo wp_kses($svgsname['SvgClose'], $allowed_svg_tags); ?>
    </div>
</div>