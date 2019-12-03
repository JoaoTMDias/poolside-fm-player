import * as React from "react";
import { ISelectOption } from "data/constants";
import SelectInputOptions from "./select-option";
import { ISelectProps, ISelectState } from "./select.interface";
import * as S from "./select.styled";

export const defaultProps = {
	id: "select-channel",
	label: "Channel",
	placeholder: "Music channel",
	type: "playlist",
};

/**
 * @class Select
 * @extends {React.Component<ISelectProps, ISelectState>}
 */
class Select extends React.Component<ISelectProps, ISelectState> {
	private selectInputButton: React.RefObject<HTMLButtonElement>;

	static defaultProps = defaultProps;

	constructor(props: ISelectProps) {
		super(props);

		this.state = {
			isOpen: false,
		};

		// Bindings
		this.onClickOnSelect = this.onClickOnSelect.bind(this);

		// Refs
		this.selectInputButton = React.createRef<HTMLButtonElement>();
	}

	/**
	 * Changes the isOpen state to the inverse of what it was
	 *
	 * @returns {void}
	 */
	onClickOnSelect() {
		const { isOpen } = this.state;

		this.setState({
			isOpen: !isOpen,
		});
	}

	/**
	 * Handles the onChange event on the list.
	 *
	 * @param {(number | null)} index
	 * @param {(React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>)} event
	 * @memberof Select
	 */
	onChangeOptionFromList(
		index: number | null,
		event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>,
	) {
		event.preventDefault();
		const { onChange } = this.props;
		const hasIndex = index && index >= 0;

		if (onChange && index && hasIndex) {
			onChange(index);
		} else {
			event.stopPropagation();
		}

		this.setState(
			{
				isOpen: false,
			},
			() => {
				if (this.selectInputButton.current) {
					this.selectInputButton.current.focus();
				}
			},
		);
	}

	/**
	 * Renders the select component
	 *
	 * @param {(ISelectOption[])} options
	 * @param {number} currentIndex
	 * @param {string} id
	 * @param {boolean} isOpen
	 * @param {(string | undefined)} label
	 * @returns
	 * @memberof Select
	 */
	renderSelectComponent(
		options: ISelectOption[],
		currentIndex: number,
		id: string,
		isOpen: boolean,
		label: string | undefined,
	) {
		const selected = options[currentIndex];
		return (
			<div className="select-input__container">
				<button
					ref={this.selectInputButton}
					key={selected.id}
					type="button"
					data-testid="component-select-button"
					id={`${id}-button`}
					aria-haspopup="listbox"
					aria-labelledby={`${id}-label ${id}-title`}
					aria-expanded={isOpen ? "true" : "false"}
					className={`row select-input__button ${isOpen ? "select-input__button--is-open" : ""}`}
					onClick={this.onClickOnSelect}
				>
					<span id={`${id}-label`} className="select-input__label">
						{label}
					</span>
					<span id={`${id}-title`} className="select-input__value as-paragraph">
						{selected.label}
					</span>
				</button>
				{isOpen && options && (
					<SelectInputOptions
						id={id}
						activeElement={selected}
						isOpen={isOpen}
						options={options}
						onChangeOptionFromList={(
							index: number | null,
							event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>,
						) => this.onChangeOptionFromList(index, event)}
					/>
				)}
			</div>
		);
	}

	public render() {
		const { id, label, options, currentIndex } = this.props;
		const { isOpen } = this.state;

		return (
			<S.SelectWrapper id={id} data-testid="component-select" className={`select-input ${isOpen ? "is-open" : ""}`}>
				{this.renderSelectComponent(options, currentIndex, id, isOpen, label)}
			</S.SelectWrapper>
		);
	}
}

export default Select;
