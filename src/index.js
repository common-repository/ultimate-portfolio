/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
//import Save from "./save";

import Attributes from "./attributes";

import metadata from "./block.json";

import { SvgUltimatePortfolioIcon } from "./assets/images/index-svg";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	icon: SvgUltimatePortfolioIcon,
	attributes: Attributes,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: function(props) {
        // Block save component
        // This is where you define the block's HTML output
        return null; // Placeholder return value
    },


	 // Render callback for generating dynamic content
    render_callback: function(attributes) {
    
        ob_start(); // Start output buffering

        $html = ob_get_clean(); // Get the buffered output

        return $html; // Return the HTML output
    }

	//deprecated
});
