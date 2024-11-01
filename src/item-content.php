<?php

/**
 * Item content template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
$load_content = '';

$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
$columns = isset($attributes['columns']) ? $attributes['columns'] : array(
    'Desktop' => 3,
    'Tablet' => 2,
    'Mobile' => 1,
);

$backgroundColor = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#FFFFFF';
$backgroundimageUrl = isset($attributes['backgroundimageUrl']) ? $attributes['backgroundimageUrl'] : '';
$bgFocalPoint = isset($attributes['bgFocalPoint']) ? $attributes['bgFocalPoint'] : '';
//$displayType = isset($attributes['displayType']) ? $attributes['displayType'] : 'post';
$displayType = isset($attributes['displayType']) ? 'up-' . $attributes['displayType'] : 'up-post';

$layouts = isset($attributes['layouts']) ? $attributes['layouts'] : 'grid';
$slidereffect = isset($attributes['slidereffect']) ? $attributes['slidereffect'] : 'slide';
$slidedelay = isset($attributes['slidedelay']) ? $attributes['slidedelay'] : '2500';
$slidesspeed = isset($attributes['slidesspeed']) ? $attributes['slidesspeed'] : '300';
$slidecenter = isset($attributes['slidecenter']) ? $attributes['slidecenter'] : 'false';
$sliderpausemouse = isset($attributes['sliderpausemouse']) ? $attributes['sliderpausemouse'] : 'false';
$sliderarrow = isset($attributes['sliderarrow']) ? $attributes['sliderarrow'] : 'true';
$sliderbullets = isset($attributes['sliderbullets']) ? $attributes['sliderbullets'] : 'true';
$sliderdynamicbullet = isset($attributes['sliderdynamicbullet']) ? $attributes['sliderdynamicbullet'] : '1';
$codeContent = isset($attributes['codeContent']) ? $attributes['codeContent'] : '';

$maxImages = isset($attributes['maxImages']) ? $attributes['maxImages'] : '8';
$imageCount = isset($attributes['imageCount']) ? $attributes['imageCount'] : true;

$filter_layouts = isset($attributes['filter_layouts']) ? $attributes['filter_layouts'] : 'filter_style_minimal';
$filtercolor = isset($attributes['filtercolor']) ? $attributes['filtercolor'] : '#007bff';
$filterbgcolor = isset($attributes['filterbgcolor']) ? $attributes['filterbgcolor'] : '#007bff';
$paginationbgcolor = isset($attributes['paginationbgcolor']) ? $attributes['paginationbgcolor'] : '#007bff';
$filterAlignment = isset($attributes['filterAlignment']) ? $attributes['filterAlignment'] : 'center';
$image_gap = isset($attributes['image_gap']) ? $attributes['image_gap'] : 10;
$upimageheight = isset($attributes['upimageheight']) ? $attributes['upimageheight'] : 350;
$slideheight = isset($attributes['slideheight']) ? $attributes['slideheight'] : 300;
$upimageradius = isset($attributes['upimageradius']) ? $attributes['upimageradius'] : '';

$overlayColor = isset($attributes['overlayColor']) ? $attributes['overlayColor'] : 'rgba(0, 0, 0, 0.7)';
$sources = isset($attributes['sources']) ? $attributes['sources'] : array();
$displayCaption = isset($attributes['displayCaption']) ? $attributes['displayCaption'] : true;
$fetchPostOption = isset($attributes['fetchPostOption']) ? $attributes['fetchPostOption'] : 'post';
$displayDescription = isset($attributes['displayDescription']) ? $attributes['displayDescription'] : false;
$displayCategory = isset($attributes['displayCategory']) ? $attributes['displayCategory'] : false;
$captionOnHover = isset($attributes['captionOnHover']) ? $attributes['captionOnHover'] : false;
$imageContentAlignment = isset($attributes['imageContentAlignment']) ? $attributes['imageContentAlignment'] : 'center';
$hoverStyle = isset($attributes['hoverStyle']) ? $attributes['hoverStyle'] : 'layout-classic';
$layouttextcolor = isset($attributes['layouttextcolor']) ? $attributes['layouttextcolor'] : '#FFFFFF';
$taxonomytextcolor = isset($attributes['taxonomytextcolor']) ? $attributes['taxonomytextcolor'] : '#FFFFFF';
$layouttexthovercolor = isset($attributes['layouttexthovercolor']) ? $attributes['layouttexthovercolor'] : '#FFFFFF';
$layoutdesccolor = isset($attributes['layoutdesccolor']) ? $attributes['layoutdesccolor'] : '#FFFFFF';

$layoutbgcolor = isset($attributes['layoutbgcolor']) ? $attributes['layoutbgcolor'] : '#000000';
$horizontalAlign = isset($attributes['horizontalAlign']) ? $attributes['horizontalAlign'] : 'center';
$verticalAlign = isset($attributes['verticalAlign']) ? $attributes['verticalAlign'] : 'bottom';

$disableLightBox = isset($attributes['disableLightBox']) ? $attributes['disableLightBox'] : true;

$disablesearchicon = isset($attributes['disablesearchicon']) ? $attributes['disablesearchicon'] : true;
$disabldownloadicon = isset($attributes['disabldownloadicon']) ? $attributes['disabldownloadicon'] : true;
$disablelinkicon = isset($attributes['disablelinkicon']) ? $attributes['disablelinkicon'] : true;
$disablevideoicon = isset($attributes['disablevideoicon']) ? $attributes['disablevideoicon'] : true;

$disableshareLightBox = isset($attributes['disableshareLightBox']) ? $attributes['disableshareLightBox'] : true;
$disabletitleLightBox = isset($attributes['disabletitleLightBox']) ? $attributes['disabletitleLightBox'] : true;
$classHook = isset($attributes['classHook']) ? $attributes['classHook'] : '';
$filterItems = isset($attributes['filterItems']) ? $attributes['filterItems'] : array();
$enableFilter = isset($attributes['enableFilter']) ? $attributes['enableFilter'] : false;
$enableFilterAll = isset($attributes['enableFilterAll']) ? $attributes['enableFilterAll'] : true;
$filtercount = isset($attributes['filtercount']) ? $attributes['filtercount'] : false;
$filteralltitle = isset($attributes['filteralltitle']) ? $attributes['filteralltitle'] : 'All';
$sortingcontrol = isset($attributes['sortingcontrol']) ? $attributes['sortingcontrol'] : false;
$searchcontrol = isset($attributes['searchcontrol']) ? $attributes['searchcontrol'] : false;
$ulpagination = isset($attributes['ulpagination']) ? $attributes['ulpagination'] : false;
$paginationType = isset($attributes['paginationType']) ? $attributes['paginationType'] : 'load-paged';
$loadMoreText = isset($attributes['loadMoreText']) ? $attributes['loadMoreText'] : 'Load More';
$loadMoreEndText = isset($attributes['loadMoreEndText']) ? $attributes['loadMoreEndText'] : 'No more elements to show';
$totalItems = count($sources);
$paginationtrue = $ulpagination ? 'up-pagination-on' : '';

// pagination type change it with options array late

$blockMeta = $attributes['blockMeta'];

// sources as limit
$slicedSources = $ulpagination ? array_slice($sources, 0, $maxImages) : ($imageCount ? array_slice($sources, 0, $maxImages) : $sources);

// get svg code
$svgFilePath = __DIR__ . '/assets/images/index-svg.js';
$svgCode = file_get_contents($svgFilePath);
preg_match_all('/function\s+(\w+)/', $svgCode, $functionMatches);
preg_match_all('/<svg\s.*?<\/svg>/s', $svgCode, $svgMatches);
$svgComponents = $svgMatches[0];

$svgsname = array();
foreach ($svgComponents as $index => $svgComponent) {
    $functionName = isset($functionMatches[1][$index]) ? $functionMatches[1][$index] : 'N/A';
    $svgsname[$functionName] = $svgComponent;
}

// Allowed svg tags
$allowed_svg_tags = array(
    'svg' => array(
        'xmlns' => array(),
        'width' => array(),
        'height' => array(),
        'viewBox' => array(),
    ),
    'path' => array(
        'd' => array(),
        'fill' => array(),
    ),
    // Add other SVG elements and attributes as needed.
);

?>

<style>
    <?php echo "
    
    .up-portfolio-img-wrapper.grid {
        gap: " . esc_attr($image_gap) . "px;
    } 

    .up-parent-" . $blockId . ".up-parent-wrapper {
        background-color: " . esc_attr($backgroundColor) . ";
        background-image: url(" . esc_attr($backgroundimageUrl) . ");
    }
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.caption-style-2 .up-portfolio-link-wrapper:after {
        background-color: " . esc_attr($overlayColor) . ";
    }

    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.masonry .up-portfolio-img-content {
        margin-bottom: " . esc_attr($image_gap) . "px;
    }

    .up-parent-" . $blockId . " .up-portfolio-img-content .up-portfolio-link-wrapper a  {
        display:block;
    }
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content {
        width: calc((99.5% / " . esc_attr($columns['Desktop']) . ") - " . esc_attr($image_gap) . "px);
    }

@media all and (max-width: 1024px) {
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content {
        width: calc((100% / " . esc_attr($columns['Tablet']) . ") - " . esc_attr($image_gap) . "px);
    }

    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
        width: calc((100% / " . esc_attr($columns['Tablet']) . ") - " . esc_attr($image_gap) . "px);
    }

    .up-parent-" . $blockId . " .up-portfolio-img-wrapper:not(.slider).up-filterable-img-portfolio .up-portfolio-img-content {
        margin: calc(" . esc_attr($image_gap) . "px / 2);
    }
}

@media all and (max-width: 767px) {
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content,
    .up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content {
        width: calc((100% / " . esc_attr($columns['Mobile']) . ") - " . esc_attr($image_gap) . "px);
    }
}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper.grid .up-portfolio-img-content img {
    height:  " . esc_attr($upimageheight) . "px;
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta .item-category,
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd  .up-portfolio-taxonomy,
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-post-footer {
    color: " . esc_attr($taxonomytextcolor) . ";
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd  svg path{
    stroke : " . esc_attr($taxonomytextcolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta-title a,
.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta span {
    color: " . esc_attr($layouttextcolor) . ";
    transition: all 0.25s ease-in-out;
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta-title a:hover {
    color: " . esc_attr($layouttexthovercolor) . ";
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta-title a:hover {
    color: " . esc_attr($layouttexthovercolor) . ";
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta div.up-description {
    color: " . esc_attr($layoutdesccolor) . ";
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta div.up-description {
    color: " . esc_attr($layoutdesccolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-layout a {
    word-break:break-word;
}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta-title a {
    color: " . esc_attr($layouttextcolor) . ";
    transition: all 0.25s ease-in-out;
}

.up-parent-" . $blockId . " .up-icon-control {
    background-color: " . esc_attr($layoutbgcolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-layout .up-overlay {
    background-color: " . esc_attr($layoutbgcolor) . ";
}


.up-parent-" . $blockId . " .up-portfolio-layout.layout-wave svg {
    fill: " . esc_attr($layoutbgcolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
    width: calc((100% / " . esc_attr($columns['Desktop']) . ") - " . esc_attr($image_gap) . "px);

}

.up-parent-" . $blockId . " .up-portfolio-img-wrapper:not(.slider).up-filterable-img-portfolio .up-portfolio-img-content {
    margin: calc(" . esc_attr($image_gap) . "px / 2) !important;
}

.up-parent-" . $blockId . " .mySwiper-" . $blockId . " .up-portfolio-img-wrapper.slider .up-portfolio-img-content img {
    height: " . esc_attr($slideheight) . "px;
    display: block;
}

.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item:hover span,
.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item.is-checked span {
    color: " . esc_attr($filtercolor) . ";
}

.up-parent-" . $blockId . " .filter-count-tip {
    background: " . esc_attr($filterbgcolor) . ";
}

.up-parent-" . $blockId . " .filter-count-tip:after {
    border-top: 5px solid " . esc_attr($filterbgcolor) . ";
}

.up-parent-" . $blockId . " .up-pagination .page-number:hover,
.up-parent-" . $blockId . " .up-pagination .page-number.active,
.up-parent-" . $blockId . " .up-pagination button:hover {
    background-color: " . esc_attr($paginationbgcolor) . ";
    color: #fff;
    transition: color 0.3s, background-color 0.3s;
}

.up-parent-" . $blockId . " .up-elements-wrap.swiper .swiper-pagination-bullet-active {
    background: " . esc_attr($paginationbgcolor) . ";
}

.up-parent-" . $blockId . " .up-elements-wrap.swiper .swiper-button-next,
.up-parent-" . $blockId . " .up-elements-wrap.swiper .swiper-button-prev {
    background: " . esc_attr($paginationbgcolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item span {
    color: #334155;
}

.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_standerd .filter-item:hover,
.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_standerd .filter-item.is-checked {
    color: " . esc_attr($filtercolor) . ";
    background-color: " . esc_attr($filterbgcolor) . ";
}

.up-parent-" . $blockId . " .filter_style_dropdown ul li:hover,
.up-parent-" . $blockId . " .up-sorting ul li:hover {
    background: " . esc_attr($filterbgcolor) . ";
}

.up-parent-" . $blockId . " .up-portfolio-gallery-filter-wrapper.filter_style_standerd .filter-item {
    color: #334155;
    background-color: #ffffff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}

.up-parent-" . $blockId . " .up-sorting-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: " . esc_attr($filterAlignment) . ";
    padding: 30px 0;
}

.up-parent-" . $blockId . "  .filter-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: " . esc_attr($filterAlignment) . ";
}

.up-parent-" . $blockId . "  .up-portfolio-img-wrapper .videosvg svg {
    top: 35%;
    position: absolute;
    right: 45%;
    width: 50px;
    height: 50px;
}

.up-parent-" . $blockId . "  .up-portfolio-layout .up-overlay-content {
    text-align: " . esc_attr($imageContentAlignment) . ";
}
.up-parent-" . $blockId . " a {
overflow: hidden;
    display: block;
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper .up-portfolio-img-content img {
    border-radius: " . esc_attr($upimageradius) . "%;
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-none .up-portfolio-img-content,
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-classic .up-portfolio-img-content,
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-wave .up-portfolio-img-content{
    border-radius: " . esc_attr($upimageradius) . "%;
}
.up-parent-" . $blockId . " .up-portfolio-img-wrapper.layout-standerd .up-portfolio-img-content img{
    border-radius: " . esc_attr($upimageradius) . "%;
}

.up-elements-wrap {
    opacity: 0;
    transition: opacity 0.5s ease; /* Smooth transition for fading in */
}

