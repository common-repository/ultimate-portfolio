//import React, { Component } from "react";
import { Component, useState } from "@wordpress/element";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

import {
	SvgLoadmoreIcon,
	SvgUploadimgIcon,
	SvgDragIcon,
	SvgDeleteIcon,
	SvgSettingIcon,
} from "./assets/images/index-svg";

//import { arrayMove } from "react-sortable-hoc";
import Modal from "./gallery-control";
import { Line } from "rc-progress";
// Style objects
const trashStyle = {
	position: "absolute",
	bottom: "3px",
	opacity: 0,
	right: "10px",
	display: "flex",
	visibility: "visible",
	zIndex: 1,
	transition: ".3s opacity",
};
const imgbtnstyle = {
	position: "relative",
	display: "block",
	width: "100%",
	height: "100%",
	padding: 0,
	paddingBottom: "100%",
	overflow: "hidden",
	backgroundColor: "#f7f7f7",
	borderRadius: "5px",
	boxShadow: "none",
	transition: "0.3s background-color",
};
const imgstyle = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "5px",
	visibility: "visible",
};

const SettingIcon = ({ value, openModal }) => (
	<span
		onClick={() => openModal(value)}
		className="up-pannel-control-icon"
		style={{
			position: "absolute",
			bottom: "3px",
			left: "10px",
			display: "flex",
			visibility: "visible",
			opacity: 0,
			zIndex: 1,
			transition: ".3s opacity",
			cursor: "pointer",
		}}
	>
		<SvgSettingIcon />
	</span>
);

const DragHandle = SortableHandle(() => (
	<span
		className="drag-handle"
		style={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -90%)",
			background: "rgba(0, 0, 0, 0.8)",
			borderRadius: "50%",
			width: "24px",
			height: "24px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			opacity: 0,
			transition: ".3s opacity",
		}}
	>
		<SvgDragIcon />
	</span>
));
const TrashButton = ({ handleRemove, position }) => (
	<Button
		className="up-component-portfolio-control-item-remove"
		style={trashStyle}
		onClick={() => handleRemove(position)}
	>
		<SvgDeleteIcon />
	</Button>
);
const SortableItem = SortableElement(
	({ value, handleRemove, openModal, position, isModalOpen, isDragged }) => {
		//console.log(isDragged);
		return (
			<div className={`up-component-portfolio-control-item`}>
				<Button
					type="button"
					className="components-button up-component-portfolio-control-item-button"
					style={imgbtnstyle}
				>
					<img
						className={`up-portfolio-img`}
						src={value.url}
						alt={value.alt}
						onClick={() => openModal(value)}
						style={imgstyle}
					/>
					<DragHandle />
				</Button>

				<SettingIcon value={value} openModal={openModal} />
				<TrashButton position={position} handleRemove={handleRemove} />
			</div>
		);
	}
);
const SortableList = SortableContainer(
	({ items, openModal, handleRemove, isDragged }) => {
		//console.log(items);
		return (
			<div className="up-component-portfolio-control-items">
				{items.map((value, index) => (
					<SortableItem
						key={`item-${index}`}
						index={index}
						position={index}
						value={value}
						openModal={openModal}
						handleRemove={handleRemove}
						isDragged={isDragged}
					/>
				))}
			</div>
		);
	}
);
class GalleryBlock extends Component {
	handleRemove = (position) => {
		this.setState(({ images }) => {
			const updatedImages = [...images];
			updatedImages.splice(position, 1);
			return { images: updatedImages };
		});
		const { setAttributes } = this.props;
		let images = [...this.props.attributes.images];
		images.splice(position, 1);
		setAttributes({ images });
	};
	handleDeleteAllImages = () => {
		// Remove all images from state and attributes
		if (window.confirm("Are you sure you want to delete all images?")) {
			// Delete all images
			this.setState({ images: [] });
			const { setAttributes } = this.props;
			setAttributes({ images: [] });
		}
	};
	openModal = (imageSrc) => {
		this.setState({ openModal: true, selectedImage: imageSrc });
	};
	closeModal = () => {
		this.setState({
			openModal: false,
		});
	};
	constructor(props) {
		super(props);
		this.state = {
			isDragged: false,
			page: 1,
			itemsPerPage: 9,
			images: this.props.attributes.images || [],
		};
	}
	// Check & add if new item added to gallery
	componentDidUpdate(prevProps) {
		if (prevProps.attributes.images !== this.props.attributes.images) {
			let updatedImages = this.state.images.concat(
				this.props.attributes.images.filter(
					(img) => !this.state.images.some((e) => e.id === img.id)
				)
			);
			this.setState({
				images: updatedImages,
			});
		}
	}

