/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	BaseControl,
	ToolbarGroup,
	ToolbarItem,
	ToolbarButton,
	Button,
	TextControl,
	TextareaControl,
	SelectControl,
	FocalPointPicker,
	Notice,
} from "@wordpress/components";

import { Fragment } from "@wordpress/element";

import React, { useEffect, useState, useRef } from "react";

import $ from "jquery";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

import {
	SvgWave,
	SvgSearch,
	SvgLink,
	SvgDownload,
	SvgPlay,
	SvgDown,
	SvgClose,
	SvgImageAddIcon,
	SvgContentCheck,
	SvgRightArrow,
	SvgFilterWiz,
	SvgPaginationWiz,
	SvgLightbox,
	SvgNext,
	SvgPrev,
	Svgcalendar,
	Svgtime,
	SvgComment,
} from "./assets/images/index-svg";

import shortid from "shortid";

//import defaultImagePath from "./assets/images/default_image.png";

import GalleryBlock from "./sortableGallery";
import { ContentSource, ContentLayoutType } from "./social-control";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit(props) {
	const { attributes, setAttributes, className } = props;
	const {
		displayType,
		displayContent,
		selectedDeviceType,
		blockId,
		blockMeta,
		images,
		layouts,
		slidereffect,
		slidecenter,
		slideheight,
		sliderloop,
		slidesspeed,
		slidedelay,
		sliderpausemouse,
		sliderarrow,
		sliderbullets,
		sliderdynamicbullet,
		filter_layouts,
		filtercolor,
		filterbgcolor,
		columns,
		image_gap,
		imageCount,
		maxImages,
		sources,
		displayCaption,
		displayDescription,
		displayCategory,
		captionSource,
		descriptionSource,
		captionOnHover,
		overlayColor,
		backgroundColor,
		backgroundimageUrl,
		horizontalAlign,
		verticalAlign,
		hoverStyle,
		layoutbgcolor,
		taxonomytextcolor,
		layouttextcolor,
		layouttexthovercolor,
		layoutdesccolor,
		paginationbgcolor,
		imageSize,
		imageContentAlignment,
		classHook,
		filterItems,
		filterAlignment,
		enableFilter,
		enableFilterAll,
		filtercount,
		filteralltitle,
		loadMoreText,
		loadMoreEndText,
		sortingcontrol,
		searchcontrol,
		posts,
		filterpost,
		avoidDuplicates,
		postOffset,
		disablesearchicon,
		disablelinkicon,
		disabldownloadicon,
		disablevideoicon,
		paginationType,
		fetchPostOption,
		excludedPosts,
		excludedPages,
		excludedPortfolios,
		excludedPostTags,
		excludedPortfolioTags,
		excludedCategories,
		excludedPortfolioCategories,
		ulportfoliotaxonomydate,
		ulportfoliotaxonomytime,
		ulportfoliotaxonomyauthor,
		ulportfoliotaxonomycomment,
		taxonomyRelation,
		postdirection,
		postorder,
		upimageheight,
		ulpagination,
		upimageradius,
		bgFocalPoint,
	} = attributes;

	//console.log(attributes);
	let lazyLoadStatus, defaultImagePath, imageId;

	if (up_genral_setting_Data) {
		lazyLoadStatus = up_genral_setting_Data.lazyLoadStatus;
		defaultImagePath = up_genral_setting_Data.photoSrc;
		imageId = up_genral_setting_Data.imageId;
	}

	const prefix = "up-uid-";

	const totalItems = sources.length;
	const totalPages = Math.ceil(totalItems / maxImages);
	const currentPage = 1;

	const prevPageUrl = `?page=${currentPage - 1}`;
	const nextPageUrl = `?page=${currentPage + 1}`;

	useEffect(() => {
		// Don't generate a new ID when the component updates
		// Only generate a new ID when the block is first added
		if (!attributes.blockId) {
			setAttributes({
				...attributes,
				blockId: prefix + shortid.generate(),
			});
		}
	}, []);


	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `
		.up-parent-wrapper.${blockId} {
			background-color: ${backgroundColor};
			background-image: url('${backgroundimageUrl}');
		}

		.up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content, 
		.up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content {
			width: calc((100% / ${columns.Desktop}) -  ${image_gap}px);
		}

		.up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
			width: calc((100% / ${columns.Desktop}) -  ${image_gap}px);
		}
		.up-portfolio-img-wrapper:not(.slider).up-filterable-img-portfolio .up-portfolio-img-content {
			margin: calc(${image_gap}px / 2);
		}
	`;

	const wrapperStylesTab = `
		.up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content, 
		.up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content{
			width: calc((100% / ${columns.Tablet}) -  ${image_gap}px);
		}

		.up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
			width: calc((100% / ${columns.Tablet}) -  ${image_gap}px);
		}
		.up-portfolio-img-wrapper:not(.slider).up-filterable-img-portfolio .up-portfolio-img-content {
			margin: calc(${image_gap}px / 2);
		}
		.up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
            max-width: 100%;
            height: auto;
        }
		
	`;
	const wrapperStylesMobile = `
		.up-portfolio-img-wrapper.grid.layout-classic .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-wave .up-portfolio-img-content,
		.up-portfolio-img-wrapper.grid.layout-standerd .up-portfolio-img-content, 
		.up-portfolio-img-wrapper.grid.layout-none .up-portfolio-img-content{
			width: calc((100% /${columns.Mobile}) -  ${image_gap}px);
		}
		.up-portfolio-img-wrapper.up-filterable-img-portfolio.masonry .up-portfolio-img-content {
			width: calc((100% / ${columns.Mobile}) -  ${image_gap}px);
		}
		.up-portfolio-img-wrapper:not(.slider).up-filterable-img-portfolio .up-portfolio-img-content {
			margin: calc(${image_gap}px / 2);
		}
		
	`;

	const imageStylesDesktop = `
		.up-portfolio-img-wrapper a {
			overflow: hidden;
			display: block;
		}
		.up-portfolio-img-wrapper .up-portfolio-img-content img {
			border-radius: ${upimageradius}%;
		}
		.up-portfolio-img-wrapper.grid .up-portfolio-img-content img {
			height: ${upimageheight}px;
			width: 100%;
		}
		.up-portfolio-img-wrapper.caption-style-2 .up-portfolio-link-wrapper:after {
			background-color: ${overlayColor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout .up-overlay {
			background-color: ${layoutbgcolor};
		}
		.up-portfolio-layout.layout-wave svg{
			fill: ${layoutbgcolor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout .up-overlay-content-meta .item-category {
			color :${taxonomytextcolor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout .up-overlay-content-meta .up-portfolio-taxonomy {
			color: ${taxonomytextcolor};
		}
		
		.up-portfolio-img-wrapper .up-portfolio-layout .up-overlay-content-meta .up-portfolio-taxonomy svg path{
			stroke: ${taxonomytextcolor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta-title a,
		.up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta span {
			color: ${layouttextcolor};
			transition: all 0.25s ease-in-out;
		}
		.up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta-title a {
			color: ${layouttextcolor};
			transition: all 0.25s ease-in-out;
		}
		.up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta-title a:hover {
			color: ${layouttexthovercolor};
		}
		.up-portfolio.posts .up-portfolio-layout.layout-standerd .up-post-footer {
			color: ${taxonomytextcolor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta-title a:hover {
			color: ${layouttexthovercolor};
		}
		.up-portfolio-img-wrapper.layout-standerd .up-portfolio-layout .up-overlay-content-meta div.up-description {
			color: ${layoutdesccolor};
		}
		.up-portfolio-img-wrapper .up-portfolio-layout:not(.layout-standerd) .up-overlay-content-meta div.up-description {
			color: ${layoutdesccolor};
		}
	
		.up-portfolio-layout .up-overlay-content {
            text-align: ${imageContentAlignment};
        }
		.up-portfolio-layout:not(.layout-standerd) .up-overlay {
			justify-content: ${imageContentAlignment};
		}
		.up-portfolio-img-wrapper.slider .up-portfolio-img-content img {
			width: 100%;
			object-fit: cover;

		}
		.mySwiper-${blockId} .up-portfolio-img-wrapper.slider .up-portfolio-img-content img {
			height:  ${slideheight}px;
			display: block;
		}
		.up-icon-control {
			background-color: ${layoutbgcolor};
		}
		.up-pagination .page-number:hover, .up-pagination .page-number.active, .up-pagination button:hover {
			background-color: ${paginationbgcolor};
			color: #fff;
			transition: color 0.3s, background-color 0.3s;
		}
		.up-elements-wrap.swiper .swiper-pagination-bullet-active {
			background: ${paginationbgcolor};
		}
		.up-elements-wrap.swiper .swiper-button-next,
			.up-elements-wrap.swiper .swiper-button-prev {
			background: ${paginationbgcolor};
		}

	`;

	const filterStylesDesktop = `
		.up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item.is-checked span {
			color:  ${filtercolor};
		}
		.up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item span {
			color: #000000;
		}
		/* .up-portfolio-gallery-filter-wrapper.filter_style_minimal .filter-item span .ul-filter-count{
			background-color: #000;
			color: #ffffff;
		} */
		.up-portfolio-gallery-filter-wrapper.filter_style_standerd .filter-item.is-checked {
			color:  ${filtercolor};
			background-color:  ${filterbgcolor};
		}
		.up-portfolio-gallery-filter-wrapper.filter_style_standerd .filter-item {
			color: #334155;
			background-color: #ffffff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
			margin-bottom: 10px;
		}
		.filter_style_dropdown ul li:hover,.up-sorting ul li:hover {
			background: ${filterbgcolor};
		}
		.up-parent-wrapper .up-sorting-controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: ${filterAlignment};
			padding: 20px;
        }
		.filter-items {
			display: flex;
			flex-wrap: wrap;
			justify-content: ${filterAlignment};
		}

		.up-portfolio-gallery-filter-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			padding: 0;
			list-style: none; /* remove the default bullet points */
		}
    `;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = `
		${wrapperStylesDesktop}
		${imageStylesDesktop}
		${filterStylesDesktop}
	`;

	const tabAllStyles = `
		${wrapperStylesTab}
	`;

	const mobileAllStyles = `
		${wrapperStylesMobile}		
	`;

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			Desktop: desktopAllStyles,
			Tablet: tabAllStyles,
			Mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	const blockProps = useBlockProps({
		className: classnames(
			className,
			`up-guten-block-main-parent-wrapper`,
			`alignwide`,
		),
	});

	useEffect(() => {
		let path = "";

		if (fetchPostOption === "post") {
			path = "/wp/v2/posts";
		} else if (fetchPostOption === "page") {
			path = "/wp/v2/pages";
		} else if (fetchPostOption === "portfolio") {
			path = "/wp/v2/ultimate_portfolio";
		}

		path += `?per_page=100&_embed&order=${postdirection}&tax_relation=${taxonomyRelation}&orderby=${postorder}`;

		if (avoidDuplicates) {
			path += "&meta_key=_unique_id"; // Assuming you have a custom field named "_unique_id" for avoiding duplicates
		}
		const selectedPostIDs = excludedPosts.map((post) => post.value);
		const selectedPageIDs = excludedPages.map((page) => page.value);

		const selectedPortfolioIDs = excludedPortfolios.map(
			(portfolio) => portfolio.value,
		);
		const selectedPostTagIDs = excludedPostTags.map((tag) => tag.value);
		const selectedCategoryIDs = excludedCategories.map(
			(category) => category.value,
		);
		// portfolio
		const selectedPortfolioTagIDs = excludedPortfolioTags.map(
			(ultimate_portfolio_tag) => ultimate_portfolio_tag.value,
		);
		const selectedPortfolioCategoryIDs = excludedPortfolioCategories.map(
			(ultimate_portfolio_category) => ultimate_portfolio_category.value,
		);

		const excludedIDs = [];

		if (
			fetchPostOption === "post" &&
			excludedPosts &&
			excludedPosts.length > 0
		) {
			excludedIDs.push(...selectedPostIDs);
		} else if (
			fetchPostOption === "page" &&
			excludedPages &&
			excludedPages.length > 0
		) {
			excludedIDs.push(...selectedPageIDs);
		} else if (
			fetchPostOption === "portfolio" &&
			excludedPortfolios &&
			excludedPortfolios.length > 0
		) {
			excludedIDs.push(...selectedPortfolioIDs);
		}

		if (excludedIDs.length > 0) {
			const excludedIDsString = excludedIDs.join(",");
			path += `&exclude=${excludedIDsString}`;
		}

		if (excludedPostTags && excludedPostTags.length > 0) {
			const selectedTagsString = selectedPostTagIDs.join(",");
			path += `&tags=${selectedTagsString}`;
		}

		if (excludedCategories && excludedCategories.length > 0) {
			const selectedCategoriesString = selectedCategoryIDs.join(",");
			path += `&categories=${selectedCategoriesString}`;
		}
		// portfolio
		if (excludedPortfolioTags && excludedPortfolioTags.length > 0) {
			const selectedTagsString = selectedPortfolioTagIDs.join(",");
			path += `&ultimate_portfolio_tag=${selectedTagsString}`;
		}

		if (excludedPortfolioCategories && excludedPortfolioCategories.length > 0) {
			const selectedCategoriesString = selectedPortfolioCategoryIDs.join(",");
			path += `&ultimate_portfolio_category=${selectedCategoriesString}`;
		}

		if (postOffset > 0) {
			path += `&offset=${postOffset}`;
		}

		wp.apiFetch({ path })
			.then((posts) => {
				setAttributes({ posts });
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	}, [
		fetchPostOption,
		excludedPosts,
		excludedPages,
		excludedPortfolios,
		excludedPostTags,
		excludedPortfolioTags,
		excludedCategories,
		excludedPortfolioCategories,
		taxonomyRelation,
		postdirection,
		postorder,
		avoidDuplicates,
		postOffset,
	]);

	let content = "";
	switch (displayType) {
		case "gallery":
			content = images;
			break;
		case "posts":
			content = posts;
			break;
		default:
			// Handle unknown display type
			break;
	}

	let media_type;

	useEffect(() => {
		const currentSources = [];
		//let filterItems = [];

		// let sources = [];
		let galleryFilterItems = []; // Separate array for gallery filters
		let postFilterItems = []; // Separate array for posts filters
		let portfolioFilterItems = []; // Separate array for posts filters
		content &&
			content.map((image) => {
				let item = {};
				if (!image.mediaType) {
					item.mediaType = "image";
				} else {
					item.mediaType = image.mediaType;
				}
				if (image.videoUrl) {
					item.videoUrl = image.videoUrl;
				}
				if (displayType === "gallery") {
					if (image.sizes && imageSize && imageSize.length > 0) {
						item.url = image.sizes[imageSize]
							? image.sizes[imageSize].url
							: image.url;
					} else {
						item.url = image.url;
					}

					if (image.categories) {
						item.filter = image.categories;
						item.filter.forEach((filter) => {
							if (
								!galleryFilterItems.find(
									(f) => f.value === filter.value && f.label === filter.label,
								)
							) {
								galleryFilterItems.push(filter);
							}
						});
					}
					item.height = image.height;
					item.width = image.width;
					item.sizes = image.sizes;
					item.id = image.id;
					switch (descriptionSource) {
						case "custom":
							const customDescription = image.customDescription;
							item.description =
								customDescription ??
								image.description.split(" ").slice(0, 15).join(" ");
							break;
						case "description":
							item.description = image.description;
							break;
						default:
							item.description = "";
							break;
					}

					switch (captionSource) {
						case "title":
							item.title = image.title;
							break;
						case "custom":
							const customTitle = image.customTitle;
							item.title = customTitle ?? image.title;
							break;
						case "caption":
							item.title = image.caption;
							break;
						case "alt":
							item.title = image.alt;
							break;
						case "description":
							item.title = image.description.split(" ").slice(0, 15).join(" ");
							break;
						default:
							item.title = "";
							break;
					}
				}
				if (displayType === "posts") {
					if (
						"wp:featuredmedia" in image._embedded &&
						image._embedded["wp:featuredmedia"].length > 0
					) {
						const media = image._embedded["wp:featuredmedia"][0];
						if (
							media.media_details &&
							media.media_details.sizes &&
							imageSize &&
							imageSize.length > 0 &&
							imageSize in media.media_details.sizes
						) {
							item.url = media.media_details.sizes[imageSize].source_url;
						} else {
							item.url = media.source_url;
						}
						item.sizes = media.media_details.sizes;
						item.height = media.media_details.height;
						item.width = media.media_details.width;
					} else {
						item.url = defaultImagePath;
					}

					if (fetchPostOption === "post") {
						if (filterpost === "category") {
							item.filter = image._embedded["wp:term"][0].map((category) => ({
								value: category.slug,
								label: category.name,
								type: "post",
							}));
							item.filter.forEach((filter) => {
								if (
									!postFilterItems.find(
										(f) => f.value === filter.value && f.label === filter.label,
									)
								) {
									postFilterItems.push(filter);
								}
							});
						} else {
							item.filter = image._embedded["wp:term"][1].map((post_tag) => ({
								value: post_tag.slug,
								label: post_tag.name,
								type: "post",
							}));
							item.filter.forEach((filter) => {
								if (
									!postFilterItems.find(
										(f) => f.value === filter.value && f.label === filter.label,
									)
								) {
									postFilterItems.push(filter);
								}
							});
						}
					}
					if (fetchPostOption === "portfolio") {
						if (image._embedded && image._embedded["wp:term"]) {
							if (filterpost === "category") {
								if (image._embedded["wp:term"][0]) {
									item.filter = image._embedded["wp:term"][0].map(
										(ultimate_portfolio_category) => ({
											value: ultimate_portfolio_category.slug,
											label: ultimate_portfolio_category.name,
											type: "post",
										}),
									);

									item.filter.forEach((filter) => {
										if (
											!postFilterItems.find(
												(f) =>
													f.value === filter.value && f.label === filter.label,
											)
										) {
											postFilterItems.push(filter);
										}
									});
								} else {
									// No category available. Handle this case appropriately.
									item.filter = [];
									console.log("No category available for this portfolio item.");
								}
							} else {
								if (image._embedded["wp:term"][1]) {
									item.filter = image._embedded["wp:term"][1].map(
										(ultimate_portfolio_tag) => ({
											value: ultimate_portfolio_tag.slug,
											label: ultimate_portfolio_tag.name,
											type: "post",
										}),
									);
									item.filter.forEach((filter) => {
										if (
											!postFilterItems.find(
												(f) =>
													f.value === filter.value && f.label === filter.label,
											)
										) {
											postFilterItems.push(filter);
										}
									});
								} else {
									// No tag available. Handle this case appropriately.
									item.filter = [];
									console.log("No tag available for this portfolio item.");
								}
							}
						} else {
							// No "wp:term" available. Handle this case appropriately.
							item.filter = [];
							console.log('No "wp:term" available for this portfolio item.');
						}
					}

					item.permalink = image.link;
					item.id = image.featured_media;

					item.description = image.excerpt.rendered.replace(/<\/?p>/g, "");
					item.description = item.description.split(" ").slice(0, 15).join(" ");

					item.title = image.title.rendered;

					const options = { year: "numeric", month: "long", day: "numeric" };
					const formattedDate = new Date(image.date).toLocaleDateString(
						undefined,
						options,
					);

					item.date = formattedDate;

					item.author = image._embedded.author[0].name;
					if (
						image &&
						image._embedded &&
						image._embedded.replies &&
						image._embedded.replies[0]
					) {
						item.comment = image._embedded.replies[0].length;
					} else {
						item.comment = "No Comments"; // or some default value
					}

					const wordsPerMinute = 200; // Average reading speed in WPM

					const words = item.description
						.split(/\s+/)
						.filter((word) => word).length;

					// Calculate reading time without rounding
					const rawReadingTimeMinutes = words / wordsPerMinute;

					if (rawReadingTimeMinutes < 1) {
						item.readingTimeMinutes = "less Than 1";
					} else {
						// Now we can round since we've handled the < 1 case
						const roundedReadingTime = Math.ceil(rawReadingTimeMinutes);
						item.readingTimeMinutes = roundedReadingTime.toString();
					}
				}

				if (image.permalink) {
					item.permalink = image.permalink;
				} else {
					image.permalink = "#";
				}

				if (image.focalPoint && image.focalPoint.x && image.focalPoint.y) {
					item.focalPoint = image.focalPoint;
				} else {
					item.focalPoint = {
						x: 0.5,
						y: 0.5,
					};
				}

				currentSources.push(item);
			});

		let filterItemsnew = [];
		if (displayType === "gallery") {
			// Merge filterItems with galleryFilterItems outside the loop
			galleryFilterItems = [...filterItems, ...galleryFilterItems];

			// Optional: Remove duplicates (if needed)
			galleryFilterItems = galleryFilterItems.reduce((acc, item) => {
				if (
					!acc.find(
						(filterItem) =>
							filterItem.value === item.value &&
							filterItem.label === item.label,
					)
				) {
					acc.push(item);
				}
				return acc;
			}, []);

			// Filter out items with type 'post'
			filterItemsnew = galleryFilterItems.filter(
				(item) => item.type !== "post",
			);
		} else {
			filterItemsnew = postFilterItems;
		}

		setAttributes({ sources: currentSources, filterItems: filterItemsnew });
	}, [
		content,
		imageSize,
		captionSource,
		descriptionSource,
		filterpost,
		media_type,
	]);

	const isotopeRef = useRef(null);
	const mySwiper = useRef(null);
	const [filterKey, setFilterKey] = useState("*");
	useEffect(() => {
		const imageGallery = document.querySelector(".up-filterable-img-portfolio");

		if (
			isotopeRef.current &&
			typeof isotopeRef.current.destroy === "function"
		) {
			isotopeRef.current.destroy();
			isotopeRef.current = null;
		}
		if (mySwiper.current) {
			mySwiper.current.destroy();
			mySwiper.current = null;
		}
		if (displayContent === true) {
			imagesLoaded(imageGallery, function () {
				switch (layouts) {
					case "masonry":
						isotopeRef.current = new Isotope(".up-filterable-img-portfolio", {
							itemSelector: ".up-portfolio-img-content",
							percentPosition: true,
							masonry: {
								columnWidth: ".up-portfolio-img-content",
							},
						});
						break;
					case "slider":
						mySwiper.current = new Swiper(`.mySwiper-${blockId}`, {
							slidesPerView: columns.Desktop,
							spaceBetween: image_gap,
							effect: slidereffect,
							centeredSlides: slidecenter,
							speed: slidesspeed,
							allowTouchMove: false,
							coverflowEffect: {
								rotate: 50,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: true,
							},
							navigation: {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							},
							pagination: {
								el: sliderbullets ? ".swiper-pagination" : null,
								type: "bullets",
							},
						});
						break;

					case "grid":
						isotopeRef.current = new Isotope(".up-filterable-img-portfolio", {
							itemSelector: ".up-portfolio-img-content",
							layoutMode: "fitRows",
						});

						break;
					default:
						// Handle unknown social type
						break;
				}
			});
		}

		// Cleanup function
		return () => {
			if (
				isotopeRef.current &&
				typeof isotopeRef.current.destroy === "function"
			) {
				isotopeRef.current.destroy();
				isotopeRef.current = null;
			}
			if (mySwiper.current) {
				mySwiper.current.destroy();
				mySwiper.current = null;
			}
		};
	}, [
		// List of all dependencies combined from all effects
		selectedDeviceType,
		layouts,
		displayCaption,
		displayDescription,
		displayCategory,
		displayContent,
		columns.Desktop,
		slideheight,
		image_gap,
		sliderloop,
		slidereffect,
		slidesspeed,
		slidecenter,
		sliderarrow,
		sliderbullets,
		sliderpausemouse,
		sliderdynamicbullet,
		slidedelay,
		images,
		columns,
		imageSize,
		enableFilterAll,
		filterItems,
		sources,
		upimageheight,
		hoverStyle,
		imageCount,
		maxImages,
		ulportfoliotaxonomydate,
		ulportfoliotaxonomytime,
		ulportfoliotaxonomyauthor,
		ulportfoliotaxonomycomment,
	]);

	useEffect(() => {
		const handleLoad = () => {
			if (selectedDeviceType !== "Tablet") return;

			const iframe = document.querySelector('iframe[name="editor-canvas"]');
			if (!iframe) return;

			if (!imageGallery) {
				return;
			}

			imagesLoaded(imageGallery, function () {
				isotopeRef.current = new Isotope(imageGallery, {
					itemSelector: ".up-portfolio-img-content",
					percentPosition: true,
					masonry: {
						columnWidth: ".up-portfolio-img-content",
					},
					resize: true,
				});
				setTimeout(() => {
					if (isotopeRef.current) {
						isotopeRef.current.arrange();
					}
				}, 5000);
			});
		};

		const iframe = document.querySelector('iframe[name="editor-canvas"]');
		if (iframe && iframe.contentDocument.readyState === "complete") {
			handleLoad();
		} else if (iframe) {
			iframe.addEventListener("load", handleLoad);
		}

		return () => {
			if (iframe) {
				iframe.removeEventListener("load", handleLoad);
			}
		};
	}, [selectedDeviceType]);

	const handleFilterKeyChange = (event, value) => {
		setFilterKey(value);
		var buttonGroup = event.target.closest(
			".up-portfolio-gallery-filter-wrapper",
		);
		buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
		event.target.classList.add("is-checked");
	};

	let urls = [];
	images.map((image) => urls.push(image.url));

	const SettingTypes = [
		{ label: "Filter", value: "filter", icon: <SvgFilterWiz /> },
		{ label: "Pagination", value: "pagination", icon: <SvgPaginationWiz /> },
		{ label: "Lightbox", value: "lightbox", icon: <SvgLightbox /> },
		{ label: "Link", value: "link", icon: <SvgLink /> },
	];

	const [activeContentType, setContentType] = useState(null);

	const [activeStep, setActiveStep] = useState(0);

	const handleContinue = () => {
		setActiveStep(activeStep + 1);
		if (activeStep == 2) {
			setAttributes({
				displayContent: true,
			});
		}
	};
	const handlePrevious = () => {
		setActiveStep(activeStep - 1);
	};

	const handleContentType = (optionValue) => {
		setContentType(optionValue);
		setAttributes({ displayType: optionValue });
	};

	const [activeOptions, setActiveOptions] = useState(["pagination", "link"]);
	const handleSettingType = (optionValue) => {
		setActiveOptions((prevOptions) => {
			if (prevOptions.includes(optionValue)) {
				// Option is already active, remove it
				return prevOptions.filter((option) => option !== optionValue);
			} else {
				// Option is not active, add it
				return [...prevOptions, optionValue];
			}
		});
	};

	useEffect(() => {
		if (activeStep === 2) {
			// Update attribute values based on active options
			const updatedAttributes = {};

			if (activeOptions.includes("filter")) {
				updatedAttributes.enableFilter = true;
			} else {
				updatedAttributes.enableFilter = false;
			}

			if (activeOptions.includes("pagination")) {
				updatedAttributes.ulpagination = true;
			} else {
				updatedAttributes.ulpagination = false;
			}

			if (activeOptions.includes("lightbox")) {
				updatedAttributes.disableLightbox = false;
			} else {
				updatedAttributes.disableLightbox = true;
			}

			if (activeOptions.includes("link")) {
				updatedAttributes.disableLightbox = true;
			}

			setAttributes(updatedAttributes);
		}
	}, [activeOptions, activeStep]);

	return (
		<>
			{displayContent === true && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
			<div {...blockProps}>
				{displayContent === true && sources.length === 0 && (
					<Notice className="up-notice" status="info" isDismissible={false}>
						{__(
							"We could not find any items that match your selection",
							"ultimate-portfolio",
						)}
					</Notice>
				)}
				{displayContent === false ? (
					<div class="up-setup-wizard">
						<div className="up-component-steps-wizard">
							{/* Step 0 */}
							{activeStep === 0 && (
								<>
									<div className="up-setup-wizard-title">
										{__("Ultimate Portfolio", "ultimate-portfolio")}
									</div>
									<div className="up-setup-wizard-description">
										{__(
											"Set the common settings in the setup wizard, more options will be available in the block settings. Select the Content Source first:",
											"ultimate-portfolio",
										)}
									</div>
									<ContentSource
										attributes={props.attributes}
										setAttributes={props.setAttributes}
									/>

									<div className="up-setup-wizard-panel">
										<BaseControl>
											<div className="up-component-media-control">
												{displayType === "gallery" && displayType !== "" && (
													<>
														{urls.length === 0 && (
															<MediaUpload
																onSelect={(images) => setAttributes({ images })}
																allowedTypes={["image"]}
																multiple
																render={({ open }) => (
																	<Button
																		className="up-portfolio-upload-button"
																		label={__(
																			"Upload Media",
																			"ultimate-portfolio",
																		)}
																		icon={<SvgImageAddIcon />}
																		onClick={open}
																	>
																		<span>
																			{__("UPLOAD MEDIA", "ultimate-portfolio")}
																		</span>
																	</Button>
																)}
															/>
														)}
													</>
												)}
											</div>
										</BaseControl>
									</div>

									<div className="up-setup-wizard-panel">
										{displayType === "gallery" && (
											<>
												{urls.length !== 0 && (
													<GalleryBlock
														attributes={props.attributes}
														setAttributes={props.setAttributes}
													/>
												)}
											</>
										)}
									</div>
								</>
							)}

							{/* Step 1 */}
							{activeStep === 1 && (
								<>
									<div className="up-setup-wizard-title">
										{__("Select Layout", "ultimate-portfolio")}
									</div>
									<div className="up-setup-wizard-description">
										{__(
											"Set the common settings in the setup wizard, more options will be available in the block settings. Select the Layout first:",
											"ultimate-portfolio",
										)}
									</div>
									<ContentLayoutType
										attributes={props.attributes}
										setAttributes={props.setAttributes}
									/>
								</>
							)}

							{/* Step 2 */}
							{activeStep === 2 && (
								<>
									<div className="up-setup-wizard-title">
										{" "}
										{__("Quick Selection", "ultimate-portfolio")}
									</div>
									<div className="up-setup-wizard-description">
										{__(
											"Set the common settings in the setup wizard, more options will be available in the block settings. Select the Pagination, Filter first:",
											"ultimate-portfolio",
										)}
									</div>
									<div className="up-setup-wizard-panel step-1">
										<BaseControl>
											<div className="up-component-content-selector up-component-layout-selector up-component-layout-selector-quick">
												{SettingTypes.map((option) => (
													<Button
														key={option.value}
														className={`up-component-content-type ${
															activeOptions.includes(option.value)
																? "active-item"
																: ""
														}`}
														onClick={() => handleSettingType(option.value)}
													>
														<div className="up-check-item">
															<SvgContentCheck />
														</div>
														<div className="up-content-item">{option.icon}</div>
														<span>{option.label}</span>
													</Button>
												))}
											</div>
										</BaseControl>
									</div>
								</>
							)}

							{/* Continue Button */}
							{activeStep < 3 && (
								<div className="up-setup-wizard-panel">
									{activeOptions !== null && (
										<Button
											className="up-component-continue"
											isPrimary
											label={__("Continue", "ultimate-portfolio")}
											onClick={handleContinue}
											icon=""
										>
											<span>{__("Continue", "ultimate-portfolio")}</span>
											<SvgRightArrow />
										</Button>
									)}
								</div>
							)}
							{activeStep > 0 && (
								<div className="up-setup-wizard-panel">
									{activeOptions !== null && (
										<Button
											className="up-component-previous"
											label={__("Previous", "ultimate-portfolio")}
											onClick={handlePrevious}
											icon=""
										>
											<SvgRightArrow />
											<span>{__("Previous", "ultimate-portfolio")}</span>
										</Button>
									)}
								</div>
							)}
						</div>
					</div>
				) : (
					<>
						<style>
							{`
								${desktopAllStyles}

								${selectedDeviceType === "Tablet" ? tabAllStyles : " "}
								${selectedDeviceType === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

								@media all and (max-width: 1024px) {
									${wrapperStylesTab} 
								}

								@media all and (max-width: 767px) {
									${wrapperStylesMobile}
								}

								.up-portfolio-img-content .videosvg svg {
									top: 45%;
									position: absolute;
									right: 45%;
									width: 50px;
									height: 50px;
								}
				
							`}
						</style>
						<Fragment>
							<BlockControls>
								<ToolbarGroup>
									<ToolbarItem>
										{() => (
											<MediaUpload
												value={images.map((img) => img.id)}
												onSelect={(images) => setAttributes({ images })}
												allowedTypes={["image"]}
												multiple
												gallery
												render={({ open }) => (
													<ToolbarButton
														className="components-toolbar__control"
														label={__("Edit gallery", "ultimate-portfolio")}
														icon="edit"
														onClick={open}
													/>
												)}
											/>
										)}
									</ToolbarItem>
								</ToolbarGroup>
							</BlockControls>

							<div
								className={`up-portfolio up-parent-wrapper ${blockId} ${classHook} ${displayType}`}
								style={
									bgFocalPoint && {
										backgroundPosition: `${bgFocalPoint.x * 100}% ${
											bgFocalPoint.y * 100
										}%`,
									}
								}
								ref={isotopeRef}
							>
								<div className="up-sorting-controls">
									{enableFilter && (
										<div
											className={`up-portfolio-gallery-filter-wrapper ${filter_layouts} filter-wrapper-${blockId}`}
										>
											{filter_layouts === "filter_style_dropdown" && (
												<div className="filter-selector">
													<span className="filter-selected">
														{__("All", "ultimate-portfolio")}
													</span>
													<SvgDown />
												</div>
											)}

											<ul className="filter-items" data-id={blockId}>
												{enableFilterAll && (
													<li
														className="filter-item is-checked"
														data-filter="*"
														data-id={blockId}
													>
														<span className="filter-item-name">
															{filteralltitle !== "" ? filteralltitle : "All"}
														</span>
													</li>
												)}
												{filterItems.map(({ value, label }, index) => {
													const filterCounts = sources.reduce(
														(countObj, source) => {
															if (source.filter) {
																source.filter.forEach((filter) => {
																	const filterValue = filter.value; // Adjust this line according to the structure of filter object
																	countObj[filterValue] =
																		(countObj[filterValue] || 0) + 1;
																});
															}
															return countObj;
														},
														{},
													);
													const filterCountlen = filterCounts[value] || 0;

													return (
														<li
															className="filter-item"
															key={index}
															data-filter={`.up-filter-img-${value}`}
															data-filter-count={`${filterCountlen}`}
															data-id={blockId}
														>
															<span className="filter-item-name">
																{label}
																{filtercount && (
																	<span className="ul-filter-count">
																		({filterCountlen})
																	</span>
																)}
															</span>
														</li>
													);
												})}
											</ul>
										</div>
									)}

									<div className="up-sorting-search-controls">
										{sortingcontrol && (
											<div className="up-sorting">
												<div className="sort-selector">
													<span className="sort-selected">
														{__("Sort", "ultimate-portfolio")}
													</span>
													<SvgDown />
												</div>

												<ul className="sort-items">
													<li className="sort-item" data-value="desc">
														<span className="sort-item-name">
															{__("Descending", "ultimate-portfolio")}
														</span>
													</li>
													<li className="sort-item" data-value="asc">
														<span className="sort-item-name">
															{__("Ascending", "ultimate-portfolio")}
														</span>
													</li>
												</ul>
											</div>
										)}
										{searchcontrol && (
											<div className="up-search">
												<SvgSearch
													strokeColor="#000"
													width="15px"
													height="15px"
												/>
												<input
													type="text"
													className="quicksearch"
													placeholder="Search"
												/>
												<div className="up-search-close">
													<SvgClose />
												</div>
											</div>
										)}
									</div>
								</div>

								<div
									className={`up-elements-wrap  ${
										layouts === "slider" ? `swiper mySwiper-${blockId}` : ""
									} `}
								>
									<div
										id="liveDemo"
										className={`up-portfolio-img-wrapper up-filterable-img-portfolio ${layouts} ${hoverStyle} ${
											captionOnHover ? "caption-on-hover" : ""
										} ${layouts === "slider" ? "swiper-wrapper" : ""}`}
										data-id={blockId}
									>
										{sources
											.slice(0, imageCount ? maxImages : undefined)
											.map((source, index) => {
												let filters;
												let filterString;

												if (
													source.hasOwnProperty("filter") &&
													source.filter.length > 0
												) {
													filters = source.filter;

													filters = source.filter
														.map((filter) => filter.value.trim())
														.join(" up-filter-img-");

													filters = filters.toString();

													filters = filters.replaceAll(",", " up-filter-img-");

													filterString = filters.replaceAll(
														" up-filter-img-",
														", ",
													);
												} else {
													filters = "";
												}
												return (
													<>
														<div
															key={index}
															className={`up-portfolio-img-content up-filter-img-${filters} ${
																layouts === "slider" ? "swiper-slide" : ""
															}`}
														>
															{(disablesearchicon ||
																(disablelinkicon && source["permalink"]) ||
																disabldownloadicon ||
																(disablevideoicon &&
																	source["mediaType"] === "video")) && (
																<div className="up-icon-control">
																	{disablesearchicon && <SvgSearch />}
																	{disablelinkicon && (
																		<a
																			href={source.permalink}
																			target="_blank"
																			rel="noopener noreferrer"
																		>
																			<SvgLink />
																		</a>
																	)}
																	{disabldownloadicon && <SvgDownload />}
																	{disablevideoicon &&
																		source["mediaType"] === "video" && (
																			<SvgPlay />
																		)}
																</div>
															)}

															<a rel="liveDemo" href="#">
																<img
																	style={{
																		objectFit: "cover",
																		objectPosition: `${
																			source.focalPoint && source.focalPoint.x
																				? `${source.focalPoint.x * 100}% `
																				: "50% "
																		}${
																			source.focalPoint && source.focalPoint.y
																				? `${source.focalPoint.y * 100}% `
																				: "50%"
																		}`,
																	}}
																	className="up-portfolio-img"
																	src={source.url}
																	image-index={index}
																	srcSet={
																		displayType === "gallery"
																			? source.url // Use source.url for gallery displaytype
																			: source.sizes
																			? Object.values(source.sizes)
																					.map(
																						(size) =>
																							`${size.source_url} ${size.width}w`,
																					)
																					.join(", ") // Generate srcSet based on sizes if source.sizes exists
																			: null // Handle the case where source.sizes is undefined or null
																	}
																/>

																{source.mediaType === "video" && (
																	<div className="videosvg">
																		<SvgPlay />
																	</div>
																)}
															</a>
															{hoverStyle === "layout-classic" && (
																<div className="up-portfolio-layout layout-classic">
																	{displayCaption ||
																	displayDescription ||
																	displayCategory ? (
																		(displayCaption &&
																			source.title &&
																			source.title.length > 0) ||
																		(displayDescription &&
																			source.description &&
																			source.description.length > 0) ||
																		(displayCategory &&
																			source.filter &&
																			filterString.length > 0) ||
																		(source.image &&
																			source.image.length > 0) ? (
																			<div className="up-overlay">
																				<div className="up-overlay-content">
																					<div className="up-overlay-content-meta">
																						{displayCategory &&
																							source.filter &&
																							filterString.length > 0 && (
																								<span className="item-category">
																									{filterString}
																								</span>
																							)}
																						{displayCaption &&
																							source.title &&
																							source.title.length > 0 && (
																								<h2
																									className={`up-overlay-content-meta-title ${horizontalAlign} ${verticalAlign}`}
																								>
																									<a href="#">{source.title}</a>
																								</h2>
																							)}
																						{displayDescription &&
																							source.description &&
																							source.description.length > 0 && (
																								<div className="up-description">
																									{source.description}
																								</div>
																							)}
																						{source.image &&
																							source.image.length > 0 && (
																								<img
																									src={source.image}
																									alt={source.title}
																									className="up-image"
																								/>
																							)}
																						<div className="up-content-meta-icons"></div>
																					</div>
																				</div>
																			</div>
																		) : null
																	) : null}
																</div>
															)}
															{hoverStyle === "layout-standerd" && (
																<div className="up-portfolio-layout layout-standerd">
																	{displayCaption ||
																	displayDescription ||
																	displayCategory ? (
																		(displayCaption &&
																			source.title &&
																			source.title.length > 0) ||
																		(displayDescription &&
																			source.description &&
																			source.description.length > 0) ||
																		(displayCategory &&
																			source.filter &&
																			filterString.length > 0) ||
																		(source.image &&
																			source.image.length > 0) ? (
																			<div className="up-overlay">
																				<div class="up-overlay-content">
																					<div class="up-overlay-content-meta">
																						{displayCategory &&
																							source.filter &&
																							filterString.length > 0 && (
																								<span className="item-category">
																									{filterString}
																								</span>
																							)}
																						{displayType === "posts" &&
																							(ulportfoliotaxonomydate ||
																							ulportfoliotaxonomytime ? (
																								<p
																									className={`up-portfolio-taxonomy ${horizontalAlign} ${verticalAlign}`}
																								>
																									{ulportfoliotaxonomydate && (
																										<div className="up-post-date">
																											<Svgcalendar />
																											<span>{source.date}</span>
																										</div>
																									)}
																									{ulportfoliotaxonomytime && (
																										<div>
																											<Svgtime />
																											<span>
																												{
																													source.readingTimeMinutes
																												}
																												{__(
																													"Mins Read",
																													"ultimate-portfolio",
																												)}
																											</span>
																										</div>
																									)}
																								</p>
																							) : null)}
																						{displayCaption &&
																							source.title &&
																							source.title.length > 0 && (
																								<h2
																									className={`up-overlay-content-meta-title ${horizontalAlign} ${verticalAlign}`}
																								>
																									<a href="#">{source.title}</a>
																								</h2>
																							)}

																						{displayDescription &&
																							source.description &&
																							source.description.length > 0 && (
																								<div className="up-description">
																									{source.description}
																								</div>
																							)}
																						<div className="up-content-meta-icons"></div>
																						{displayType === "posts" &&
																							(ulportfoliotaxonomyauthor ||
																							ulportfoliotaxonomycomment ? (
																								<div className="up-post-footer">
																									{ulportfoliotaxonomyauthor && (
																										<div>
																											<span>
																												{__(
																													"By",
																													"ultimate-portfolio",
																												)}{" "}
																												{source.author}
																											</span>
																										</div>
																									)}
																									{ulportfoliotaxonomycomment && (
																										<div>
																											<SvgComment />
																											<span>
																												{source.comment}
																											</span>
																										</div>
																									)}
																								</div>
																							) : null)}
																					</div>
																				</div>
																			</div>
																		) : null
																	) : null}
																</div>
															)}
															{hoverStyle === "layout-wave" && (
																<div className="up-portfolio-layout layout-wave ">
																	{displayCaption ||
																	displayDescription ||
																	displayCategory ? (
																		(displayCaption &&
																			source.title &&
																			source.title.length > 0) ||
																		(displayDescription &&
																			source.description &&
																			source.description.length > 0) ||
																		(displayCategory &&
																			source.filter &&
																			filterString.length > 0) ||
																		(source.image &&
																			source.image.length > 0) ? (
																			<div className="up-overlay">
																				<SvgWave />

																				<div class="up-overlay-content">
																					<div class="up-overlay-content-meta">
																						{displayCategory &&
																							source.filter &&
																							filterString.length > 0 && (
																								<span className="item-category">
																									{filterString}
																								</span>
																							)}
																						{displayCaption &&
																							source.title &&
																							source.title.length > 0 && (
																								<h2
																									className={`up-overlay-content-meta-title ${horizontalAlign} ${verticalAlign}`}
																								>
																									<a href="#">{source.title}</a>
																								</h2>
																							)}
																						{displayDescription &&
																							source.description &&
																							source.description.length > 0 && (
																								<div className="up-description">
																									{source.description}
																								</div>
																							)}
																						<div className="up-content-meta-icons"></div>
																					</div>
																				</div>
																			</div>
																		) : null
																	) : null}
																</div>
															)}
														</div>
													</>
												);
											})}
									</div>
									{layouts === "slider" && (
										<>
											{sliderarrow && (
												<>
													<div class="swiper-button-next"></div>
													<div class="swiper-button-prev"></div>
												</>
											)}
											{sliderbullets && <div class="swiper-pagination"></div>}
										</>
									)}
								</div>

								{ulpagination && (
									<>
										{paginationType === "load-paged" &&
											maxImages < totalItems && (
												<div
													id="pagination"
													className="up-pagination pagination-load-paged"
													data-total-pages={totalPages}
												>
													<div className="prev">
														<a
															className="page-number"
															href="#"
															onClick={(e) => e.preventDefault()}
														>
															{<SvgPrev />}
														</a>
													</div>
													<div id="pageNumbers" className="pagelinks">
														{totalPages > 1 && (
															<a
																href="#"
																onClick={(e) => e.preventDefault()}
																className={`page-number ${
																	currentPage === 1 ? "active" : ""
																}`}
															>
																1
															</a>
														)}
														{totalPages > 5 && currentPage > 3 && (
															<span>...</span>
														)}
														{Array.from(
															{ length: Math.min(5, totalPages) },
															(_, i) => {
																let pageNumber;
																if (currentPage <= 3 || totalPages <= 5) {
																	pageNumber = i + 1;
																} else if (currentPage > totalPages - 2) {
																	pageNumber = totalPages - 4 + i + 1;
																} else {
																	pageNumber = currentPage - 2 + i;
																}

																const pageUrl = `?page=${pageNumber}`;
																const isActive = pageNumber === currentPage;

																if (pageNumber > 1 && pageNumber < totalPages) {
																	return (
																		<a
																			key={pageNumber}
																			href="#"
																			onClick={(e) => e.preventDefault()}
																			className={`page-number ${
																				isActive ? "active" : ""
																			}`}
																		>
																			{pageNumber}
																		</a>
																	);
																}
															},
														)}
														{totalPages > 5 && currentPage < totalPages - 2 && (
															<span>...</span>
														)}
														{totalPages > 1 && (
															<a
																href="#"
																onClick={(e) => e.preventDefault()}
																className={`page-number ${
																	currentPage === totalPages ? "active" : ""
																}`}
															>
																{totalPages}
															</a>
														)}
													</div>

													<div className="next">
														{currentPage < totalPages ? (
															<a
																className="page-number"
																href="#"
																onClick={(e) => e.preventDefault()}
															>
																{<SvgNext />}
															</a>
														) : (
															"Next"
														)}
													</div>
												</div>
											)}
										{(paginationType === "load-more" ||
											paginationType === "load-scroll") && (
											<div
												id="pagination"
												className="up-pagination pagination-load-more"
											>
												{maxImages < totalItems ? (
													<button id="load-more">{loadMoreText}</button>
												) : (
													<span
														className="no-to-load"
														style={{ display: "block" }}
													>
														{loadMoreEndText}
													</span>
												)}
											</div>
										)}
									</>
								)}
							</div>
						</Fragment>
					</>
				)}
			</div>
		</>
	);
}
