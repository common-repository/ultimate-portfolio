import { Component, useState } from "@wordpress/element";

class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sources: props.sources,
			numSourcesToShow: 2,
		};
		this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
	}

	handleLoadMoreClick = () => {
		this.setState({
			numSourcesToShow: this.state.numSourcesToShow + 2,
		});
	};

	render() {
		const { sources, numSourcesToShow } = this.state;
		return (
			<div className="portfolio">
				<div className="portfolio-images">
					{sources.slice(0, numSourcesToShow).map((source, index) => (
						<div key={index} className="portfolio-image">
							<img src={source.url} alt={source.caption} />
							<div className="caption">{source.caption}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const LoadMoreButton = () => {
	return (
		<button id="load-item" onClick={handleLoadMoreClick}>
			{__("Load More", " ultimate-portfolio")}
		</button>
	);
};

export { Portfolio, LoadMoreButton };
