"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useSellers,
  useCreateSeller,
  useDeleteSeller,
} from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

type SellerForm = { name: string; email: string; password: string };

export default function AdminPage() {
  const [open, setOpen] = useState(false);

  const { data: sellers = [], isLoading } = useSellers();
  const { mutate: createSeller, isPending } = useCreateSeller();
  const { mutate: deleteSeller } = useDeleteSeller();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerForm>();

  const onSubmit: SubmitHandler<SellerForm> = (data) => {
    createSeller(data, {
      onSuccess: () => {
        toast.success("Adding seller");
        reset();
        setOpen(false);
      },
      onError: (err: any) =>
        toast.error(err.response?.data?.message || "error"),
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("delete seller")) return;
    deleteSeller(id, {
      onSuccess: () => toast.success("deleting"),
      onError: () => toast.error("error"),
    });
  };

  return (
    <div className="container py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            reset();
            setOpen(true);
          }}
        >
           Add Seller
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Sellers ({sellers.length})</h2>
      {isLoading ? (
        <p className="text-sm text-muted-foreground"></p>
      ) : sellers.length === 0 ? (
        <p className="text-sm text-muted-foreground">No sellers yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sellers.map((seller: any) => (
            <div
              key={seller._id}
              className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm"
            >
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-muted-foreground">{seller.email}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                onClick={() => handleDelete(seller._id)}
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            setOpen(false);
            reset();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add new seller</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-2 "
          >
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input
                placeholder="Seller name"
                {...register("name", { required: "Required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Seller email"
                {...register("email", { required: "Required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white"
              >
                {isPending ? "Adding..." : "Add Seller"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
