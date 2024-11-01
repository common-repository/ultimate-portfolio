<?php
/**
 * Item content part template.
 *
 * @package @@plugin_name
 */

if (!defined('ABSPATH')) {
    exit;
}
$displayType = isset($attributes['displayType']) ? $attributes['displayType'] : 'post';
$up_genral_settings = get_option('ultimate_portfolio_form_data');
$up_genral_settings = unserialize($up_genral_settings);
$lazyLoadStatus = isset($up_genral_settings['lazy_load']) && $up_genral_settings['lazy_load'] ? 'lazy' : 'eager';
$photoID = isset($up_genral_settings['image_id']) ? $up_genral_settings['image_id'] : null;

?>
<div class="<?php echo esc_attr($load_content); ?> up-portfolio-img-content <?php echo esc_attr($filterClass); ?> <?php echo ($layouts === "slider" ? "swiper-slide" : ""); ?>"
    data-item-id="<?php echo esc_attr($index); ?>">

    <?php if ($disablesearchicon || ($disablelinkicon && isset($source['permalink'])) || $disabldownloadicon || ($disablevideoicon && $source["mediaType"] === "video")): ?>
        <div class="up-icon-control">
            <?php
            if ($disablesearchicon) { ?>
                <a class="up-lightbox" href="<?php echo esc_url($url); ?>"
                    data-fancybox="search-<?php echo esc_attr($blockId); ?>">
                    <?php echo wp_kses($svgsname['SvgSearch'], $allowed_svg_tags); ?>
                </a>
            <?php } ?>
            <?php if ($disablelinkicon && isset($source['permalink'])) { ?>
                <a href="<?php echo esc_url($permalink); ?>">
                    <?php echo wp_kses($svgsname['SvgLink'], $allowed_svg_tags); ?>
                </a>
            <?php }
            if ($disabldownloadicon) { ?>
                <a download href="<?php echo esc_url($url); ?>">
                    <?php echo wp_kses($svgsname['SvgDownload'], $allowed_svg_tags); ?>
                </a>
            <?php }
            if ($disablevideoicon && $source["mediaType"] === "video") { ?>
                <a href="<?php echo esc_url($videoUrl); ?>" data-fancybox="video-<?php echo esc_attr($blockId); ?>">
                    <?php echo wp_kses($svgsname['SvgPlay'], $allowed_svg_tags); ?>
                </a>
            <?php } ?>
        </div>
    <?php endif; ?>
    <a rel="liveDemo-<?php echo esc_attr($blockId); ?>" <?php if ($disableLightBox) { ?> data-fancybox="gallery-<?php echo esc_attr($blockId);
       } ?>" class="justWrap-<?php echo $blockId; ?>" href="<?php
           if ($source["mediaType"] === "video") {
               if ($disableLightBox) {
                   echo esc_url($videoUrl);
               } else {
                   echo "javascript:void(0)";
               }
           } else {
               if ($disableLightBox) {
                   echo esc_url($url);
               } else {
                   if ($displayType === "posts") {
                       echo esc_url($permalink);
                   } else {
                       echo esc_url($permalink);
                   }
               }
           }
           ?>" <?php if ($disableLightBox) {
               echo $lightBoxHtmlString;
           } ?> data-caption="<?php
             $caption = '';
             if ($disabletitleLightBox) {
                 $caption .= "<h3>" . esc_html($title) . "</h3>";
             }
             echo esc_html($caption);
             ?>">
        <?php
         if (isset($source['id']) && ($displayType === 'gallery' || $displayType === 'posts')) {

            $default_image_id = get_option('ultimate_portfolio_default_image_id', 0);

            if (!empty($photoID)) {
                $default_image_id = $photoID;
            }

            $up_attachment_id = !empty($source['id']) ? $source['id'] : $default_image_id;

            $image_attributes = wp_get_attachment_image_src($up_attachment_id, 'full');
            // Initialize variables to avoid undefined variable errors
            $url = isset($source['url']) ? esc_url($source['url']) : '';
            $image_url = '';
            $image_width = '';
            $image_height = '';
            $image_srcset = '';
            if ($image_attributes) {
                $image_url = $image_attributes[0];
                $image_width = $image_attributes[1];
                $image_height = $image_attributes[2];
                $image_srcset = wp_get_attachment_image_srcset($up_attachment_id, 'full');
            }


            // If $image_url is still empty, set it to $url
            if (empty($image_url)) {
                $image_url = $url;
            }
            // Only output image if the URL is set
            if ($image_url) {
                ?>
                <img style="object-fit: cover; object-position: <?php echo $source["focalPoint"]["x"] * 100 ?>% <?php echo $source["focalPoint"]["y"] * 100 ?>%"
                    decoding="async" loading="<?php echo esc_attr($lazyLoadStatus); ?>"
                    width="<?php echo esc_attr($image_width); ?>" height="<?php echo esc_attr($image_height); ?>"
                    src="<?php echo esc_url($image_url); ?>" alt=""
                    class="wp-image-<?php echo $up_attachment_id; ?> up-portfolio-img"
                    srcset="<?php echo esc_attr($image_srcset); ?>" sizes="" data-sizes="auto"
                    data-src="<?php echo esc_url($image_url); ?>" data-srcset="<?php echo esc_attr($image_srcset); ?>">
                <?php
            }
        } else {
            // Output image for other cases, ensure $url and $index are defined
            ?>
            <img style="object-fit: cover; object-position: <?php echo $source["focalPoint"]["x"] * 100 ?>% <?php echo $source["focalPoint"]["y"] * 100 ?>%"
                loading="<?php echo esc_attr($lazyLoadStatus); ?>" class="up-portfolio-img"
                src="<?php echo esc_url($url); ?>" image-index="<?php echo esc_attr($index); ?>"
                srcset="<?php echo esc_attr($url); ?>" />
            <span>OTHER DATA!!</span>
            <?php
        } ?>

        <?php if ($source["mediaType"] === "video") { ?>
            <div class="videosvg">
                <?php echo $svgsname['SvgPlay']; ?>
            </div>
        <?php } ?>
    </a>

    <?php if ($hoverStyle === "layout-classic") { ?>
        <?php include 'classic/content.php'; ?>
    <?php } ?>
    <?php if ($hoverStyle === "layout-standerd") { ?>
        <?php include 'standerd/content.php'; ?>
    <?php } ?>
    <?php if ($hoverStyle === "layout-wave") { ?>
        <?php include 'wave/content.php'; ?>
    <?php } ?>
</div>