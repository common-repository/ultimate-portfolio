import React, { useState } from "react";
import {
	Button,
	SelectControl,
	ToggleControl,
	RangeControl,
	BaseControl,
	TextControl,
	Modal as WpModal,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import {
	SvgFilteroptionIcon,
	SvgContentCheck,
	SvgLayoutSlider,
	SvgCoverflow,
	SvgCard,
	SvgFade,
	SvgPro,
} from "./assets/images/index-svg";

const Modal = ({ closeModal, setAttributes, attributes }) => {
	const {
		slidecenter,
		slidereffect,
		slidesspeed,
		slidedelay,
		slideheight,
		sliderpausemouse,
		sliderarrow,
		sliderbullets,
	} = attributes; // Destructure slidecenter and sliderloop attributes

	const SLIDERLAYOUTS = [
		{
			label: __("Default Slide", "ultimate-portfolio"),
			value: "slide",
			icon: <SvgLayoutSlider />,
		},
		{
			label: __("Card", "ultimate-portfolio"),
			value: "cards",
			icon: <SvgCard />,
		},
		{
			label: __("Fade", "ultimate-portfolio"),
			value: "fade",
			icon: <SvgFade />,
		},
		{
			label: __("coverflow", "ultimate-portfolio"),
			value: "coverflow",
			icon: <SvgCoverflow />,
		},
	];

	//const [activeLayoutType, setLayoutType] = useState("grid");
	const handleEffectType = (optionValue) => {
		setAttributes({ slidereffect: optionValue });
	};

	return (
		<WpModal title="Slider" onRequestClose={closeModal}>
			<div className="up-panel-control up-portfolio-control-item">
				<div className="up-component-content-selector up-component-layout-selector">
					{SLIDERLAYOUTS.map((option) => (
						<Button
							key={option.value}
							className={`up-component-content-type ${
								slidereffect === option.value ? "active-item" : ""
							}`}
							onClick={() => handleEffectType(option.value)}
							disabled={
								SLIDERLAYOUTS !== option.value && option.value === "coverflow"
							}
						>
							{option.value === "coverflow" && (
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
				<div className="component-slider-">
					<RangeControl
						label={__("SPEED (IN SECONDS)", "ultimate-portfolio")}
						value={slidesspeed}
						onChange={(value) => setAttributes({ slidesspeed: value })}
						min={1000}
						max={10000}
					/>
					<RangeControl
						label={__("AUTOPLAY (IN SECONDS)", "ultimate-portfolio")}
						value={slidedelay}
						onChange={(value) => setAttributes({ slidedelay: value })}
						min={0}
						max={6000}
					/>
				</div>
				<div className="up-component-slider">
					<TextControl
						label={__("Image Size In Px", "ultimate-portfolio")}
						type="number"
						value={slideheight}
						onChange={(newslideheight) =>
							setAttributes({ slideheight: newslideheight })
						}
					/>
					<ToggleControl
						label={__("Pause on Mouse Over", "ultimate-portfolio")}
						checked={sliderpausemouse}
						onChange={() =>
							setAttributes({ sliderpausemouse: !sliderpausemouse })
						}
					/>
					<ToggleControl
						label={__("Center Slide", "ultimate-portfolio")}
						checked={slidecenter}
						onChange={() => setAttributes({ slidecenter: !slidecenter })}
					/>

					<ToggleControl
						label={__("Display Navigation Arrows", "ultimate-portfolio")}
						checked={sliderarrow}
						onChange={() => setAttributes({ sliderarrow: !sliderarrow })}
					/>
					<ToggleControl
						label={__("Display Pagination Bullets", "ultimate-portfolio")}
						checked={sliderbullets}
						onChange={() => setAttributes({ sliderbullets: !sliderbullets })}
					/>
				</div>
				<div className="ultimate-portfolio-pro-feature">
					<p>
						<strong>Premium Only </strong>
						<SvgPro />
					</p>
					<p>Slide Auto Height</p>
					<p>Slide Loop</p>
					<p>Display Dynamic Bullets</p>
					<a
						class="ultimate-portfolio-pro-button"
						target="_blank"
						rel="noopener noreferrer"
						href="https://webenvo.com/ultimate-portfolio/pricing/"
					>
						Go Pro
					</a>
				</div>
			</div>
		</WpModal>
	);
};

const SliderBlock = ({ attributes, setAttributes }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button
				className="up-filter-control"
				onClick={openModal}
				aria-label={__("Slider Option", "ultimate-portfolio")}
			>
				<SvgFilteroptionIcon />
				<span style={{ marginLeft: "8px" }}>
					{__("Slider Option", "ultimate-portfolio")}
				</span>
			</Button>
			{isModalOpen && (
				<Modal
					closeModal={closeModal}
					setAttributes={setAttributes}
					attributes={attributes}
				/>
			)}
		</>
	);
};

export default SliderBlock;
