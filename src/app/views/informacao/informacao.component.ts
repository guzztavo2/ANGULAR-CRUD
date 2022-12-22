import { informacao } from './../../model/model.informacao';
import { Inject, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

var ELEMENT_DATA: informacao[] = informacao.gerarInformacoes(20);

@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.component.html',
  styleUrls: ['./informacao.component.css'],
})
export class InformacaoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;
  getColorSelected() {
    if (this.verificarSelected()) {
      return 'primary';
    } else {
      return 'disabled';
    }
  }
  verificarSelected(): boolean {
    if (this.selection.selected.length > 0) return true;
    else return false;
  }
  btnRemoverAction(currentBtn: any) {
    let currentColor: string = currentBtn.getAttribute('ng-reflect-color');
    if (currentColor === 'disabled') {
      this.openDialog(
        2,
        '150ms',
        '250ms',
        'Não é possivel fazer isso ainda:',
        'Você precisa selecionar os itens para deleta-los.',
        [{ buttonMessage: 'Ok', buttonColor: 'primary' }]
      );
    } else {
      this.openDialog(
        2,
        '150ms',
        '250ms',
        'Tudo certo!',
        'Já vamos deletear os itens para você.',
        [{ buttonMessage: 'Ok', buttonColor: 'warn' }]
      );
    }
  }
  gerarValores() {
    this.openDialog(3, '150ms', '250ms', 'Uma pergunta antes de prosseguir:', 'Quantas informações você gostaria de adicionar?', undefined);
  }
  listInformacoes!: informacao[];

  constructor(public dialog: MatDialog) {
    this.listInformacoes = ELEMENT_DATA;
  }

  router: Router = new Router();
  positionOptions: TooltipPosition[] = ['below'];
  cancelarFormButton = new FormControl();
  position = new FormControl(this.positionOptions[0]);
  displayedColumns: string[] = [
    'select',
    'id',
    'informacao',
    'dataCriacao',
    'dataAtualizacao',
  ];
  dataSource = new MatTableDataSource<informacao>();
  selection = new SelectionModel<informacao>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: informacao): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  openDialog(
    typeDialog: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    title: any,
    message: any,
    buttons: any
  ): void {
    var dialogRef!:any;

    switch (typeDialog) {
      case 1:
        dialogRef = this.dialog.open(DialogAdicao, {
          width: '45%',
          minWidth: '350px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { informacao: '' },
        });
        dialogRef.afterClosed().subscribe((result:any) => {
          if (result !== undefined) {
            console.log(result);
            alert('a');
          }
        });
        break;
      case 2:
        this.dialog.open(customDialog, {
          width: '25%',
          minWidth: '150px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { title: title, message: message, buttons: buttons },
        });
        break;
      case 3:
        dialogRef = this.dialog.open(DialogQuantidade, {
          width: '45%',
          minWidth: '350px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { informacao: '',title: title, message: message },
        });
        dialogRef.afterClosed().subscribe((result:any) => {
          if (result !== undefined) {
            console.log(ELEMENT_DATA);
            let itensGeridos = informacao.gerarInformacoes(Number.parseInt(result));
            this.listInformacoes = itensGeridos;
            console.log(ELEMENT_DATA);
          }


          });
        break;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




@Component({
  selector: 'DialogAdicao',
  templateUrl: 'informacao.adicionar.html',
  styleUrls: ['./informacao.component.css'],
})
export class DialogAdicao {
  positionOptions: TooltipPosition[] = ['below'];
  email = new FormControl('', [Validators.required, Validators.email]);
  informacaoFormControl: any;
  constructor(
    public dialogRef: MatDialogRef<DialogAdicao>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let informacaoFormControl = new FormControl('', [Validators.required]);
    this.informacaoFormControl = informacaoFormControl;
  }
  position = new FormControl(this.positionOptions[0]);

  public exitDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'customDialog',
  templateUrl: 'informacao.customDialog.html',
  styleUrls: ['./informacao.component.css'],
})
export class customDialog {
  private title!: string | undefined;
  private message!: string | undefined;
  private buttons!: [] | undefined | string;

  constructor(
    public dialogRef: MatDialogRef<customDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.afterClosed().subscribe();
  }
}




@Component({
  selector: 'DialogQuantidade',
  templateUrl: 'informacao.dialogQuantidade.html',
  styleUrls: ['./informacao.component.css'],
})
export class DialogQuantidade {
  positionOptions: TooltipPosition[] = ['below'];
  informacaoFormControl: any;
  private title!: string | undefined;
  private message!: string | undefined;
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public dialogRef: MatDialogRef<DialogQuantidade>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.afterClosed().subscribe();

  }
  keypressQuantidadeE(event:any):boolean{
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,2}$/)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
  }
  return true;
  }

  public exitDialog() {
    this.dialogRef.close();
  }
}
