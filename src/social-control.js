import React, { useState } from "react";
import { __ } from "@wordpress/i18n";

import {
	BaseControl,
	Button,
	TextControl,
	TextareaControl,
} from "@wordpress/components";
import {
	SvgYoutube,
	SvgInstagram,
	SvgFlickr,
	SvgVimeoicon,
	Svgunsplashicon,
	SvgContentCheck,
	SvgContentPosts,
	SvgContentGallery,
	SvgContentSocial,
	SvgLayoutGrid,
	SvgLayoutMasonry,
	SvgLayoutSlider,
	SvgLayoutClassic,
	SvgLayoutWave,
	SvgLayoutTilt,
	SvgLayoutStanderd,
	SvgLayoutNone,
	SvgLayoutFIlterMinimal,
	SvgLayoutFIlterStandred,
	SvgLayoutFIlterDown,
	SvgPro,
} from "./assets/images/index-svg";

const ContentSource = ({ setAttributes, attributes }) => {
	const { displayType } = attributes;

	const contentType = [
		{ label: "Posts", value: "posts", icon: <SvgContentPosts /> },
		{ label: "Gallery", value: "gallery", icon: <SvgContentGallery /> },
		{ label: "Social", value: "social", icon: <SvgContentSocial /> },
	];

	const [activeContentType, setContentType] = useState(null);
	const handleContentType = (optionValue) => {
		setContentType(optionValue);
		setAttributes({ displayType: optionValue });
	};

	return (
		<>
			<div className="up-setup-wizard-panel step-0">
				<BaseControl>
					<div className="up-component-content-selector">
						{contentType.map((option) => (
							<Button
								key={option.value}
								className={`up-component-content-type ${
									displayType === option.value ? "active-item" : ""
								}`}
								onClick={() => handleContentType(option.value)}
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

			{/* Conditionally render SocialControl based on the selected contentType */}
			{displayType === "social" && (
				<SocialControl setAttributes={setAttributes} attributes={attributes} />
			)}
		</>
	);
};

const SocialControl = ({ setAttributes, attributes }) => {
	// Social type icons and labels
	const socialType = [
		{ label: "YouTube", icon: <SvgYoutube /> },
		{ label: "Instagram", icon: <SvgInstagram /> },
		{ label: "Flickr", icon: <SvgFlickr /> },
		{ label: "Vimeo", icon: <SvgVimeoicon /> },
		{ label: "Unsplash", icon: <Svgunsplashicon /> },
	];

	return (
		<div className="up-setup-wizard-panel step-0">
			<BaseControl>
				<div className="up-component-content-selector">
					{socialType.map((option) => (
						<Button key={option.label} className={`up-component-content-type`}>
							<div className="up-content-item">{option.icon}</div>
							<span>{option.label}</span>
							<div className="svg-pro">
								<SvgPro />
							</div>
						</Button>
					))}
				</div>
			</BaseControl>
		</div>
	);
};

const ContentLayoutStyle = ({ setAttributes, attributes }) => {
	const { hoverStyle } = attributes;

	const LayoutStyleType = [
		{ label: "None", value: "layout-none", icon: <SvgLayoutNone /> },
		{ label: "Classic", value: "layout-classic", icon: <SvgLayoutClassic /> },
		{
			label: "Standerd",
			value: "layout-standerd",
			icon: <SvgLayoutStanderd />,
		},
		{ label: "Wave", value: "layout-wave", icon: <SvgLayoutWave /> },
		{ label: "Tilt", value: "layout-tilt", icon: <SvgLayoutTilt /> },
	];

	const handleLayoutStyle = (optionValue) => {
		//setContentType(optionValue);
		setAttributes({ hoverStyle: optionValue });
	};

	return (
		<>
			<div className="up-setup-wizard-panel step-0">
				<BaseControl>
					<div className="up-component-content-selector">
						{LayoutStyleType.map((option) => (
							<Button
								key={option.value}
								className={`up-component-content-type ${
									hoverStyle === option.value ? "active-item" : ""
								}`}
								onClick={() => handleLayoutStyle(option.value)}
								disabled={
									LayoutStyleType !== option.value && option.value === "layout-tilt"
								}
							>
								{option.value === "layout-tilt" && (
									<div className="svg-pro">
										<SvgPro />
									</div>
								)}
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
	);
};

const ContentLayoutFilterStyle = ({ setAttributes, attributes }) => {
	const { filter_layouts } = attributes;

	const LayoutFilterStyleType = [
		{
			label: "Minimal",
			value: "filter_style_minimal",
			icon: <SvgLayoutFIlterMinimal />,
		},
		{
			label: "Standerd",
			value: "filter_style_standerd",
			icon: <SvgLayoutFIlterStandred />,
		},
		{
			label: "Dropdown",
			value: "filter_style_dropdown",
			icon: <SvgLayoutFIlterDown />,
		},
	];

	const handleLayoutFilterStyle = (optionValue) => {
		setAttributes({ filter_layouts: optionValue });
		switch (optionValue) {
			case "filter_style_minimal":
				setAttributes({
					filtercolor: "#007BFF",
				});
				break;
			case "filter_style_standerd":
				setAttributes({
					filtercolor: "#FFFFFF",
				});
				break;
			case "filter_style_dropdown":
				setAttributes({
					filtercolor: "#000000",
				});
				break;
			default:
				return false;
		}
	};

	return (
		<>
			<div className="up-setup-wizard-panel step-0">
				<BaseControl>
					<div className="up-component-content-selector">
						{LayoutFilterStyleType.map((option) => (
							<Button
								key={option.value}
								className={`up-component-content-type ${
									filter_layouts === option.value ? "active-item" : ""
								}`}
								onClick={() => handleLayoutFilterStyle(option.value)}
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
	);
};

const ContentLayoutType = ({ setAttributes, attributes }) => {
	const { layouts } = attributes;

	const layoutType = [
		{ label: "Grid", value: "grid", icon: <SvgLayoutGrid /> },
		{ label: "Masonry", value: "masonry", icon: <SvgLayoutMasonry /> },
		{ label: "Slider", value: "slider", icon: <SvgLayoutSlider /> },
		{ label: "Justified", value: "justified", icon: <SvgLayoutMasonry /> },
	];

	//const [activeLayoutType, setLayoutType] = useState("grid");
	const handleLayoutType = (optionValue) => {
		setAttributes({ layouts: optionValue });
	};
	return (
		<>
			<div className="up-setup-wizard-panel">
				<BaseControl>
					<div className="up-component-content-selector up-component-layout-selector">
						{layoutType.map((option) => (
							<Button
								key={option.value}
								className={`up-component-content-type ${
									layouts === option.value ? "active-item" : ""
								}`}
								onClick={() => handleLayoutType(option.value)}
								disabled={
									layoutType !== option.value && option.value === "justified"
								}
							>
								{option.value === "justified" && (
									<div className="svg-pro">
										<SvgPro />
									</div>
								)}
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
	);
};

export {
	SocialControl,
	ContentSource,
	ContentLayoutType,
	ContentLayoutStyle,
	ContentLayoutFilterStyle,
};
