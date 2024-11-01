<?php
/**
 * Plugin Name:       Ultimate Portfolio, Photo gallery & Slider
 * Description:       Create and customize dynamic gallery and post portfolios for your WordPress website. With Ultimate Portfolio, you have the flexibility to design captivating galleries, project showcases, and more using the Gutenberg editor.
 * Requires at least: 5.8
 * Tested up to:      6.6.2
 * Requires PHP:      7.0
 * Version:           1.1.0
 * Author: 			  A WP Life
 * Author URI:		  http://awplife.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ultimate-portfolio
 *
 * @package create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


function enable_block_editor_for_custom_post_type($args, $post_type)
{
	if ('ultimate_portfolio' === $post_type) {
		$args['show_in_rest'] = true;
		$args['template_lock'] = 'all';
	}
	return $args;
}
function ultimate_portfolio_block_init()
{
	$labels = array(
		'name' => 'Ultimate Portfolio',
		'singular_name' => 'Ultimate Portfolio',
		'menu_name' => 'Ultimate Portfolio',
		'add_new' => 'Add New',
		'add_new_item' => 'Add New Portfolio Project',
		'edit_item' => 'Edit Portfolio Project',
		'new_item' => 'New Portfolio Project',
		'view_item' => 'View Portfolio Project',
		'search_items' => 'Search Portfolio Projects',
		'not_found' => 'No Portfolio Projects found',
		'not_found_in_trash' => 'No Portfolio Projects found in Trash',
		'parent_item_colon' => 'Parent Portfolio Project:',
		'all_items' => 'Projects',
		'archives' => 'Portfolio Project Archives',
		'insert_into_item' => 'Insert into Portfolio Project',
		'uploaded_to_this_item' => 'Uploaded to this Portfolio Project',
		'featured_image' => 'Featured Image',
		'set_featured_image' => 'Set featured image',
		'remove_featured_image' => 'Remove featured image',
		'use_featured_image' => 'Use as featured image',
		'filter_items_list' => 'Filter Portfolio Projects list',
		'items_list_navigation' => 'Portfolio Projects list navigation',
		'items_list' => 'Portfolio Projects list',
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 20,
		'menu_icon' => 'dashicons-ultimate-portfolio',
		'capability_type' => 'post',
		'supports' => array(
			'title',
			'editor',
			'thumbnail',
			'author',
			'revisions',
			'excerpt',
			'post-formats',
			'page-attributes',
			'custom-fields',
		),
		'show_in_rest' => true,
		'template_lock' => 'all',
	);

	register_post_type('ultimate_portfolio', $args);

	// Register custom taxonomy for the custom post type
	register_taxonomy(
		'ultimate_portfolio_category',
		'ultimate_portfolio',
		// Should be the same as the custom post type slug
		array(
			'hierarchical' => true,
			'label' => 'Categories',
			'public' => true,
			'show_in_rest' => true,
			'rewrite' => array('slug' => 'ultimate_portfolio-category'),
		)
	);

	register_taxonomy(
		'ultimate_portfolio_tag',
		'ultimate_portfolio',
		array(
			'hierarchical' => false,
			'label' => 'Tags',
			'public' => true,
			'show_in_rest' => true,
			'rewrite' => array('slug' => 'ultimate_portfolio-tag'),
		)
	);


	function ultimate_portfolio_add_submenu_page()
	{
		add_submenu_page(
			'edit.php?post_type=ultimate_portfolio',
			__('Ultimate PortfolioLanding Page', 'ultimate-portfolio'),
			__('Welcome', 'ultimate-portfolio'),
			'manage_options',
			'ultimate-portfolio-landing-page',
			'ultimate_portfolio_display_landing_page'
		);
		// Add "Settings Page" submenu
		add_submenu_page(
			'edit.php?post_type=ultimate_portfolio',
			__('Ultimate Portfolio Settings', 'ultimate-portfolio'),
			__('Settings', 'ultimate-portfolio'),
			'manage_options',
			'ultimate-portfolio-settings',
			'ultimate_portfolio_display_settings_page'
		);
	}
	add_action('admin_menu', 'ultimate_portfolio_add_submenu_page', 9);


	//$form_data = get_option('ultimate_portfolio_form_data');

	function ultimate_portfolio_header()
	{
		?>

		<div class="uptw-px-6 uptw-bg-white uptw-flex uptw-items-center uptw-justify-between lg:uptw-py-0 uptw-py-2">
			<div class="uptw-flex uptw-items-center uptw-font-black uptw-text-gray-700">
				<a href="#">
					<img
						src="<?php echo ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'src/assets/images/ultimate-portfolio-logo.webp'; ?>">
				</a>
				<nav class="uptw-ml-10 lg:uptw-flex lg:uptw-items-center">
					<ul
						class="lg:uptw-flex uptw-items-center uptw-justify-between uptw-text-sm uptw-font-medium uptw-text-gray-700 uptw-pt-4 lg:uptw-pt-0 uptw-space-x-6">
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900"
								href="<?php echo admin_url('edit.php?post_type=ultimate_portfolio&page=ultimate-portfolio-landing-page') ?>">
								Welcome
							</a>
						</li>
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900"
								href="<?php echo admin_url('edit.php?post_type=ultimate_portfolio&page=ultimate-portfolio-settings') ?>">Settings</a>
						</li>
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900"
								href="<?php echo admin_url('edit.php?post_type=ultimate_portfolio') ?>">Projects</a>
						</li>
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900"
								href="<?php echo admin_url('edit-tags.php?taxonomy=ultimate_portfolio_category&post_type=ultimate_portfolio') ?>">Categories</a>
						</li>
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900"
								href="<?php echo admin_url('edit-tags.php?taxonomy=ultimate_portfolio_tag&post_type=ultimate_portfolio') ?>">Tags</a>
						</li>
						<li class="uptw-mt-4">
							<a class="lg:uptw-py-4 uptw-py-3 uptw-px-0 uptw-block uptw-border-b-2 uptw-border-transparent uptw-text-gray-600 uptw-hover:uptw-text-gray-900 lg:uptw-mb-0 uptw-mb-2"
								href="<?php echo admin_url('edit.php?post_type=ultimate_portfolio&page=ultimate-portfolio-documentation-page') ?>">Documentation</a>
						</li>

					</ul>
				</nav>
			</div>
			<div class="lg:uptw-flex lg:uptw-items-center">
				<div
					class="uptw-flex uptw-items-center uptw-text-[0.625rem] sm:uptw-text-sm uptw-font-medium uptw-leading-[1.375rem] uptw-text-slate-400 uptw-mr-1 sm:uptw-mr-3 uptw-divide-x uptw-divide-slate-200 uptw-gap-3 uptw-pl-1 sm:uptw-pl-3">
					<div class="uptw-flex uptw-items-center">
						<span>version </span>
						<span
							class="uptw-ml-1 sm:uptw-ml-2 uptw-text-[0.625rem] uptw-leading-[1rem] uptw-font-medium uptw-border uptw-border-slate-400 uptw-rounded-[0.1875rem] uptw-relative uptw-inline-flex uptw-flex-shrink-0 uptw-py-[0rem] uptw-px-1.5">
							<?php echo ULTIMATEPORTFOLIO_BLOCK_VERSION; ?>
						</span>
					</div>
					<span></span>
				</div>

				<a href="https://webenvo.com/ultimate-portfolio/pricing/" target="_blank"
					class="up-btn-upgrade uptw-block uptw-px-4 uptw-py-2 uptw-bg-blue-500 uptw-text-white uptw-font-semibold uptw-rounded-lg uptw-hover:uptw-bg-blue-500 uptw-hover:uptw-text-white uptw-shadow-md uptw-flex uptw-items-center">
					Upgrade To Pro
					<svg xmlns="http://www.w3.org/2000/svg" class="uptw-ml-1" width="16px" height="16px" viewBox="0 0 48 48"
						fill="none" stroke="#000000" stroke-width="0.00048000000000000007">

						<g id="SVGRepo_bgCarrier" stroke-width="0" />

						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
							stroke-width="2">
							<g id="power">
								<g id="power_2">
									<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
										d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
										fill="#00D084" />
								</g>
							</g>
						</g>

						<g id="SVGRepo_iconCarrier">
							<g id="power">
								<g id="power_2">
									<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
										d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
										fill="#FFFFFF" />
								</g>
							</g>
						</g>

						<script xmlns="" id="webrtc-control-b" />
					</svg>
				</a>
			</div>
		</div>

		<?php
	}



	function ultimate_portfolio_display_documentation_page()
	{
		?>


		<div class="uptw-bg-gray-200 uptw-min-h-screen uptw-pb-24">
			<div class="uptw-container uptw-mx-auto uptw-max-w-6xl uptw-mt-8">
				<div class="uptw-py-4 sm:uptw-py-4">
					<div class="uptw-mx-auto uptw-max-w-7xl uptw-px-0 lg:uptw-px-0">
						<!-- Section One -->
						<div class="uptw-grid uptw-grid-cols-1 sm:uptw-grid-cols-2 uptw-gap-4">
							<!-- Section One -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4">
										<?php esc_html_e("Installation of Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-text-lg uptw-mb-4">
										<?php esc_html_e("How to download and install the Ultimate Portfolio WordPress plugin", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4">
										<div class="uptw-flex uptw-items-center">
											<iframe width="560" height="315"
												src="https://www.youtube.com/embed/2tjaXgjJsA4?si=WCybjexmHgsKDu1G"
												title="YouTube video player" frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen>
											</iframe>
										</div>
									</div>
								</div>
							</div>

							<!-- Section Two -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4">
										<?php esc_html_e("Grid Layout in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-text-lg uptw-mb-4">
										<?php esc_html_e("How To Use Grid Layout in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4">
										<div class="uptw-flex uptw-items-center">
											<iframe width="560" height="315"
												src="https://www.youtube.com/embed/2tjaXgjJsA4?si=WCybjexmHgsKDu1G"
												title="YouTube video player" frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen>
											</iframe>
										</div>
									</div>
								</div>
							</div>

							<!-- Section Three -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4">
										<?php esc_html_e("Masonry Layout in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-text-lg uptw-mb-4">
										<?php esc_html_e("How To Use Masonry Layout in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4">
										<div class="uptw-flex uptw-items-center">
											<iframe width="560" height="315"
												src="https://www.youtube.com/embed/2tjaXgjJsA4?si=WCybjexmHgsKDu1G"
												title="YouTube video player" frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen>
											</iframe>
										</div>
									</div>
								</div>
							</div>

							<!-- Section Four -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4">
										<?php esc_html_e("All Slide Style in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-text-lg uptw-mb-4">
										<?php esc_html_e("How to Use Slide Layout in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4">
										<div class="uptw-flex uptw-items-center">
											<iframe width="560" height="315"
												src="https://www.youtube.com/embed/2tjaXgjJsA4?si=WCybjexmHgsKDu1G"
												title="YouTube video player" frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen>
											</iframe>
										</div>
									</div>
								</div>
							</div>

							<!-- Section Five -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4">
										<?php esc_html_e("Complete Guide to Covering all Filter Options", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-text-lg uptw-mb-4">
										<?php esc_html_e("How to Use the Filter Option in Ultimate Portfolio", "ultimate-portfolio"); ?>
									</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4">
										<div class="uptw-flex uptw-items-center">
											<iframe width="560" height="315"
												src="https://www.youtube.com/embed/2tjaXgjJsA4?si=WCybjexmHgsKDu1G"
												title="YouTube video player" frameborder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowfullscreen>
											</iframe>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>




		<?php
	}
	function ultimate_portfolio_display_landing_page()
	{
		?>
		<div class="uptw-bg-gray-200 uptw-min-h-screen uptw-pb-24">
			<div class="uptw-container uptw-mx-auto uptw-max-w-6xl uptw-pt-6">
				<div class="uptw-bg-white uptw-py-24 sm:uptw-py-32 uptw-mt-10">
					<div class="uptw-mx-auto ">
						<div class="uptw-mx-auto uptw-max-w-2xl lg:uptw-text-center">
							<h2 class="uptw-text-base uptw-font-semibold uptw-leading-7 uptw-text-indigo-600">Hello Admin, </h2>
							<div class="uptw-flex uptw-justify-center">
								<p
									class="uptw-mt-2 uptw-text-3xl uptw-font-bold uptw-tracking-tight uptw-text-gray-900 sm:uptw-text-3xl">
									Welcome To Ultimate Portfolio</p>
								<span
									class="uptw-ml-2 uptw-h-full uptw-inline-flex uptw-leading-[1rem] uptw-flex-shrink-0 uptw-py-[0rem] uptw-px-1.5 uptw-text-[0.625rem] uptw-text-uptw uptw-bg-blue-50 uptw-border uptw-border-blue-50 uptw-rounded-[0.1875rem] uptw-font-medium -tablet:uptw-mt:10">FREE</span>
							</div>
							<p class="uptw-mt-6 uptw-text-lg uptw-leading-8 uptw-text-gray-600">Ultimate Portfolio is a
								versatile WordPress plugin for creating captivating galleries, post, projects and showcases
								using the Gutenberg editor. With multiple layouts, customizable skins, and dynamic content.</p>
							<div class="uptw-flex uptw-justify-center uptw-h-full" style="
																		box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
																		padding: 0 30px 30px;
																		margin-top: 40px;
																	">
								<div class="uptw-mt-10">
									<img src="https://ps.w.org/ultimate-portfolio/assets/screenshot-1.gif?rev=3029419">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="uptw-py-4 sm:uptw-py-4">
					<div class="uptw-mx-auto uptw-max-w-7xl uptw-px-0 lg:uptw-px-0">
						<!-- Section One -->
						<div class="uptw-grid uptw-grid-cols-1 sm:uptw-grid-cols-3 uptw-gap-4">
							<!-- Left Column - Section One -->
							<div class="uptw-col-span-1">
								<div class="uptw-bg-white  uptw-p-6">
									<div class="uptw-text-xl uptw-font-semibold uptw-mb-4 uptw-font-medium">Upgrade to Pro</div>
									<div class="uptw-text-lg uptw-mb-4">Get more with Ultimate Portfolio Pro</div>
									<div class="uptw-grid uptw-grid-cols-1 md:uptw-grid-cols-1 uptw-gap-4 uptw-font-medium">
										<div class="uptw-flex uptw-items-center">
											<svg class="uptw-w-5 uptw-h-5 uptw-text-green-500 uptw-mr-2" fill="none"
												stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M5 13l4 4L19 7"></path>
											</svg>
											<span>Social Feeds</span>
										</div>
										<div class="uptw-flex uptw-items-center">
											<svg class="uptw-w-5 uptw-h-5 uptw-text-green-500 uptw-mr-2" fill="none"
												stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M5 13l4 4L19 7"></path>
											</svg>
											<span>Fast Support</span>
										</div>
										<div class="uptw-flex uptw-items-center">
											<svg class="uptw-w-5 uptw-h-5 uptw-text-green-500 uptw-mr-2" fill="none"
												stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M5 13l4 4L19 7"></path>
											</svg>
											<span>Regular Updates</span>
										</div>
										<!-- ... more items ... -->
									</div>


									<a href="https://webenvo.com/ultimate-portfolio/pricing/" target="_blank"
										class="up-btn-upgrade uptw-block uptw-px-4 uptw-py-2  uptw-mt-5 uptw-bg-blue-500 uptw-text-white uptw-font-semibold uptw-rounded-lg uptw-hover:uptw-bg-blue-500 uptw-hover:uptw-text-white uptw-shadow-md uptw-inline-block">
										Upgrade To Pro
										<svg style="display: inline-block;" xmlns="http://www.w3.org/2000/svg" class="uptw-ml-1" width="16px" height="16px"
											viewBox="0 0 48 48" fill="none" stroke="#000000"
											stroke-width="0.00048000000000000007">

											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>

											<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
												stroke="#CCCCCC" stroke-width="2">
												<g id="power">
													<g id="power_2">
														<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
															d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
															fill="#00D084"></path>
													</g>
												</g>
											</g>

											<g id="SVGRepo_iconCarrier">
												<g id="power">
													<g id="power_2">
														<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
															d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
															fill="#FFFFFF"></path>
													</g>
												</g>
											</g>

											<script xmlns="" id="webrtc-control-b"></script>
										</svg>
									</a>
								</div>
							</div>
							<!-- Middle Column -->
							<div class="uptw-col-span-1">
								<!-- Card 1 -->
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-sm uptw-font-semibold uptw-mb-4 uptw-font-medium">You may also like
									</div>
									<div
										class="uptw-max-w-sm uptw-mx-auto uptw-overflow-hidden uptw-bg-white uptw-rounded-lg uptw-hover:uptw-shadow-2xl uptw-transition-shadow uptw-duration-300">
										<img class="uptw-w-full uptw-h-56 uptw-mb-3 uptw-object-cover uptw-object-center up-more-plugin-img"
											src="https://ps.w.org/coming-soon-maintenance-mode/assets/icon-128x128.gif?rev=2857694"
											alt="image description">

										<div class="">
											<h3 class="uptw-text-xl uptw-font-semibold uptw-text-gray-800">Coming Soon
												Maintenance Mode
											</h3>
											<p class="uptw-text-gray-600 uptw-mt-2">Introducing coming soon and maintenance mode
												WordPress plugin!</p>



											<a href="https://webenvo.com/coming-soon-maintenance-mode-pro/" target="_blank"
												class="uptw-inline-block uptw-mt-4 uptw-font-semibold uptw-hover:uptw-text-indigo-500 uptw-transition-colors uptw-duration-300">Learn
												More →</a>
										</div>
									</div>

								</div>

							</div>
							<!-- Right Column -->
							<div class="uptw-col-span-1">
								<!-- Card 1 -->
								<div class="uptw-bg-white uptw-p-6">
									<div class="uptw-text-sm uptw-font-semibold uptw-mb-4 uptw-font-medium">You may also like
									</div>
									<div
										class="uptw-max-w-sm uptw-mx-auto uptw-overflow-hidden uptw-bg-white uptw-rounded-lg uptw-hover:uptw-shadow-2xl uptw-transition-shadow uptw-duration-300">
										<img class="uptw-w-full uptw-h-56 uptw-mb-3 uptw-object-cover uptw-object-center up-more-plugin-img"
											src="https://webenvo.com/wp-content/uploads/2023/11/Lead-Generation-Form-Pro-Latest-WordPress-Plugin.webp"
											alt="image description">

										<div class="">
											<h3 class="uptw-text-xl uptw-font-semibold uptw-text-gray-800">Lead Generation Form
												Pro</h3>
											<p class="uptw-text-gray-600 uptw-mt-2">Crafted to empower businesses in harnessing
												the potential of interactive and flexible forms</p>

											<a href="https://webenvo.com/lead-generation-form-pro/" target="_blank"
												class="uptw-inline-block uptw-mt-4 uptw-font-semibold uptw-hover:uptw-text-indigo-500 uptw-transition-colors uptw-duration-300">Learn
												More →</a>
										</div>
									</div>

								</div>
							</div>
						</div>
						<!-- Section Two -->
						<div class="uptw-grid uptw-grid-cols-1 sm:uptw-grid-cols-2 lg:uptw-grid-cols-3 uptw-gap-8">
							<!-- Additional Content Here -->
						</div>


					</div>
				</div>
			</div>
		</div>



		<?php
	}



	function ultimate_portfolio_footer()
	{
		?>
		<div class="up-admin-footer uptw-bg-white uptw-flex uptw-items-center uptw-justify-between uptw-py-4 uptw-px-6">

			<div class="uptw-flex uptw-items-center">
				<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"
					fill="#000000" style="
						width: 30px;
						
					">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path fill="#DD2E44"
							d="M11.626 7.488a1.413 1.413 0 0 0-.268.395l-.008-.008L.134 33.141l.011.011c-.208.403.14 1.223.853 1.937c.713.713 1.533 1.061 1.936.853l.01.01L28.21 24.735l-.008-.009c.147-.07.282-.155.395-.269c1.562-1.562-.971-6.627-5.656-11.313c-4.687-4.686-9.752-7.218-11.315-5.656z">
						</path>
						<path fill="#EA596E"
							d="M13 12L.416 32.506l-.282.635l.011.011c-.208.403.14 1.223.853 1.937c.232.232.473.408.709.557L17 17l-4-5z">
						</path>
						<path fill="#A0041E"
							d="M23.012 13.066c4.67 4.672 7.263 9.652 5.789 11.124c-1.473 1.474-6.453-1.118-11.126-5.788c-4.671-4.672-7.263-9.654-5.79-11.127c1.474-1.473 6.454 1.119 11.127 5.791z">
						</path>
						<path fill="#AA8DD8"
							d="M18.59 13.609a.99.99 0 0 1-.734.215c-.868-.094-1.598-.396-2.109-.873c-.541-.505-.808-1.183-.735-1.862c.128-1.192 1.324-2.286 3.363-2.066c.793.085 1.147-.17 1.159-.292c.014-.121-.277-.446-1.07-.532c-.868-.094-1.598-.396-2.11-.873c-.541-.505-.809-1.183-.735-1.862c.13-1.192 1.325-2.286 3.362-2.065c.578.062.883-.057 1.012-.134c.103-.063.144-.123.148-.158c.012-.121-.275-.446-1.07-.532a.998.998 0 0 1-.886-1.102a.997.997 0 0 1 1.101-.886c2.037.219 2.973 1.542 2.844 2.735c-.13 1.194-1.325 2.286-3.364 2.067c-.578-.063-.88.057-1.01.134c-.103.062-.145.123-.149.157c-.013.122.276.446 1.071.532c2.037.22 2.973 1.542 2.844 2.735c-.129 1.192-1.324 2.286-3.362 2.065c-.578-.062-.882.058-1.012.134c-.104.064-.144.124-.148.158c-.013.121.276.446 1.07.532a1 1 0 0 1 .52 1.773z">
						</path>
						<path fill="#77B255"
							d="M30.661 22.857c1.973-.557 3.334.323 3.658 1.478c.324 1.154-.378 2.615-2.35 3.17c-.77.216-1.001.584-.97.701c.034.118.425.312 1.193.095c1.972-.555 3.333.325 3.657 1.479c.326 1.155-.378 2.614-2.351 3.17c-.769.216-1.001.585-.967.702c.033.117.423.311 1.192.095a1 1 0 1 1 .54 1.925c-1.971.555-3.333-.323-3.659-1.479c-.324-1.154.379-2.613 2.353-3.169c.77-.217 1.001-.584.967-.702c-.032-.117-.422-.312-1.19-.096c-1.974.556-3.334-.322-3.659-1.479c-.325-1.154.378-2.613 2.351-3.17c.768-.215.999-.585.967-.701c-.034-.118-.423-.312-1.192-.096a1 1 0 1 1-.54-1.923z">
						</path>
						<path fill="#AA8DD8"
							d="M23.001 20.16a1.001 1.001 0 0 1-.626-1.781c.218-.175 5.418-4.259 12.767-3.208a1 1 0 1 1-.283 1.979c-6.493-.922-11.187 2.754-11.233 2.791a.999.999 0 0 1-.625.219z">
						</path>
						<path fill="#77B255"
							d="M5.754 16a1 1 0 0 1-.958-1.287c1.133-3.773 2.16-9.794.898-11.364c-.141-.178-.354-.353-.842-.316c-.938.072-.849 2.051-.848 2.071a1 1 0 1 1-1.994.149c-.103-1.379.326-4.035 2.692-4.214c1.056-.08 1.933.287 2.552 1.057c2.371 2.951-.036 11.506-.542 13.192a1 1 0 0 1-.958.712z">
						</path>
						<circle fill="#5C913B" cx="25.5" cy="9.5" r="1.5"></circle>
						<circle fill="#9266CC" cx="2" cy="18" r="2"></circle>
						<circle fill="#5C913B" cx="32.5" cy="19.5" r="1.5"></circle>
						<circle fill="#5C913B" cx="23.5" cy="31.5" r="1.5"></circle>
						<circle fill="#FFCC4D" cx="28" cy="4" r="2"></circle>
						<circle fill="#FFCC4D" cx="32.5" cy="8.5" r="1.5"></circle>
						<circle fill="#FFCC4D" cx="29.5" cy="12.5" r="1.5"></circle>
						<circle fill="#FFCC4D" cx="7.5" cy="23.5" r="1.5"></circle>
					</g>
				</svg>
				<div class="uptw-text-sm uptw-font-semibold  uptw-font-medium uptw-ml-3">Get Great Deal: Upgrade to Premium for
					lifetime
					just $99
				</div>
			</div>
			<a href="https://webenvo.com/ultimate-portfolio/pricing/" target="_blank"
				class="up-btn-upgrade uptw-block uptw-px-4 uptw-py-2 uptw-bg-blue-500 uptw-text-white uptw-font-semibold uptw-rounded-lg uptw-hover:uptw-bg-blue-500 uptw-hover:uptw-text-white uptw-shadow-md uptw-flex uptw-items-center">
				Upgrade To Pro
				<svg xmlns="http://www.w3.org/2000/svg" class="uptw-ml-1" width="16px" height="16px" viewBox="0 0 48 48"
					fill="none" stroke="#000000" stroke-width="0.00048000000000000007">

					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>

					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
						stroke-width="2">
						<g id="power">
							<g id="power_2">
								<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
									d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
									fill="#00D084"></path>
							</g>
						</g>
					</g>

					<g id="SVGRepo_iconCarrier">
						<g id="power">
							<g id="power_2">
								<path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd"
									d="M33.5849 21.2352L28.1973 21.2606C27.645 21.2633 27.1952 20.8177 27.1926 20.2654C27.19 19.7131 27.6356 19.2633 28.1879 19.2607L34.5366 19.2307C35.5896 19.2307 36.2687 20.3492 35.7948 21.248L25.221 43.3602C24.6215 44.4512 22.9686 44.0202 22.9686 42.7807V28.9527H13.4006C12.3522 28.9527 11.6785 27.8438 12.1413 26.9397L22.7402 4.62311C23.3377 3.53568 24.9926 3.95703 24.9926 5.20066V20.2267C24.9926 20.7789 24.5449 21.2267 23.9926 21.2267C23.4403 21.2267 22.9926 20.7789 22.9926 20.2267V8.74993L14.3487 26.9527H22.9692V25.5465C22.9692 24.9942 23.4169 24.5465 23.9692 24.5465C24.5215 24.5465 24.9692 24.9942 24.9692 25.5465V28.1525C24.9692 28.1642 24.969 28.1758 24.9686 28.1874V39.2554L33.5849 21.2352ZM13.935 27.8239C13.9406 27.8129 13.9458 27.8018 13.9507 27.7907L13.935 27.8239Z"
									fill="#FFFFFF"></path>
							</g>
						</g>
					</g>

					<script xmlns="" id="webrtc-control-b"></script>
				</svg>
			</a>
		</div>
		<?php

	}

	function ultimate_portfolio_display_settings_page()
	{

		$form_data = get_option('ultimate_portfolio_form_data');

		if ($form_data !== false) {
			$form_data = unserialize($form_data);
			// Display or use the form data as needed
			$lazyLoadStatus = isset($form_data['lazy_load']) && $form_data['lazy_load'] ? 'Yes' : 'No';
			$photoSrc = isset($form_data['up_photo_src']) ? $form_data['up_photo_src'] : ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'src/assets/images/default_image.png';
			$imageId = isset($form_data['image_id']) ? $form_data['image_id'] : 'Not set';
		} else {
			// Handle the case when 'ultimate_portfolio_form_data' doesn't exist
			$lazyLoadStatus = 'No';
			$photoSrc = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'src/assets/images/default_image.png';
			$imageId = 'Not set';
		}


		?>

		<div class="uptw-bg-gray-200 uptw-min-h-screen uptw-pb-24">
			<div class="uptw-container uptw-mx-auto uptw-max-w-6xl uptw-pt-6">
				<div class="">
					<div class="uptw-mx-auto uptw-max-w-7xl uptw-px-6 lg:uptw-px-8">

						<form action="<?php echo admin_url('admin-post.php'); ?>" method="POST" enctype="multipart/form-data">
							<!-- @csrf -->
							<div
								class="uptw-w-full uptw-bg-white uptw-rounded-lg uptw-mx-auto uptw-mt-8 uptw-flex uptw-overflow-hidden uptw-rounded-b-none">
								<div class="uptw-w-1/4 uptw-bg-gray-100 uptw-p-8 uptw-hidden md:uptw-inline-block">
									<h2 class="uptw-font-medium uptw-text-md uptw-text-gray-700 uptw-mb-4 uptw-tracking-wide">
										Genral Settings</h2>
									<p class="uptw-text-xs uptw-text-gray-500">These changes affects for all projects</p>
								</div>
								<div class="md:uptw-w-2/3 uptw-w-full">
									<div class="uptw-py-8 uptw-px-16">

										<label class="uptw-flex uptw-items-center uptw-cursor-pointer">
											<!-- toggle -->
											<div class="uptw-relative">
												<!-- input -->
												<input type="checkbox" name="up_lazy_load" class="uptw-sr-only uptw-peer" <?php echo $lazyLoadStatus === 'Yes' ? 'checked' : ''; ?> />

												<!-- line -->
												<div
													class="uptw-block uptw-bg-gray-200 uptw-w-10 uptw-h-5 uptw-rounded-full uptw-peer-checked">
												</div>
												<!-- dot -->
												<div
													class="uptw-dot uptw-absolute uptw-left-1 uptw-top-0.5 uptw-bg-white uptw-w-4 uptw-h-4 uptw-rounded-full uptw-transition">
												</div>
											</div>
											<!-- label -->
											<div class="uptw-ml-3 uptw-text-gray-700 uptw-font-medium">
												Enable / Disable Lazy Load On Images
											</div>
										</label>

									</div>

									<hr class="uptw-border-gray-200">
									<div class="uptw-py-8 uptw-px-16 uptw-clearfix">

										<div class="uptw-flex uptw-flex-col  uptw-justify-center">
											<!-- Image Placeholder and Upload Button Container -->
											<div class="uptw-flex uptw-flex-col uptw-items-start">
												<!-- Image Placeholder -->
												<!-- Updated Image -->
												<img class="uptw-w-24 uptw-h-16 uptw-border-4 uptw-border-gray-600" id="photo"
													src="<?php echo $photoSrc; ?>" alt="photo">

												<!-- Upload Button -->
												<input type="hidden" name="up_photo_src" id="up_photo_src"
													value="<?php echo $photoSrc; ?>">


												<div
													class="uptw-bg-gray-200 uptw-text-gray-500 uptw-text-xs uptw-mt-5 uptw-font-bold uptw-px-4 uptw-py-2 uptw-rounded-lg uptw-hover:uptw-bg-gray-300 uptw-hover:uptw-text-gray-600 uptw-relative uptw-overflow-hidden uptw-cursor-pointer">
													<button id="upload-image-button"
														class="uptw-bg-gray-200 uptw-text-gray-500 uptw-text-xs  uptw-font-bold  uptw-rounded-lg uptw-hover:uptw-bg-gray-300 uptw-hover:uptw-text-gray-600 uptw-cursor-pointer"
														type="button">
														Upload Image
													</button>
													<input type="hidden" id="image-id" name="image_id" value="">
												</div>
											</div>

											<!-- Label -->
											<div class="uptw-mt-4 uptw-text-gray-700 uptw-font-medium">
												Replace Default Image
											</div>
										</div>



									</div>

									<script>
										jQuery(document).ready(function (jQuery) {
											var customUploader;

											console.log('Document ready'); // Debugging

											jQuery('#upload-image-button').click(function (e) {
												e.preventDefault();

												console.log('Button clicked'); // Debugging

												if (customUploader) {
													customUploader.open();
													return;
												}

												customUploader = wp.media.frames.file_frame = wp.media({
													title: 'Choose Image',
													button: {
														text: 'Choose Image'
													},
													multiple: false
												});

												customUploader.on('select', function () {
													console.log('Image selected'); // Debugging

													var attachment = customUploader.state().get('selection').first().toJSON();
													console.log('Attachment:', attachment); // Debugging

													jQuery('#image-id').val(attachment.id);
													jQuery('#photo').attr('src', attachment.url);
												});

												customUploader.open();
											});

										});

										document.addEventListener("DOMContentLoaded", function () {
											// Find the "Save" button by its ID
											var saveButton = document.getElementById("saveButton");
											var photoSrcInput = document.getElementById("up_photo_src");


											// Add a click event listener to the "Save" button
											saveButton.addEventListener("click", function (event) {
												event.preventDefault(); // Prevent the default behavior of the link

												// Find the form by its ID or other means
												var form = document.querySelector("form");

												// Update the hidden input field with the current src value of the image
												var photoImage = document.getElementById("photo");
												photoSrcInput.value = photoImage.src;

												// Submit the form
												form.submit();
											});
										});

									</script>


								</div>
							</div>
							<div
								class="uptw-flex uptw-justify-between  uptw-p-8 uptw-py-8 uptw-bg-gray-300 uptw-clearfix uptw-rounded-b-lg uptw-border-t uptw-border-gray-200">
								<p class="uptw-float-left uptw-text-xs uptw-text-gray-500 uptw-tracking-tight uptw-mt-2">Click
									on Save to update settings</p>
								<!--<a href="https://webenvo.com/member/signup/ultimate-portfolio-pro" target="_blank"
									class="up-btn-upgrade uptw-block uptw-px-4 uptw-py-2 uptw-bg-blue-500 uptw-text-white uptw-font-semibold uptw-rounded-lg uptw-hover:uptw-bg-blue-500 uptw-hover:uptw-text-white uptw-shadow-md uptw-flex uptw-items-center">
									Save →
								</a>-->
								<button id="saveButton"
									class="up-btn-upgrade uptw-block uptw-px-4 uptw-py-2 uptw-bg-blue-500 uptw-text-white uptw-font-semibold uptw-rounded-lg uptw-hover:uptw-bg-blue-500 uptw-hover:uptw-text-white uptw-shadow-md uptw-flex uptw-items-center">
									Save →
								</button>

							</div>

							<input type="hidden" name="action" value="ultimate_portfolio_save_settings">
							<?php wp_nonce_field('ultimate_portfolio_nonce_action', 'ultimate_portfolio_nonce'); ?>

						</form>
					</div>
				</div>
			</div>
		</div>

		<?php
	}



	add_action('admin_post_ultimate_portfolio_save_settings', 'handle_ultimate_portfolio_form_submission');

	function handle_ultimate_portfolio_form_submission()
	{
		// Check nonce for security
		check_admin_referer('ultimate_portfolio_nonce_action', 'ultimate_portfolio_nonce');

		// Initialize an empty array for storing the form data
		$form_data = array();

		// Process Lazy Load Checkbox
		$lazy_load_enabled = isset($_POST['up_lazy_load']) ? 1 : 0;
		$form_data['lazy_load'] = $lazy_load_enabled;

		// Process Image Upload
		if (!empty($_POST['up_photo_src']) && !empty($_POST['image_id'])) {
			// Store the photo src and image ID
			$form_data['up_photo_src'] = sanitize_text_field($_POST['up_photo_src']);
			$form_data['image_id'] = intval($_POST['image_id']);
		}

		// Save the form data as a serialized array in the options table
		update_option('ultimate_portfolio_form_data', serialize($form_data));

		// Redirect back to the form or to a confirmation page
		wp_redirect($_SERVER['HTTP_REFERER']);
		exit;
	}



	if (isset($_GET['post_type']) && $_GET['post_type'] === 'ultimate_portfolio') {
		function customize_admin_bar_menu($wp_admin_bar)
		{
			global $pagenow;

			// Check if we are on the edit.php page for the 'ultimate_portfolio' post type
			if (
				$pagenow === 'edit.php' &&
				isset($_GET['post_type']) && $_GET['post_type'] === 'ultimate_portfolio' &&
				(
					isset($_GET['page']) &&
					(
						$_GET['page'] === 'ultimate-portfolio-landing-page' ||
						$_GET['page'] === 'ultimate-portfolio-settings' ||
						$_GET['page'] === 'ultimate-portfolio-settings'
					)
				)
			) {
				// Remove admin notices
				remove_all_actions('admin_notices');

				// Call your custom header function and store the result
				$custom_content = ultimate_portfolio_header();

				// Combine header and footer content
				$combined_content = $custom_content . ultimate_portfolio_footer();

				// Add custom content to the admin bar
				$wp_admin_bar->add_node(
					array(
						'id' => 'custom-content',
						'title' => $combined_content, // Use the combined content
						'meta' => array('class' => 'custom-content')
					)
				);
			} else {
				// Remove the custom content from the admin bar on other pages
				$wp_admin_bar->remove_node('custom-content');
			}
		}

		add_action('admin_bar_menu', 'customize_admin_bar_menu', 999);


	}


	function remove_add_new_ultimate_portfolio()
	{
		remove_submenu_page('edit.php?post_type=ultimate_portfolio', 'post-new.php?post_type=ultimate_portfolio');
	}
	add_action('admin_menu', 'remove_add_new_ultimate_portfolio');

	function add_documentation_link_to_submenu()
	{
		add_submenu_page(
			'edit.php?post_type=ultimate_portfolio',
			__('Documentation Page', 'ultimate-portfolio'),
			__('Documentation', 'ultimate-portfolio'),
			'manage_options',
			'ultimate-portfolio-documentation-page',
			'ultimate_portfolio_display_documentation_page' // function that displays the page content
		);
	}
	add_action('admin_menu', 'add_documentation_link_to_submenu', 9);

	function add_pro_link_to_submenu()
	{
		global $submenu;
		$link_url = 'https://webenvo.com/ultimate-portfolio/';
		$icon_url = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'src/assets/images/ul-go-pro.svg';

		$submenu['edit.php?post_type=ultimate_portfolio'][] = array(
			'<img src="' . $icon_url . '" width="16" height="16" style="vertical-align: middle; display: inline-block;"> <span style="color: #00D084; font-weight:500">Go Pro</span> ',
			'manage_options',
			$link_url
		);
	}
	add_action('admin_menu', 'add_pro_link_to_submenu');

	flush_rewrite_rules(); // Update permalinks after registering the custom post type

	define('ULTIMATEPORTFOLIO_BLOCK_VERSION', "1.1.0");
	define('ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL', plugin_dir_url(__FILE__));
	define('ULTIMATEPORTFOLIO_BLOCK_ADMIN_PATH', dirname(__FILE__));

	$script_asset_path = ULTIMATEPORTFOLIO_BLOCK_ADMIN_PATH . "/dist/index.asset.php";
	if (!file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the block first.'
		);
	}

	$index_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'build/index.js';

	$script_asset = require ($script_asset_path);
	$all_dependencies = array_merge(
		$script_asset['dependencies'],
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
			'ultimate-portfolio-isotope-js',
			'ultimate-portfolio-images-loaded-js',
		)
	);

	wp_register_script(
		'create-block-ultimateportfolio-block-editor-script',
		$index_js,
		$all_dependencies,
		$script_asset['version'],
		true
	);


	$lightbox_css = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/css/jquery.fancybox.min.css';
	wp_register_style(
		'fancybox-style',
		$lightbox_css,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION
	);

	$slider_css = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/css/swiper-bundle.min.css';
	wp_enqueue_style(
		'slider-style',
		$slider_css,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION
	);


	$swiper_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/js/swiper-bundle.min.js';
	wp_enqueue_script(
		'swiper-js',
		$swiper_js,
		array("jquery"),
		ULTIMATEPORTFOLIO_BLOCK_VERSION,
		true
	);


	$lightbox_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/js/jquery.fancybox.min.js';
	wp_register_script(
		'fancybox-js',
		$lightbox_js,
		array("jquery"),
		ULTIMATEPORTFOLIO_BLOCK_VERSION,
		true
	);

	$images_loaded_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/js/images-loaded.min.js';
	wp_register_script(
		'ultimate-portfolio-images-loaded-js',
		$images_loaded_js,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION,
		true
	);

	$isotope_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'lib/js/isotope.pkgd.min.js';
	wp_register_script(
		'ultimate-portfolio-isotope-js',
		$isotope_js,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION,
		true
	);

	$style_css = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/style.css';
	//Backned Style
	wp_register_style(
		'create-block-ultimateportfolio-block-backend-style',
		$style_css,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION
	);

	$tailwind_css = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/styletailwindout.css';
	//Backned Style
	wp_register_style(
		'ultimate-portfolio-tailwind',
		$tailwind_css,
		array(),
		ULTIMATEPORTFOLIO_BLOCK_VERSION
	);

	//Frontend Script
	$frontend_js = ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/frontend/index.js';
	wp_register_script(
		'ultimate-portfolio-block-frontend-js',
		$frontend_js,
		array(
			'ultimate-portfolio-isotope-js',
			'ultimate-portfolio-images-loaded-js',
		),
		ULTIMATEPORTFOLIO_BLOCK_VERSION,
		true
	);


	function custom_enqueue_for_ultimate_portfolio_settings_page($hook)
	{
		// Check if we are on the specific Ultimate Portfolio settings page
		if ('ultimate_portfolio_page_ultimate-portfolio-settings' == $hook) {
			// Enqueue the WordPress media scripts
			wp_enqueue_media();

		}
	}
	add_action('admin_enqueue_scripts', 'custom_enqueue_for_ultimate_portfolio_settings_page');



	wp_enqueue_script('up-admin-script', ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/admin.js');

	$form_data = get_option('ultimate_portfolio_form_data');
	$form_data = unserialize($form_data);
	// Display or use the form data as needed

	$localization_data = array(
		'lazyLoadStatus' => isset($form_data['lazy_load']) && $form_data['lazy_load'] ? 'Yes' : 'No',
		'photoSrc' => isset($form_data['up_photo_src']) ? $form_data['up_photo_src'] : ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'src/assets/images/default_image.png',
		'imageId' => isset($form_data['image_id']) ? $form_data['image_id'] : 'Not set'
	);

	wp_localize_script('up-admin-script', 'up_genral_setting_Data', $localization_data);


	/*function enqueue_my_plugin_styles($hook)
		  {

			  
			  if ($hook === 'ultimate_portfolio_page_ultimate-portfolio-landing-page' || $hook === 'ultimate_portfolio_page_ultimate-portfolio-settings' || $hook === 'ultimate_portfolio_page_ultimate-portfolio-documentation-page') {

				  if (!is_admin()) {
					  wp_enqueue_style('fancybox-style');
					  wp_enqueue_style('slider-style');
					  wp_enqueue_script('fancybox-js');
					  wp_enqueue_script('swiper-js');

					  wp_enqueue_script('ultimate-portfolio-images-loaded-js');
					  wp_enqueue_script('ultimate-portfolio-isotope-js');
					  wp_enqueue_script('ultimate-portfolio-block-frontend-js');

					  wp_localize_script(
						  'ultimate-portfolio-block-frontend-js',
						  'ul_script_object',
						  array(
							  'ajax_url' => admin_url('admin-ajax.php'),
							  'nonce' => wp_create_nonce('ul_script_nonce')
						  )
					  );


				  } else {

					  wp_enqueue_style('up-admin-style', ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/admin.css');

					  wp_enqueue_style('ultimate-portfolio-tailwind');
					  wp_enqueue_script('jquery');

				  }
				  
			  }
		  }
		  add_action('admin_enqueue_scripts', 'enqueue_my_plugin_styles');*/

	if (!WP_Block_Type_Registry::get_instance()->is_registered('create-block/ultimate-portfolio')) {

		global $pagenow;
		if ($pagenow === 'edit.php' || $pagenow === 'post-new.php') {
			$post_type = isset($_GET['post_type']) ? $_GET['post_type'] : '';
			
			if ($post_type === 'ultimate_portfolio') {
				// Your code here
				wp_enqueue_style('ultimate-portfolio-tailwind');
			}
		}



		if (!is_admin()) {
			wp_enqueue_style('fancybox-style');
			wp_enqueue_style('slider-style');
			wp_enqueue_script('fancybox-js');
			wp_enqueue_script('swiper-js');

			//wp_enqueue_script('ultimate-portfolio-images-loaded-js');
			//wp_enqueue_script('ultimate-portfolio-isotope-js');
			wp_enqueue_script('ultimate-portfolio-block-frontend-js');

			wp_localize_script(
				'ultimate-portfolio-block-frontend-js',
				'ul_script_object',
				array(
					'ajax_url' => admin_url('admin-ajax.php'),
					'nonce' => wp_create_nonce('ul_script_nonce')
				)
			);


		} else {

			wp_enqueue_style('up-admin-style', ULTIMATEPORTFOLIO_BLOCK_ADMIN_URL . 'dist/admin.css');
			wp_enqueue_style('create-block-ultimateportfolio-block-backend-style');
			wp_enqueue_script('jquery');

		}

		wp_enqueue_script('ultimate-portfolio-isotope-js');
		wp_enqueue_script('ultimate-portfolio-images-loaded-js');

		//}


		register_block_type(
			__DIR__ . '/build',
			array(
				'editor_script' => 'create-block-ultimateportfolio-block-editor-script',
				'editor_style' => 'create-block-ultimateportfolio-block-backend-style',
				'render_callback' => function ($attributes, $content) {

					//$data = $attributes;
		
					ob_start(); // Start output buffering
		
					// Generate the HTML for the block using PHP or other server-side logic
		
					include __DIR__ . '/src/item-content.php';

					$content = ob_get_clean(); // Get the buffered output
		
					return $content; // Return the HTML output
				}
			)
		);
	}
	//register_block_type( __DIR__ . '/build');
}
add_action('init', 'ultimate_portfolio_block_init');
function ultimate_portfolio_activation_hook()
{
	set_transient('ultimate_portfolio_plugin_activated', true, 60);
	ultimate_portfolio_block_init(); // Register the custom post type
	flush_rewrite_rules(); // Update permalinks
	$default_image_id = get_option('ultimate_portfolio_default_image_id', 0);

	if (!$default_image_id) {
		$default_image_url = esc_url_raw(plugin_dir_url(__FILE__) . 'src/assets/images/default_image.png');
		$default_image_id = media_sideload_image($default_image_url, 0, 'Default Portfolio Image', 'id');


		// Store the attachment ID of the default image
		update_option('ultimate_portfolio_default_image_id', $default_image_id);
	}
}
register_activation_hook(__FILE__, 'ultimate_portfolio_activation_hook');

