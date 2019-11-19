import * as React from "react";
import { PlayerControllerContext } from "contexts/player-controller-context";
import SelectInputOptions from "./select-option";
import { ISelectProps, ISelectState } from "./select.interface";
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
	private selectInputButton: React.RefObject<HTMLButtonElement>;

	context!: React.ContextType<typeof PlayerControllerContext>;

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
		const { changePlaylist } = this.context;

		if (index !== null && index >= 0) {
			changePlaylist(index);
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

	static contextType = PlayerControllerContext;

	public render() {
		const { id, label, options } = this.props;
		const { isOpen } = this.state;

		return (
			<S.SelectWrapper id={id} data-testid="component-select" className={`select-input ${isOpen ? "is-open" : ""}`}>
				<PlayerControllerContext.Consumer>
					{({ currentPlaylistIndex }) => {
						const selectedPlaylist = options[currentPlaylistIndex];
						return (
							<div className="select-input__container">
								<button
									ref={this.selectInputButton}
									key={selectedPlaylist.id}
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
										{selectedPlaylist.label}
									</span>
								</button>
								{isOpen && options && (
									<SelectInputOptions
										id={id}
										activeElement={selectedPlaylist}
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
					}}
				</PlayerControllerContext.Consumer>
			</S.SelectWrapper>
		);
	}
}

export default Select;
