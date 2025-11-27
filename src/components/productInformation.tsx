import { useEffect, useState } from "react";
import { CirclePlus, Factory, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import ListOFCards from "./listOfcards";
import { useProductConfigLoader } from "@/hooks/useProductConfigLoader";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const initialProduct = {
    nameOfProduct: "",
    annualProductionCapacity: "",
    quantity: "",
    hsCode: "",
    sourceOfRawMaterials: "",
    units: "",
};

type Product = typeof initialProduct;

interface ProductInformationProps {
    products: Product[];
    setProducts: (value: Product[]) => void;
    isError: boolean
    isSubmittedApplication: boolean
}

const validateProductForm = (form: Product) => {
    const errors: Partial<Record<keyof Product, string>> = {};

    // Name of Product: required, max 50 chars, no digits
    if (!form.nameOfProduct.trim()) {
        errors.nameOfProduct = "Name of Product is required";
    } else if (/\d/.test(form.nameOfProduct)) {
        errors.nameOfProduct = "Name of Product cannot contain digits";
    } else if (form.nameOfProduct.length > 50) {
        errors.nameOfProduct = "Maximum 50 characters allowed";
    }

    // Annual Production Capacity: required, numeric, max 15 digits, > 0
    if (!form.annualProductionCapacity) {
        errors.annualProductionCapacity = "Annual Production Capacity is required";
    } else if (!/^\d+$/.test(form.annualProductionCapacity)) {
        errors.annualProductionCapacity = "Must be a valid number";
    } else if (form.annualProductionCapacity.length > 15) {
        errors.annualProductionCapacity = "Maximum 15 digits allowed";
    } else if (Number(form.annualProductionCapacity) === 0) {
        errors.annualProductionCapacity = "Value cannot be zero";
    }

    // Quantity: same as above
    if (!form.quantity) {
        errors.quantity = "Quantity is required";
    } else if (!/^\d+$/.test(form.quantity)) {
        errors.quantity = "Must be a valid number";
    } else if (form.quantity.length > 15) {
        errors.quantity = "Maximum 15 digits allowed";
    } else if (Number(form.quantity) === 0) {
        errors.quantity = "Value cannot be zero";
    }

    // Source of Raw Materials: required, max 100 chars, not only digits
    if (!form.sourceOfRawMaterials.trim()) {
        errors.sourceOfRawMaterials = "Source of Raw Materials is required";
    } else if (/^\d+$/.test(form.sourceOfRawMaterials)) {
        errors.sourceOfRawMaterials = "Cannot contain only numbers";
    } else if (form.sourceOfRawMaterials.length > 100) {
        errors.sourceOfRawMaterials = "Maximum 100 characters allowed";
    }

    // Unit: same validation as numeric fields
    if (!form.units) {
        errors.units = "Unit is required";
    } else if (!/^\d+$/.test(form.units)) {
        errors.units = "Must be a valid number";
    } else if (form.units.length > 15) {
        errors.units = "Maximum 15 digits allowed";
    }
    // else if (Number(form.units) === 0) {
    //     errors.units = "Value cannot be zero";
    // }

    // HS Code required
    if (!form.hsCode) {
        errors.hsCode = "HS Code is required";
    }

    return errors;
};


const productFields = [
    { label: "name_of_product", key: "nameOfProduct" },
    { label: "annual_production_capacity", key: "annualProductionCapacity", type: "number" },
    { label: "quantity", key: "quantity", type: "number" },
    { label: "source_of_raw_materials", key: "sourceOfRawMaterials" },
    { label: "unit", key: "units", type: "number" },
]

const ProductInformation = ({ products, setProducts, isError, isSubmittedApplication = false }: ProductInformationProps) => {
    const [productForm, setProductForm] = useState<Product>(initialProduct);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [hsCodes, setHsCodes] = useState<{ id: string; value: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});
    const { t } = useTranslation();


    const { loadProductionConfig } = useProductConfigLoader();

    useEffect(() => {
        const fetchHSCodes = async () => {
            try {
                setIsLoading(true);
                const codes = await loadProductionConfig();
                setHsCodes(codes);
            } catch (err) {
                console.error("Failed to load HS Codes:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHSCodes();
    }, []);

    const handleEditProduct = (data: Product, index: number) => {
        setProductForm(data);
        setEditingIndex(index);
        setIsProductModalOpen(true);
    };

    // ✅ Delete
    const handleDeleteProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };


    const handleSaveProduct = () => {
        const validationErrors = validateProductForm(productForm);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; // Stop submit if validation fails
        }

        const updatedProducts = [...products];

        if (editingIndex === null) {
            updatedProducts.push(productForm);
        } else {
            updatedProducts[editingIndex] = productForm;
        }

        setProducts(updatedProducts);
        setProductForm(initialProduct);
        setEditingIndex(null);
        setIsProductModalOpen(false);
    };

    const handleOpenModal = () => {
        setProductForm(initialProduct);
        setEditingIndex(null);
        setErrors({})
        setIsProductModalOpen(true);
    };

    const productConfig = {
        icon: Factory,
        id: "nameOfProduct",
        title: "nameOfProduct",
        fields: [
            { label: "annual_production_capacity", key: "annualProductionCapacity" },
            { label: "quantity", key: "quantity" },
            { label: "hs_code", key: "hsCode" },
            { label: "source_of_raw_materials", key: "sourceOfRawMaterials" },
            { label: "unit", key: "units" },
        ],
        // 👇 dynamic menu actions
        menuOptions: [
            {
                label: "update",
                onClick: (data: Product) => {
                    const index = products.findIndex(p => p.nameOfProduct === data.nameOfProduct);
                    handleEditProduct(data, index);
                },
            },
            {
                label: "delete",
                onClick: (data: Product) => {
                    const index = products.findIndex(p => p.nameOfProduct === data.nameOfProduct);
                    handleDeleteProduct(index);
                },
            },
        ],
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <h4 className="max-md:text-maroon-100 max-md:ml-4 mb-3">{t('product_information')}</h4>
                {(products?.length > 0 && !isSubmittedApplication) && <Button type="button" variant="ghost" className="border" onClick={handleOpenModal}>
                    <Plus />
                    {t('add_new_product')}
                </Button>}
            </div>
            {products?.length > 0 ? (
                <ListOFCards cardsConfig={productConfig} cardsData={products} isProducts />
            ) : (
                !isSubmittedApplication && <div className="">
                    <Card className={cn("flex flex-col items-center justify-center gap-6 p-6 mb-0", { "border-red-600": isError })}>
                        <h4 className="text-sm font-normal">No Product Information Found</h4>
                        <Button variant="ghost" type="button" className={cn("border", {"border-red-600": isError})} onClick={handleOpenModal}>
                            <CirclePlus />{t('add_new_product')}
                        </Button>
                    </Card>
                    {isError && <span className="text-sm text-red-600">{t('atleast_one_product_required')}</span>}
                </div>
            )}

            {/* Product Dialog */}
            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogContent className="md:min-w-[650px] md:max-w-md max-h-[80vh] overflow-y-auto p-0 gap-0">
                    <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-medium text-foreground">
                            {editingIndex === null ? "Add Product" : "Edit Product"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-6">
                        {productFields.map(({ label, key, type }) => (
                            <div key={key} className="flex flex-col gap-2">
                                <Label>{t(label)}</Label>
                                <Input
                                    type={type || "text"}
                                    value={productForm[key as keyof Product]}
                                    onChange={(e) => {
                                        const value =
                                            type === "number" ? Number(e.target.value) || 0 : e.target.value;
                                        setProductForm({
                                            ...productForm,
                                            [key]: value,
                                        });
                                        setErrors({
                                            ...errors,
                                            [key]: "",
                                        }); // clear error on change
                                    }}
                                    placeholder={t(label)}
                                    className={errors[key as keyof Product] ? "border-red-500" : ""}
                                />
                                {errors[key as keyof Product] && (
                                    <p className="text-red-500 text-xs">{errors[key as keyof Product]}</p>
                                )}
                            </div>
                        ))}
                        {/* HS Code Select */}
                        <div className="flex flex-col gap-2">
                            <Label>{t('hs_code')}</Label>
                            <Select
                                value={productForm.hsCode}
                                onValueChange={(v) => {
                                    setProductForm({ ...productForm, hsCode: v });
                                    setErrors({ ...errors, hsCode: "" });
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger
                                    className={cn("w-full", {"border-red-500" : errors.hsCode })}
                                >
                                    <SelectValue placeholder={isLoading ? "Loading..." : "Select HS Code"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {hsCodes.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {item.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.hsCode && <p className="text-red-500 text-xs">{errors.hsCode}</p>}
                        </div>

                    </div>

                    <div className="flex justify-between px-5 py-3 border-t border-border h-[56px]">
                        <Button variant="outline" type="button" onClick={() => setIsProductModalOpen(false)}>
                            {t('cancel')}
                        </Button>
                        <Button className="bg-maroon-100" type="button" onClick={handleSaveProduct}>
                            {editingIndex === null ? t("add") : t("update")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductInformation;