$codeContent;

";
    ?>
</style>


<?php

if ($sources && count($sources) === 0) {
    return null;
}

$buttonsArray = ['zoom', 'slideShow', 'fullScreen', 'close'];
$lightBoxHtml = [
    'id' => 'up-portfolio-img-content',
    'data-protect' => true,
    'data-fancybox' => 'image',
    'data-thumbs-position' => 'bottom',
];

if ($disableLightBox) {
    if ($disableshareLightBox) {
        array_splice($buttonsArray, 3, 0, 'share');
    }
} else {
    $buttonsArray = array_slice($buttonsArray, 2);
}

$lightBoxHtml['data-buttons'] = json_encode(array_filter($buttonsArray, function ($button) {
    return $button !== '';
}));

$lightBoxHtmlString = '';
foreach ($lightBoxHtml as $key => $value) {
    $lightBoxHtmlString .= $key . '="' . htmlspecialchars($value) . '" ';
}

// count the number of filter items
$filterCounts = array();

foreach ($sources as $source) {
    if (isset($source['filter'])) {
        $filters = $source['filter'];

        foreach ($filters as $filter) {
            $encodedFilter = htmlspecialchars($filter['value'], ENT_QUOTES, 'UTF-8');

            if (!isset($filterCounts[$encodedFilter])) {
                $filterCounts[$encodedFilter] = 1;
            } else {
                $filterCounts[$encodedFilter]++;
            }
        }
    }
}
?>
<div class="useBlockProps">
    <div data-plugin-ver="<?php echo ULTIMATEPORTFOLIO_BLOCK_VERSION; ?>" class="up-portfolio up-parent-wrapper up-parent-<?php echo esc_attr($blockId); ?> <?php echo esc_attr($paginationtrue); ?> <?php echo esc_attr($classHook); ?>  <?php echo esc_attr($displayType); ?>"
        data-up-layout="<?php echo esc_attr($layouts); ?>"
        data-up-slide-column="<?php echo esc_attr($columns['Desktop']) ?>"
        data-up-slide-gap="<?php echo esc_attr($image_gap); ?>"
        data-up-slide-height="<?php echo esc_attr($upimageheight); ?>"
        data-up-sliderpausemouse="<?php echo esc_attr($sliderpausemouse); ?>"
        data-up-slide-effect="<?php echo esc_attr($slidereffect); ?>"
        data-up-slidecenter="<?php echo esc_attr($slidecenter); ?>"
        data-up-slidesspeed="<?php echo esc_attr($slidesspeed); ?>"
        data-up-slidedelay="<?php echo esc_attr($slidedelay); ?>" <?php if ($bgFocalPoint) { ?>style="background-position: <?php echo ($bgFocalPoint['x'] * 100) . '% ' . ($bgFocalPoint['y'] * 100) . '%'; ?>"
        <?php } ?>>

        <?php if ($enableFilter || $sortingcontrol || $searchcontrol) { ?>
            <div class="up-sorting-controls">
                <?php if ($enableFilter): ?>
                    <?php include 'component/filter/filter.php'; ?>

                <?php endif; ?>

                <div class="up-sorting-search-controls">
                    <?php if ($sortingcontrol): ?>
                        <?php include 'component/sort/sort.php'; ?>
                    <?php endif; ?>

                    <?php if ($searchcontrol): ?>
                        <?php include 'component/search/search.php'; ?>
                    <?php endif; ?>
                </div>
            </div>
        <?php } ?>
        <div class="up-pre-loader">
            <?php echo $svgsname['SvgSpinner']; ?>
        </div>

        <div
            class="up-elements-wrap <?php echo esc_attr(($layouts === "slider" ? "swiper mySwiper-$blockId" : "")); ?>">
            <div id="liveDemo-<?php echo esc_attr($blockId); ?>"
                class="<?php echo esc_attr("up-portfolio-img-wrapper $blockId $layouts $hoverStyle caption-style " . ($captionOnHover ? 'caption-on-hover' : '') . ' up-filterable-img-portfolio'); ?> <?php echo esc_attr(($layouts === "slider" ? "swiper-wrapper" : "")); ?>"
                data-id="<?php echo esc_attr($blockId); ?>" <?php if ($ulpagination): ?>
                    data-total-limit='<?php echo esc_attr(json_encode(array_filter($filterCounts))); ?>'
                    data-pagination-type="<?php echo esc_attr($paginationType); ?>" <?php endif; ?>>
                <?php

                foreach ($slicedSources as $index => $source) {
                    $filters = "";
                    $filterString = "";
                    $filterClass = "";
                    if (isset($source["filter"]) && !empty($source["filter"])) {

                        // Extracting the 'value' field from each filter
                        $filterValues = array_map(function ($filter) {
                            return trim($filter['label']);
                        }, $source["filter"]);
                
                        $filterClass = implode(" ", array_map(function ($value) {
                            // Replace spaces with hyphens and convert to lowercase
                            return "up-filter-img-" . strtolower(str_replace(' ', '-', $value));
                        }, $filterValues));
                        
                
                        $filterString = implode(", ", $filterValues);
                    }
                    $displayType = isset($source['displayType']) ? esc_attr($source['displayType']) : 'posts';
                    $permalink = isset($source['permalink']) ? esc_url($source['permalink']) : 'javascript:void(0)';
                    $url = isset($source['url']) ? esc_url($source['url']) : '';
                    $videoUrl = isset($source['videoUrl']) ? esc_url($source['videoUrl']) : esc_url($source["url"]);
                    $title = isset($source['title']) ? sanitize_text_field($source['title']) : '';
                    $description = isset($source['description']) ? esc_html($source['description']) : '';
                    $author = isset($source['author']) ? esc_html($source['author']) : '';
                    $date = isset($source['date']) ? esc_attr($source['date']) : '';
                    $readingTimeMinutes = isset($source['readingTimeMinutes']) ? esc_html($source['readingTimeMinutes']) : '';
                    $comment = isset($source['comment']) ? esc_html($source['comment']) : '';
                    ?>

                    <?php include 'component/item-style/index-content.php'; ?>

                    <?php
                } ?>

                <?php if ($paginationType === "load-paged") { ?>
                    <div class="loader-paged jg-spinner">
                        <?php echo $svgsname['SvgSpinner']; ?>
                    </div>
                <?php } ?>

            </div>
            <?php
            if ($layouts === "slider") {
                if ($sliderarrow === "true") {
                    echo '<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>';
                }
                if ($sliderbullets === "true") {
                    echo '<div class="swiper-pagination"></div>';
                }
            }
            ?>
        </div>

        <?php if ($ulpagination === true) { ?>
            <?php if ($paginationType === "load-paged") { ?>
                <?php include 'component/pagination/paged.php'; ?>
            <?php } ?>
            <?php if ($paginationType === "load-more") { ?>
                <?php include 'component/pagination/load-more.php'; ?>
            <?php } ?>
            <?php if ($paginationType === "load-scroll") { ?>
                <?php include 'component/pagination/scroll-load.php'; ?>
            <?php } ?>
        <?php } ?>
    </div>
