import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/Producto.interface';
import { ProductoServviceService } from '../../services/producto-servvice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionproductos',
  templateUrl: './gestionproductos.component.html',
  styleUrl: './gestionproductos.component.css'
})
export class GestionproductosComponent implements OnInit {


  form!: FormGroup;

  productos: Producto[] = [];

  title = 'pruebaicfes';

  productoEditar: any;



  constructor(private productoServviceService: ProductoServviceService,
    private fb: FormBuilder,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    console.log('ingreso')
    this.getProductos();

    this.form = this.fb.group({
      idProducto: ['', Validators.required],
      nombreProducto: ['', Validators.required],
      precio: ['', Validators.required],
      tipoMaterial: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      cantidadDisponible: ['', Validators.required],
      peso: [''],
      medidas: ['', Validators.required],
      color: ['', Validators.required],
    })
  }

  getProductos() {
    this.productoServviceService.listarProductos().subscribe(
      (data) => {
        console.log(data)
        this.productos = data['body']['producto']
        console.log(this.productos)

      },
      (error) => {
        console.error(error);
      }
    );
  }

  EditarProducto(producto: any, content: any) {
    this.modalService.open(content);
    this.form.get('idProducto')!.setValue(producto.idProducto);
    this.form.get('nombreProducto')!.setValue(producto.nombreProducto);
    this.form.get('precio')!.setValue(producto.precio);
    this.form.get('tipoMaterial')!.setValue(producto.tipoMaterial);
    this.form.get('tipoProducto')!.setValue(producto.tipoProducto);
    this.form.get('cantidadDisponible')!.setValue(producto.cantidadDisponible);
    this.form.get('peso')!.setValue(producto.peso);
    this.form.get('medidas')!.setValue(producto.medidas);
    this.form.get('color')!.setValue(producto.color);
  }

  GuardarProducto() {
    const data = this.form.value;
    console.log(data)
    this.productoEditar = {
      nombreProducto: data.nombreProducto,
      precio: data.precio,
      tipoMaterial: data.tipoMaterial,
      tipoProducto: data.tipoProducto,
      cantidadDisponible: data.cantidadDisponible,
      peso: data.peso,
      medidas: data.medidas,
      color: data.color,
    };
    this.productoServviceService.guardarProducto(this.productoEditar).subscribe(
      (data) => {
        Swal.fire("Producto guardado!", "", "success");
        this.getProductos()
      },
      (error) => {
        console.error(error);
      }
    );
  }

  EliminarProducto(content: any) {
    Swal.fire({
      title: "Esta seguro de eliminar el producto " + content.nombreProducto + "?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productoServviceService.borrarProducto(content.idProducto).subscribe(
          (data) => {
            this.getProductos()
            Swal.fire("Borrado!", "", "success");
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }



  CrearProducto(content: any) {
    this.modalService.open(content);
  }


  guardarCambios() {
    const data = this.form.value;
    console.log(data)
    let objEditar = {
      idProducto: data.idProducto,
      nombreProducto: data.nombreProducto,
      precio: data.precio,
      tipoMaterial: data.tipoMaterial,
      tipoProducto: data.tipoProducto,
      cantidadDisponible: data.cantidadDisponible,
      peso: data.peso,
      medidas: data.medidas,
      color: data.color,
    };

    //Llamar servicio de editar
    this.productoServviceService.guardarProducto(objEditar).subscribe(
      (data) => {

        Swal.fire("Producto guardado!", "", "success");
        this.getProductos()
        
        this.form.reset();

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
function swal(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

