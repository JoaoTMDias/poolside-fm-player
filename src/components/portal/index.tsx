// Libraries
import * as React from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
	backgroundColor?: string;
	className?: string;
	hasOverflowX?: boolean;
	idAttribute?: string;
	isRelative?: boolean;
	isFixed?: boolean;
	portalId?: string;
}

interface IPortalState {
	root: HTMLElement | null;
}

/**
 * @description React Portal
 * @author  João Dias
 */
class Portal extends React.Component<IPortalProps, IPortalState> {
	private element: HTMLElement;

	static defaultProps = {
		portalId: "app-portal",
		isRelative: true,
	};

	constructor(props: IPortalProps) {
		super(props);
		this.element = document.createElement("aside");
		this.state = {
			root: null,
		};
	}

	componentDidMount() {
		const { backgroundColor, className, hasOverflowX, idAttribute, isRelative, isFixed, portalId } = this.props;

		const id = portalId || "app-portal";
		const portalRoot = document.getElementById(`${id}`);

		if (portalRoot) {
			this.element.setAttribute("role", "dialog");
			this.element.setAttribute("aria-labelledby", "portal-title");
			this.element.setAttribute("aria-modal", "true");

			if (idAttribute) {
				this.element.setAttribute("id", idAttribute);
			}
			if (className) {
				this.element.setAttribute("class", className);
			}
			if (backgroundColor) this.element.style.backgroundColor = backgroundColor; // else, is transparent (no bgColor)
			if (isFixed) this.element.style.position = "fixed";
			if (hasOverflowX) this.element.style.overflowX = "scroll";

			if (isRelative) portalRoot.style.position = "relative";
			else if (!isRelative) portalRoot.style.position = ""; // static => default value

			this.setState(
				{
					root: portalRoot,
				},
				() => {
					const { root } = this.state;
					if (root) {
						root.appendChild(this.element);
					}
				},
			);
		}
	}

	componentWillUnmount() {
		const { root } = this.state;

		if (root) {
			root.removeChild(this.element);
		}
	}

	render(): JSX.Element {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.element);
	}
}

export default Portal;