	onSortStart = () => {
		this.setState({ isDragged: true });
	};
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(
			{
				isDragged: false,
				images: arrayMoveImmutable(this.state.images, oldIndex, newIndex),
			},
			() => {
				const { setAttributes } = this.props;
				setAttributes({ images: this.state.images });
			}
		);
	};
	onSelectImage = (media) => {
		this.setState((prevState) => ({
			images: [...prevState.images, ...media],
		}));
		this.setState({
			images: [...this.state.images, ...media],
		});
		const { setAttributes } = this.props;
		let images = [...this.props.attributes.images];
		images.push(...media);
		setAttributes({ images });
	};
	render() {
		const {
			title,
			images,
			openModal,
			closeModal,
			selectedImage,
			isDragged,
			page,
			itemsPerPage,
		} = this.state;
		const selectedIndex = this.state.images.indexOf(selectedImage);
		const paginatedImages = this.state.images.slice(0, page * itemsPerPage);
		//const paginatedImages = images.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
		const imageCount = images.length;
		const startItemIndex = Math.min(page * itemsPerPage, images.length);
		//items={this.state.images}
		//console.log(page, itemsPerPage);
		const totalItemCount = images.length;
		const loadingProgress = (startItemIndex / totalItemCount) * 100;

		return (
			<>
				<SortableList
					items={paginatedImages}
					onSortStart={this.onSortStart}
					onSortEnd={this.onSortEnd}
					openModal={this.openModal}
					handleRemove={this.handleRemove}
					isDragged={isDragged}
					//useDragHandle
					axis="xy"
				/>
				{openModal && (
					<Modal
						style={{ maxWidth: "200px" }}
						attributes={this.props.attributes}
						setAttributes={this.props.setAttributes}
						isOpen={openModal}
						imageSrc={selectedImage}
						closeModal={this.closeModal}
						onRequestClose={closeModal}
						selectedIndex={selectedIndex}
					/>
				)}

				<Line
					style={{
						marginTop: "20px",
						marginBottom: "10px",
					}}
					percent={loadingProgress}
					strokeColor="#007bff"
					viewBox="0 0 100 0.5"
					options={{
						strokeWidth: 2,
						color: "#007bff",
						trailColor: "#f5f5f5",
					}}
				/>
				<div
					className="up-component-item-counter"
					style={{
						marginBottom: "10px",
						textAlign: "center",
						fontWeight: 500,
						textTransform: "unset",
					}}
				>
					Showing {startItemIndex} of {imageCount} Images
				</div>

				{images.length > page * itemsPerPage && (
					<Button
						className="up-component-control-btn"
						onClick={() =>
							this.setState((prevState) => ({ page: prevState.page + 1 }))
						}
					>
						<SvgLoadmoreIcon />
						<span style={{ marginLeft: "8px" }}>Show More</span>
					</Button>
				)}

				<MediaUpload
					value={images.map((img) => img.id)}
					onSelect={(images) => this.props.setAttributes({ images })}
					mode
					multiple="add"
					render={({ open }) => (
						<Button
							className="up-portfolio-upload-button"
							//label={__("Upload Media", "ultimate-portfolio")}
							icon={<SvgUploadimgIcon />}
							onClick={open}
						>
							<span>Edit Items</span>
						</Button>
					)}
				/>
				<Button
					className="up-portfolio-upload-button red"
					icon={<SvgDeleteIcon />}
					onClick={this.handleDeleteAllImages}
				>
					<span>Delete All Items</span>
				</Button>
			</>
		);
	}
}
export default GalleryBlock;
