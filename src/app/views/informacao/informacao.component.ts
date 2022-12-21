import { Inject,AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];














@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.component.html',
  styleUrls: ['./informacao.component.css']
})

export class InformacaoComponent implements AfterViewInit {

  displayedColumns: string[] = ['*','id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  public static quantidadeSelected:number = 0;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }
  toggleRow(row:any){
    this.selection.toggle(row)
    const numSelected = this.selection.selected.length;
  if(numSelected != 0){

  }
    // InformacaoComponent.quantidadeSelected = 1;

    // this.cancelarFormButton = new FormControl('',[Validators.required,cancelarBtnFormValidator]);

  }
  toggleAllRows() {

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  constructor(public dialog: MatDialog) {
    this.cancelarFormButton = new FormControl('',[Validators.required,cancelarBtnFormValidator]);

    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(users);
  }
  positionOptions: TooltipPosition[] = ['below'];
  cancelarFormButton: any;
  position = new FormControl(this.positionOptions[0]);
  
  
  
  openDialog(typeDialog:number, enterAnimationDuration: string, exitAnimationDuration: string, title:any, message:any, buttons:any ): void {

    switch(typeDialog){
      case 1:
        const dialogRef = this.dialog.open(DialogAdicao, {
          width: '45%',
          minWidth: '350px',
          enterAnimationDuration,
          exitAnimationDuration,
          data:{informacao: ''}
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result !== undefined){
            console.log(result);
            alert('a');
          }

        })
      break;
      case 2:
        this.dialog.open(customDialog,{
          width: '25%',
          minWidth: '150px',
          enterAnimationDuration,
          exitAnimationDuration,
          data:{title: title, message:message, buttons:buttons}
        })
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
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
function cancelarBtnFormValidator(control: FormControl) {
  (1)


  if (InformacaoComponent.quantidadeSelected === 0) {
    return {
      selectedItens: {
        selectedItens: false
      }
    }
  }
  
  return null; (6)

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

  constructor(public dialogRef: MatDialogRef<DialogAdicao>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    let informacaoFormControl = new FormControl('', [Validators.required]);
    this.informacaoFormControl = informacaoFormControl;
  }
  position = new FormControl(this.positionOptions[0]);
  

  public exitDialog(){
    this.dialogRef.close();
  }
} 

@Component({
  selector: 'customDialog',
  templateUrl: 'informacao.customDialog.html',
  styleUrls: ['./informacao.component.css'],



})

export class customDialog {
private title!:string|undefined;
private message!:string|undefined;
private buttons!: []|undefined|string;

  constructor( 
    public dialogRef: MatDialogRef<customDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      dialogRef.afterClosed().subscribe();
  }


} 