import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: string[];
  public submit: boolean = false;
  public base64: SafeUrl;
  public validateFile: boolean;

  //form
  form = this.fb.group({
    name: ["", [Validators.required]],
    value: ["", [Validators.required]],
    imagem: []
  });
  get f() { return this.form.controls }
  constructor(private productService: ProductService, private fb: FormBuilder, private dom: DomSanitizer) { }


  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      console.log(this.products);
    })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.form.get('imagem').setValue(file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        //converte base64
        reader.onloadend = (e) => {
          this.base64 = this.dom.bypassSecurityTrustUrl(reader.result.toString());
        }
      }
    }
  }

  onSubmit() {
    this.submit = true;

    if (this.form.invalid) {
      return;
    }
    const formData = new FormData();

    formData.append('imagem', this.form.get('imagem').value);
    formData.append('name', this.form.get('name').value);
    formData.append('value', this.form.get('value').value);

    this.productService.add(formData).subscribe(data => {
      alert('salvo com sucesso');
      location.reload();
    });
  }
  onDelete(id: any) {
    this.productService.delete(id).subscribe(data => {
      console.log(data);
      alert('deletado com sucesso!');
      location.reload();
    });
  }

}
