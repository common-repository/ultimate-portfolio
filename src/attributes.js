import { __ } from "@wordpress/i18n";

const attributes = {
	displayContent: {
		type: "boolean",
		default: false,
	},
	displayType: {
		type: "string",
		default: "",
	},
	selectedDeviceType: {
		type: "string",
		default: "Desktop",
	},
	blockId: {
		type: "string",
	},
	blockMeta: {
		type: "object",
	},

	images: {
		type: "array",
		default: [],
	},
	bgFocalPoint: {
		x: {
			type: "number",
			default: 0.5,
		},
		y: {
			type: "number",
			default: 0.5,
		},
	},
	sources: {
		type: "array",
		default: [],
	},
	excludedPosts: {
		type: "array",
		default: [],
	},
	excludedPages: {
		type: "array",
		default: [],
	},
	excludedPortfolios: {
		type: "array",
		default: [],
	},
	excludedPostTags: {
		type: "array",
		default: [],
	},
	excludedPortfolioTags: {
		type: "array",
		default: [],
	},
	excludedCategories: {
		type: "array",
		default: [],
	},
	excludedPortfolioCategories: {
		type: "array",
		default: [],
	},
	imageSize: {
		type: "string",
		default: "full",
	},
	selectedImgIndex: {
		type: "number",
	},
	columns: {
		type: "object",
		default: {
			Desktop: 3,
			Tablet: 2,
			Mobile: 1,
		},
	},
	image_gap: {
		type: "number",
		default: 10,
	},
	layouts: {
		type: "string",
		default: "grid",
	},
	slidereffect: {
		type: "string",
		default: "slide",
	},
	slidecenter: {
		type: "boolean",
		default: false,
	},
	slideautoheight: {
		type: "boolean",
		default: false,
	},
	slideheight: {
		type: "string",
		default: "300",
	},
	sliderloop: {
		type: "boolean",
		default: false,
	},
	slidesspeed: {
		type: "number",
		default: 300,
	},
	slidedelay: {
		type: "number",
		default: 2500,
	},
	sliderpausemouse: {
		type: "boolean",
		default: false,
	},
	sliderarrow: {
		type: "boolean",
		default: true,
	},
	sliderbullets: {
		type: "boolean",
		default: true,
	},
	sliderdynamicbullet: {
		type: "boolean",
		default: 1,
	},
	displayCaption: {
		type: "boolean",
		default: true,
	},
	captionSource: {
		type: "string",
		default: "title",
	},
	displayDescription: {
		type: "boolean",
		default: false,
	},
	displayCategory: {
		type: "boolean",
		default: false,
	},
	descriptionSource: {
		type: "string",
		default: "description",
	},
	captionOnHover: {
		type: "boolean",
		default: false,
	},
	newImage: {
		type: "string",
	},
	captionColor: {
		type: "string",
		default: "#ffffff",
	},
	overlayColor: {
		type: "string",
		default: "rgba(0 0 0 / 0.7)",
	},
	horizontalAlign: {
		type: "string",
		default: "center",
	},
	verticalAlign: {
		type: "string",
		default: "bottom",
	},
	hoverStyle: {
		type: "string",
		default: "layout-classic",
	},
	disableLightBox: {
		type: "boolean",
		default: true,
	},
	disabletitleLightBox: {
		type: "boolean",
		default: true,
	},
	disableshareLightBox: {
		type: "boolean",
		default: true,
	},
	imageContentAlignment: {
		type: "string",
		default: "center",
	},
	enableFilter: {
		type: "boolean",
		default: false,
	},
	filterItems: {
		type: "array",
		default: [],
	},
	enableFilterAll: {
		type: "boolean",
		default: true,
	},
	filterAlignment: {
		type: "string",
		default: "center",
	},
	filteralltitle: {
		type: "string",
		default: "All",
	},
	backgroundColor: {
		type: "string",
		default: "#FFFFFF",
	},
	backgroundimageUrl: {
		type: "string",
		default: "",
	},
	filter_layouts: {
		type: "string",
		default: "filter_style_minimal",
	},
	filtercolor: {
		type: "string",
		default: "#007bff",
	},
	filterbgcolor: {
		type: "string",
		default: "#007bff",
	},
	filtercount: {
		type: "boolean",
		default: false,
	},
	ulpagination: {
		type: "boolean",
		default: false,
	},
	loadMoreText: {
		type: "string",
		default: "Load More",
	},
	loadMoreEndText: {
		type: "string",
		default: "No more elements to show",
	},
	paginationType: {
		type: "string",
		default: "load-paged",
	},
	sortingcontrol: {
		type: "boolean",
		default: false,
	},
	searchcontrol: {
		type: "boolean",
		default: false,
	},
	taxonomytextcolor: {
		type: "string",
		default: "#FFFFFF",
	},
	layoutbgcolor: {
		type: "string",
		default: "#000000",
	},
	layouttextcolor: {
		type: "string",
		default: "#FFFFFF",
	},
	layouttexthovercolor: {
		type: "string",
		default: "#FFFFFF",
	},
	layoutdesccolor: {
		type: "string",
		default: "#FFFFFF",
	},
	paginationbgcolor: {
		type: "string",
		default: "#007bff",
	},
	imageCount: {
		type: "boolean",
		default: true,
	},
	maxImages: {
		type: "string",
		default: "8",
	},
	filterpost: {
		type: "string",
		default: "category",
	},
	taxonomyRelation: {
		type: "string",
		default: "OR",
	},
	postdirection: {
		type: "string",
		default: "desc",
	},
	postorder: {
		type: "string",
		default: "date",
	},
	avoidDuplicates: {
		type: "boolean",
		default: false,
	},
	ulportfoliotaxonomydate: {
		type: "boolean",
		default: true,
	},
	ulportfoliotaxonomytime: {
		type: "boolean",
		default: true,
	},
	ulportfoliotaxonomyauthor: {
		type: "boolean",
		default: true,
	},
	ulportfoliotaxonomycomment: {
		type: "boolean",
		default: true,
	},
	postOffset: {
		type: "number",
		default: 0,
	},
	fetchPostOption: {
		type: "string",
		default: "post",
	},
	disablesearchicon: {
		type: "boolean",
		default: true,
	},
	disablelinkicon: {
		type: "boolean",
		default: true,
	},
	disabldownloadicon: {
		type: "boolean",
		default: true,
	},
	disablevideoicon: {
		type: "boolean",
		default: true,
	},
	upimageheight: {
		type: "number",
		default: 350,
	},
	upimageradius: {
		type: "number",
		default: 0,
	},
	codeContent: {
		type: "string",
		default: "",
	},
};

export default attributes;
