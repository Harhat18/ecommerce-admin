"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Sipariş",
  },
  {
    accessorKey: "phone",
    header: "Telefon numarası",
  },
  {
    accessorKey: "address",
    header: "Adres",
  },
  {
    accessorKey: "totalPrice",
    header: "Toplam Ödeme",
  },
  {
    accessorKey: "isPaid",
    header: "Ödeme",
  },
];
