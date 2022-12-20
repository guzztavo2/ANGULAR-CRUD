import { Inject,AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';


export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}














@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.component.html',
  styleUrls: ['./informacao.component.css']
})

export class InformacaoComponent {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];
  sortedData: Dessert[];



  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
    this.cancelarFormButton = new FormControl('',[Validators.required,cancelarBtnFormValidator]);
    

   // Create 100 users

   // Assign the data to the data source for the table to render
   this.sortedData = this.desserts.slice();
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
    if(typeDialog === 1){
      
    }else{
      
    }

  }


  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }


  ngAfterViewInit() {

  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function cancelarBtnFormValidator(control: FormControl) {
  (1)
  let quantidadeSelected = 0;

  if (quantidadeSelected === 0) {
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