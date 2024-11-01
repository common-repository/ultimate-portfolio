import React from "react";
import { __ } from "@wordpress/i18n";
import {
	Button,
	BaseControl,
	TextControl,
	TextareaControl,
	SelectControl,
	Modal as WpModal,
	FocalPointPicker,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";
//import CreatableMultiSelectDropdown from "./CreatableMultiSelectDropdown";
import CreatableSelect from "react-select/creatable";

const Modal = ({
	title,
	isOpen,
	closeModal,
	openModal,
	setAttributes,
	attributes,
	imageSrc,
	selectedIndex,
	categoriesOptions,
}) => {
	const [focalPoint, setFocalPoint] = useState({
		x: 0.5,
		y: 0.5,
	});

	const [videoUrl, setVideoUrl] = useState("");
	const [permalink, setImageUrl] = useState(null);

	// Image title
	const [imageTitle, setImageTitle] = useState(
		//attributes.images[selectedIndex].caption
		// CODE FOR CUSTUM TITLE IMAGE
		attributes.images[selectedIndex].title
	);

	// Image title set acording caption source
	useEffect(() => {
		switch (attributes.captionSource) {
			case "title":
				setImageTitle(attributes.images[selectedIndex].title);
				break;
			case "custom":
				setImageTitle(attributes.images[selectedIndex].customTitle);
				break;
			case "caption":
				setImageTitle(attributes.images[selectedIndex].caption);
				break;
			case "alt":
				setImageTitle(attributes.images[selectedIndex].alt);
				break;
			case "description":
				setImageTitle(attributes.images[selectedIndex].description);
				break;
			default:
				setImageTitle("");
				break;
		}
	}, [attributes.captionSource, attributes.images, selectedIndex]);

	// Creating Categories
	const [selectedCategories, setSelectedCategories] = useState(
		attributes.images[selectedIndex].categories
			? attributes.images[selectedIndex].categories.map((category) => ({
					label: category.label,
					value: category.value,
			  }))
			: []
	);
	// Showing Options
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const allSelectedCategories = [];
		attributes.images.forEach((image) => {
			if (Array.isArray(image.categories)) {
				allSelectedCategories.push(...image.categories);
			}
		});
		const allFilterItems = attributes.filterItems;

		const combinedCategories = [...allSelectedCategories, ...allFilterItems];

		const uniqueCategories = combinedCategories.reduce((unique, item) => {
			if (
				!unique.find(
					(uniqueItem) =>
						uniqueItem.value === item.value && uniqueItem.label === item.label
				)
			) {
				unique.push(item);
			}
			return unique;
		}, []);

		const allOptions = uniqueCategories.map((category) => ({
			label: category.label,
			value: category.value,
		}));
		setOptions(allOptions);
	}, [attributes.images, attributes.filterItems]);

	const [imageDescription, setImageDescription] = useState(
		attributes.images[selectedIndex].description
	);

	// Image title set acording caption source
	useEffect(() => {
		switch (attributes.descriptionSource) {
			case "custom":
				setImageDescription(attributes.images[selectedIndex].customDescription);
				break;
			case "description":
				setImageDescription(attributes.images[selectedIndex].description);
				break;
			default:
				setImageDescription("");
				break;
		}
	}, [attributes.descriptionSource, attributes.images, selectedIndex]);

	// Item Title
	const handleImageTitleChange = (newTitle) => {
		if (attributes.captionSource === "custom") {
			const updatedSources = [...attributes.images];
			updatedSources[selectedIndex].customTitle = newTitle;

			setAttributes({
				...attributes,
				images: updatedSources,
			});

			setImageTitle(newTitle);
		}
	};

	// item Disctiption
	const handleDiscriptionChange = (newDescription) => {
		if (attributes.descriptionSource === "custom") {
			const updatedSources = [...attributes.images];
			updatedSources[selectedIndex].customDescription = newDescription;

			setAttributes({
				...attributes,
				images: updatedSources,
			});

			setImageDescription(newDescription);
		}
	};

	// item Categories
	const handleSelectedCategoriesChange = (newValue) => {
		setSelectedCategories(newValue);
		const updatedImages = [...attributes.images];
		updatedImages[selectedIndex].categories = newValue.map((category) => ({
			label: category.label,
			value: category.value,
		}));

		const newFilterItems = newValue.map((category) => ({
			label: category.label,
			value: category.value,
		}));

		const existingFilterItems = new Set(
			(attributes.filterItems || []).map((item) => item.value)
		);

		const allFilterItems = [
			...(attributes.filterItems || []),
			...newFilterItems.filter((item) => !existingFilterItems.has(item.value)),
		];

		setAttributes({
			images: updatedImages,
			filterItems: allFilterItems,
		});

		setOptions(
			[...options, ...newFilterItems]
				.filter(({ value }) => !existingFilterItems.has(value))
				.map(({ label, value }) => ({ label, value }))
		);
	};

	useEffect(() => {
		// Update the focal point in the state when the selectedIndex changes
		if (attributes.images[selectedIndex].focalPoint) {
			setFocalPoint(attributes.images[selectedIndex].focalPoint);
		} else {
			setFocalPoint({
				x: 0.5,
				y: 0.5,
			});
		}
		// Update the video URL in the state when the selectedIndex changes
		if (attributes.images[selectedIndex].videoUrl) {
			setVideoUrl(attributes.images[selectedIndex].videoUrl);
		} else {
			setVideoUrl("");
		}
		// Update the video URL in the state when the selectedIndex changes
		if (attributes.images[selectedIndex].permalink) {
			setImageUrl(attributes.images[selectedIndex].permalink);
		} else {
			setImageUrl("");
		}
	}, [attributes.images, selectedIndex]);

	const updateFocalPoint = (newFocalPoint) => {
		const updatedImages = [...attributes.images];
		updatedImages[selectedIndex].focalPoint = newFocalPoint;
		setAttributes({
			...attributes,
			images: updatedImages,
		});
		setFocalPoint(newFocalPoint);
	};
	return (
		<WpModal title="Image Preview" onRequestClose={closeModal}>
			<div class="up-portfolio-control-item">
				<FocalPointPicker
					url={imageSrc.url}
					value={focalPoint}
					onChange={updateFocalPoint}
				/>
				<TextControl
					label={__("Item Title", "ultimate-portfolio")}
					value={imageTitle}
					onChange={handleImageTitleChange}
					disabled={attributes.captionSource !== "custom"}
				/>
				<BaseControl label={__("Categories", "ultimate-portfolio")}>
					<CreatableSelect
						isMulti
						onChange={handleSelectedCategoriesChange}
						options={options}
						value={selectedCategories}
						maxWidth={200}
						placeholder="Create or Select ..." // Add this line
					/>
				</BaseControl>
				<BaseControl label={__("Select Media Type", "ultimate-portfolio")}>
					<SelectControl
						value={attributes.images[selectedIndex].mediaType || "image"}
						options={[
							{ value: "image", label: "Image" },
							{ value: "video", label: "Video" },
						]}
						onChange={(value) => {
							const updatedImages = [...attributes.images];
							updatedImages[selectedIndex].mediaType = value;
							setAttributes({ ...attributes, images: updatedImages });
						}}
					/>
				</BaseControl>
				{attributes.images[selectedIndex].mediaType === "video" && (
					<TextControl
						label={__("Video URL", " ultimate-portfolio")}
						value={videoUrl}
						onChange={(value) => {
							const updatedItems = [...attributes.images];
							updatedItems[selectedIndex].videoUrl = value;
							setAttributes({ ...attributes, images: updatedItems });
						}}
					/>
				)}
				<TextControl
					label={__("Image URL", "ultimate-portfolio")}
					value={permalink}
					onChange={(value) => {
						const updatedItems = [...attributes.images];
						updatedItems[selectedIndex].permalink = value;
						setAttributes({ ...attributes, images: updatedItems });
					}}
				/>
				<TextareaControl
					label={__("Description", "ultimate-portfolio")}
					value={imageDescription}
					onChange={handleDiscriptionChange}
					disabled={attributes.descriptionSource !== "custom"}
				/>
			</div>
		</WpModal>
	);
};

export default Modal;
