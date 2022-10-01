export type Check = {
	id: string;
	priority: number;
	description: string;
};

export type Result = { checkId: string; value: Toggle };

export enum Toggle {
	YES = 'Yes',
	NO = 'No',
}
