import { render, screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CheckCompilance } from './CheckCompilance';
import { fetchChecks, submitCheckResults } from '../../services/api';
import { Toggle } from '../../types';

vi.mock('../../services/api', () => {
	return {
		submitCheckResults: vi.fn(),
		fetchChecks: vi.fn().mockResolvedValue([
			{ id: 'aaa', description: 'one', priority: 5 },
			{ id: 'bbb', description: 'two', priority: 10 },
		]),
	};
});

describe('CheckCompilance', () => {
	describe('Checks load successfully', () => {
		it('should render two checks', async () => {
			render(<CheckCompilance />);
			await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2));
		});
		it('should accept the first check with keyboard and the second one with a mouse click', async () => {
			const user = userEvent.setup();
			render(<CheckCompilance />);
			await waitFor(() => expect(screen.getByText('one')).toBeInTheDocument());
			await user.keyboard('{1}');
			await waitFor(() => expect(screen.getByTestId('aaa-on')).toBeChecked());
			await user.click(screen.getByTestId('bbb-on'));
			expect(screen.getByTestId('bbb-on')).toBeChecked();
		});
		test('submit button must be disabled until all check are completed', async () => {
			render(<CheckCompilance />);
			await waitFor(() =>
				expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
			);
			await waitFor(() =>
				screen
					.getAllByLabelText(Toggle.YES)
					.map(async (label) => await userEvent.click(label))
			);
			await waitFor(() =>
				expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled()
			);
		});
		it('should submit results to the backend', async () => {
			(fetchChecks as Mock).mockResolvedValue([
				{
					id: 'aaa',
					description: 'one',
					priority: 5,
				},
			]);
			render(<CheckCompilance />);
			await waitFor(() => expect(screen.getByText('one')).toBeInTheDocument());
			await userEvent.click(screen.getByLabelText(Toggle.YES));
			await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
			expect(submitCheckResults).toBeCalledWith([
				{
					checkId: 'aaa',
					value: 'Yes',
				},
			]);
		});
	});
	describe('Checks fails to load', () => {
		it('should render an error message', async () => {
			(fetchChecks as Mock).mockRejectedValueOnce('test');
			render(<CheckCompilance />);
			await waitFor(() =>
				expect(
					screen.getByText('Error: Something went wrong')
				).toBeInTheDocument()
			);
		});
		it('should trigger fetch when clicking on try again button', async () => {
			(fetchChecks as Mock).mockRejectedValueOnce('test');
			render(<CheckCompilance />);
			await waitFor(() =>
				expect(
					screen.getByText('Error: Something went wrong')
				).toBeInTheDocument()
			);
			await userEvent.click(screen.getByRole('button', { name: 'Try Again' }));
			expect(fetchChecks).toBeCalledTimes(2);
		});
	});
});