function ultimate_portfolio_admin_init()
{
	// Check for the transient value
	$transient_value = get_transient('ultimate_portfolio_plugin_activated');

	if ($transient_value) {
		delete_transient('ultimate_portfolio_plugin_activated');

		// Redirect to the plugin's landing page
		wp_safe_redirect(admin_url('edit.php?post_type=ultimate_portfolio&page=ultimate-portfolio-landing-page'));
		exit;
	}
}
add_action('admin_init', 'ultimate_portfolio_admin_init');

function ultimate_portfolio_shortcode($atts)
{
	$atts = shortcode_atts(
		array(
			'id' => '',
			// Default empty value
		),
		$atts,
		'ultimate_portfolio'
	);

	$post_id = intval($atts['id']); // Get the post ID from the shortcode attribute

	$output = '';

	if ($post_id > 0) {
		$post = get_post($post_id);
		if ($post && $post->post_type === 'ultimate_portfolio') {
			// Add your desired template markup using the $post object
			$output = '<div class="ultimate_portfolio-item">';
			$output .= '<div>' . apply_filters('the_content', $post->post_content) . '</div>';
			$output .= '</div>';
		} else {
			$output = 'Invalid or non-existent portfolio post.';
		}
	} else {
		$output = 'Please provide a valid portfolio post ID.';
	}

	return $output;
}
add_shortcode('ultimate_portfolio', 'ultimate_portfolio_shortcode');

