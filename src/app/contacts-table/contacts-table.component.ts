import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Contact} from '../models/contact';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})

export class ContactsTableComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public dataService: DataService,
  ) {}

  displayedColumns = ['nickName', 'tags', 'firstName', 'secondName', 'sex', 'birthday', 'hairColor', 'actions'];

  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(contact: Contact) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  startEdit(i: number, id: number, nickName: string, firstName: string, secondName: string, sex: string, birthday: string, hairColor: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id, nickName, firstName, secondName, sex, birthday, hairColor}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, nickName: string, firstName: string, secondName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id, nickName, firstName, secondName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  logData() {
    console.log('DataService contacts: ', this.dataService.contacts);
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.dataSource = new ExampleDataSource(this.dataService, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Contact> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Contact[] = [];
  renderedData: Contact[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Contact[]> {
    const displayDataChanges = [
      this._exampleDatabase.contacts,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllContacts();


    return merge(...displayDataChanges).pipe(map( () => {
        this.filteredData = this._exampleDatabase.data.slice().filter((contact: Contact) => {
          const searchStr = (contact.id + contact.nickName + contact.firstName + contact.secondName).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        const sortedData = this.sortData(this.filteredData.slice());

        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Contact[]): Contact[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'nickName': [propertyA, propertyB] = [a.nickName, b.nickName]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'secondName': [propertyA, propertyB] = [a.secondName, b.secondName]; break;
        case 'sex': [propertyA, propertyB] = [a.sex, b.sex]; break;
        case 'birthday': [propertyA, propertyB] = [a.birthday, b.birthday]; break;
        case 'hairColor': [propertyA, propertyB] = [a.hairColor, b.hairColor]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
