import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFirestore } from 'angularfire2/firestore';
import { NotesService } from './services/notes.services';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pwa';
  panelOpenState = false;
  categorias = ['trabajo', 'personal'];
  nota: any = {};
  notas: any = [];
  
  constructor(private swUpdate: SwUpdate, private frb: AngularFirestore, private noteService: NotesService, public snackBar: MatSnackBar, private authService: AuthService){
   
  }

  ngOnInit(): void{
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }

    this.listarNotas();
    
  }

  guardarNota(){
    if (this.nota.id) {
     this.updateNota(this.nota);
    }else{
      console.log(this.nota);      
      this.nota.id = Date.now();
      this.noteService.createNote(this.nota).then(()=> {
        this.nota = {},
        this.snackBar.open("NOTA CREADA", null, {
          duration: 2000,
        });
      });
    }
  }

  updateNota(nota){
    this.noteService.updateNote(nota).then(() => {
      this.nota = {},
      this.snackBar.open("NOTA ACTUALIZADA", null, {
        duration: 2000,
      });
    });
  }

  listarNotas(){
    this.noteService.getNotes()
    .valueChanges().subscribe((notas) => {
      this.notas = notas;
      console.log(this.notas);
    });

  }

  getNota(nota){
    console.log(nota);
    this.nota = nota;
  }

  removeNota(nota){
    this.noteService.removeNote(nota).then(() => {
      this.nota = {},
      this.snackBar.open("NOTA ELIMINADA", null, {
        duration: 2000,
      });
    });
  }


  login(){
    this.authService.loginWithFacebook();
  }



}
