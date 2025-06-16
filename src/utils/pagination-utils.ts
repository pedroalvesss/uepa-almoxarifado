export const PaginatorUtils = {
	getPageNumber(count: number, size: number): number {
		return Math.ceil(count / size);
	},

	getOffset(page: number, limit: number) {
		return (page - 1) * limit;
	},

	getPage(offset: number, limit: number) {
		return offset / limit + 1;
	},
};
