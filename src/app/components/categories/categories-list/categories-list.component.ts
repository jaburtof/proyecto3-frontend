import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ICategory} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  constructor(
    private categoriesService: CategoriesService,
    public authService: AuthService
  ) {}
  @Input() title: string  = '';
  @Input() categories: ICategory[] = [];
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}
