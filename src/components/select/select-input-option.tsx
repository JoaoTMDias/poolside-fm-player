// Libraries
import * as React from "react";
import { KEY_CODES, holdOn } from "helpers";
import { ISelectOption } from "./select.interface";
import * as S from "./select.styled";

// Interface
interface ISelectInputOptionsProps {
	id: string;
	activeElement: ISelectOption;
	isOpen: boolean;
	options: ISelectOption[];
	onChangeOptionFromList(
		index: number | null,
		event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>,
	): void;
}

interface ISelectInputOptionsState {
	optionItems: HTMLElement[] | null;
	firstIndex: number;
	currentIndex: number;
	lastIndex: number;
}

const SelectInputOptionLabel: React.FunctionComponent<{
	label: string;
}> = ({ label }) => {
	return <span className="ui-label">{label}</span>;
};

class SelectInputOptions extends React.PureComponent<ISelectInputOptionsProps, ISelectInputOptionsState> {
	constructor(props: ISelectInputOptionsProps) {
		super(props);

		this.state = {
			optionItems: null,
			firstIndex: 0,
			currentIndex: 0,
			lastIndex: 0,
		};
	}

	componentDidMount() {
		this.getAllElementsOfList();
	}

	/**
	 * @description Queries the DOM for all the select input options
	 * @author João Dias
	 * @date 2019-07-11
	 * @memberof SelectInputOptions
	 */
	async getAllElementsOfList() {
		const { options } = this.props;
		const { firstIndex } = this.state;

		if (options && options.length > firstIndex) {
			await holdOn(120);

			const allOptions: HTMLElement[] = Array.from(document.querySelectorAll(".select-input__option"));

			if (allOptions && allOptions.length > 0) {
				let currentIndex = firstIndex;
				const first = allOptions[firstIndex];
				const lastIndex = allOptions.length - 1;

				let focusableElement: HTMLElement | null = null;
				const currentActiveElementIndex =
					allOptions && allOptions.findIndex(option => option.classList.contains("is-selected"));

				if (currentActiveElementIndex && currentActiveElementIndex !== -1) {
					currentIndex = currentActiveElementIndex;
					focusableElement = allOptions[currentIndex];
				} else if (first) {
					focusableElement = first;
				}

				this.setState(
					{
						optionItems: allOptions,
						lastIndex,
						currentIndex,
					},
					() => {
						if (focusableElement) {
							this.setFocusOnOption(focusableElement);
						}
					},
				);
			}
		}
	}

	/**
	 * @description Focus the label on a specific option.
	 * This is visible by the focus ring styling
	 * @author João Dias
	 * @date 2019-07-11
	 * @param {HTMLElement} element
	 * @memberof SelectInputOptions
	 */
	setFocusOnOption(element: HTMLElement) {
		const focusableLabel: HTMLElement | null = element.querySelector(".select-input__option__label");

		if (focusableLabel) {
			focusableLabel.focus();
		}
	}

	/**
	 * @description Creates a roving tab index scheme
	 * @author João Dias
	 * @date 2019-07-11
	 * @param {number} keycode
	 * @returns
	 * @memberof SelectInputOptions
	 */
	handleRovingTabIndex(event: React.KeyboardEvent<HTMLLabelElement>): void {
		event.preventDefault();

		const { currentIndex, firstIndex, optionItems, lastIndex } = this.state;
		let nextIndex = currentIndex;

		if (optionItems) {
			if (event.keyCode === KEY_CODES.ARROW_UP) {
				nextIndex = currentIndex - 1;
			} else if (event.keyCode === KEY_CODES.ARROW_DOWN || event.keyCode === KEY_CODES.TAB) {
				if (event.shiftKey) {
					nextIndex = currentIndex - 1;
				} else {
					nextIndex = currentIndex + 1;
				}
			}

			if (nextIndex > lastIndex) {
				nextIndex = firstIndex;
			} else if (nextIndex < firstIndex) {
				nextIndex = lastIndex;
			}

			this.setFocusOnOption(optionItems[nextIndex]);
			this.setState({
				currentIndex: nextIndex,
			});
		}
	}

	/**
	 * @description Handles the key down presses whilst on the select input
	 * @author João Dias
	 * @date 2019-07-11
	 * @param {number} index
	 * @param {React.KeyboardEvent<HTMLLabelElement>} event
	 * @memberof SelectInputOptions
	 */
	handleOnKeyDownPress(index: number, event: React.KeyboardEvent<HTMLLabelElement>) {
		const { onChangeOptionFromList } = this.props;

		switch (event.keyCode) {
			case KEY_CODES.SPACE:
			case KEY_CODES.ENTER:
				onChangeOptionFromList(index, event);
				break;

			case KEY_CODES.ESC:
				onChangeOptionFromList(null, event);
				break;

			case KEY_CODES.TAB:
			case KEY_CODES.ARROW_DOWN:
			case KEY_CODES.ARROW_UP:
			case KEY_CODES.SHIFT && KEY_CODES.TAB:
				this.handleRovingTabIndex(event);
				break;

			default:
				break;
		}
	}

	/**
	 * @description Constroi uma lista de opções
	 * @author João Dias
	 * @date 2019-06-28
	 * @param {ISelectOption[]} options
	 * @returns
	 * @memberof SelectInputOptions
	 */
	renderListOfOptions() {
		const { id, options, onChangeOptionFromList, activeElement } = this.props;

		const list = options.map((option: ISelectOption, index: number) => {
			const key = `${option.id}-id-${index}`;
			const isSelected = !!(activeElement.id === option.id);

			const element = (
				<li
					key={key}
					id={key}
					role="option"
					className={`select-input__option ${isSelected && "is-selected"}`}
					aria-selected={isSelected}
				>
					<label
						className="select-input__option__label"
						htmlFor={`${option.id}-input`}
						tabIndex={0}
						onKeyDown={(event: React.KeyboardEvent<HTMLLabelElement>) => {
							this.handleOnKeyDownPress(index, event);
						}}
					>
						<input
							id={`${option.id}-input`}
							name={`${id}-select-input-options`}
							value={option.id}
							type="radio"
							className="sr-only"
							checked={isSelected}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeOptionFromList(index, event)}
							tabIndex={-1}
						/>

						<SelectInputOptionLabel label={`${option.label}`} />
					</label>
				</li>
			);

			return element;
		});

		return list;
	}

	render() {
		const { activeElement, id, isOpen } = this.props;

		return (
			<S.SelectOptionsList
				id={`${id}-list`}
				aria-labelledby={`${id}-label`}
				aria-activedescendant={activeElement.id}
				data-testid="component-select-list"
				role="listbox"
				className={`${isOpen && "is-open"} custom-scrollbar`}
				tabIndex={-1}
			>
				{this.renderListOfOptions()}
			</S.SelectOptionsList>
		);
	}
}

export default SelectInputOptions;
