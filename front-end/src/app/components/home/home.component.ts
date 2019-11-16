import { Component, OnInit } from '@angular/core';
import { FotografiasService } from './../../services/fotografias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public fotografias: any[];

  constructor(private _serviceFotografias: FotografiasService) { }

    ngOnInit() {
		this.getFotografias();
    }

	getFotografias(){
		this._serviceFotografias.getFotografias()
		.then(response => {
			this.fotografias = response.fotografias;
			console.log(this.fotografias);
		})
		.catch(err => {
			console.log(err);
		})
	}
}
