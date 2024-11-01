import React from "react";
import { __ } from "@wordpress/i18n";
import { BaseControl, RangeControl } from "@wordpress/components";

import { useState } from "@wordpress/element";

const Responsivecontrolblock = ({ attributes, setAttributes }) => {
	const { columns } = attributes || {};

	const [selectedDeviceType, setSelectedDeviceType] = useState(
		attributes.selectedDeviceType || "Desktop"
	);

	const [value, setValue] = useState({
		Desktop: (columns && columns.Desktop) || 3,
		Tablet: (columns && columns.Tablet) || 2,
		Mobile: (columns && columns.Mobile) || 1,
	});

	const handleChange = (newValue) => {
		const updatedValue = { ...value, [selectedDeviceType]: newValue };
		setValue(updatedValue);
		setAttributes({ ...attributes, columns: updatedValue }); // Update the attributes
	};

	return (
		<BaseControl
			label={__("Columns", "ultimate-portfolio")}
			help={__("Adjust the range value for each device.", "ultimate-portfolio")}
		>
			<RangeControl
				value={value[selectedDeviceType]}
				onChange={handleChange}
				min={1}
				max={8}
			/>
		</BaseControl>
	);
};

export default Responsivecontrolblock;
