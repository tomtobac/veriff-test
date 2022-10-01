import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
	it('should render as it is', () => {
		const { asFragment } = render(<ErrorMessage onClick={() => {}} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
