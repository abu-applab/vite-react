import { CirclePlus, Factory } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import ListOFCards from "./listOfcards"


const initialProduct = {
    nameOfProduct: "",
    annualProductionCapacity: "",
    quantity: "",
    isicCode: "",
    sourceOfRawMaterials: "",
    unit: ""
};

type Product = {
    nameOfProduct: string;
    annualProductionCapacity: string;
    quantity: string;
    isicCode: string;
    sourceOfRawMaterials: string;
    unit: string;
};

interface ProductInformationProps {
    products: Product[],
    setProducts: any
}

const productConfig = {
    icon: Factory,
    id: "accountID",
    title: "nameOfProduct",
    fields: [
        {
            label: "Annual Production Capacity",
            key: "annualProductionCapacity",
        },
        {
            label: "Quantity",
            key: "quantity",
        },
        {
            label: "ISIC Code",
            key: "isicCode",
        },
        {
            label: "Source of Raw Materials",
            key: "sourceOfRawMaterials",
        },
        {
            label: "Unit",
            key: "unit",
        },
    ]
}

const ProductInformation = ({ products, setProducts }: ProductInformationProps) => {
    const [productForm, setProductForm] = useState(initialProduct);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    console.log('setEditingIndex: ', setEditingIndex);

    return (
        <>
            <h4 className=" max-md:text-maroon-100 max-md:ml-4 mb-3">Product Information</h4>
            {
                products?.length > 0 ?
                    <>
                        <ListOFCards cardsConfig={productConfig} cardsData={products} isProducts/>
                    </>
                    :
                    <Card className="flex flex-col items-center justify-center gap-6 p-6">
                        <h4 className="text-sm leading-5 font-normal">No Product Information Found</h4>
                        <Button variant="ghost" type="button" className="border" onClick={() => setIsProductModalOpen(true)}>
                            <CirclePlus className="" />
                            Add New Product
                        </Button>
                    </Card>
            }
            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogContent className="min-w-[650px] overflow-y-auto p-0 gap-0" >
                    <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-medium text-foreground">Product Information</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 p-6">
                        <div className="flex flex-col gap-2">
                            <Label>Name of Product</Label>
                            <Input
                                value={productForm.nameOfProduct}
                                onChange={e => setProductForm({ ...productForm, nameOfProduct: e.target.value })}
                                placeholder="Name of Product"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Annual Production capacity</Label>
                            <Input
                                value={productForm.annualProductionCapacity}
                                onChange={e => setProductForm({ ...productForm, annualProductionCapacity: e.target.value })}
                                placeholder="Annual Production Capacity"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                value={productForm.quantity}
                                onChange={e => setProductForm({ ...productForm, quantity: e.target.value })}
                                placeholder="Quantity"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>ISIC Code</Label>
                            <Select
                                value={productForm.isicCode}
                                onValueChange={v => setProductForm({ ...productForm, isicCode: v })}
                            >
                                <SelectTrigger className="w-full"><SelectValue placeholder="ISIC Code" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="290512 - Alcohols (Industrial use)">290512 - Alcohols (Industrial use)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Source of Raw Material</Label>
                            <Input
                                value={productForm.sourceOfRawMaterials}
                                onChange={e => setProductForm({ ...productForm, sourceOfRawMaterials: e.target.value })}
                                placeholder="Source of Raw Materials"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Unit</Label>
                            <Input
                                value={productForm.unit}
                                onChange={e => setProductForm({ ...productForm, unit: e.target.value })}
                                placeholder="Unit"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-3 px-5 py-3 border-t border-border h-[56px]">
                        <Button variant="outline" type="button" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
                        <Button
                            className="bg-maroon-100"
                            type="button"
                            onClick={() => {
                                if (editingIndex === null) {
                                    setProducts([...products, productForm]);
                                } else {
                                    const updated = [...products];
                                    updated[editingIndex] = productForm;
                                    setProducts(updated);
                                }
                                setIsProductModalOpen(false);
                            }}
                        >
                            {editingIndex === null ? "Add" : "Update"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default ProductInformation