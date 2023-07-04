"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      // toast.success("Mağaza oluştu");
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("bir şey yanlış oldu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="oluşan store"
      description="oluşan store açıklama"
      isOpen={storeModal.isOpen}
      onClose={() => {
        storeModal.onClose;
      }}
    >
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adı</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder=" E-Ticaret "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  Geri Git
                </Button>
                <Button disabled={loading} type="submit">
                  Devam Et
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
