import { Toggle } from '../../types';
import './ToggleButton.css';

type Props = {
	id: string;
	onValue: string;
	offValue: string;
	onToggle: (value: Toggle) => void;
	currentValue?: string;
};

export const ToggleButton: React.FC<Props> = ({
	id,
	onValue,
	offValue,
	onToggle,
	currentValue,
}) => {
	const onId = id + '-on';
	const offId = id + '-off';
	const name = id + '-Toggle';
	const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		if (event.target.checked) {
			onToggle(event.target.value as Toggle);
		}
	};
	return (
		<section className="Toggle">
			<input
				type="radio"
				className="Toggle__button"
				id={onId}
				data-testid={onId}
				name={name}
				onChange={onChange}
				value={onValue}
				checked={currentValue === onValue}
			/>
			<label className="Toggle__label Toggle__label--left" htmlFor={onId}>
				Yes
			</label>
			<input
				type="radio"
				className="Toggle__button"
				id={offId}
				data-testid={offId}
				name={name}
				onChange={onChange}
				value={offValue}
				checked={currentValue === offValue}
			/>
			<label className="Toggle__label Toggle__label--right" htmlFor={offId}>
				No
			</label>
		</section>
	);
};
