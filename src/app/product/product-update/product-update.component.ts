import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public id:any = this.routerLink.snapshot.paramMap.get('id');
  public get f(){ return this.form.controls};
  public submit:boolean = false;
  public base64: SafeUrl;


  form = this.fb.group({
    id:['',[]],
    name:['', [Validators.required]],
    value:['',[Validators.required]],
    imagem:[]
  });

  constructor(private routerLink: ActivatedRoute, private productService: ProductService,
    private fb: FormBuilder, private dom:DomSanitizer) { }

  ngOnInit(): void {
    this.productService.getById(this.id).subscribe(data =>{
      this.form.get('name').setValue(data.name);
      this.form.get('value').setValue(data.value);
      this.form.get('id').setValue(data.id);
    });
  }

   onSubmit(){
    this.submit = true;
    if(this.form.invalid){
      return;
    }
    const formData = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('value', this.form.get('value').value);
    formData.append('imagem', this.form.get('imagem').value);

    this.productService.update(this.id, formData).subscribe(data =>{
      if(data !== null){
        alert('alterado com sucesso');
        location.reload();
      }
    });
  }

  onSelectFile(event){
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.form.get('imagem').setValue(file);

      reader.readAsDataURL(file);

      reader.onload = () =>{
          //converte base64
          reader.onloadend = (e)=>{
            this.base64 = this.dom.bypassSecurityTrustUrl(reader.result.toString());
          }

      }
    }
  }

}
