import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../models/produto';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cad-prod',
  templateUrl: './cad-prod.page.html',
  styleUrls: ['./cad-prod.page.scss'],
})
export class CadProdPage implements OnInit {

  formCadastro: FormGroup;
  produto: Produto = new Produto();

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {

    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      quant: ['', Validators.compose([Validators.required])],
      tipo: ['',Validators.compose([Validators.required])],
      validade: ['',Validators.compose([Validators.required])],
      codBarra: ['',Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(12)])],
      preco: ['', Validators.compose([Validators.required])]
    });

   }

  ngOnInit() {
  }

  async salvarCadastro() {
    if(this.formCadastro.valid){
      this.produto.nome = this.formCadastro.value.nome;
      this.produto.quant = this.formCadastro.value.quant;
      this.produto.tipo = this.formCadastro.value.tipo;
      this.produto.validade = this.formCadastro.value.validade;
      this.produto.codBarra = this.formCadastro.value.codBarra;
      this.produto.preco = this.formCadastro.value.preco;

      await this.storageService.set(this.produto.codBarra, this.produto);
      this.route.navigateByUrl('/home');

      alert('FORMULÁRIO VALIDADO!!!');
    }
    else{
      alert('FORMULÁRIO INVALIDO!!!');
    }
  }

}
