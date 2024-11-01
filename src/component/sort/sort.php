<?php
/**
 * Item sort template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="up-sorting">
    <div class="sort-selector">
        <span class="sort-selected">
            <?php esc_html_e("Sort", "ultimate-portfolio"); ?>
        </span>
    </div>

    <ul class="sort-items">
        <li class="sort-item" data-value="desc">
            <span class="sort-item-name">
                <?php esc_html_e("Descending", "ultimate-portfolio") ?>
            </span>
        </li>
        <li class="sort-item" data-value="asc">
            <span class="sort-item-name">
                <?php esc_html_e("Ascending", "ultimate-portfolio") ?>
            </span>
        </li>
    </ul>
</div>