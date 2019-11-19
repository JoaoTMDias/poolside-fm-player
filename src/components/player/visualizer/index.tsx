// Libraries
import * as React from "react";
import { PlayerControllerContext } from "contexts/player-controller-context";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";
import produce from "immer";
import * as S from "./player-visualizer.styled";

interface IPlayerVisualizerProps {
	audio: HTMLAudioElement | null;
	status: EPlayingStatus;
}
interface IPlayerVisualizerState {
	width: number;
	height: number;
	bars: {
		total: number;
		background: string;
		color: string;
	};
}

/**
 * @description An audio visualizer for the player
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
class PlayerVisualizer extends React.Component<IPlayerVisualizerProps, IPlayerVisualizerState> {
	private canvas: React.RefObject<HTMLCanvasElement>;

	private canvasElement: HTMLCanvasElement | null;

	private canvasContext: CanvasRenderingContext2D | null;

	private audioAnalyser: AnalyserNode | null;

	private playerBarWidth: number;

	private dataArray: Uint8Array | null;

	private bufferLength: number;

	context!: React.ContextType<typeof PlayerControllerContext>;

	static defaultProps: IPlayerVisualizerProps = {
		audio: null,
		status: EPlayingStatus.paused,
	};

	constructor(props: IPlayerVisualizerProps) {
		super(props);

		this.canvas = React.createRef<HTMLCanvasElement>();
		this.canvasElement = null;
		this.canvasContext = null;
		this.audioAnalyser = null;
		this.playerBarWidth = 0;
		this.dataArray = null;
		this.bufferLength = 0;

		this.state = {
			width: 256,
			height: 32,
			bars: {
				total: 128,
				background: "#000000",
				color: "white",
			},
		};
	}

	/**
	 * - Gets the black and white css colors from the html element
	 * - Updates the state with the canvas element reference
	 * - Initializes the canvas drawing
	 *
	 * @memberof PlayerVisualizer
	 */
	componentDidMount() {
		const { audio } = this.props;
		const { width, height } = this.state;

		const dpi = this.getDevicePixelRatio();

		this.getColorsFromRoot();

		if (this.canvas && this.canvas.current) {
			this.canvasElement = this.canvas.current;

			this.setCanvasPixelRatio(width, dpi, height);

			if (audio && audio.src.length > 0) {
				this.initCanvas(audio);
			}
		}
	}

	/**
	 * Only updathes the component when props change
	 *
	 * @param {IPlayerVisualizerProps} nextProps
	 * @returns
	 * @memberof PlayerVisualizer
	 */
	shouldComponentUpdate(nextProps: IPlayerVisualizerProps) {
		const { audio, status } = this.props;
		if (nextProps.audio !== audio || nextProps.status !== status) {
			return true;
		}

		return false;
	}

	/**
	 * If there's a new audio, initializes the canvas
	 *
	 * @param {IPlayerVisualizerProps} prevProps
	 * @memberof PlayerVisualizer
	 */
	componentDidUpdate(prevProps: IPlayerVisualizerProps) {
		const { audio } = this.props;

		if (prevProps.audio !== audio && audio && audio.src.length > 0) {
			this.initCanvas(audio);
		}
	}

	/**
	 * Defines the canvas width and height base on the devices pixel ratio
	 *
	 * @private
	 * @param {number} width
	 * @param {number} dpi
	 * @param {number} height
	 * @memberof PlayerVisualizer
	 */
	private setCanvasPixelRatio(width: number, dpi: number, height: number) {
		if (this.canvasElement) {
			this.canvasElement.width = width * dpi;
			this.canvasElement.height = height * dpi;
			this.canvasElement.setAttribute("width", `${width}`);
			this.canvasElement.setAttribute("height", `${height}`);
		}
	}

	/**
	 * Gets the device pixel ratio
	 *
	 * @returns {void}
	 * @memberof PlayerVisualizer
	 */
	getDevicePixelRatio() {
		return window.devicePixelRatio || 1;
	}

	/**
	 * Gets the black and white css colors from the html element
	 *
	 * @memberof PlayerVisualizer
	 */
	getColorsFromRoot() {
		const background = getComputedStyle(document.documentElement)
			.getPropertyValue("--color-black")
			.trim();
		const color = getComputedStyle(document.documentElement)
			.getPropertyValue("--color-white")
			.trim();

		this.setState(
			produce((draftState: IPlayerVisualizerState) => {
				draftState.bars.background = background;
				draftState.bars.color = color.length > 0 ? color : "#faf9f9";
			}),
		);
	}

	/**
	 * Initializes the Canvas creation.
	 * 1- Creates the player context
	 * 2- Creates an analyser based on the current audio
	 * 3- Renders the frames onto the canvas
	 *
	 * @param {HTMLCanvasElement} player
	 * @memberof PlayerVisualizer
	 */
	initCanvas(audio: HTMLAudioElement) {
		if (this.canvasElement) {
			this.createCanvasContext(this.canvasElement);

			this.createAudioAnalyser(audio);

			this.playerBarWidth = 1;

			this.renderFrame();
		}
	}

	static contextType = PlayerControllerContext;

	/**
	 * Creates an object that provides methods and properties
	 * for drawing graphics on the canvas element
	 *
	 * @param {HTMLCanvasElement} canvasElement
	 * @memberof PlayerVisualizer
	 */
	createCanvasContext(canvasElement: HTMLCanvasElement) {
		const { width, height, bars } = this.state;

		this.canvasContext = canvasElement.getContext("2d");

		if (this.canvasContext) {
			this.canvasContext.fillStyle = bars.background;
			this.canvasContext.fill();
			this.canvasContext.fillRect(0, 0, width, height);
		}
	}

	/**
	 * Creates the Audio Analyser that feeds on the current audio
	 *
	 * @param {HTMLAudioElement} audio
	 * @memberof PlayerVisualizer
	 */
	createAudioAnalyser(audio: HTMLAudioElement) {
		const context = new AudioContext();
		const mediaElementSource = context.createMediaElementSource(audio);
		audio.crossOrigin = "anonymous";

		this.audioAnalyser = context.createAnalyser();
		this.audioAnalyser.connect(context.destination);
		this.audioAnalyser.fftSize = 256;

		mediaElementSource.connect(this.audioAnalyser);

		this.bufferLength = this.audioAnalyser.frequencyBinCount;

		this.dataArray = new Uint8Array(this.bufferLength);
	}

	/**
	 * Renders the bars frames onto the canvas
	 *
	 * @memberof PlayerVisualizer
	 */
	renderFrame = () => {
		requestAnimationFrame(this.renderFrame);

		const { bars } = this.state;
		let xAxis = 0;
		let barHeight;

		if (this.canvasContext && this.dataArray && this.playerBarWidth && this.canvasElement) {
			if (this.audioAnalyser && this.audioAnalyser !== undefined) {
				this.audioAnalyser.getByteFrequencyData(this.dataArray);
			}

			this.canvasContext.fillStyle = bars.background;
			this.canvasContext.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

			for (let i = 0; i < this.bufferLength; i += 1) {
				barHeight = this.dataArray[i] * 0.1;

				this.canvasContext.fillStyle = bars.color;
				this.canvasContext.fillRect(xAxis, this.canvasElement.height - barHeight, this.playerBarWidth, barHeight);

				xAxis += this.playerBarWidth + 2;
			}
		}
	};

	render() {
		const { status } = this.props;

		const isPlaying = status === EPlayingStatus.playing;
		const wrapperClassname = isPlaying ? "is-playing" : "";
		const caption = isPlaying ? "This is an audio visualizer for the music that is playing" : "Press play to start";
		const captionClassname = isPlaying ? "sr-only" : "";

		return (
			<S.PlayerVisualizerWrapper
				role="presentation"
				data-testid="player-visualizer-wrapper"
				id="player-visualizer"
				className={`player-visualizer ${wrapperClassname}`}
			>
				<figcaption id="player-visualizer-label" className={`player-visualizer__label ${captionClassname}`}>
					{caption}
				</figcaption>
				{isPlaying && (
					<canvas
						ref={this.canvas}
						id="player-visualizer-canvas"
						aria-labelledby="player-visualizer-label"
						width="272"
						height="40"
						className="player-visualizer__canvas"
					/>
				)}
			</S.PlayerVisualizerWrapper>
		);
	}
}

export default PlayerVisualizer;
