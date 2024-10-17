import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ProductoInterface, ProductoInterfaceId } from '../interfaces/producto';
import { from, map, Observable } from 'rxjs';
import {
  ContainerInterface,
  ContainerInterfaceId,
} from '../interfaces/container';

@Injectable({
  providedIn: 'root',
})
export class EntidadesService {
  firestore = inject(Firestore);

  //////////////////////    PRODUCTOS     ////////////////////////
  async traerProductos() {
    const productosCol = collection(this.firestore, 'productos');
    const productosSnapshot = await getDocs(productosCol);
    const productosList = productosSnapshot.docs.map((doc) => {
      return doc.data() as ProductoInterface; //...doc.data() } as Producto;
    });

    return productosList;
  }

  async crearProducto(producto: ProductoInterface) {
    try {
      const productoCol = collection(this.firestore, 'productos');

      console.log(JSON.stringify(producto));

      const prod = {
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        paisOrigen: producto.paisOrigen,
        // comestible: producto.comestible,
      };

      await addDoc(productoCol, prod);
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
    }
  }

  //////////////////////    CONTAINERS    ////////////////////////

  async crearContainer(container: ContainerInterface) {
    try {
      const containersCol = collection(this.firestore, 'containers');
      console.log(JSON.stringify(container));

      const cont = {
        codigo: container.codigo,
        color: container.color,
        empresa: container.empresa,
        capacidad: container.capacidad,
      };
      await addDoc(containersCol, cont);
    } catch (error) {
      console.error('Error al agregar el container: ', error);
    }
  }

  async modificarContainer(containerId: any, updatedContainer: any) {
    try {
      const containersCol = collection(this.firestore, 'containers');
      const containerDoc = doc(containersCol, containerId);

      console.log(JSON.stringify(updatedContainer));

      const updatedCont = {
        codigo: updatedContainer.codigo,
        color: updatedContainer.color,
        empresa: updatedContainer.empresa,
        capacidad: updatedContainer.capacidad,
      };

      await updateDoc(containerDoc, updatedCont);
    } catch (error) {
      console.error('Error al actualizar el container: ', error);
    }
  }

  async getContainers(): Promise<ContainerInterfaceId[]> {
    const containersCol = collection(this.firestore, 'containers');
    const snapshot = await getDocs(containersCol);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ContainerInterface;
      const id = doc.id; // Agrego el ID del objeto para poder modificar o eliminar

      return { id, ...data };
    });
  }

  async eliminarContainer(containerId: string): Promise<void> {
    try {
      const containerDocRef = doc(this.firestore, 'containers', containerId);
      await deleteDoc(containerDocRef);
      console.log(`Container con ID ${containerId} eliminado correctamente`);
    } catch (error) {
      console.error(
        `Error al eliminar el container con ID ${containerId}: `,
        error
      );
    }
  }
}
