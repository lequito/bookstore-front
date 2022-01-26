import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {


  id_cat: String = ''
  
  livro: Livro = {
    id: '',
    titulo: '',
    autor: '',
    conteudo: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)])
  autor = new FormControl('', [Validators.minLength(3)])
  conteudo = new FormControl('', [Validators.minLength(10)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void{
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao criar livro')
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessage(){
    if(this.titulo.invalid){
      return 'O campo Título deve ter entre 3 e 100 caracteres'
    }
    if(this.autor.invalid){
      return 'O campo Autor deve ter entre 3 e 100 caracteres'
    }
    if(this.conteudo.invalid){
      return 'O campo Conteúdo deve ter entre 10 e 2.000.000 de caracteres'
    }
    return false
  }
}

/**
 * 

no arquivo ts:

  getMessage(field: string) {
    let anyInvalid = this.title.invalid || this.text.invalid || this.name_author.invalid;
    
    if (this.title.invalid && field == "title") {
      return "The title field must have between 3 and 100 characters";
    }

    if (this.name_author.invalid && field == "name_author") {
      return "The authors'name must have between 3 and 100 characters";
    }

    if (this.text.invalid && field == "text") {
      return "The text field must have between 10 and 2.000.000 characters";
    }

    if (anyInvalid && field == "button") {
      return true;
    }
    return false
  }


no html:

<mat-error *ngIf="title.invalid">{{ getMessage("title") }}</mat-error>

<mat-error *ngIf="name_author.invalid">{{ getMessage("name_author") }}</mat-error>

<mat-error *ngIf="text.invalid">{{ getMessage("text") }}</mat-error>


a i dai o button :

[disabled]="getMessage("button") 
 */