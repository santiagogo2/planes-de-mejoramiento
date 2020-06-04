export class User{
	constructor(
		public id: number,
		public user_alias: string,
		public name: string,
		public surname: string,
		public role: string,
		public password: string
	){}
}