function ultimate_portfolio_save_post($post_id, $post)
{
	if ($post->post_type !== 'ultimate_portfolio') {
		return;
	}

	$content = $post->post_content;
	$pattern = get_shortcode_regex(array('ultimate_portfolio'));
	$matches = array();

	if (preg_match_all('/' . $pattern . '/s', $content, $matches)) {
		$shortcodes = $matches[0];
		$shortcode_ids = array();

		foreach ($shortcodes as $shortcode) {
			$atts = shortcode_parse_atts($shortcode);
			if (isset($atts['id'])) {
				$shortcode_ids[] = $atts['id'];
			}
		}

		update_post_meta($post_id, 'ultimate_portfolio_shortcodes', $shortcode_ids);
	}
}
add_action('save_post', 'ultimate_portfolio_save_post', 10, 2);


//featured image columns
function add_featured_image_column($columns)
{
	$new_columns = array(
		'featured_image' => 'Featured Image',
	);
	return array_merge($columns, $new_columns);
}
add_filter('manage_ultimate_portfolio_posts_columns', 'add_featured_image_column');

// Display the featured image in the custom column
function display_featured_image_column($column_name, $post_id)
{
	if ($column_name === 'featured_image') {
		if (has_post_thumbnail($post_id)) {
			$thumbnail = get_the_post_thumbnail($post_id, array(60, 60));
			echo $thumbnail;
		} else {
			echo 'No Image';
		}
	}
}
add_action('manage_ultimate_portfolio_posts_custom_column', 'display_featured_image_column', 10, 2);


