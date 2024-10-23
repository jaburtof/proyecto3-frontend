import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IProduct} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  constructor(
    private productsService: ProductsService,
    public authService: AuthService
  ) {}
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}