</div>

<?php
//if (isset($_POST['nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'ul_script_nonce')) {
if (isset($_POST['offset'], $_POST['selectedFilter'])) {
    $load_content = 'load-item';
    $selectedFilter = isset($_POST['selectedFilter']) ? sanitize_text_field($_POST['selectedFilter']) : '';
    $filteredItems = $sources;
    $limit = $maxImages; // Set desired limit here

    if ($paginationType === "load-paged") {

        // Extract the page number from the offset value
        $offset = isset($_POST['offset']) ? $_POST['offset'] : '';
        $parsedUrl = parse_url($offset);
        $currentPage = 1;
        if (isset($parsedUrl['query'])) {
            parse_str($parsedUrl['query'], $queryParameters);
            $currentPage = isset($queryParameters['page']) ? intval($queryParameters['page']) : 1;
        }
        $offset = ($currentPage - 1) * $limit;
        if ($selectedFilter === '*') {
            // Filter is '*', include all sources except loaded items
            $filteredItems = $sources;
        } else {
            // Filter the items based on the selected filter
            $filteredItems = array_filter($sources, function ($item) use ($selectedFilter) {
                // Skip the item if 'filter' key does not exist or is not an array
                if (!isset($item['filter']) || !is_array($item['filter'])) {
                    return false;
                }
                // Look for the selected filter within the 'filter' array by 'value'
                foreach ($item['filter'] as $filter) {
                    if (isset($filter['value']) && $filter['value'] === $selectedFilter) {
                        return true;
                    }
                }
                return false;
            });
        }

        $paginatedItems = array_slice($filteredItems, $offset, $limit);
    }
    if ($paginationType === "load-more" || $paginationType === "load-scroll") {

        $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;
        $selectedFilter = $_POST['selectedFilter'];
        $loadedItemsIDs = isset($_POST['itemIds']) ? stripslashes(html_entity_decode($_POST['itemIds'])) : '';
        $itemIdsArray = json_decode($loadedItemsIDs, true);
        $source = isset($_POST['source']) ? sanitize_text_field($_POST['source']) : 'filter';
        // Check if the selected filter is different from '*'
        if ($selectedFilter === '*') {
            // Filter is '*', include all sources except loaded items
            $filteredItems = $sources;
        } else {
            // Filter the items based on the selected filter
            $filteredItems = array_filter($sources, function ($item) use ($selectedFilter) {
                // Skip the item if 'filter' key does not exist or is not an array
                if (!isset($item['filter']) || !is_array($item['filter'])) {
                    return false;
                }

                // Check if the selected filter value is in any of the filter item values
                foreach ($item['filter'] as $filter) {
                    if (isset($filter['value']) && $filter['value'] === $selectedFilter) {
                        return true;
                    }
                }

                return false;
            });
        }

        if ($source !== 'filter') {
            // Remove loaded items from the filtered items
            foreach ($itemIdsArray as $loadedItemID) {
                if (isset($filteredItems[$loadedItemID])) {
                    unset($filteredItems[$loadedItemID]);
                }
            }
        }


        $limit = $maxImages; // Set desired limit here
        $startIndex = $offset;
        $endIndex = $startIndex + $limit - 1;
        $paginatedItems = [];
        $itemIdsArray = array_map('intval', $itemIdsArray); // Convert item IDs to integers
        $counter = $startIndex; // Initialize the counter with the offset
        foreach ($filteredItems as $key => $value) {
            if (!in_array($value['id'], $itemIdsArray) && $counter >= $startIndex) {
                $paginatedItems[$key] = $value;
                if ($counter >= $endIndex) {
                    break; // Break the loop when reaching the end index
                }
            }
            $counter++; // Increment the counter after each iteration
        }

    }


    foreach ($paginatedItems as $index => $source) {
        $filters = "";
        $filterString = "";
        $filterClass = "";
        if (isset($source["filter"]) && !empty($source["filter"])) {
            // Extracting the 'value' field from each filter
            $filterValues = array_map(function ($filter) {
                return trim($filter['value']);
            }, $source["filter"]);

            $filterClass = implode(" ", array_map(function ($value) {
                return "up-filter-img-" . $value;
            }, $filterValues));

            $filterString = implode(", ", $filterValues);
        }

        $displayType = isset($source['displayType']) ? esc_attr($source['displayType']) : 'posts';
        $permalink = isset($source['permalink']) ? esc_url($source['permalink']) : 'javascript:void(0)';
        $url = isset($source['url']) ? esc_url($source['url']) : '';
        $videoUrl = isset($source['videoUrl']) ? esc_url($source['videoUrl']) : esc_url($source["url"]);
        $title = isset($source['title']) ? sanitize_text_field($source['title']) : '';
        $description = isset($source['description']) ? esc_html($source['description']) : '';
        $author = isset($source['author']) ? esc_html($source['author']) : '';
        $date = isset($source['date']) ? esc_attr($source['date']) : '';
        $readingTimeMinutes = isset($source['readingTimeMinutes']) ? esc_html($source['readingTimeMinutes']) : '';
        $comment = isset($source['comment']) ? esc_html($source['comment']) : '';
        ?>
        <?php include 'component/item-style/index-content.php'; ?>
    <?php
    }
}
?>