//Category &  Tags image columns
function add_custom_columns($columns)
{
	$new_columns = array(
		'ultimate_portfolio_category' => 'Category',
		'ultimate_portfolio_tags' => 'Tags',
		// Add the custom column for tags
	);
	return array_merge($columns, $new_columns);
}
add_filter('manage_ultimate_portfolio_posts_columns', 'add_custom_columns');

// Display the content for the custom columns
function display_custom_columns($column_name, $post_id)
{
	if ($column_name === 'ultimate_portfolio_category') {
		$categories = get_the_terms($post_id, 'ultimate_portfolio_category');
		if (!empty($categories)) {
			$category_names = array();
			foreach ($categories as $category) {
				$category_names[] = $category->name;
			}
			echo implode(', ', $category_names);
		} else {
			echo 'No Category';
		}
	} elseif ($column_name === 'ultimate_portfolio_tags') {
		$tags = get_the_terms($post_id, 'ultimate_portfolio_tag');
		if (!empty($tags)) {
			$tag_names = array();
			foreach ($tags as $tag) {
				$tag_names[] = $tag->name;
			}
			echo implode(', ', $tag_names);
		} else {
			echo 'No Tags';
		}
	}
}
add_action('manage_ultimate_portfolio_posts_custom_column', 'display_custom_columns', 10, 2);


//Shortcode image column

function ultimate_portfolio_columns($columns)
{
	$columns['shortcode'] = 'Shortcode';
	return $columns;
}
add_filter('manage_ultimate_portfolio_posts_columns', 'ultimate_portfolio_columns');

function ultimate_portfolio_custom_column($column, $post_id)
{
	switch ($column) {
		case 'shortcode':
			echo '[ultimate_portfolio id="' . $post_id . '"]';
			break;
	}
}
add_action('manage_ultimate_portfolio_posts_custom_column', 'ultimate_portfolio_custom_column', 10, 2);