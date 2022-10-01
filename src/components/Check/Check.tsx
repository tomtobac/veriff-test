import cs from 'classnames';
import { Result, Toggle } from '../../types';
import ToggleButton from '../ToggleButton';
import './Check.css';

type Check = {
	checkId: string;
	title: string;
	hasFocus: boolean;
	disabled: boolean;
	onChange: (result: Result) => void;
	value?: string;
};

export const Check: React.FC<Check> = ({
	title,
	checkId,
	hasFocus,
	disabled,
	onChange,
	value,
}) => {
	const onToggle = (value: Toggle) => onChange({ checkId, value });
	return (
		<fieldset
			title={title}
			disabled={disabled}
			tabIndex={-1}
			className={cs('Check', {
				'Check--is-disabled': disabled,
				'Check--has-focus': hasFocus,
			})}
		>
			<p className="Check__description">{title}</p>
			<ToggleButton
				id={checkId}
				onToggle={onToggle}
				onValue={Toggle.YES}
				offValue={Toggle.NO}
				currentValue={value}
			/>
		</fieldset>
	);
};
