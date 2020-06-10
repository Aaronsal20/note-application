import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDividerModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressBarModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    DragDropModule,
    MatSelectModule,
    MatExpansionModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatTooltipModule,
    DragDropModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule
  ],
})
export class AngularMaterialModule {}
