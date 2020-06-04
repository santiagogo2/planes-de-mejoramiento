// Imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import * as $ from 'jquery';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { PasswordEditComponent } from './components/users/password-edit/password-edit.component';

import { UserService } from './services/user.service';
import { IdentityGuard } from './services/identity.guard';
import { PlanRegisterComponent } from './components/plans/plan-register/plan-register.component';
import { PlansListComponent } from './components/plans/plans-list/plans-list.component';
import { PlanEditComponent } from './components/plans/plan-edit/plan-edit.component';
import { IoRegisterComponent } from './components/improvementOpportunity/io-register/io-register.component';
import { IoEditComponent } from './components/improvementOpportunity/io-edit/io-edit.component';
import { IoOpenFollowComponent } from './components/improvementOpportunity/io-open-follow/io-open-follow.component';
import { IoOpenFollowListComponent } from './components/improvementOpportunity/io-open-follow-list/io-open-follow-list.component';
import { ActionRegisterComponent } from './components/actions/action-register/action-register.component';
import { ActionEditComponent } from './components/actions/action-edit/action-edit.component';
import { ActionSearchComponent } from './components/actions/action-search/action-search.component';
import { IoFollowActionsComponent } from './components/improvementOpportunity/io-follow-actions/io-follow-actions.component';
import { ActionUpdateLineComponent } from './components/actions/action-update-line/action-update-line.component';
import { IoUpdateEffectivenessIndicatorComponent } from './components/improvementOpportunity/io-update-effectiveness-indicator/io-update-effectiveness-indicator.component';
import { NewReportComponent } from './components/reports/new-report/new-report.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		UsersListComponent,
		UserEditComponent,
		UserRegisterComponent,
		PasswordEditComponent,
		HomeComponent,
		PlanRegisterComponent,
		PlansListComponent,
		PlanEditComponent,
		IoRegisterComponent,
		IoEditComponent,
		IoOpenFollowComponent,
		IoOpenFollowListComponent,
		ActionRegisterComponent,
		ActionEditComponent,
		ActionSearchComponent,
		IoFollowActionsComponent,
		ActionUpdateLineComponent,
		IoUpdateEffectivenessIndicatorComponent,
		NewReportComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		AngularFileUploaderModule
	],
	providers: [
		appRoutingProviders,
		IdentityGuard,
		UserService,
		{provide: LocationStrategy, useClass: HashLocationStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
