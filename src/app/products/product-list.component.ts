import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
  selector:'pm-products',
  templateUrl:'./product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product list';
  productWidth = 50;
  productMargin: number = 1; 
  showImage: boolean = false;

// Filltering the list

  _listFilter: string;

  get listFilter(){
    return this._listFilter;
  }
  set listFilter(value:string){
     this._listFilter = value;
     this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products; 
  }
  
  filteredProducts: IProduct[];
  
  products: IProduct[] = [];

  constructor(private productService : ProductService){
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 )
  }
  
  toggleImage() :void{
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List: ' +  message;
  }

  ngOnInit(): void{ 
    this.productService.getProducts().subscribe({
      next: products =>{
        this.products = products;
        this.filteredProducts = this.products;
      },
      error(err){ console.log(err) }
    })  
    
  }
}
