import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import {
  Button,
  TextControl,
  ToggleControl,
  CheckboxControl,
  ButtonGroup,
  BaseControl,
  Modal as WpModal,
} from "@wordpress/components";

import { Component, Fragment } from "@wordpress/element";

import {
  SvgFilteroptionIcon,
  SvgAddfilterIcon,
  SvgDragHandle,
  SvgEditIcon,
  SvgTrashIcon,
  SvgContentCheck,
  SvgTag,
  SvgPro,
} from "./assets/images/index-svg";

/**
 * External dependencies
 */
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";

// Style objects
const trashStyle = {
  fontSize: 14,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: "10px",
  cursor: "pointer",
};

const editStyle = {
  fontSize: 14,
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
};

const styleFilterItems = {
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  padding: "0",
};

const styleFilterItem = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f8f8f8",
  border: "1px solid #ddd",
  marginBottom: "10px",
  padding: "10px",
  visibility: "visible",
  zIndex: 9999999,
};

const DragHandle = SortableHandle(() => (
  <span className="drag-handle" style={{ display: "flex", cursor: "grab" }}>
    <SvgDragHandle />
  </span>
));

const EditIcon = ({ position, onFeatureClick }) => (
  <span
    className="up-social-edit-icon"
    onClick={() => onFeatureClick(position)}
    style={editStyle}
  >
    <SvgEditIcon />
  </span>
);

const TrashIcon = ({ position, onDeleteFeature }) => (
  <span
    className="up-social-delete-icon"
    onClick={() => onDeleteFeature(position)}
    style={trashStyle}
  >
    <SvgTrashIcon />
  </span>
);

const SortableItem = SortableElement(
  ({
    feature,
    position,
    onFeatureClick,
    onFeatureChange,
    onDeleteFeature,
    clickedItem,
    onhandleInputBlur,
  }) => {
    return (
      <li
        className="up-portfolio-filter-control-item drag-helper"
        style={styleFilterItem}
      >
        <DragHandle />
        <span
          className="up-sortable-item"
          style={{ flexGrow: 1, marginLeft: "10px", marginRight: "10px" }}
        >
          {position === clickedItem ? (
            <TextControl
              className="up-sortable-title"
              value={feature.label}
              onChange={(value) => onFeatureChange("label", value, position)}
              onBlur={onhandleInputBlur}
              autoFocus
              style={{ height: "100%", marginBottom: 0 }}
            />
          ) : (
            <span className="up-sortable-title">{feature.label}</span>
          )}
        </span>
        <EditIcon position={position} onFeatureClick={onFeatureClick} />
        <TrashIcon position={position} onDeleteFeature={onDeleteFeature} />
      </li>
    );
  }
);

const SortableList = SortableContainer(
  ({
    features,
    onFeatureClick,
    onFeatureChange,
    onDeleteFeature,
    clickedItem,
    onhandleInputBlur,
  }) => {
    return (
      <ul
        className="up-portfolio-filter-control-items"
        style={styleFilterItems}
      >
        {features.map((item, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            position={index}
            feature={item}
            clickedItem={clickedItem}
            onFeatureClick={onFeatureClick}
            onFeatureChange={onFeatureChange}
            onDeleteFeature={onDeleteFeature}
            onhandleInputBlur={onhandleInputBlur}
          />
        ))}
      </ul>
    );
  }
);

class SortableFilterItems extends Component {
  state = {
    clickedItem: null,
  };

  onSortEnd = ({ newIndex, oldIndex }) => {
    const { filterItems, setAttributes } = this.props;
    setAttributes({ filterItems: arrayMove(filterItems, oldIndex, newIndex) });
  };

  onFeatureClick = (index) => {
    let clickedItem = this.state.clickedItem === index ? null : index;
    this.setState({ clickedItem });
  };

  onhandleInputBlur = () => {
    this.setState({ clickedItem: null });
  };

  onFeatureChange = (key, value, position) => {
    let filterItems = [...this.props.filterItems];
    let images = [...this.props.images];

    filterItems[position][key] = value;

    //sort
    let newValue = value.toLowerCase();
    newValue = newValue.replaceAll(" ", "-");
    newValue = newValue.replaceAll(",-", " up-filter-img-");
    newValue = newValue.replaceAll(",", "comma");
    newValue = newValue.replaceAll("&", "and");
    newValue = newValue.replaceAll("+", "plus");
    newValue = newValue.replaceAll("amp;", "");
    newValue = newValue.replaceAll("/", "slash");
    newValue = newValue.replaceAll("'", "apostrophe");
    newValue = newValue.replaceAll('"', "apostrophe");
    newValue = newValue.replaceAll(".", "-");
    newValue = newValue.replaceAll("~", "tilde");
    newValue = newValue.replaceAll("!", "exclamation");
    newValue = newValue.replaceAll("@", "at");
    newValue = newValue.replaceAll("#", "hash");
    newValue = newValue.replaceAll("(", "parenthesis");
    newValue = newValue.replaceAll(")", "parenthesis");
    newValue = newValue.replaceAll("=", "equal");
    newValue = newValue.replaceAll(";", "semicolon");
    newValue = newValue.replaceAll(":", "colon");
    newValue = newValue.replaceAll("<", "lessthan");
    newValue = newValue.replaceAll(">", "greaterthan");
    newValue = newValue.replaceAll("|", "pipe");
    newValue = newValue.replaceAll("\\", "backslash");
    newValue = newValue.replaceAll("^", "caret");
    newValue = newValue.replaceAll("*", "asterisk");
    newValue = newValue.replaceAll("$", "dollar");
    newValue = newValue.replaceAll("`", "backtick");
    newValue = newValue.replaceAll("[", "bracket");
    newValue = newValue.replaceAll("]", "bracket");
    newValue = newValue.replaceAll("{", "curlybracket");
    newValue = newValue.replaceAll("}", "curlybracket");
    newValue = newValue.replaceAll("?", "questionmark");

    filterItems[position]["value"] = newValue;

    //this.props.setAttributes({ filterItems });
    // Update the images array as needed.
    const updatedImages = [...images];
    // Add code here to make the necessary changes to updatedImages.

    this.props.setAttributes({ filterItems, images: updatedImages });
  };

