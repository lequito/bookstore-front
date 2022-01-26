import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
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
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
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

  findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void{
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro atualizado com sucesso')  
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao atualizar livro, tente mais tarde')
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