<script>
    // Pre loader for loading
    jQuery(window).on('load', function () {
        jQuery(".up-pre-loader").css({
            "opacity": "0",
            "pointer-events": "none"
        });
    });

    // Fade in the .up-elements-wrap and fade out the preloader when all images inside it have been loaded
    jQuery(".up-elements-wrap img").on('load', function () {
        // Add 'loaded' class to the images that have loaded
        jQuery(this).addClass('loaded');

        // Check if all images are loaded
        if (jQuery(".up-elements-wrap img").length === jQuery(".up-elements-wrap img.loaded").length) {
            jQuery(".up-pre-loader").css({
                "opacity": "0",
                "pointer-events": "none"
            });
            // Fade in the .up-elements-wrap
            jQuery(".up-elements-wrap").css("opacity", "1");
        }
    }).each(function () {
        if (this.complete) {
            jQuery(this).trigger('load');
        }
    });
    document.addEventListener("DOMContentLoaded", (event) => {

        // Select the element you want to check
        const parentElement = document.querySelector(".up-portfolio-img-wrapper");

        // Create a new MutationObserver instance
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // Check if new nodes have been appended to the parent element
                    if (mutation.addedNodes.length > 0) {
                        jQuery('[data-fancybox="gallery-<?php echo $blockId; ?>"]').fancybox({
                            arrows: true, // Show navigation arrows
                        });
                    }
                }
            }
        });
        // Start observing the parent element for mutations
        observer.observe(parentElement, {
            childList: true
        });
        // Apply Fancybox to existing elements
        jQuery('[data-fancybox="gallery-<?php echo $blockId; ?>"]').fancybox({
            arrows: true, // Show navigation arrows
            //loop: true, // Enable looping through the gallery
        });

        if (jQuery('.elementskit-fitcontent-tab').length) {
            jQuery('.up-portfolio-img-wrapper').imagesLoaded(function () {
                // Initialize Isotope
                jQuery('.up-portfolio-img-wrapper.grid').isotope({
                    itemSelector: '.up-portfolio-img-content',
                });

                jQuery('.up-portfolio-img-wrapper.masonry').isotope({
                    itemSelector: '.up-portfolio-img-content',
                    // layoutMode: 'masonry'
                    // Add other options as needed
                });

                // Attach the click event handler with a condition based on data-ekit-handler-id
                jQuery('[data-ekit-toggle-trigger]').on('click', function () {
                    var handlerId = jQuery(this).data('ekit-handler-id');

                    // Check if the handlerId is "masonry"
                    if (handlerId === 'masonry' || handlerId === 'grid') {
                        // Perform actions specific to Masonry
                        setTimeout(function () {
                            jQuery('.up-portfolio-img-wrapper').isotope('layout');

                        }, 10); // Adjust the delay (in milliseconds) as needed
                    }
                });
            });
        }


    });
</script>