  onDeleteFeature = (position) => {
    const { setAttributes, images } = this.props;
    const filterItems = [...this.props.filterItems];
    //const images = [...this.props.images];

    // Store the filter item you want to remove
    const removedFilter = filterItems[position];

    // Remove it from filterItems
    filterItems.splice(position, 1);

    // Update images by removing the corresponding filter
    const updatedImages = images.map((image) => {
      if (image.categories) {
        // Find the index of the filter in the categories array
        const index = image.categories.findIndex(
          (category) =>
            category.value === removedFilter.value &&
            category.label === removedFilter.label
        );

        // If found, remove it
        if (index > -1) {
          image.categories.splice(index, 1);
        }
      }

      return image;
    });

    setAttributes({ filterItems, images: updatedImages });
  };

  render = () => {
    return (
      <>
        <BaseControl
          label={__("Filter Order By Asc & Desc (PRO)", "ultimate-portfolio")}
        >
          <SvgPro />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              opacity: "0.5",
            }}
          >
            <button className="filter-sorting-button">Ascending</button>
            <button className="filter-sorting-button">Descending</button>
          </div>
        </BaseControl>

        <SortableList
          features={this.props.filterItems}
          onFeatureClick={this.onFeatureClick}
          onFeatureChange={this.onFeatureChange}
          onDeleteFeature={this.onDeleteFeature}
          onSortEnd={this.onSortEnd}
          clickedItem={this.state.clickedItem}
          onhandleInputBlur={this.onhandleInputBlur}
          useDragHandle
        />
      </>
    );
  };
}

//export default SortableFilterItems;

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
  const { displayType, enableFilterAll, filtercount, filterpost } = attributes;

  const [newAllFilter, setAllFilter] = useState(attributes.filteralltitle);

  const onFilterAdd = () => {
    const count = attributes.filterItems.length + 1;
    const filterItems = [
      ...attributes.filterItems,
      {
        value: `filter-item-${count}`,
        label: `Filter Item ${count}`,
      },
    ];

    setAttributes({ filterItems: filterItems });
  };

  const FILTERTYPEPOST = [
    { label: "Category", value: "category", icon: <SvgFilteroptionIcon /> },
    { label: "Tags", value: "post_tag", icon: <SvgTag /> },
  ];

  const handleFilterTitle = (newFilterTitle) => {
    setAllFilter(newFilterTitle);
    setAttributes({ filteralltitle: newFilterTitle });
  };

  const handlePostFilterType = (optionValue) => {
    //setPostType(optionValue);
    setAttributes({ filterpost: optionValue });
  };

  return (
    <WpModal title="Filters" onRequestClose={closeModal}>
      <div class="up-panel-control up-portfolio-control-item up-component-filter">
        {displayType === "posts" && (
          <BaseControl>
            <div className="up-component-content-selector">
              {FILTERTYPEPOST.map((option) => (
                <Button
                  key={option.value}
                  className={`up-component-content-type ${
                    filterpost === option.value ? "active-item" : ""
                  }`}
                  onClick={() => handlePostFilterType(option.value)}
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
        )}

        <ToggleControl
          label={__("Display All Filter", "ultimate-portfolio")}
          checked={enableFilterAll}
          onChange={() => setAttributes({ enableFilterAll: !enableFilterAll })}
        />

        <ToggleControl
          label={__("Filter Count", "ultimate-portfolio")}
          checked={filtercount}
          onChange={() => setAttributes({ filtercount: !filtercount })}
        />
        {filtercount === true && (
          <ToggleControl
            label={__("Filter Count On Hover", "ultimate-portfolio")}
            disabled
          />
        )}
        <TextControl
          label={__("Change Filter All Text", "ultimate-portfolio")}
          value={newAllFilter}
          onChange={handleFilterTitle}
        />

        <SortableFilterItems
          filterItems={attributes.filterItems}
          setAttributes={setAttributes}
          images={attributes.images}
        />
        {displayType === "gallery" && (
          <>
            <Button
              className="up-filter-feature-button"
              label={__("Add Filter", " ultimate-portfolio")}
              icon={SvgAddfilterIcon}
              onClick={onFilterAdd}
            >
              <span className="up-filter-add-button-label">
                {__("Add Filter", " ultimate-portfolio")}
              </span>
            </Button>
          </>
        )}
      </div>
    </WpModal>
  );
};

//export default Modal;

class FilterBlock extends Component {
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
      images: this.props.attributes.images || [],
    };
  }

  render() {
    const { title, images, openModal, closeModal, selectedImage, isDragged } =
      this.state;
    const selectedIndex = this.state.images.indexOf(selectedImage);
    return (
      <>
        <Button
          className="up-filter-control"
          value="Filter Option"
          onClick={() => this.openModal()}
          aria-label={__("Filter Option", " ultimate-portfolio")}
        >
          <SvgFilteroptionIcon />
          <span style={{ marginLeft: "8px" }}>
            {__("Filter Option", " ultimate-portfolio")}
          </span>
        </Button>
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
      </>
    );
  }
}

export default FilterBlock;
