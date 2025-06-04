import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetProductsQuery } from "../../../features/api/productsApi";
import { useCreateOrderMutation } from "../../../features/api/ordersApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import { CreateOrderArgs } from "../../../entities/tables/model/types";

import "./OrdersPage.css";

export const CreateOrderPage = () => {
  const navigate = useNavigate();

  // запрос списка товаров с бэка
  const { data: products, isSuccess: isProductsSuccess } = useGetProductsQuery();

  // запрос на создание заказа
  const [createOrder] = useCreateOrderMutation();
  const handleSubmitProcess = async (data: CreateOrderArgs) => {
    try {
      const address = data.address;
      const order_details = data.order_details;
      await createOrder({ address, order_details }).unwrap();
      navigate("/orders");
    } catch (error) {
      console.log("Ошибка при создании заказа:", error);
    }
  };

  // список выбранных продуктов и их кол-во
  const [selectedProducts, setSelectedProducts] = useState<{ product_id: number; quantity: number }[]>([]);

  // Обработчик добавления товара
  const handleAddProduct = (productId: number) => {
    if (!productId) return;

    const productExists = selectedProducts.some((item) => item.product_id === productId);
    if (!productExists) {
      setSelectedProducts([...selectedProducts, { product_id: productId, quantity: 1 }]);
    }
  };

  // Обработчик изменения количества
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setSelectedProducts(selectedProducts.map((item) => (item.product_id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  // Обработчик удаления товара
  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((item) => item.product_id !== productId));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderArgs>();

  if (isProductsSuccess) {
    return (
      <>
        <main className="orderspage_form_background">
          <Header />
          <div className="orderspage_form_container">
            <div className="orderspage_form_bg">
              <form
                onSubmit={handleSubmit((data) => {
                  handleSubmitProcess(data);
                })}
              >
                <h3 className="orderspage_form_h3 mb-8">
                  Добавление <span>заказа</span>
                </h3>
                <div className={`w-full ${errors.address ? "mb-3" : "mb-8"}`}>
                  <Label text="Адрес доставки заказа" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="address" name="address" isError={!!errors.address} placeholder="Введите адрес..." />}
                      name="address"
                    />
                    {errors.address && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.address && <p className="auth_error_text">{errors.address.message}</p>}
                  </div>
                </div>
                <div className="w-full mb-8">
                  <Label text="Выберите товары" />
                  <div className="auth_div_for_input">
                    <select onChange={(e) => handleAddProduct(Number(e.target.value))} value="" className="orderspage_form_select">
                      <option value="">Выберите товар...</option>
                      {isProductsSuccess &&
                        products.map((product) => (
                          <option key={product.id} value={product.id} disabled={selectedProducts.some((selectedProduct) => selectedProduct.product_id === product.id)}>
                            {product.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    {selectedProducts.map((selectedProduct) => {
                      const product = products.find((p) => p.id === selectedProduct.product_id);
                      return (
                        <div key={selectedProduct.product_id} className="orderspage_form_selectproduct">
                          <div className="flex-1">
                            <span className="text-base">{product?.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <input type="number" min="1" value={selectedProduct.quantity} onChange={(e) => handleQuantityChange(selectedProduct.product_id, Math.max(1, Number(e.target.value)))} className="orderspage_form_selectproduct_input" />
                            <Button className="w-20" type="button" onClick={() => handleRemoveProduct(selectedProduct.product_id)} text="Удалить" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Controller
                    control={control}
                    name="order_details"
                    rules={{ required: "Добавьте хотя бы один товар" }}
                    render={({ field: { onChange, value, ...field } }) => {
                      useEffect(() => {
                        onChange(selectedProducts);
                      }, [selectedProducts, onChange]);

                      return <input type="hidden" value={JSON.stringify(selectedProducts)} {...field} />;
                    }}
                  />
                  {errors.order_details && <p className="auth_error_text">{errors.order_details.message}</p>}
                </div>
                <Button type="submit" text="Готово" />
              </form>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return null;
  }
};
