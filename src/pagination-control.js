import React, { useState } from "react";
import { PanelColorSettings } from "@wordpress/block-editor";
import {
	Button,
	BaseControl,
	TextControl,
	Modal as WpModal,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import {
	SvgFilteroptionIcon,
	SvgPaginationWiz,
	SvgContentCheck,
	SvgLoadmoreIcon,
	SvgScroll,
} from "./assets/images/index-svg";

const Modal = ({ closeModal, setAttributes, attributes }) => {
	const { loadMoreEndText, paginationType } = attributes;
	const [newLoadMore, setNewLoadMore] = useState(attributes.loadMoreText);
	const [newLoadMoreEnd, setnewLoadMoreEnd] = useState(loadMoreEndText);

	const [paginationbgcolor, setPaginationbgcolor] = useState(
		attributes.paginationbgcolor
	);

	const handleLoadmoreTitle = (newTitle) => {
		setNewLoadMore(newTitle);
		setAttributes({ loadMoreText: newTitle });
	};
	const handleLoadmoreEnd = (newTitle) => {
		setnewLoadMoreEnd(newTitle);
		setAttributes({ loadMoreEndText: newTitle });
	};

	const handlePaginationType = (option) => {
		setAttributes({ paginationType: option });
	};
	const handleColorChange = (color) => {
		setPaginationbgcolor(color);
		setAttributes({ paginationbgcolor: color });
	};

	const PaginationType = [
		{ label: "Pagination", value: "load-paged", icon: <SvgPaginationWiz /> },
		{ label: "Load More", value: "load-more", icon: <SvgLoadmoreIcon /> },
		{ label: "Scroll", value: "load-scroll", icon: <SvgScroll /> },
	];

	return (
		<WpModal title="Pagination" onRequestClose={closeModal}>
			<div className="up-portfolio-control-item up-component-pagination">
				<BaseControl>
					<div className="up-component-content-selector">
						{PaginationType.map((option) => (
							<Button
								key={option.value}
								className={`up-component-content-type ${
									paginationType === option.value ? "active-item" : ""
								}`}
								onClick={() => handlePaginationType(option.value)}
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

				{paginationType !== "load-paged" && (
					<>
						<TextControl
							label={__("Load More Text", "ultimate-portfolio")}
							value={newLoadMore}
							onChange={handleLoadmoreTitle}
						/>
						<TextControl
							label={__("Load More End Text", "ultimate-portfolio")}
							value={newLoadMoreEnd}
							onChange={handleLoadmoreEnd}
						/>
					</>
				)}
				<BaseControl label={__("Pagination Color", "ultimate-portfolio")}>
					<div class="up-portfolio-color-control">
						<PanelColorSettings
							colorSettings={[
								{
									value: paginationbgcolor,
									onChange: handleColorChange, // Use the handler to update the color state
									label: __("Text Color", "ultimate-portfolio"), // Added comma here
									clearable: true,
								},
							]}
						/>
					</div>
				</BaseControl>
			</div>
		</WpModal>
	);
};

const PaginationBlock = ({ attributes, setAttributes }) => {
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
				aria-label={__("Pagination Option", "ultimate-portfolio")}
			>
				<SvgFilteroptionIcon />
				<span style={{ marginLeft: "8px" }}>
					{__("Pagination Option", "ultimate-portfolio")}
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

export default PaginationBlock;
