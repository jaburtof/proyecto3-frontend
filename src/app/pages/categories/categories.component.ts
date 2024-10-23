import { Component, inject, ViewChild } from '@angular/core';
import { CategoriesListComponent } from '../../components/categories/categories-list/categories-list.component';
import { CategoriesService } from '../../services/categories.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { CategoriesFormComponent } from '../../components/categories/categories-form/categories-form.component';
import { ICategory, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoriesFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public categoriesService: CategoriesService = inject(CategoriesService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoriesModal') public addCategoriesModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor() {
    this.categoriesService.search.page = 1;
    this.categoriesService.getAll();
    //this.authService.isSuperAdmin() ?  this.categoriesService.getAll() : this.categoriesService.getAll();
  }

  saveCategory(category: ICategory) {
    //deja guardar si es super admin
    if(this.authService.isSuperAdmin()){
      this.categoriesService.save(category);
    }
    this.modalService.closeAll();
  }

  callEdition(category: ICategory) {
    this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
    this.categoryForm.controls['name'].setValue(category.name ? JSON.stringify(category.name) : '');
    this.categoryForm.controls['description'].setValue(category.description ? category.description : '');
    this.modalService.displayModal('md', this.addCategoriesModal);
  }
  
  updateCategory(category: ICategory) {
    if(this.authService.isSuperAdmin()){
      this.categoriesService.update(category);
    }
    this.modalService.closeAll();
  }

}
