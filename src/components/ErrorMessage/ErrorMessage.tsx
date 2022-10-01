import Button from '../Button';

type Props = {
	onClick: VoidFunction;
};
export const ErrorMessage: React.FC<Props> = ({ onClick }) => {
	return (
		<article>
			<p>Error: Something went wrong</p>
			<Button type="button" onClick={onClick}>
				Try Again
			</Button>
		</article>
	);
};
