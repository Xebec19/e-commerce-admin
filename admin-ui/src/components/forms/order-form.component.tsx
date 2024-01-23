import { ZodOrder } from "@/schema/order.schema";
import { IOrder } from "@/types/order.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props extends IOrder {
  onSubmit: (value: z.infer<typeof ZodOrder>) => Promise<boolean>;
}

export default function OrderForm({
  orderId,
  userName,
  email,
  price,
  deliveryPrice,
  total,
  status,
  createdOn,
  discountAmount,
  discountCode,
  onSubmit,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ZodOrder>>({
    defaultValues: {
      orderId,
      userName,
      email,
      price,
      deliveryPrice,
      total,
      status,
      createdOn,
      discountAmount,
      discountCode,
    },
    resolver: zodResolver(ZodOrder),
  });

  const submit = async (data: z.infer<typeof ZodOrder>) => {
    const ok = await onSubmit(data);
    if (ok) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="p-4 grid grid-cols-1 gap-4 w-full md:w-1/2"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="orderId">Order ID</Label>
        <Controller
          control={control}
          name="orderId"
          render={({ field }) => <Input id="orderId" {...field} />}
        />
        {errors.orderId && (
          <span className="text-red-500">{errors.orderId.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="userName">User Name</Label>
        <Controller
          control={control}
          name="userName"
          render={({ field }) => <Input id="userName" {...field} />}
        />
        {errors.userName && (
          <span className="text-red-500">{errors.userName.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => <Input id="email" {...field} />}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="price">Price</Label>
        <Controller
          control={control}
          name="price"
          render={({ field }) => <Input id="price" {...field} />}
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="deliveryPrice">Delivery Price</Label>
        <Controller
          control={control}
          name="deliveryPrice"
          render={({ field }) => <Input id="deliveryPrice" {...field} />}
        />
        {errors.deliveryPrice && (
          <span className="text-red-500">{errors.deliveryPrice.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="total">Total</Label>
        <Controller
          control={control}
          name="total"
          render={({ field }) => <Input id="total" {...field} />}
        />
        {errors.total && (
          <span className="text-red-500">{errors.total.message}</span>
        )}
      </div>

      {/**
       * todo complete fields
       */}
    </form>
  );
}
