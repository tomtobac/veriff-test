import { useEffect, useReducer, useState } from 'react';
import { useKeyEvents } from '../../hooks/useKeyEvents';
import { reducer, initialState } from './reducer';
import { fetchChecks, submitCheckResults } from '../../services/api';
import { Result, Toggle } from '../../types';
import Button from '../Button';
import Check from '../Check';
import ErrorMessage from '../ErrorMessage';

import './CheckCompilance.css';

export function CheckCompilance() {
	const [results, setResults] = useState<(Result | null)[]>([]);
	const [state, dispatch] = useReducer(reducer, initialState);

	const loadData = async () => {
		try {
			dispatch({ type: 'REQUEST_STARTED' });
			const data = await fetchChecks();
			setResults(new Array(data.length).fill(null));
			dispatch({ type: 'REQUEST_SUCCESS', payload: data });
		} catch (err) {
			dispatch({ type: 'REQUEST_FAILED' });
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const onRespondCheck = (value: Toggle) => {
		setResults(
			results.map((result, idx) => {
				if (idx === currentIndex) {
					return {
						checkId: state.data[currentIndex].id,
						value,
					};
				}
				return result;
			})
		);
	};

	const { currentIndex } = useKeyEvents({
		sizeOfSteps: state.data.length,
		onAnswerCheck: onRespondCheck,
		isCurrentCompleted: (index: number) => results[index]?.value === Toggle.YES,
	});

	const onUpdateCheck = (index: number) => (newResult: Result) => {
		setResults(
			results.map((result, idx) => {
				if (index === idx) {
					return newResult;
				}
				return result;
			})
		);
	};

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		try {
			const response = await submitCheckResults(results as Result[]);
			// @todo: do something with the response
		} catch (error) {
			// @todo: show a try again?
		}
	};

	const isPreviousCompleted = (index: number) => {
		if (index === 0) {
			return false;
		}

		const previousChecks = results.slice(0, index);

		if (
			previousChecks.length >= index &&
			previousChecks.every((result) => result?.value === 'Yes')
		) {
			return false;
		}

		return true;
	};

	const isDisabledSubmit =
		results.length === state.data.length &&
		results.every((result) => result?.value === 'Yes');
	const { hasError, isLoading, data: checks } = state;
	const hasLoaded = !isLoading && !hasError && checks.length > 0;
	return (
		<main className="CheckCompilance">
			<h1>Veriff Code Challenge - Tomeu Cabot</h1>
			{hasError && <ErrorMessage onClick={() => loadData()} />}
			{hasLoaded && (
				<form className="CheckCompilance__form" onSubmit={onSubmit}>
					{checks.map((check, idx) => (
						<Check
							key={check.id}
							checkId={check.id}
							title={check.description}
							hasFocus={currentIndex == idx}
							disabled={isPreviousCompleted(idx)}
							onChange={onUpdateCheck(idx)}
							value={results[idx]?.value}
						/>
					))}
					<section className="CheckCompilance__form-actions">
						<Button tabIndex={-1} disabled={!isDisabledSubmit} type="submit">
							Submit
						</Button>
					</section>
				</form>
			)}
		</main>
	);
}
