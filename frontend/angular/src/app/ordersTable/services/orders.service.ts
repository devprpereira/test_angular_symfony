import { Injectable } from "@angular/core";
import { OrderInterface } from "../orders.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class OrdersService {
    constructor(private http: HttpClient) {}

    fetchOrders(): Observable<OrderInterface[]>{
        return this.http.get<OrderInterface[]>('http://host.docker.internal/orders');
    }

    cancelItem(id: any): Observable<OrderInterface>{
        return this.http.put<OrderInterface>(`http://host.docker.internal/orders/cancel/${id}`, id);
    }

    //TODO: pegar a URL pelo .env
}