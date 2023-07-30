import { useState } from "react";
import "./index.css";
import twitterlogo from './images/twitter.png'

function App() {
	const [quote, setQuote] = useState('');
	const [author, setAuthor] = useState("");
	const [color, setColor] = useState("#000");

	const fetchQuote = async () => {
		const reponse = await fetch(
			"https://api.gameofthronesquotes.xyz/v1/random"
		);
		const data = await reponse.json();
		setQuote(data.sentence);
		setAuthor(data.character.name);
		const getRgb = () => Math.floor(Math.random() * 256);

		const rgbtoHex = (r, g, b) => {
			return (
				"#" +
				[r, g, b]
					.map((x) => {
						const hex = x.toString(16);
						return hex.length === 1 ? "0" + hex : hex;
					})
					.join("")
			);
		};

		const changecolor = () => {
			const color = {
				r: getRgb(),
				g: getRgb(),
				b: getRgb(),
			};
			setColor(rgbtoHex(color.r, color.g, color.b));
		};
		changecolor();
	};

	return (
		<div className="parent-div" style={{ backgroundColor: color }}>
			<div id="quote-box" className="quote-box">
				<h1 id="text" style={{color:color}}>"{quote}"</h1>
				<h3 id="author">-{author}</h3>
				<button id="new-quote" style={{backgroundColor:color}}onClick={fetchQuote}>
					New Quote
				</button>
				<br />
				<a id="tweet-quote" href="https://twitter.com/intent/tweet">
					<img className="twitter-logo" src={twitterlogo}/>
					<span>Tweet Quote</span>
				</a>
				<br />
				<span>Developed by Kanute</span>
			</div>
		</div>
	);
}

export default App;
