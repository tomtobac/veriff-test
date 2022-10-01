import { useEffect, useState } from 'react';
import { Toggle } from '../types';

type UseKeyEventsProps = {
	sizeOfSteps: number;
	onAnswerCheck: (value: Toggle) => void;
	isCurrentCompleted: (index: number) => boolean;
};

const ARROW_DOWN_KEY_CODE = 'ArrowDown';
const ARROW_UP_KEY_CODE = 'ArrowUp';
const NUMBER_1_KEY_CODE = '1';
const NUMBER_2_KEY_CODE = '2';

export const useKeyEvents = ({
	sizeOfSteps,
	onAnswerCheck,
	isCurrentCompleted,
}: UseKeyEventsProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const downHandler = ({ key }: KeyboardEvent) => {
		if (
			[
				ARROW_DOWN_KEY_CODE,
				ARROW_UP_KEY_CODE,
				NUMBER_1_KEY_CODE,
				NUMBER_2_KEY_CODE,
			].includes(key)
		) {
			switch (key) {
				case ARROW_DOWN_KEY_CODE:
					if (
						currentIndex + 1 >= sizeOfSteps ||
						!isCurrentCompleted(currentIndex)
					)
						return;
					setCurrentIndex(currentIndex + 1);
					break;
				case ARROW_UP_KEY_CODE:
					if (currentIndex - 1 < 0) return;
					setCurrentIndex(currentIndex - 1);
					break;
				case NUMBER_1_KEY_CODE:
				case NUMBER_2_KEY_CODE:
					onAnswerCheck(key === '1' ? Toggle.YES : Toggle.NO);
					break;
			}
		}
	};
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		return () => {
			window.removeEventListener('keydown', downHandler);
		};
	}, [currentIndex, sizeOfSteps, onAnswerCheck, isCurrentCompleted]);

	return { currentIndex };
};
