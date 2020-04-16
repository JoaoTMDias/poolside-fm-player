// Libraries
import * as React from "react";
import { ISelectOption } from "data/constants";
import { RovingTabIndexProvider } from "helpers/custom-hooks/roving-index";
import * as S from "./select.styled";
import { SelectOption } from "./select-option";
import { useDidMount } from "helpers";

// Interface
interface ISelectInputOptionsListProps {
	id: string;
	activeElement: ISelectOption;
	isOpen: boolean;
	options: ISelectOption[];
	onChangeOptionFromList(index: number | null): void;
}

const SelectInputOptionsList: React.FunctionComponent<ISelectInputOptionsListProps> = (props) => {
	const { activeElement, id, isOpen, options, onChangeOptionFromList } = props;

	useDidMount(() => {
		const element = document.getElementById(activeElement.id);

		if (element) {
			element.focus();
		}
	});

	/**
	 * @description Constroi uma lista de opções
	 * @author João Dias
	 * @date 2019-06-28
	 * @param {ISelectOption[]} options
	 * @returns
	 * @memberof SelectInputOptionsList
	 */
	function renderListOfOptions() {
		const list = options.map((option: ISelectOption, index: number) => {
			const key = option.id;

			const element = (
				<SelectOption
					key={key}
					id={key}
					onSelect={() => onChangeOptionFromList(index)}
					option={option}
				/>
			);

			return element;
		});

		return list;
	}

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
			<RovingTabIndexProvider>{renderListOfOptions()}</RovingTabIndexProvider>
		</S.SelectOptionsList>
	);
};

export default SelectInputOptionsList;
