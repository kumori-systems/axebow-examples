import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CustomSnackbarService } from './services/custom-snackbar.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSnackBarModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        SidebarItemComponent,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule],
    declarations: [HeaderComponent, SidebarComponent, SidebarItemComponent, ConfirmationModalComponent],
    providers: [
    CustomSnackbarService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},


    ],
})
export class SharedModule { }
