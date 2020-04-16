import React from "react";
import SelectInputOptionsList from "./select-options-list";
import { ISelectProps } from "./select.interface";
import * as S from "./select.styled";

export const defaultProps = {
	id: "select-channel",
	label: "Channel",
	placeholder: "Music channel",
	type: "playlist",
};

const isNil = (val: any) => val == null;

/**
 * Select component
 *
 * @param {ISelectProps} { id, label, options, currentIndex, onChange }
 * @returns {React.FunctionComponent<ISelectProps>}
 */
const Select: React.FunctionComponent<ISelectProps> = ({
	id,
	label,
	options,
	currentIndex,
	onChange,
}) => {
	const selectInputButton: React.RefObject<HTMLButtonElement> = React.useRef(null);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	/**
	 * Changes the isOpen state to the inverse of what it was
	 *
	 * @returns {void}
	 */
	function onClickOnSelect() {
		setIsOpen(!isOpen);
	}

	/**
	 * Handles the onChange event on the list.
	 *
	 * @param {(number | null)} index
	 * @memberof Select
	 */
	function onChangeOptionFromList(index: number) {
		if (onChange && !isNil(index)) {
			onChange(index);
		}

		setIsOpen(false);

		if (selectInputButton.current) {
			selectInputButton.current.focus();
		}
	}

	/**
	 * Renders the select component
	 *
	 * @returns
	 * @memberof Select
	 */
	function renderSelectComponent() {
		const selected = options[currentIndex];
		return (
			<div className="select-input__container">
				<button
					ref={selectInputButton}
					key={selected.id}
					type="button"
					data-testid="component-select-button"
					id={`${id}-button`}
					aria-haspopup="listbox"
					aria-labelledby={`${id}-label ${id}-title`}
					aria-expanded={isOpen ? "true" : "false"}
					className={`row select-input__button ${isOpen ? "select-input__button--is-open" : ""}`}
					onClick={onClickOnSelect}
				>
					<div className="select-input__left">
						<span id={`${id}-label`} className="select-input__label">
							{label}
						</span>
						<span id={`${id}-title`} className="select-input__value as-paragraph">
							{selected.label}
						</span>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="13"
						fill="none"
						viewBox="0 0 12 13"
						className="select-input__arrow"
					>
						<path fill="var(--color-select-button-arrow)" d="M6 10.35l-4.157-5.4h8.314L6 10.35z" />
					</svg>
				</button>
				{isOpen && options && (
					<SelectInputOptionsList
						id={id}
						activeElement={selected}
						isOpen={isOpen}
						options={options}
						onChangeOptionFromList={onChangeOptionFromList}
					/>
				)}
			</div>
		);
	}

	return (
		<S.SelectWrapper
			id={id}
			data-testid="component-select"
			className={`select-input ${isOpen ? "is-open" : ""}`}
		>
			{renderSelectComponent()}
		</S.SelectWrapper>
	);
};

Select.defaultProps = defaultProps;

export default Select;
