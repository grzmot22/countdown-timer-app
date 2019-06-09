import React, { useState, useEffect } from 'react';
import FlipNumbers from 'react-flip-numbers';
import Clock from 'react-clock';

function App() {
	const [ date, setDate ] = useState(new Date());
	useEffect(() => {
		setInterval(() => setDate(new Date()), 1000);
	});
	console.log(date);
	return (
		<div>
			<FlipNumbers
				height={12}
				width={12}
				color="red"
				background="white"
				play
				perspective={100}
				numbers={date.getHours().toString()}
			/>
			<FlipNumbers
				height={12}
				width={12}
				color="red"
				background="white"
				play
				perspective={100}
				numbers={date.getMinutes().toString()}
			/>
			<FlipNumbers
				height={12}
				width={12}
				color="red"
				background="white"
				play
				perspective={100}
				numbers={date.getSeconds().toString()}
			/>
			<Clock value={date} />
		</div>
	);
}

export default App;
