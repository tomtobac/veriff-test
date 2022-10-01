import React from 'react';
import cs from 'classnames';
import './Button.css';

export const Button: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = ({ children, className, ...rest }) => {
	return (
		<button className={cs('Button', className)} {...rest}>
			{children}
		</button>
	);
};
