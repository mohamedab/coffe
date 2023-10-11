import {Injectable} from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../components/alert-dialog/alert-dialog.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  public openConfirmDialog(title: string, message: string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    return dialogRef;
  }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    });
    return dialogRef;
  }
}
