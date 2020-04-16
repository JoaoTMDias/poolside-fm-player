import React, { useRef } from "react";
import { ISelectOption } from "data/constants";
import { useFocusOnElement, useRovingTabIndex } from "helpers/custom-hooks/roving-index";
import { useDidMount } from "helpers";

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
	const refId = React.useRef<string>(id);
	const ref = useRef<HTMLButtonElement>(null);
	const [tabIndex, focused, handleOnKeyPress, handleClick] = useRovingTabIndex(ref, disabled, id);

	const isSelected = !!(tabIndex === 0);

	useFocusOnElement<HTMLButtonElement>(focused, ref);


	function _onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();

		handleClick();
		onSelect();
	}

	return (
		<li role="option" className="select-input__option" aria-selected={isSelected}>
			<button
				ref={ref}
				id={refId.current}
				type="button"
				className="select-input__option__label"
				disabled={disabled}
				onKeyUp={handleOnKeyPress}
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
