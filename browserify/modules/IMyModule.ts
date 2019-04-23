export default interface IMyModule {
	isAcceptable(s: string): boolean;
	test(str: string): boolean;
}