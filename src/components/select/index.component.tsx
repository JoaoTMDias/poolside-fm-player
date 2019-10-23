import * as React from "react";
import SelectInputOptions from "./select-input-option";
import { ISelectOption, ISelectProps, ISelectState } from "./select.interface";
import * as S from "./select.styled";

export const defaultProps = {
	id: "select-channel",
	label: "Channel",
	placeholder: "Music channel",
};

/**
 * @class Select
 * @extends {React.Component<ISelectProps, ISelectState>}
 */
class Select extends React.Component<ISelectProps, ISelectState> {
	static defaultProps = defaultProps;

	private selectInputButton: React.RefObject<HTMLButtonElement>;

	constructor(props: ISelectProps) {
		super(props);

		this.state = {
			isOpen: false,
			selectButton: {
				id: "poolside-fm",
				label: "Poolside FM (default)",
				value: "poolside-fm",
			},
		};

		// Bindings
		this.onClickOnSelectButton = this.onClickOnSelectButton.bind(this);

		// Refs
		this.selectInputButton = React.createRef<HTMLButtonElement>();
	}

	/**
	 * Changes the isOpen state to the inverse of what it was
	 *
	 * @returns {void}
	 */
	onClickOnSelectButton() {
		const { isOpen } = this.state;

		this.setState({
			isOpen: !isOpen,
		});
	}

	/**
	 * Handles the onChange event on the list.
	 *
	 * @param {ISelectOption} option
	 * @returns {void}
	 */
	onChangeOptionFromList(
		option: ISelectOption | null,
		event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>,
	) {
		event.preventDefault();
		const { onSelectOption } = this.props;

		if (option) {
			this.setState(
				{
					selectButton: option,
				},
				() => {
					if (onSelectOption) {
						onSelectOption(option);
					}
				},
			);
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

	public render() {
		const { id, label, options } = this.props;
		const { isOpen, selectButton } = this.state;

		return (
			<S.SelectWrapper id={id} data-testid="component-select" className={`select-input ${isOpen ? "is-open" : ""}`}>
				<div className="select-input__container">
					<button
						ref={this.selectInputButton}
						key={selectButton.id}
						type="button"
						data-testid="component-select-button"
						id={`${id}-button`}
						aria-haspopup="listbox"
						aria-labelledby={`${id}-label ${id}-title`}
						aria-expanded={isOpen ? "true" : "false"}
						className={`row select-input__button ${isOpen ? "select-input__button--is-open" : ""}`}
						onClick={this.onClickOnSelectButton}
					>
						<span id={`${id}-label`} className="select-input__label">
							{label}
						</span>
						<span id={`${id}-title`} className="select-input__value as-paragraph">
							{selectButton.label}
						</span>
					</button>
					{isOpen && options && (
						<SelectInputOptions
							id={id}
							activeElement={selectButton}
							isOpen={isOpen}
							options={options}
							onChangeOptionFromList={(
								option: ISelectOption | null,
								event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLabelElement>,
							) => this.onChangeOptionFromList(option, event)}
						/>
					)}
				</div>
			</S.SelectWrapper>
		);
	}
}

export default Select;
