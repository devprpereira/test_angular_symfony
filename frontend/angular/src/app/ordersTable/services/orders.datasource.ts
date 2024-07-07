import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { OrderInterface } from "../orders.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { OrdersService } from "./orders.service";

@Injectable()
export class OrdersDataSource extends DataSource<OrderInterface> {
    orders$ = new BehaviorSubject<OrderInterface[]>([]);

    constructor(private ordersService: OrdersService){
        super();
    }

    connect(): Observable<OrderInterface[]> {
        return this.orders$.asObservable();
    }

    disconnect(): void {
        this.orders$.complete();
    }

    loadOrders():void {

    }
}