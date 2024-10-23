import { Component, inject, ViewChild } from '@angular/core';
import { ProductsListComponent } from '../../components/products/products-list/products-list.component';
import { ProductsService } from '../../services/products.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { ProductsFormComponent } from '../../components/products/products-form/products-form.component';
import { IProduct, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductsListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductsFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public productsService: ProductsService = inject(ProductsService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  productForm = this.fb.group({
    id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
  })

  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
  }

  saveProduct(product: IProduct) {

    if(this.authService.isSuperAdmin()){
      this.productsService.save(product);
    }
    this.modalService.closeAll();
  }

  callEdition(product: IProduct) {
    this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productForm.controls['name'].setValue(product.name ? JSON.stringify(product.name) : '');
    this.productForm.controls['description'].setValue(product.description ? product.description : '');
    this.productForm.controls['price'].setValue(product.price !== undefined ? product.price.toString() : ''); 
    this.productForm.controls['stockQuantity'].setValue(product.stockQuantity !== undefined ? product.stockQuantity.toString() : ''); 
    this.productForm.controls['category'].setValue(product.category ? String(product.category.id) : null);
    this.modalService.displayModal('md', this.addProductsModal);
  }
  
  updateProduct(product: IProduct) {
    if(this.authService.isSuperAdmin()){
      this.productsService.update(product);
    }
    this.modalService.closeAll();
  }

}
