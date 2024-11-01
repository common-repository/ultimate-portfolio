<?php
/**
 * Pagination template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}

//$itemsPerPage = 10; // Number of items per page

$totalPages = ceil($totalItems / $maxImages); // Calculate the total number of pages

// Get the current page
$currentPage = 1;

if ($maxImages < $totalItems) {
    // Display the pagination
    echo '<div id="pagination" class="up-pagination pagination-load-paged" data-total-pages="' . esc_attr($totalPages) . '" data-page-limit="' . esc_attr($maxImages) . '" data-total-item="' . esc_attr($totalItems) . '" >';
    echo '<div class="prev">';

    $prevPageUrl = '?page=' . max($currentPage - 1, 1);
    echo '<a class="page-number" href="' . esc_url($prevPageUrl) . '">' . wp_kses($svgsname['SvgPrev'], $allowed_svg_tags) . ' </a>';

    echo '</div>';
    echo '<div id="pageNumbers" class="pagelinks">';

    if ($currentPage != 1) {
        echo '<a href="?page=1" class="page-number">1</a>';
    }
    if ($currentPage > 3 && $totalPages > 5) {
        echo '<span>...</span>';
    }
    for ($i = max(1, min($totalPages - 4, $currentPage - 2)); $i <= min($totalPages - 1, max(5, $currentPage + 2)); $i++) {

        if ($i == $currentPage) {
            echo '<a href="?page=' . esc_attr($i) . '" class="page-number active">' . esc_html($i) . '</a>';
        } else {
            echo '<a href="?page=' . esc_attr($i) . '" class="page-number">' . esc_html($i) . '</a>';
        }
    }
    if ($currentPage < $totalPages - 2 && $totalPages > 5) {
        echo '<span>...</span>';
    }
    if ($currentPage != $totalPages) {
        echo '<a href="?page=' . esc_attr($totalPages) . '" class="page-number">' . esc_html($totalPages) . '</a>';
    }

    echo '</div>';
    echo '<div class="next">';
    if ($currentPage < $totalPages) {
        $nextPageUrl = '?page=' . min($currentPage + 1, $totalPages);
        echo '<a class="page-number" href="' . esc_url($nextPageUrl) . '">' . wp_kses($svgsname['SvgNext'], $allowed_svg_tags) . ' </a>';
    } else {
        echo 'Next';
    }
    echo '</div>';
    echo '</div>';

}

?>