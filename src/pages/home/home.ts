import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewPersonPage } from "../new-person/new-person";
import PouchDB from 'pouchdb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  persons:any;
  db:any;

  constructor(public navCtrl: NavController) { }

  ionViewDidEnter(){
    this.refresh();
  }

  refresh(){
    this.db = PouchDB('contacts');
    this.persons = [];
    this.db.allDocs({ include_docs: true }, (err,result) => {
      if(!err){
        let rows = result.rows;
        console.log(rows);
        for ( let x in rows ){
          this.persons.push(rows[x].doc)
        }
      }});


  }

  crear(){
    this.navCtrl.push( NewPersonPage );
  }

  edit(person:any){
    console.log(person._id);
    this.navCtrl.push(NewPersonPage,{
      idPerson: person._id
    });
  }

  //Eliminar Registro en BD
  delete(person:any){
    if(confirm('Are you sure?')){
      this.db.remove(person, (err, result) => {
        if(!err){
          this.refresh();
        }
      });
    }

  }
}
