import React, { useRef } from "react";
import { ISelectOption } from "data/constants";
import { useFocusEffect, useRovingTabIndex } from "helpers/custom-hooks/roving-index";
import { uniqueId } from "helpers/unique-id";

interface ISelectOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	id: string;
	option: ISelectOption;
	disabled?: boolean;
	onSelect: () => void;
	children?: React.ReactNode;
}

interface ISelectInputOptionLabel {
	isNew?: boolean;
	label: string;
}

/**
 * Returns the label for each option
 *
 * @param {ISelectInputOptionLabel} props
 * @returns {JSX.Element}
 */
const SelectInputOptionLabel: React.FunctionComponent<ISelectInputOptionLabel> = ({
	isNew,
	label,
}): JSX.Element => {
	return (
		<span className="ui-label">
			{label}
			{isNew && <span className="is-new">New</span>}
		</span>
	);
};

export const SelectOption: React.FC<ISelectOptionProps> = ({
	id,
	option,
	disabled = false,
	onSelect,
	...rest
}) => {
	const refId = React.useRef<string>(uniqueId());
	const ref = useRef<HTMLButtonElement>(null);
	const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, disabled);

	useFocusEffect(focused, ref);

	const isSelected = !!(tabIndex === 0);

	function _onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();

		handleClick();
		onSelect();
	}

	return (
		<li id={id} role="option" className="select-input__option" aria-selected={isSelected}>
			<button
				ref={ref}
				id={refId.current}
				type="button"
				className="select-input__option__label"
				disabled={disabled}
				onKeyDown={handleKeyDown}
				onClick={_onClick}
				tabIndex={tabIndex}
				aria-disabled={disabled}
				{...rest}
			>
				<SelectInputOptionLabel isNew={option.isNew} label={`${option.label}`} />
			</button>
		</li>
	);
};

SelectOption.defaultProps = {
	disabled: false,
	type: "button",
};

export default SelectOption;
