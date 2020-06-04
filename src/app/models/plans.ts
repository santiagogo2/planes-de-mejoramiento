export class Plans{
	constructor(
		public id: number,
		public nom_plan: string,
		public fecha_ini: string,
		public responsable: string,
		public fecha_reg: string,
		public usuario_reg: string,
	){}
}