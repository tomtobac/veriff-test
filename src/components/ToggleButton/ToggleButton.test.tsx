import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../../types';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
	it('should call onToggle when on button is clicked', async () => {
		const mockFn = vi.fn();
		render(
			<ToggleButton
				id="aaa"
				onValue={Toggle.YES}
				offValue={Toggle.NO}
				onToggle={mockFn}
			/>
		);
		const button = screen.getByLabelText(Toggle.YES);
		await userEvent.click(button);
		expect(mockFn).toBeCalledWith(Toggle.YES);
	});
	it('should be checked when currentValue matches the value', () => {
		render(
			<ToggleButton
				id="aaa"
				onValue={Toggle.YES}
				offValue={Toggle.NO}
				onToggle={() => {}}
				currentValue={Toggle.YES}
			/>
		);
		expect(screen.getByLabelText(Toggle.YES)).toBeChecked();
	});
});
