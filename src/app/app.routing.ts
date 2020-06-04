// Import necesarios para el archivo de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes
// Componentes globales
import { HomeComponent } from './components/home/home.component';
// Componentes de Usuario
import { LoginComponent } from './components/users/login/login.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { PasswordEditComponent } from './components/users/password-edit/password-edit.component';
// Componentes de Planes
import { PlansListComponent } from './components/plans/plans-list/plans-list.component';
import { PlanRegisterComponent } from './components/plans/plan-register/plan-register.component';
import { PlanEditComponent } from './components/plans/plan-edit/plan-edit.component';
// Componentes de Oportunidades de Mejora
import { IoRegisterComponent } from './components/improvementOpportunity/io-register/io-register.component';
import { IoEditComponent } from './components/improvementOpportunity/io-edit/io-edit.component';
import { IoOpenFollowComponent } from './components/improvementOpportunity/io-open-follow/io-open-follow.component';
import { IoOpenFollowListComponent } from './components/improvementOpportunity/io-open-follow-list/io-open-follow-list.component';
import { IoFollowActionsComponent } from './components/improvementOpportunity/io-follow-actions/io-follow-actions.component';
import { IoUpdateEffectivenessIndicatorComponent } from './components/improvementOpportunity/io-update-effectiveness-indicator/io-update-effectiveness-indicator.component';
// Componentes Acciones de Mejora
import { ActionRegisterComponent } from './components/actions/action-register/action-register.component';
import { ActionEditComponent } from './components/actions/action-edit/action-edit.component';
import { ActionSearchComponent } from './components/actions/action-search/action-search.component';
import { ActionUpdateLineComponent } from './components/actions/action-update-line/action-update-line.component';
// Componentes Informes
import { NewReportComponent } from './components/reports/new-report/new-report.component';

import { IdentityGuard } from './services/identity.guard';

// Definir las rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent, canActivate: [IdentityGuard]},
	{path: 'inicio', component: HomeComponent, canActivate: [IdentityGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent, canActivate: [IdentityGuard]},
	{path: 'listar/usuarios', component: UsersListComponent, canActivate: [IdentityGuard]},
	{path: 'editar/usuario/:id', component: UserEditComponent, canActivate: [IdentityGuard]},
	{path: 'registrar/usuario', component: UserRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'change/password/:id', component: PasswordEditComponent, canActivate: [IdentityGuard]},

	{path: 'listar/planes', component: PlansListComponent, canActivate: [IdentityGuard]},
	{path: 'registrar/plan', component:PlanRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'editar/plan/:id', component:PlanEditComponent, canActivate: [IdentityGuard]},

	{path: 'registrar/oportunidad-mejora', component:IoRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'editar/oportunidad-mejora/:id', component:IoEditComponent, canActivate: [IdentityGuard]},
	{path: 'oportunidad-mejora/seguimiento-planes/:estado', component:IoOpenFollowComponent, canActivate: [IdentityGuard]},
	{path: 'oportunidad-mejora/seguimiento-planes/:estado/plan/:id', component:IoOpenFollowListComponent, canActivate: [IdentityGuard]},
	{path: 'oportunidad-mejora/seguimiento-planes/acciones/:id', component:IoFollowActionsComponent, canActivate: [IdentityGuard]},
	{path: 'oportunidad-mejora/editar-indicador-efectividad/:id', component:IoUpdateEffectivenessIndicatorComponent, canActivate: [IdentityGuard]},

	{path: 'buscar/accion-mejora', component:ActionSearchComponent, canActivate: [IdentityGuard]},
	{path: 'registrar/accion-mejora/:idOpportunity', component:ActionRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'editar/accion-mejora/:id', component:ActionEditComponent, canActivate: [IdentityGuard]},
	{path: 'oportunidad-mejora/seguimiento-planes/acciones/update-line/:linea/:id', component:ActionUpdateLineComponent, canActivate: [IdentityGuard]},

	{path: 'informes/generar-informe/planes-mejoramiento', component: NewReportComponent, canActivate: [IdentityGuard]}
];

// Exportar la configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);