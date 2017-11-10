import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import PouchDB from 'pouchdb';

@IonicPage()
@Component({
  selector: 'page-new-person',
  templateUrl: 'new-person.html',
})
export class NewPersonPage {

  name:string;
  email:string;
  phone:number;

  db:any;
  person:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  setupDB(){
    this.db =  new PouchDB('contacts');
  }

  ionViewDidLoad() {

    this.setupDB();
    if(this.navParams.get('idPerson') != null){
      this.db.get(this.navParams.get('idPerson') , (err,result) => {
        if(!err){

          this.person = result;

          this.name  = result.name;
          this.email = result.email;
          this.phone = result.phone
        }
      });
    }


  }

  guardar(){
    if(this.person){
      this.person.name  = this.name;
      this.person.email = this.email;
      this.person.phone = this.phone;


      //Actualizar en BD
      this.db.put( this.person , (err, result) =>  {
        if(!err){
          alert('person update successfully');
          this.navCtrl.pop();
        }
      });
    }else{

      //Crear en BD
      this.db.post({
        name: this.name,
        email: this.email,
        phone: this.phone
      }, (err, result) => {
        if(!err){
          this.navCtrl.pop();
        }
      });

    }
  }

  cancelar(){
    this.navCtrl.pop();
  }

}
