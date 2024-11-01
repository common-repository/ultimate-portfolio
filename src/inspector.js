/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
} from "@wordpress/block-editor";
const { select } = wp.data;

import {
  PanelBody,
  SelectControl,
  ToggleControl,
  RangeControl,
  Button,
  ButtonGroup,
  BaseControl,
  TabPanel,
  TextControl,
  RadioControl,
  FocalPointPicker,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";
import Responsivecontrolblock from "./ResponsiveRangeController";
import CreatableSelect from "react-select/creatable";
import { useSelect } from "@wordpress/data";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/text";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-textmate";
import {
  SvgAlignstart,
  SvgAligncenter,
  SvgAlignend,
  SvgImagesetting,
  SvgcontentIcon,
  SvgfilterIcon,
  SvggenralIcon,
  SvgImageAddIcon,
  SvgContentCheck,
  SvgFile,
  SvgCode,
  SvgLoadmoreIcon,
  SvgItemControl,
  SvgColorPaletteIcon,
  SvgFilteroptionIcon,
  SvgPro,
} from "./assets/images/index-svg";

import FilterBlock from "./filteritems-control";
import PaginationBlock from "./pagination-control.js";
import SliderBlock from "./slider-control.js";

import GalleryBlock from "./sortableGallery";
import {
  ContentSource,
  ContentLayoutType,
  ContentLayoutStyle,
  ContentLayoutFilterStyle,
} from "./social-control";

/**
 * External Dependencies
 */

const PostType = [
  { label: "Post", value: "post", icon: <SvgFile /> },
  { label: "Page", value: "page", icon: <SvgFile /> },
  { label: "Portfolio", value: "portfolio", icon: <SvgFile /> },
];
const CAPTIONSOURCE = [
  { label: __("Title", "ultimate-portfolio"), value: "title" },
  { label: __("Custom", "ultimate-portfolio"), value: "custom" },
  { label: __("Caption", "ultimate-portfolio"), value: "caption" },
  { label: __("Alt", "ultimate-portfolio"), value: "alt" },
  { label: __("Description", "ultimate-portfolio"), value: "description" },
];

const DESCRIPTIONSOURCE = [
  { label: __("Item Description", "ultimate-portfolio"), value: "description" },
  { label: __("Custom", "ultimate-portfolio"), value: "custom" },
];

const LOADMORECOUNT = [
  {
    label: __("Custom Count", "ultimate-portfolio"),
    value: true,
  },
  {
    label: __("All item", "ultimate-portfolio"),
    value: false,
  },
];

const CONTENT_ALIGN = [
  {
    label: __("Flex Start", "ultimate-portfolio"),
    value: "left",
    icon: <SvgAlignstart />,
  },
  {
    label: __("Center", "ultimate-portfolio"),
    value: "center",
    icon: <SvgAligncenter />,
  },
  {
    label: __("Flex End", "ultimate-portfolio"),
    value: "right",
    icon: <SvgAlignend />,
  },
];

const FILTER_ALIGN = [
  {
    label: __("Flex Start", "ultimate-portfolio"),
    value: "flex-start",
    icon: <SvgAlignstart />,
  },
  {
    label: __("Center", "ultimate-portfolio"),
    value: "center",
    icon: <SvgAligncenter />,
  },
  {
    label: __("Flex End", "ultimate-portfolio"),
    value: "flex-end",
    icon: <SvgAlignend />,
  },
];

function Inspector(props) {
  const { attributes, setAttributes } = props;
  const {
    displayType,
    imageCount,
    maxImages,
    layouts,
    hoverStyle,
    image_gap,
    displayCaption,
    displayDescription,
    displayCategory,
    captionSource,
    descriptionSource,
    backgroundColor,
    backgroundimageUrl,
    filtercolor,
    filterbgcolor,
    layoutbgcolor,
    taxonomytextcolor,
    layouttextcolor,
    layouttexthovercolor,
    layoutdesccolor,
    disablesearchicon,
    disablelinkicon,
    disabldownloadicon,
    disablevideoicon,
    disableLightBox,
    disabletitleLightBox,
    disableshareLightBox,
    enableFilter,
    sortingcontrol,
    searchcontrol,
    ulpagination,
    sources,
    fetchPostOption,
    avoidDuplicates,
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
    postOffset,
    upimageheight,
    upimageradius,
  } = attributes;

  const [editorContent, setEditorContent] = useState(
    attributes.codeContent || ""
  );

  const [bgFocalPoint, setBGFocalPoint] = useState({
    x: 0.5,
    y: 0.5,
  });

  const updateFocalPoint = (newFocalPoint) => {
    setAttributes({
      ...attributes,
      bgFocalPoint: newFocalPoint,
    });
    setBGFocalPoint(newFocalPoint);
  };

  const handleEditorChange = (newContent) => {
    // Update the state with the new content
    setEditorContent(newContent);

    // Update the attributes with the new content
    setAttributes({ ...attributes, codeContent: newContent });
  };

  /**
   * Background Image
   */
  const [imageID, setImageID] = useState([]);
  useEffect(() => {
    if (imageID) {
      wp.media
        .attachment(imageID)
        .fetch()
        .then((image) => {
          setAttributes({ backgroundimageUrl: image.url });
        });
    } else {
      setAttributes({ backgroundimageUrl: "" });
    }
  }, [imageID, setAttributes]);

  /**
   * Change Filter Layout Styles
   */

  const [postOptions, setPostOptions] = useState([]);
  const [pageOptions, setPageOptions] = useState([]);
  const [portfolioOptions, setPortfolioOptions] = useState([]);

  //const [post]
  const [taxonomyOptions, setTaxonomyOptions] = useState([]);
  const [taxonomyCatOptions, setTaxonomyCatOptions] = useState([]);
  //const [Portfolio post]
  const [portfoliotaxonomyOptions, setportfoliotaxonomyOptions] = useState([]);
  const [portfoliotaxonomyCatOptions, setportfoliotaxonomyCatOptions] =
    useState([]);

  useEffect(() => {
    // Fetch post options
    wp.apiFetch({ path: "/wp/v2/posts?per_page=100" })
      .then((posts) => {
        const postOptions = posts.map((post) => ({
          label: `Post: ${post.title.rendered}`,
          value: post.id.toString(),
        }));
        setPostOptions(postOptions);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch page options
    wp.apiFetch({ path: "/wp/v2/pages?per_page=100" })
      .then((pages) => {
        const pageOptions = pages.map((page) => ({
          label: `Page: ${page.title.rendered}`,
          value: page.id.toString(),
        }));
        setPageOptions(pageOptions); // Set the pageOptions state here
      })
      .catch((error) => {
        console.error("Error fetching pages:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch portfolio options
    wp.apiFetch({ path: "/wp/v2/ultimate_portfolio?per_page=100" })
      .then((ultimate_portfolio) => {
        const portfolioOptions = ultimate_portfolio.map((portfolio) => ({
          label: `Portfolio: ${portfolio.title.rendered}`,
          value: portfolio.id.toString(),
        }));
        setPortfolioOptions(portfolioOptions);
      })
      .catch((error) => {
        console.error("Error fetching portfolios:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch post tags
    wp.apiFetch({ path: "/wp/v2/tags?per_page=100" })
      .then((tags) => {
        // Extract tag names and IDs
        const tagOptions = tags.map((tag) => ({
          label: tag.name,
          value: tag.id.toString(),
        }));

        setTaxonomyOptions(tagOptions);
      })
      .catch((error) => {
        console.error("Error fetching post tags:", error);
      });

    // Fetch categories
    wp.apiFetch({ path: "/wp/v2/categories?per_page=100" })
      .then((categories) => {
        // Extract category names and IDs
        const categoryOptions = categories.map((category) => ({
          label: category.name,
          value: category.id.toString(),
        }));

        setTaxonomyCatOptions(categoryOptions);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch Portfolio Tag
    wp.apiFetch({ path: "/wp/v2/ultimate_portfolio_tag?per_page=100" })
      .then((tags) => {
        // Extract tag names and IDs
        const tagOptions = tags.map((ultimate_portfolio_tag) => ({
          label: ultimate_portfolio_tag.name,
          value: ultimate_portfolio_tag.id.toString(),
        }));

        setportfoliotaxonomyOptions(tagOptions);
      })
      .catch((error) => {
        console.error("Error fetching post tags:", error);
      });

    // Fetch Portfolio categories
    wp.apiFetch({ path: "/wp/v2/ultimate_portfolio_category" })
      .then((categories) => {
        // Extract category names and IDs
        const categoryOptions = categories.map(
          (ultimate_portfolio_category) => ({
            label: ultimate_portfolio_category.name,
            value: ultimate_portfolio_category.id.toString(),
          })
        );

        setportfoliotaxonomyCatOptions(categoryOptions);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Inside handleSelectedPostnameChange
  const handleSelectedPostnameChange = (newValue, actionMeta) => {
    setAttributes({ excludedPosts: newValue });
  };

  const handleSelectedPageExcludeChange = (newValue, actionMeta) => {
    setAttributes({ excludedPages: newValue });
  };

  const handleSelectedPortfolioExcludeChange = (newValue, actionMeta) => {
    setAttributes({ excludedPortfolios: newValue });
  };

  // post handleSelectedPostTagsChange
  const handleSelectedPostTagsChange = (newValue, actionMeta) => {
    setAttributes({ excludedPostTags: newValue });
  };

  const handleExcludedCategoriesChange = (newValue, actionMeta) => {
    setAttributes({ excludedCategories: newValue });
  };

  // Portfolio handleExcludedCategoriesChange
  const handleSelectedportfolioTagsChange = (newValue, actionMeta) => {
    setAttributes({ excludedPortfolioTags: newValue });
  };
  const handleExcludedportfolioCategoriesChange = (newValue, actionMeta) => {
    setAttributes({ excludedPortfolioCategories: newValue });
  };

  const [activePostType, setPostType] = useState(null);
  const handlePostType = (optionValue) => {
    setPostType(optionValue);
    setAttributes({ fetchPostOption: optionValue });
  };

  return (
    <InspectorControls key="controls">
      <div className="up-panel-control">
        <TabPanel
          className="up-parent-tab-panel"
          activeClass="is-active"
          tabs={[
            {
              name: "general",
              title: (
                <>
                  <SvggenralIcon />
                  {__("General", "ultimate-portfolio")}
                </>
              ),
              className: "up-tab general",
            },
            {
              name: "styles",
              title: (
                <>
                  <SvgColorPaletteIcon />
                  {__("Style", "ultimate-portfolio")}
                </>
              ),
              className: "up-tab styles",
            },
            {
              name: "control",
              title: (
                <>
                  <SvgFile />
                  {__("control", "ultimate-portfolio")}
                </>
              ),
              className: "up-tab control",
            },
          ]}
        >
          {(tab) => (
            <div className={"up-tab-controls" + tab.name}>
              {tab.name === "general" && (
                <>
                  <PanelBody
                    title={
                      <>
                        <SvgcontentIcon />
                        <span>
                          {__("Content Source", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={true}
                  >
                    <div className="up-component-portfolio-control-items-wrapper">
                      <ContentSource
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                      />
                    </div>
                  </PanelBody>

                  <PanelBody
                    title={
                      <>
                        <SvgcontentIcon />
                        <span>
                          {__("Content Setting", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={true}
                  >
                    <div className="up-component-portfolio-control-items-wrapper">
                      {displayType === "posts" && (
                        <BaseControl>
                          <div className="up-component-content-selector">
                            {PostType.map((option) => (
                              <Button
                                key={option.value}
                                className={`up-component-content-type ${
                                  fetchPostOption === option.value
                                    ? "active-item"
                                    : ""
                                }`}
                                onClick={() => handlePostType(option.value)}
                              >
                                <div className="up-check-item">
                                  <SvgContentCheck />
                                </div>
                                <div className="up-content-item">
                                  {option.icon}
                                </div>
                                <span>{option.label}</span>
                              </Button>
                            ))}
                            {window.pluginCPTExists &&
                              window.pluginCPTExists === true && (
                                <Button
                                  key="plugin_custom_post_type"
                                  className={`up-component-content-type ${
                                    fetchPostOption ===
                                    "plugin_custom_post_type"
                                      ? "active-item"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handlePostType("plugin_custom_post_type")
                                  }
                                >
                                  <div className="up-check-item">
                                    <SvgContentCheck />
                                  </div>
                                  <div className="up-content-item">
                                    {option.icon}
                                  </div>
                                  <span>
                                    <span>{option.label}</span>
                                  </span>
                                </Button>
                              )}
                          </div>
                        </BaseControl>
                      )}
                      {displayType === "gallery" && sources.length !== 0 && (
                        <>
                          <GalleryBlock
                            attributes={props.attributes}
                            setAttributes={props.setAttributes}
                          />
                        </>
                      )}
                      {displayType === "gallery" && sources.length === 0 && (
                        <MediaUpload
                          onSelect={(images) => setAttributes({ images })}
                          allowedTypes={["image"]}
                          multiple
                          render={({ open }) => (
                            <Button
                              className="up-portfolio-upload-button"
                              label={__("Upload Media", "ultimate-portfolio")}
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
                    </div>
                  </PanelBody>

                  {displayType === "posts" && (
                    <PanelBody
                      title={
                        <>
                          <span class="up-pannel-control-icon">
                            <SvgFile />
                          </span>
                          <span>
                            {__("Posts Settings", "ultimate-portfolio")}
                          </span>
                        </>
                      }
                      initialOpen={false}
                    >
                      <BaseControl label={"EXCLUDED POSTS"}>
                        {fetchPostOption === "post" && (
                          <CreatableSelect
                            isMulti
                            onChange={handleSelectedPostnameChange}
                            options={postOptions}
                            value={excludedPosts}
                            placeholder={__(
                              "Select post to exclude",
                              "ultimate-portfolio"
                            )}
                            isOptionDisabled={(option) => option.__isNew__}
                          />
                        )}

                        {fetchPostOption === "page" && (
                          <CreatableSelect
                            isMulti
                            onChange={handleSelectedPageExcludeChange}
                            options={pageOptions}
                            value={excludedPages}
                            placeholder={__(
                              "Select page to exclude",
                              "ultimate-portfolio"
                            )}
                            isOptionDisabled={(option) => option.__isNew__}
                          />
                        )}

                        {fetchPostOption === "portfolio" && (
                          <CreatableSelect
                            isMulti
                            onChange={handleSelectedPortfolioExcludeChange}
                            options={portfolioOptions}
                            value={excludedPortfolios}
                            placeholder={__(
                              "Select portfolio to exclude",
                              "ultimate-portfolio"
                            )}
                            isOptionDisabled={(option) => option.__isNew__}
                          />
                        )}
                      </BaseControl>
                      {fetchPostOption === "post" && (
                        <>
                          <BaseControl label={"Taxonomies Tag"}>
                            <CreatableSelect
                              isMulti
                              onChange={handleSelectedPostTagsChange}
                              options={taxonomyOptions}
                              value={excludedPostTags}
                              placeholder={__(
                                "Select Taxonomies Tag",
                                "ultimate-portfolio"
                              )}
                              isOptionDisabled={(option) => option.__isNew__}
                            />
                          </BaseControl>
                          <BaseControl label={"Taxonomies Categories"}>
                            <CreatableSelect
                              isMulti
                              options={taxonomyCatOptions}
                              value={excludedCategories}
                              onChange={handleExcludedCategoriesChange}
                              placeholder={__(
                                "Select Taxonomies categories",
                                "ultimate-portfolio"
                              )}
                              isOptionDisabled={(option) => option.__isNew__}
                            />
                          </BaseControl>
                        </>
                      )}
                      {fetchPostOption === "portfolio" && (
                        <>
                          <BaseControl label={"Taxonomies Tag"}>
                            <CreatableSelect
                              isMulti
                              onChange={handleSelectedportfolioTagsChange}
                              options={portfoliotaxonomyOptions}
                              value={excludedPortfolioTags}
                              placeholder={__(
                                "Select portfolio tag",
                                "ultimate-portfolio"
                              )}
                              isOptionDisabled={(option) => option.__isNew__}
                            />
                          </BaseControl>
                          <BaseControl label={"Taxonomies Categories"}>
                            <CreatableSelect
                              isMulti
                              options={portfoliotaxonomyCatOptions}
                              value={excludedPortfolioCategories}
                              onChange={handleExcludedportfolioCategoriesChange}
                              placeholder={__(
                                "Select portfolio categories",
                                "ultimate-portfolio"
                              )}
                              isOptionDisabled={(option) => option.__isNew__}
                            />
                          </BaseControl>
                        </>
                      )}
                      {hoverStyle === "layout-standerd" && (
                        <>
                          <ToggleControl
                            label={__("Display Date", "ultimate-portfolio")}
                            checked={ulportfoliotaxonomydate}
                            onChange={() =>
                              setAttributes({
                                ulportfoliotaxonomydate:
                                  !ulportfoliotaxonomydate,
                              })
                            }
                          />
                          <ToggleControl
                            label={__(
                              "Display Reading Time",
                              "ultimate-portfolio"
                            )}
                            checked={ulportfoliotaxonomytime}
                            onChange={() =>
                              setAttributes({
                                ulportfoliotaxonomytime:
                                  !ulportfoliotaxonomytime,
                              })
                            }
                          />
                          <ToggleControl
                            label={__(
                              "Display Author Name",
                              "ultimate-portfolio"
                            )}
                            checked={ulportfoliotaxonomyauthor}
                            onChange={() =>
                              setAttributes({
                                ulportfoliotaxonomyauthor:
                                  !ulportfoliotaxonomyauthor,
                              })
                            }
                          />
                          <ToggleControl
                            label={__("Display Comment", "ultimate-portfolio")}
                            checked={ulportfoliotaxonomycomment}
                            onChange={() =>
                              setAttributes({
                                ulportfoliotaxonomycomment:
                                  !ulportfoliotaxonomycomment,
                              })
                            }
                          />
                        </>
                      )}
                      <RadioControl
                        label={__("TAXONOMIES RELATION", "ultimate-portfolio")}
                        help={__(
                          "Set taxonomy relationship AND and OR",
                          "ultimate-portfolio"
                        )}
                        selected={taxonomyRelation}
                        options={[
                          {
                            label: __("AND", "ultimate-portfolio"),
                            value: "AND",
                          },
                          {
                            label: __("OR", "ultimate-portfolio"),
                            value: "OR",
                          },
                        ]}
                        onChange={(taxonomyRelation) =>
                          setAttributes({ taxonomyRelation })
                        }
                      />
                      <RadioControl
                        label={__("ORDER DIRECTION", "ultimate-portfolio")}
                        help={__("Post ASC & DESC order", "ultimate-portfolio")}
                        selected={postdirection}
                        options={[
                          {
                            label: __("ASC", "ultimate-portfolio"),
                            value: "asc",
                          },
                          {
                            label: __("DESC", "ultimate-portfolio"),
                            value: "desc",
                          },
                        ]}
                        onChange={(postdirection) =>
                          setAttributes({ postdirection })
                        }
                      />
                      <SelectControl
                        label={__("Post Order", "ultimate-portfolio")}
                        value={postorder}
                        options={[
                          {
                            label: __("Title", "ultimate-portfolio"),
                            value: "title",
                          },
                          {
                            label: __("Date", "ultimate-portfolio"),
                            value: "date",
                          },
                          {
                            label: __("ID", "ultimate-portfolio"),
                            value: "id",
                          },
                        ]}
                        onChange={(postorder) => setAttributes({ postorder })}
                      />
                      <ToggleControl
                        label={__("Avoid Duplicates", "ultimate-portfolio")}
                        checked={avoidDuplicates}
                        onChange={() =>
                          setAttributes({ avoidDuplicates: !avoidDuplicates })
                        }
                      />
                      <RangeControl
                        label={__("OFFSET", "ultimate-portfolio")}
                        help={__(
                          "Use this setting to skip over posts (e.g. `2` to skip over 2 posts)",
                          "ultimate-portfolio"
                        )}
                        value={postOffset}
                        onChange={(postOffset) => setAttributes({ postOffset })}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </PanelBody>
                  )}

                  <PanelBody
                    title={
                      <>
                        <span className="up-pannel-control-icon">
                          <SvggenralIcon />
                        </span>
                        <span>
                          {__("Genral Setting", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <BaseControl>
                      <ButtonGroup
                        style={{ width: "100%" }}
                        className="block-editor-block-styles__variants up-counter-btn"
                      >
                        {LOADMORECOUNT.map((item, index) => (
                          <Button
                            key={index}
                            className={`components-button block-editor-block-styles__item ${
                              attributes.imageCount === item.value
                                ? "is-active"
                                : ""
                            }`}
                            //variant={/* Specify the variant here */}
                            onClick={() =>
                              setAttributes({
                                imageCount: item.value,
                                ulpagination: item.value ? true : false,
                              })
                            }
                          >
                            {item.label}
                          </Button>
                        ))}
                      </ButtonGroup>

                      {imageCount === true && (
                        <TextControl
                          type="number"
                          value={maxImages}
                          min={1} // Add the max attribute here to limit the maximum value to 1
                          onChange={(newmaxImages) =>
                            setAttributes({ maxImages: newmaxImages })
                          }
                        />
                      )}
                    </BaseControl>

                    <BaseControl
                      label={__("Layout Type", "ultimate-portfolio")}
                    >
                      <ContentLayoutType
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                      />
                    </BaseControl>
                    {layouts === "slider" && (
                      <SliderBlock
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                        filterItems={attributes.filterItems}
                      ></SliderBlock>
                    )}
                    <ToggleControl
                      label={__("Display Caption", "ultimate-portfolio")}
                      checked={displayCaption}
                      onChange={() =>
                        setAttributes({ displayCaption: !displayCaption })
                      }
                    />

                    {displayType === "gallery" && displayCaption && (
                      <SelectControl
                        label={__("Caption Source", "ultimate-portfolio")}
                        value={captionSource}
                        options={CAPTIONSOURCE}
                        onChange={(captionSource) =>
                          setAttributes({ captionSource })
                        }
                      />
                    )}
                    <ToggleControl
                      label={__("Display Description", "ultimate-portfolio")}
                      checked={displayDescription}
                      onChange={() =>
                        setAttributes({
                          displayDescription: !displayDescription,
                        })
                      }
                    />
                    {displayType === "gallery" && displayDescription && (
                      <SelectControl
                        label={__("Description Source", "ultimate-portfolio")}
                        value={descriptionSource}
                        options={DESCRIPTIONSOURCE}
                        onChange={(descriptionSource) =>
                          setAttributes({ descriptionSource })
                        }
                      />
                    )}
                    <ToggleControl
                      label={__("Display Category", "ultimate-portfolio")}
                      checked={displayCategory}
                      onChange={() =>
                        setAttributes({
                          displayCategory: !displayCategory,
                        })
                      }
                    />

                    <Responsivecontrolblock
                      attributes={props.attributes}
                      setAttributes={props.setAttributes}
                    />

                    <RangeControl
                      label={__("Image Gap", "ultimate-portfolio")}
                      value={image_gap}
                      onChange={(image_gap) => setAttributes({ image_gap })}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </PanelBody>
                  <PanelBody
                    title={
                      <>
                        <SvgfilterIcon />
                        <span>
                          {__("Filter Option", " ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <ToggleControl
                      label={__("Enable Filter", "ultimate-portfolio")}
                      checked={enableFilter}
                      onChange={(newValue) =>
                        setAttributes({ enableFilter: newValue })
                      }
                    />
                    {enableFilter === true && (
                      <FilterBlock
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                        filterItems={attributes.filterItems}
                        images={attributes.images}
                      ></FilterBlock>
                    )}

                    <ToggleControl
                      label={__("Sorting Control", "ultimate-portfolio")}
                      checked={sortingcontrol}
                      onChange={() =>
                        setAttributes({ sortingcontrol: !sortingcontrol })
                      }
                    />
                    <ToggleControl
                      label={__("Search Control", "ultimate-portfolio")}
                      checked={searchcontrol}
                      onChange={() =>
                        setAttributes({ searchcontrol: !searchcontrol })
                      }
                    />
                  </PanelBody>
                  <PanelBody
                    title={
                      <>
                        <span className="up-pannel-control-icon">
                          <SvgLoadmoreIcon />
                        </span>
                        <span>
                          {__("Pagination Option", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <ToggleControl
                      label={__("Pagination", "ultimate-portfolio")}
                      checked={ulpagination}
                      onChange={() =>
                        setAttributes({
                          ulpagination: !ulpagination,
                        })
                      }
                    />
                    {ulpagination === true && (
                      <PaginationBlock
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                        filterItems={attributes.filterItems}
                      ></PaginationBlock>
                    )}
                  </PanelBody>

                  <PanelBody
                    title={
                      <>
                        <SvgItemControl />
                        <span>
                          {__("Item control Option", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <ToggleControl
                      label={__("Enable Search Icon", "ultimate-portfolio")}
                      checked={disablesearchicon}
                      onChange={() =>
                        setAttributes({ disablesearchicon: !disablesearchicon })
                      }
                    />
                    <ToggleControl
                      label={__("Enable Link Icon", "ultimate-portfolio")}
                      checked={disablelinkicon}
                      onChange={() =>
                        setAttributes({ disablelinkicon: !disablelinkicon })
                      }
                    />
                    <ToggleControl
                      label={__("Enable download Icon", "ultimate-portfolio")}
                      checked={disabldownloadicon}
                      onChange={() =>
                        setAttributes({
                          disabldownloadicon: !disabldownloadicon,
                        })
                      }
                    />
                    <ToggleControl
                      label={__("Enable Video Icon", "ultimate-portfolio")}
                      checked={disablevideoicon}
                      onChange={() =>
                        setAttributes({ disablevideoicon: !disablevideoicon })
                      }
                    />

                    <ToggleControl
                      label={__("Enable Light Box", "ultimate-portfolio")}
                      checked={disableLightBox}
                      onChange={() =>
                        setAttributes({ disableLightBox: !disableLightBox })
                      }
                    />

                    {disableLightBox === true && (
                      <>
                        <hr />
                        <BaseControl
                          label={__("LightBox Option", "ultimate-portfolio")}
                        >
                          <>
                            <ToggleControl
                              label={__(
                                "Title For Lightbox",
                                "ultimate-portfolio"
                              )}
                              checked={disabletitleLightBox}
                              onChange={() =>
                                setAttributes({
                                  disabletitleLightBox: !disabletitleLightBox,
                                })
                              }
                            />
                            <ToggleControl
                              label={__(
                                "Share Icon For Lightbox",
                                "ultimate-portfolio"
                              )}
                              checked={disableshareLightBox}
                              onChange={() =>
                                setAttributes({
                                  disableshareLightBox: !disableshareLightBox,
                                })
                              }
                            />
                            <div className="ultimate-portfolio-pro-feature">
                              <p>
                                <strong>Premium Only </strong>
                                <SvgPro />
                              </p>
                              <p>Description For Lightbox </p>
                              <p>Thumbnail For Lightbox</p>
                              <p>Download Icon For Lightbox</p>
                              <a
                                class="ultimate-portfolio-pro-button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://webenvo.com/ultimate-portfolio/pricing/"
                              >
                                Go Pro
                              </a>
                            </div>
                          </>
                        </BaseControl>
                      </>
                    )}
                  </PanelBody>
                  <PanelBody
                    title={
                      <>
                        <SvgCode />
                        <span>
                          {__("Custom css Option", "ultimate-portfolio")}
                        </span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <BaseControl>
                      <div className="up-component-code-editor">
                        <AceEditor
                          theme="textmate"
                          onLoad={(editor) => {
                            editor.renderer.setScrollMargin(16, 16, 16, 16);
                            editor.renderer.setPadding(16);
                          }}
                          fontSize={12}
                          showPrintMargin
                          showGutter
                          highlightActiveLine={false}
                          width="100%"
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            printMargin: false,
                            tabSize: 2,
                          }}
                          mode="css"
                          maxLines="7"
                          minLines="27"
                          value={editorContent} // Set the editor content from state
                          onChange={handleEditorChange} // Handle content changes
                        />
                      </div>
                    </BaseControl>
                  </PanelBody>
                </>
              )}
              {tab.name === "styles" && (
                <>
                  {layouts === "grid" ? (
                    <>
                      <PanelBody
                        title={
                          <>
                            <SvgImagesetting />
                            <span>
                              {__("Image Settings", " ultimate-portfolio")}
                            </span>
                          </>
                        }
                        initialOpen={false}
                      >
                        <div class="up-portfolio-control-item">
                          <RangeControl
                            label={__("Image Height", "ultimate-portfolio")}
                            help={__(
                              "Use this setting to change Image Height",
                              "ultimate-portfolio"
                            )}
                            value={upimageheight}
                            onChange={(upimageheight) =>
                              setAttributes({ upimageheight })
                            }
                            min={0}
                            max={800}
                            step={1}
                          />
                        </div>
                      </PanelBody>
                    </>
                  ) : null}

                  <PanelBody
                    title={
                      <>
                        <SvgImagesetting />
                        <span>{__("Layout Style", " ultimate-portfolio")}</span>
                      </>
                    }
                    initialOpen={false}
                  >
                    <BaseControl>
                      <ContentLayoutStyle
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                      ></ContentLayoutStyle>
                    </BaseControl>
                    {[
                      "layout-standerd",
                      "layout-classic",
                      "layout-wave",
                    ].includes(hoverStyle) && (
                      <div className="up-portfolio-control-item">
                        <BaseControl
                          label={__("Content Alignment", "ultimate-portfolio")}
                        >
                          <ButtonGroup
                            style={{ width: "100%" }}
                            className="up-component-flex-align"
                          >
                            {CONTENT_ALIGN.map((item, index) => (
                              <Button
                                key={index}
                                variant={
                                  attributes.imageContentAlignment ===
                                  item.value
                                    ? "primary"
                                    : "secondary"
                                }
                                onClick={() =>
                                  setAttributes({
                                    imageContentAlignment: item.value,
                                  })
                                }
                              >
                                {item.icon}
                              </Button>
                            ))}
                          </ButtonGroup>
                        </BaseControl>
                      </div>
                    )}
                    <div className="up-portfolio-control-item">
                      <RangeControl
                        label={__("Image Radius", "ultimate-portfolio")}
                        help={__(
                          "Use this setting to change Image Radius",
                          "ultimate-portfolio"
                        )}
                        value={upimageradius}
                        onChange={(upimageradius) =>
                          setAttributes({ upimageradius })
                        }
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                    {hoverStyle === "layout-standerd" && (
                      <div className="up-portfolio-color-control">
                        <BaseControl>
                          <PanelColorSettings
                            colorSettings={[
                              {
                                value: taxonomytextcolor,
                                onChange: (color) =>
                                  setAttributes({ taxonomytextcolor: color }),
                                label: __(
                                  "Taxonomy Color",
                                  "ultimate-portfolio"
                                ),
                                clearable: true,
                              },
                            ]}
                          />
                        </BaseControl>
                      </div>
                    )}
                    {[
                      "layout-standerd",
                      "layout-classic",
                      "layout-wave",
                    ].includes(hoverStyle) && (
                      <>
                        <div className="up-portfolio-color-control">
                          <BaseControl>
                            <PanelColorSettings
                              colorSettings={[
                                {
                                  value: layouttextcolor,
                                  onChange: (color) =>
                                    setAttributes({ layouttextcolor: color }),
                                  label: __("Title Color"),
                                  clearable: true,
                                },
                              ]}
                            />
                          </BaseControl>
                        </div>
                        <div className="up-portfolio-color-control">
                          <BaseControl>
                            <PanelColorSettings
                              colorSettings={[
                                {
                                  value: layouttexthovercolor,
                                  onChange: (color) =>
                                    setAttributes({
                                      layouttexthovercolor: color,
                                    }),
                                  label: __("Title Hover Color"),
                                  clearable: true,
                                },
                              ]}
                            />
                          </BaseControl>
                        </div>
                        <div className="up-portfolio-color-control">
                          <BaseControl>
                            <PanelColorSettings
                              colorSettings={[
                                {
                                  value: layoutdesccolor,
                                  onChange: (color) =>
                                    setAttributes({ layoutdesccolor: color }),
                                  label: __("Description Color"),
                                  clearable: true,
                                },
                              ]}
                            />
                          </BaseControl>
                        </div>
                        <div className="up-portfolio-color-control">
                          <BaseControl>
                            <PanelColorSettings
                              colorSettings={[
                                {
                                  value: layoutbgcolor,
                                  onChange: (color) =>
                                    setAttributes({ layoutbgcolor: color }),
                                  label: __("Background Color"),
                                  clearable: true,
                                },
                              ]}
                            />
                          </BaseControl>
                        </div>
                      </>
                    )}
                  </PanelBody>

                  {enableFilter === true && (
                    <PanelBody
                      title={
                        <>
                          <span class="up-pannel-control-icon">
                            <SvgFilteroptionIcon />
                          </span>
                          <span>
                            {__("Filter Style", "ultimate-portfolio")}
                          </span>
                        </>
                      }
                      initialOpen={false}
                    >
                      <ContentLayoutFilterStyle
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                      ></ContentLayoutFilterStyle>
                      <div className="up-portfolio-color-control">
                        <BaseControl>
                          <PanelColorSettings
                            colorSettings={[
                              {
                                value: filtercolor,
                                onChange: (color) =>
                                  setAttributes({ filtercolor: color }),
                                label: __("Filter Color", "ultimate-portfolio"),
                                clearable: true,
                              },
                            ]}
                          />
                        </BaseControl>
                      </div>
                      <div className="up-portfolio-color-control">
                        <BaseControl>
                          <PanelColorSettings
                            colorSettings={[
                              {
                                value: filterbgcolor,
                                onChange: (color) =>
                                  setAttributes({ filterbgcolor: color }),
                                label: __(
                                  "Filter Background Color",
                                  "ultimate-portfolio"
                                ),
                                clearable: true,
                              },
                            ]}
                          />
                        </BaseControl>
                      </div>
                      <div className="up-portfolio-control-item">
                        <BaseControl
                          label={__("Alignment", "ultimate-portfolio")}
                        >
                          <ButtonGroup
                            style={{ width: "100%" }}
                            className="up-component-flex-align"
                          >
                            {FILTER_ALIGN.map((item, index) => (
                              <Button
                                key={index}
                                variant={
                                  attributes.filterAlignment === item.value
                                    ? "primary"
                                    : "secondary"
                                }
                                onClick={() =>
                                  setAttributes({
                                    filterAlignment: item.value,
                                  })
                                }
                              >
                                {item.icon}
                              </Button>
                            ))}
                          </ButtonGroup>
                        </BaseControl>
                      </div>
                    </PanelBody>
                  )}
                </>
              )}
              {tab.name === "control" && (
                <>
                  <PanelBody
                    title={__("Background Type", "ultimate-portfolio")}
                  >
                    <BaseControl>
                      <div class="up-portfolio-color-control">
                        <PanelColorSettings
                          colorSettings={[
                            {
                              value: backgroundColor,
                              onChange: (color) =>
                                setAttributes({ backgroundColor: color }),
                              label: __(
                                "Background color",
                                "ultimate-portfolio"
                              ),
                              clearable: true,
                            },
                          ]}
                        />
                      </div>
                    </BaseControl>
                    <BaseControl
                      label={__("Background Image", "ultimate-portfolio")}
                    >
                      <MediaUpload
                        onSelect={(media) => setImageID(media.id)}
                        value={imageID}
                        render={({ open }) => (
                          <Button
                            className="up-background-image-button"
                            onClick={open}
                          >
                            {imageID && backgroundimageUrl
                              ? "Change image"
                              : "Select an image"}
                          </Button>
                        )}
                      />
                      {imageID && backgroundimageUrl && (
                        <>
                          <Button
                            className="is-primary"
                            onClick={() => setImageID(null)}
                          >
                            {__("Remove image", " ultimate-portfolio")}
                          </Button>
                          <FocalPointPicker
                            url={backgroundimageUrl}
                            value={attributes.bgFocalPoint}
                            onChange={(newFocalPoint) =>
                              updateFocalPoint(newFocalPoint)
                            }
                          />
                        </>
                      )}
                    </BaseControl>
                  </PanelBody>
                </>
              )}
            </div>
          )}
        </TabPanel>
      </div>
    </InspectorControls>
  );
}

export default Inspector;
