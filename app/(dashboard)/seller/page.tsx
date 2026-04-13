"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { CheckCircle2, AlertCircle, Pencil, Trash2 } from "lucide-react";
import CustomImage from "@/components/images";

const CATEGORIES = ["Laptops", "Phones", "Ipads", "accessories"];

type ProductForm = {
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  description?: string;
  image?: string;
  stock: number;
};

export default function SellerPage() {
  const [editProduct, setEditProduct] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { data: products = [], isLoading } = useProducts();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const addForm = useForm<ProductForm>();
  const editForm = useForm<ProductForm>();

  const onAdd: SubmitHandler<ProductForm> = (data) => {
    createProduct(data, {
      onSuccess: () => {
        toast.success("adding Produccts");
        addForm.reset();
        setAddOpen(false);
      },
      onError: () => toast.error("error"),
    });
  };

  const onEdit: SubmitHandler<ProductForm> = (data) => {
    updateProduct(
      { id: editProduct._id, data },
      {
        onSuccess: () => {
          toast.success("update product");
          setEditProduct(null);
        },
        onError: () => toast.error("error"),
      },
    );
  };

  const handleEditOpen = (p: any) => {
    setEditProduct(p);
    editForm.reset({
      name: p.name,
      price: p.price,
      oldPrice: p.oldPrice,
      category: p.category,
      description: p.description,
      image: p.image,
      stock: p.stock,
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Conform delete")) return;
    deleteProduct(id, {
      onSuccess: () => toast.success("delete"),
      onError: () => toast.error("error"),
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Seller Panel</h1>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            addForm.reset();
            setAddOpen(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        Products ({products.length})
      </h2>
      {isLoading ? (
        <p className="text-sm text-muted-foreground"></p>
      ) : products.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p: any) => (
            <Card key={p._id} className="ring-0 shadow-none border-0 w-full">
              <CardContent className="flex flex-col p-4">
                <Badge
                  variant={p.stock > 0 ? "default" : "destructive"}
                  className={`w-fit mb-2 text-[11px] flex items-center  justify-center gap-1 ${p.stock > 0 ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}`}
                >
                  <span>
                    {p.stock > 0 ? (
                      <CheckCircle2 size={11} />
                    ) : (
                      <AlertCircle size={11} />
                    )}
                  </span>
                  {p.stock > 0 ? "in stock" : "out of stock"}
                  <span className="text-xs text-muted-foreground mt-1">
                    <span
                      className={`font-semibold ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {p.stock}
                    </span>
                  </span>
                </Badge>
                <div className="relative w-full h-30 mb-4 overflow-hidden">
                  <CustomImage product={p} fill />
                </div>
                <h3 className="font-normal text-sm line-clamp-2 h-10 mb-2">
                  {p.description}
                </h3>
                <div className="flex flex-col mt-2">
                  {p.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${p.oldPrice}
                    </span>
                  )}
                  <span className="text-lg font-semibold">${p.price}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1"
                    onClick={() => handleEditOpen(p)}
                  >
                    <Pencil size={13} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 gap-1"
                    onClick={() => handleDelete(p._id)}
                  >
                    <Trash2 size={13} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog
        open={addOpen}
        onOpenChange={(open) => {
          if (!open) {
            setAddOpen(false);
            addForm.reset();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={addForm.handleSubmit(onAdd)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
          >
            <ProductFormFields form={addForm} />
            <div className="md:col-span-2 flex gap-3">
              <Button
                type="submit"
                disabled={isCreating}
                className="bg-blue-500 text-white"
              >
                {isCreating ? "Adding..." : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!editProduct}
        onOpenChange={(open) => !open && setEditProduct(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={editForm.handleSubmit(onEdit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
          >
            <ProductFormFields form={editForm} />
            <div className="md:col-span-2 flex gap-3">
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-500 text-white"
              >
                {isUpdating ? "Saving..." : "Update"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditProduct(null)}
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
function ProductFormFields({
  form,
}: {
  form: ReturnType<typeof useForm<ProductForm>>;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label>Product name</Label>
        <Input
          placeholder="Name"
          {...register("name", { required: "Required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Price ($)</Label>
        <Input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "Required",
            valueAsNumber: true,
            min: 0,
          })}
        />
        {errors.price && (
          <span className="text-red-500 text-xs">{errors.price.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label>Old price ($)</Label>
        <Input
          type="number"
          placeholder="Optional"
          {...register("oldPrice", { valueAsNumber: true, min: 0 })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Category</Label>
        <select
          className="border rounded-md px-3 py-2 text-sm bg-white"
          {...register("category", { required: "Required" })}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-xs">
            {errors.category.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label>Stock</Label>
        <Input
          type="number"
          placeholder="Stock"
          {...register("stock", {
            required: "Required",
            valueAsNumber: true,
            min: 0,
          })}
        />
        {errors.stock && (
          <span className="text-red-500 text-xs">{errors.stock.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label>Image URL</Label>
        <Input placeholder="https://..." {...register("image")} />
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <Label>Description</Label>
        <Input placeholder="Product description" {...register("description")} />
      </div>
    </>
  );
}
