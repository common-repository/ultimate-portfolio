(() => {
	var __webpack_exports__ = {};
	document.addEventListener("DOMContentLoaded", (event) => {
		//console.log("kuchbhi");

		//layout type

		const imageGalleries = document.querySelectorAll(
			`.up-portfolio-img-wrapper`
		);
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function (itemElem) {
				var number = itemElem.querySelector(".number").textContent;
				return parseInt(number, 10) > 50;
			},
			// show if name ends with -ium
			ium: function (itemElem) {
				var name = itemElem.querySelector(".name").textContent;
				return name.match(/ium$/);
			},
		};
		if (
			typeof imageGalleries !== "undefined" &&
			imageGalleries != null &&
			Symbol.iterator in Object(imageGalleries)
		) {
			for (let imageGallery of imageGalleries) {
				let wrapperid = imageGallery.getAttribute("data-id");
				const upPortfolioLayout = imageGallery
					.closest(`.up-parent-${wrapperid}`)
					.getAttribute("data-up-layout");
				const upPortfolio = imageGallery.closest(`.up-parent-${wrapperid}`);
				// add class is-checked
				const firstChild = imageGallery
					.closest(".up-parent-wrapper")
					.querySelector(
						`.filter-wrapper-${wrapperid} .filter-items :first-child`
					);
				if (firstChild) {
					firstChild.classList.add("is-checked");
				}

				var iso = "";
				var mySwiper = "";
				var just = "";

				const slideGap = parseInt(
					upPortfolio.getAttribute("data-up-slide-gap")
				);
				const slideHeight = parseInt(
					upPortfolio.getAttribute("data-up-slide-height")
				);

				imagesLoaded(imageGallery, function () {
					// Base selector based on the wrapper ID
					const $baseElement = jQuery(`#liveDemo-${wrapperid}`);

					console.log("imagesLoaded triggered!");

					if (!$baseElement.length) {
						// If the base element doesn't exist, no point in continuing
						return;
					}
					jQuery(".up-portfolio").each(function () {
						
						// rest of the code...
						switch (upPortfolioLayout) {
							case "grid":
								if ($baseElement.hasClass("grid")) {
									iso = new Isotope(`.${wrapperid}`, {
										itemSelector: ".up-portfolio-img-content",
										layoutMode: "fitRows",
									});
								}
								break;

							case "masonry":
								console.log("Masonry initialized", wrapperid);
								if ($baseElement.hasClass("masonry")) {
									iso = new Isotope(`.${wrapperid}`, {
										itemSelector: ".up-portfolio-img-content",
										percentPosition: true,
										masonry: {
											columnWidth: ".up-portfolio-img-content",
										},
									});

									console.log("Masonry initialized for", wrapperid);
								} else {
									console.warn("Masonry conditions not met for", wrapperid);
								}
								break;

							case "slider":
								if ($baseElement.hasClass("slider")) {
									// Retrieve all attributes as before

									const slideColumn = parseInt(
										upPortfolio.getAttribute("data-up-slide-column")
									);

									const slideEffect = upPortfolio.getAttribute(
										"data-up-slide-effect"
									);

									const slidecenter =
										upPortfolio.getAttribute("data-up-slidecenter") === "1";

									const slidesspeed = parseInt(
										upPortfolio.getAttribute("data-up-slidesspeed")
									);
									const slidedelay = parseInt(
										upPortfolio.getAttribute("data-up-slidedelay")
									);
									const slideautoheight =
										upPortfolio.getAttribute("data-up-slideautoheight") === "1";

									const sliderloop =
										upPortfolio.getAttribute("data-up-sliderloop") === "1";

									const sliderpausemouse =
										upPortfolio.getAttribute("data-up-sliderpausemouse") ===
										"1";

									const sliderdynamicbullet =
										upPortfolio.getAttribute("data-up-sliderdynamicbullet") ===
										"1";

									// Run Swiper slider code slider
									iso = document.querySelector(`.${wrapperid}`);
									//layoutMode: "fitRows",

									mySwiper = new Swiper(`.mySwiper-${wrapperid}`, {
										slidesPerView: slideColumn,
										spaceBetween: slideGap,
										effect: "" + slideEffect + "",
										grabCursor: true,
										freeMode: false,
										autoHeight: slideautoheight,
										centeredSlides: slidecenter,
										speed: slidesspeed,
										loop: sliderloop,
										coverflowEffect: {
											rotate: 50,
											stretch: 0,
											depth: 100,
											modifier: 1,
											slideShadows: true,
										},
										autoplay: {
											delay: slidedelay,
											disableOnInteraction: false,
											pauseOnMouseEnter: sliderpausemouse,
										},
										navigation: {
											nextEl: ".swiper-button-next",
											prevEl: ".swiper-button-prev",
										},
										pagination: {
											el: ".swiper-pagination",
											dynamicBullets: sliderdynamicbullet,
										},
										//speed: 1000, // Adjust the slide speed (in milliseconds) as needed
									});

									// Initialize the Swiper
								}
								break;
						}
					});

					//}

					// Sort by data attribute
					const optionMenu = document.querySelector(".up-sorting");

					// use value of search field to filter
					if (upPortfolioLayout !== "slider") {
						// sorting
						if (optionMenu) {
							const selectBtn = optionMenu.querySelector(".sort-selector"),
								options = optionMenu.querySelectorAll(".sort-item"),
								sBtn_text = optionMenu.querySelector(".sort-selected");

							selectBtn.addEventListener("click", () =>
								optionMenu.classList.toggle("active")
							);

							options.forEach((option) => {
								option.addEventListener("click", () => {
									const sortOrder = option.getAttribute("data-value") === "asc";
									const sortAttribute = "date"; // Replace with the name of the data attribute you added to your image elements
									iso.arrange({
										sortBy: sortAttribute,
										sortAscending: sortOrder,
									});
									sBtn_text.innerText =
										option.querySelector(".sort-item-name").innerText;
									optionMenu.classList.remove("active");
								});
							});
						}

						// search
						const quicksearch = document.querySelector(".quicksearch");
						const onCloseSeacrh = document.querySelector(".up-search-close");
						if (quicksearch) {
							onCloseSeacrh.addEventListener("click", () => {
								quicksearch.value = "";
								iso.arrange();
								quicksearch.dispatchEvent(new Event("input"));
							});
							quicksearch.addEventListener(
								"input",
								debounce(function () {
									const qsRegex = new RegExp(quicksearch.value, "gi");
									iso.arrange({
										filter: function () {
											// Only search through text content and not alt attribute
											const textContent = this.textContent || "";
											const altContent =
												this.querySelector("img").getAttribute("alt") || "";
											return qsRegex
												? textContent.match(qsRegex) ||
														altContent.match(qsRegex)
												: true;
										},
									});
								}, 200)
							);
						}
					} else {
						//sorting
						if (optionMenu && mySwiper) {
							const selectBtn = optionMenu.querySelector(".sort-selector"),
								options = optionMenu.querySelectorAll(".sort-item"),
								sBtn_text = optionMenu.querySelector(".sort-selected");

							selectBtn.addEventListener("click", () =>
								optionMenu.classList.toggle("active")
							);

							options.forEach((option) => {
								option.addEventListener("click", () => {
									const sortOrder = option.getAttribute("data-value") === "asc";
									const sortAttribute = "date"; // Replace with the name of the data attribute you want to sort by

									// Sort the Swiper slides based on the selected option
									mySwiper.slides.sort((a, b) => {
										const aValue = a.getAttribute(`data-${sortAttribute}`);
										const bValue = b.getAttribute(`data-${sortAttribute}`);

										if (aValue && bValue) {
											return sortOrder
												? aValue.localeCompare(bValue)
												: bValue.localeCompare(aValue);
										} else {
											return 0;
										}
									});

									// Reorder slide elements in the DOM based on the sorted array

									const swiperContainer =
										document.querySelector(".swiper-wrapper");
									mySwiper.slides.forEach((slide) => {
										mySwiper.removeSlide(slide);
										mySwiper.update();
										swiperContainer.appendChild(slide);
									});

									mySwiper.update();
									mySwiper.pagination.update();
									mySwiper.navigation.update();

									sBtn_text.innerText =
										option.querySelector(".sort-item-name").innerText;
									optionMenu.classList.remove("active");
								});
							});
						}

						//search
						const quicksearch = document.querySelector(".quicksearch");
						const onCloseSearch = document.querySelector(".up-search-close");

						if (quicksearch && mySwiper) {
							onCloseSearch.addEventListener("click", () => {
								quicksearch.value = "";
								filterSwiperSlides("");
							});

							quicksearch.addEventListener(
								"input",
								debounce(function () {
									const searchTerm = quicksearch.value;
									filterSwiperSlides(searchTerm);
								}, 200)
							);
						}

						function filterSwiperSlides(searchTerm) {
							mySwiper.slides.forEach((slide, index) => {
								const imgAlt =
									slide.querySelector("img").getAttribute("alt") || "";
								const textContent = slide.textContent || "";
								const isVisible =
									imgAlt.toLowerCase().includes(searchTerm.toLowerCase()) ||
									textContent.toLowerCase().includes(searchTerm.toLowerCase());

								mySwiper.slides[index].style.display = isVisible
									? "block"
									: "none";
							});

							mySwiper.update();
							mySwiper.pagination.update();
							mySwiper.navigation.update();
						}
					}

					// debounce so filtering doesn't happen every millisecond
					function debounce(fn, threshold) {
						var timeout;
						threshold = threshold || 100;
						return function debounced() {
							clearTimeout(timeout);
							var args = arguments;
							var _this = this;
							function delayed() {
								fn.apply(_this, args);
							}
							timeout = setTimeout(delayed, threshold);
						};
					}

					//let newlimit = 0;

					// change is-checked class on buttons
					var buttonGroups = document.querySelectorAll(
						`.filter-wrapper-${wrapperid}`
					);
					buttonGroups.forEach(function (buttonGroup) {
						radioButtonGroup(buttonGroup);
					});

					function radioButtonGroup(buttonGroup) {
						buttonGroup.addEventListener("click", function (event) {
							// only work with buttons
							var button = event.target.closest(".filter-item");
							if (!button) {
								return;
							}

							// remove 'is-checked' class from previously checked button
							var prevCheckedButton = buttonGroup.querySelector(".is-checked");
							if (prevCheckedButton !== button) {
								prevCheckedButton.classList.remove("is-checked");
							}

							// add 'is-checked' class to the clicked button
							button.classList.add("is-checked");
						});
					}

					// Paginations - Paged / Scroll / Load more
					let itemIds = [];
					let selectedFilter = "*";
					const paginationType = document
						.querySelector(".up-portfolio-img-wrapper")
						.getAttribute("data-pagination-type");
					const loadMoreButton = document.querySelector("#load-more");
					const noMoreDataMessage = document.querySelector(
						".up-pagination .no-to-load"
					);
					const paginationElement = document.querySelector("#pagination");
					const totaDataItems = paginationElement
						? paginationElement.getAttribute("data-total-item")
						: null;
					if (paginationType == "load-paged") {
						const svgLoader = document.querySelector(".up-pre-loader");
						const totalPageNumbers = paginationElement
							? paginationElement.getAttribute("data-total-pages")
							: null;
						const totalPageLimit = paginationElement
							? paginationElement.getAttribute("data-page-limit")
							: null;

						const prevButton = document.querySelector(".prev");
						if (prevButton) {
							prevButton.style.display = "none";
						}

						const pageNumbersContainer = document.getElementById("pageNumbers");

						const generatePagination = function (currentPage, totalPages) {
							pageNumbersContainer.innerHTML = ""; // Clear existing page numbers

							const visiblePages = 5; // Number of visible page links
							const ellipsisThreshold = 2; // Minimum number of pages required to display ellipsis

							const appendPageLink = function (pageNumber, currentPage) {
								const pageLink = document.createElement("a");
								pageLink.href = `?page=${pageNumber}`;
								pageLink.textContent = pageNumber;
								pageLink.classList.add("page-number");

								if (pageNumber == currentPage) {
									pageLink.classList.add("active");
									pageLink.style.pointerEvents = "none"; // Disable pointer events
								}

								pageLink.addEventListener("click", loadMore);

								pageNumbersContainer.appendChild(pageLink);
							};

							const appendEllipsis = function () {
								const ellipsisSpan = document.createElement("span");
								ellipsisSpan.textContent = "...";
								pageNumbersContainer.appendChild(ellipsisSpan);
							};

							if (totalPages <= 1) {
								// Hide pagination if there is only one page
								paginationElement.style.display = "none";
							} else {
								paginationElement.style.display = "flex";
							}

							const startEllipsis = currentPage - ellipsisThreshold > 2;
							const endEllipsis =
								currentPage + ellipsisThreshold < totalPages - 1;

							appendPageLink(1, currentPage);

							if (startEllipsis) {
								appendEllipsis();
							}

							const startPage = startEllipsis
								? currentPage - ellipsisThreshold
								: 2;
							const endPage = endEllipsis
								? currentPage + ellipsisThreshold
								: totalPages - 1;

							for (let i = startPage; i <= endPage; i++) {
								appendPageLink(i, currentPage);
							}

							if (endEllipsis) {
								appendEllipsis();
							}

							appendPageLink(totalPages, currentPage);

							const nextButton = document.querySelector(".next");
							const prevButton = document.querySelector(".prev");

							if (currentPage >= totalPages) {
								nextButton.style.display = "none";
							} else {
								nextButton.style.display = "block";
							}

							if (currentPage <= 1) {
								prevButton.style.display = "none";
							} else {
								prevButton.style.display = "block";
							}
						};

						const loadMoreLinks = document.querySelector("#pagination");

						const loadMore = function (event, selectedFilter, totalCount) {
							if (!selectedFilter) {
								const checkedFilter = document.querySelector(
									".filter-item.is-checked"
								);
								const selectedFilterAttribute = checkedFilter
									? checkedFilter.getAttribute("data-filter")
									: null;

								selectedFilter = selectedFilterAttribute
									? selectedFilterAttribute.replace(".up-filter-img-", "")
									: "*";
							}
							//console.log(selectedFilter);

							event.preventDefault(); // Prevent default link behavior
							setTimeout(function () {
								svgLoader.style.opacity = 1;
								svgLoader.style.pointerEvents = "default";
							}, 300);
							loadMoreLinks.classList.add("disabled");

							let pageLink;

							if (event.target !== document) {
								pageLink = event.target; // Get the clicked page link
							} else {
								pageLink = document.querySelector(".page-number.active");
							}

							const nextPageUrl = pageLink.getAttribute("href"); // Get the URL of the next page

							const xhr = new XMLHttpRequest();
							xhr.open("POST", location.href);
							xhr.setRequestHeader(
								"Content-Type",
								"application/x-www-form-urlencoded"
							);

							const nextButton = document.querySelector(".next");
							const nextPageLink = document.querySelector(".next a");
							const prevButton = document.querySelector(".prev");
							const prevPageLink = document.querySelector(".prev a");

							nextPageLink.classList.remove("active");
							prevPageLink.classList.remove("active");

							const currentPageNumber = pageLink
								.getAttribute("href")
								.split("=")[1];
							const nextPageNumber = parseInt(currentPageNumber) + 1;
							const prevPageNumber = parseInt(currentPageNumber) - 1;

							const nextUrl = new URL(nextPageLink.href);
							const prevUrl = new URL(prevPageLink.href);

							nextUrl.searchParams.set("page", nextPageNumber);
							prevUrl.searchParams.set(
								"page",
								prevPageNumber >= 1 ? prevPageNumber : 1
							);

							nextPageLink.href = nextUrl.href;
							prevPageLink.href = prevUrl.href;

							nextButton.style.display =
								nextPageNumber <= parseInt(totalCount) ? "block" : "none";
							prevButton.style.display = prevPageNumber >= 1 ? "block" : "none";

							xhr.onload = function () {
								if (xhr.status === 200) {
									const response = xhr.responseText;
									const parser = new DOMParser();
									const html = parser.parseFromString(response, "text/html");
									const items = Array.from(html.querySelectorAll(".load-item"));
									const loaderContent = document.querySelector(".loader-paged");

									const container = document.querySelector(
										".up-portfolio-img-wrapper"
									);

									const existingItems = Array.from(
										container.querySelectorAll(".up-portfolio-img-content")
									);
									existingItems.forEach((item) => {
										item.style.transition = "transform 0.2s, opacity 0.2s";
										item.style.transform = "scale(0)";
										item.style.opacity = "0";
										setTimeout(function () {
											container.removeChild(item);
											if (upPortfolioLayout === "slider") {
												mySwiper.removeSlide(items);
												mySwiper.update();
											} else if (upPortfolioLayout === "justified") {
												// Either rebuild or refresh the gallery

												just.justifiedGallery();
											} else {
												iso.remove(item);
											}
										}, 300);
									});

									setTimeout(function () {
										//container.innerHTML = "";
										const fragment = document.createDocumentFragment();

										items.forEach((item) => {
											item.style.transition = "transform 0.2s, opacity 0.2s";
											item.style.transform = "scale(0)";
											item.style.opacity = "0";
											fragment.appendChild(item);
										});

										container.appendChild(fragment);
										container.append(loaderContent);

										setTimeout(function () {
											items.forEach((item) => {
												setTimeout(function () {
													item.style.transform = "scale(1)";
													item.style.opacity = "1";
												}, 10);
											});

											if (upPortfolioLayout === "slider") {
												mySwiper.appendSlide(items);
												mySwiper.update();
											} else if (upPortfolioLayout === "justified") {
												//console.log("justified");
												//just.justifiedGallery('destroy');
												just.justifiedGallery();
												just.justifiedGallery("norewind");
												//jQuery('#liveDemo').justifiedGallery();
											} else {
												iso.prepended(items);
												iso.layout();
											}

											setTimeout(function () {
												//iso.arrange({ filter: "*" });
											}, 500);
										}, 10);

										svgLoader.style.opacity = 0;
										svgLoader.style.pointerEvents = "none";
										loadMoreLinks.classList.remove("disabled");
									}, 300);
								}
							};

							xhr.onerror = function () {
								console.error("Error fetching more items");
							};

							const requestData = `offset=${encodeURIComponent(
								nextPageUrl
							)}&selectedFilter=${selectedFilter}&itemIds=${encodeURIComponent(
								JSON.stringify(itemIds)
							)}`;
							xhr.send(requestData);

							const nextLink = document.querySelector(
								`#pageNumbers [href="?page=${currentPageNumber}"]`
							);
							if (nextLink) {
								nextLink.classList.add("active");
							}

							const itemsContainer = document.querySelector(
								".up-portfolio-img-wrapper"
							);
							const filters = JSON.parse(
								itemsContainer.getAttribute("data-total-limit")
							);
							let totalCount2;
							let loadedCount;

							if (selectedFilter === "*") {
								loadedCount = document.querySelectorAll(
									".up-portfolio-img-content"
								).length;
								/*totalCount2 = Object.values(filters).reduce(
								(total, count) => total + count,
								0
							);*/
								totalCount2 = totaDataItems;
							} else {
								loadedCount = document.querySelectorAll(
									`.up-portfolio-img-content.up-filter-img-${selectedFilter}`
								).length;
								totalCount2 = filters[selectedFilter] || 0;
							}

							const currentPage = parseInt(currentPageNumber);
							const totalPages = parseInt(totalPageNumbers);
							generatePagination(
								currentPage,
								Math.ceil(totalCount2 / totalPageLimit)
							);
						};

						function checkFilterAndLoadMore(selectedFilter) {
							const itemsContainer = document.querySelector(
								".up-portfolio-img-wrapper"
							);
							const filters = JSON.parse(
								itemsContainer.getAttribute("data-total-limit")
							);

							let totalCount;
							let loadedCount;

							if (selectedFilter === "*") {
								loadedCount = document.querySelectorAll(
									".up-portfolio-img-content"
								).length;
								/*totalCount = Object.values(filters).reduce(
								(total, count) => total + count,
								0
							);*/

								totalCount = totaDataItems;
							} else {
								loadedCount = document.querySelectorAll(
									`.up-portfolio-img-content.up-filter-img-${selectedFilter}`
								).length;
								totalCount = filters[selectedFilter] || 0;
							}

							//console.log("TOTAL COUNT - " + totalCount);

							const currentPage = 1;
							generatePagination(
								currentPage,
								Math.ceil(totalCount / totalPageLimit)
							);
							loadMore(
								event,
								selectedFilter,
								Math.ceil(totalCount / totalPageLimit)
							);
						}

						//const currentPage = 1;
						//const totalPages = parseInt(totalPageNumbers);
						//generatePagination(currentPage, Math.ceil(totalPages / 3));

						const pageLinks = document.querySelectorAll(".page-number");
						pageLinks.forEach((pageLink) => {
							pageLink.addEventListener("click", loadMore);
						});
					}

					// Pagination - Load More Button / Scroll
					if (
						paginationType === "load-more" ||
						paginationType === "load-scroll"
					) {
						const svgLoader = document.querySelector(".up-loader-spinner");
						let isLoading = false;

						const loadMore = function (
							event,
							selectedFilter,
							totalCount,
							source
						) {
							//console.log("IN LOAD MORE");
							//	console.log("SELECTED FILTER BEFORE - " + selectedFilter);

							if (!selectedFilter) {
								const checkedFilter = document.querySelector(
									".filter-item.is-checked"
								);
								const selectedFilterAttribute = checkedFilter
									? checkedFilter.getAttribute("data-filter")
									: null;

								selectedFilter = selectedFilterAttribute
									? selectedFilterAttribute.replace(".up-filter-img-", "")
									: "*";
							}
							//console.log("SELECTED FILTER AFTER - " + selectedFilter);

							if (isLoading) {
								return; // If already loading, exit the function
							}

							isLoading = true; // Set loading state to true
							// Hide the "Load More" button and show the SVG loader
							loadMoreButton.style.display = "none";
							svgLoader.style.display = "block";

							const items = document.querySelectorAll(
								".up-portfolio-img-content"
							);
							const checkedFilter = document.querySelector(
								".filter-item.is-checked"
							);

							/*const selectedFilterAttribute = checkedFilter
							? checkedFilter.getAttribute("data-filter")
							: null;

						const selectedFilter = selectedFilterAttribute
							? selectedFilterAttribute.replace(".up-filter-img-", "")
							: "*";*/

							let newlimit = 0; // Initialize newlimit with total number of items
							// Count the items of the selected filter
							let selectedFilterItemCount = 0;
							if (selectedFilter !== "*") {
								items.forEach((item) => {
									if (
										item.classList.contains("up-filter-img-" + selectedFilter)
									) {
										selectedFilterItemCount++;
									}
								});
							} else {
								selectedFilterItemCount = items.length;
							}
							// Update newlimit by the number of loaded items of the selected filter
							newlimit = selectedFilterItemCount;
							itemIds = Array.from(
								document.querySelectorAll(".up-portfolio-img-content")
							).map((item) => item.dataset.itemId);
							//console.log(newlimit);
							const xhr = new XMLHttpRequest();
							xhr.open("POST", location.href);
							xhr.setRequestHeader(
								"Content-Type",
								"application/x-www-form-urlencoded"
							);
							xhr.onload = function () {
								if (xhr.status === 200) {
									isLoading = false; // Reset loading state
									const response = xhr.responseText;
									const parser = new DOMParser();
									const html = parser.parseFromString(response, "text/html");
									const items = Array.from(html.querySelectorAll(".load-item"));
									const container = document.querySelector(
										".up-portfolio-img-wrapper"
									);
									if (items.length === 0) {
										isLoading = false; // Set loading state to false
										// No more data to show
										loadMoreButton.style.display = "none";
										svgLoader.style.display = "none";
										noMoreDataMessage.style.display = "block";
									} else {
										// Remove existing items only when click filters
										if (source === "filter") {
											const existingItems = Array.from(
												container.querySelectorAll(".up-portfolio-img-content")
											);

											existingItems.forEach((item) => {
												item.style.transition = "transform 0.2s, opacity 0.2s";
												item.style.transform = "scale(0)";
												item.style.opacity = "0";
												setTimeout(function () {
													container.removeChild(item);
													if (upPortfolioLayout === "slider") {
														mySwiper.removeSlide(items);
														mySwiper.update();
													} else if (upPortfolioLayout === "justified") {
														// Either rebuild or refresh the gallery
														just.justifiedGallery();
														// OR
														//just.justifiedGallery('norewind');
													} else {
														iso.remove(item);
													}
												}, 300);
											});
										}

										setTimeout(function () {
											//container.innerHTML = "";
											const fragment = document.createDocumentFragment();

											// First, append items to the fragment and container
											items.forEach((item) => {
												// Apply transitions and transformations
												item.style.transition = "transform 0.2s, opacity 0.2s";
												item.style.transform = "scale(0)";
												item.style.opacity = "0";
												fragment.appendChild(item);
											});
											container.appendChild(fragment);
											totalWidth = 0;

											// Rest of your code
											setTimeout(function () {
												items.forEach((item) => {
													setTimeout(function () {
														item.style.transform = "scale(1)";
														item.style.opacity = "1";
													}, 10);
												});

												// Your existing layout logic
												if (upPortfolioLayout === "slider") {
													mySwiper.appendSlide(items);
													mySwiper.update();
												} else if (upPortfolioLayout === "justified") {
													//just.justifiedGallery();
													just.justifiedGallery("norewind");
												} else {
													if (source === "filter") {
														iso.prepended(items);
													} else {
														iso.appended(items);
													}
													iso.layout();
												}

												setTimeout(function () {
													//iso.arrange({ filter: "*" });
												}, 500);
											}, 10);

											svgLoader.style.display = "none";
											loadMoreButton.style.display = "flex";
										}, 300);
									}
								}
							};
							xhr.onerror = function () {
								isLoading = false; // Reset loading state
								console.error("Error fetching more items");
							};
							const requestData = `offset=${newlimit}&selectedFilter=${selectedFilter}&source=${source}&itemIds=${encodeURIComponent(
								JSON.stringify(itemIds)
							)}`;
							xhr.send(requestData);
						};

						function checkFilterAndLoadMore(selectedFilter) {
							//console.log(selectedFilter);
							loadMoreButton.style.display = "block";
							noMoreDataMessage.style.display = "none";

							const itemsContainer = document.querySelector(
								".up-portfolio-img-wrapper"
							);
							const filters = JSON.parse(
								itemsContainer.getAttribute("data-total-limit")
							);
							//console.log(selectedFilter);

							let totalCount;
							let loadedCount;
							if (selectedFilter === "*") {
								loadedCount = document.querySelectorAll(
									`.up-portfolio-img-content`
								).length;
								/*totalCount = Object.values(filters).reduce(
								(total, count) => total + count,
								0
							);*/
								totalCount = totaDataItems;
							} else {
								loadedCount = document.querySelectorAll(
									`.up-portfolio-img-content.up-filter-img-${selectedFilter}`
								).length;
								totalCount = filters[selectedFilter] || 0;
							}

							//loadMoreButton.style.display =
							//loadedCount < totalCount ? "block" : "none";
							//noMoreDataMessage.style.display =
							//loadedCount < totalCount ? "none" : "block";

							loadMore(event, selectedFilter, Math.ceil(totalCount), "filter");
						}

						const loadMoreButton = document.querySelector("#load-more");

						if (paginationType == "load-more") {
							loadMoreButton.addEventListener("click", loadMore);
						} else {
							// If loadMoreButton is null, start scroll loading
							// Check if the page has initial scroll
							if (
								window.innerHeight + window.scrollY >=
									document.body.offsetHeight &&
								noMoreDataMessage.style.display != "block"
							) {
								loadMore();
							}
							window.addEventListener(
								"scroll",
								debounce(function () {
									if (
										!isLoading &&
										window.innerHeight + window.scrollY >=
											document.body.offsetHeight &&
										noMoreDataMessage.style.display != "block"
									) {
										loadMore();
									}
								}, 500)
							);
						}
					}

					document.querySelectorAll(".filter-item").forEach((filterItem) => {
						filterItem.addEventListener("click", function () {
							if (this.classList.contains("is-checked")) {
								return; // Prevent clicking on the currently checked filter
							}
							const selectedFilter = this.getAttribute("data-filter").replace(
								".up-filter-img-",
								""
							);
							checkFilterAndLoadMore(selectedFilter);
						});
					});
				});

				// bind filter button click
				var filter_text = document.querySelectorAll(".filter-selected");
				var item_container = document.querySelectorAll(
					".up-portfolio-img-content"
				);
				const paginationON = document
					.querySelector(".up-portfolio-img-wrapper")
					.getAttribute("data-pagination-type");
				console.log(paginationON);
				var filtersElem = imageGallery
					.closest(".up-parent-wrapper")
					.querySelectorAll(`.filter-wrapper-${wrapperid} li`);

				filtersElem.length > 0 &&
					filtersElem.forEach((item) => {
						item.addEventListener("click", function (event) {
							//console.log(selectedFilterdata);

							let filter_item_name =
								item.querySelector(".filter-item-name").innerText;
							filter_text.forEach((text) => {
								text.innerText = filter_item_name;
							});
							let imageGallery = item
								.closest(".up-parent-wrapper")
								.querySelector(`.${wrapperid}`);
							filterValue = item.getAttribute("data-filter");

							const selectedFilterdata = this.getAttribute("data-filter");
							var selectedFilter = selectedFilterdata.replace(".", "");
							// Update the data-fancybox attribute value

							item_container.forEach((figure) => {
								const links = figure.querySelectorAll(
									".up-portfolio-link-wrapper a"
								);
								links.forEach((link) => {
									if (link.classList.contains("up-lightbox")) {
										if (selectedFilter !== "*") {
											if (figure.classList.contains(selectedFilter)) {
												link.setAttribute("data-fancybox", "gallery");
											} else {
												link.removeAttribute("data-fancybox");
											}
										} else {
											link.setAttribute("data-fancybox", "gallery");
										}
									}
								});
							});

							filterValue = filterFns[filterValue] || filterValue;

							if (upPortfolioLayout === "slider") {
								// arrange filter for slider
								let swiper = item
									.closest(".up-parent-wrapper")
									.querySelector(`.up-portfolio-img-wrapper`);

								let slides = Array.from(
									swiper.querySelectorAll(".swiper-slide")
								);
								slides.forEach((slide, index) => {
									if (filterValue === "*" || slide.matches(filterValue)) {
										if (slide.style.display === "none") {
											slide.style.transition = "transform 0.2s, opacity 0.2s";
											slide.style.transform = "scale(0)";
											slide.style.opacity = "0";
											slide.style.display = "block";
											setTimeout(() => {
												slide.style.transform = "scale(1)";
												slide.style.opacity = "1";
											}, 10); // Adjust the delay duration (in milliseconds) as needed
										}
									} else {
										slide.style.transition = "transform 0.2s, opacity 0.2s";
										slide.style.transform = "scale(0)";
										slide.style.opacity = "0";
										setTimeout(() => {
											slide.style.display = "none";
										}, 300); // Adjust the transition duration (in milliseconds) as needed
									}

									setTimeout(() => {
										// Get the index of the first visible slide
										let firstVisibleSlideIndex = slides.findIndex(
											(slide) => slide.style.display !== "none"
										);
										mySwiper.slideTo(firstVisibleSlideIndex);
										// Update Swiper to recalculate slide positions
										mySwiper.update();
									}, 300);
								});
							} else if (upPortfolioLayout === "justified") {
								if (paginationON === null) {
									console.log("Yes IN PAGINATION DADA");

									const $gallery = jQuery("#liveDemo");
									const items = $gallery.find("div.up-portfolio-img-content");

									// Step 1: Scale down ALL items regardless of filter
									items.css({
										transform: "scale(0)",
										opacity: "0",
									});

									setTimeout(() => {
										// Apply the justifiedGallery filter
										if (filterValue === "*") {
											just.justifiedGallery({ filter: false });
										} else {
											just.justifiedGallery({ filter: filterValue });
										}

										// Step 2: After a short delay, scale up items that match the filter
										setTimeout(() => {
											items.each(function () {
												const $item = jQuery(this);
												if ($item.is(filterValue) || filterValue === "*") {
													$item.css({
														transform: "scale(1)",
														opacity: "1",
													});
												}
											});
											just.justifiedGallery("norewind");
										}, 200);
									}, 200); // 200ms delay gives the scaling down transition time to complete
								}
							} else {
								// arrange filter for galleries with isotope
								iso = Isotope.data(imageGallery);
								iso.arrange({
									filter: filterValue,
								});
							}
						});
					});
			}
		}
	});

	/******/
})();
//# sourceMappingURL=index.js.map
