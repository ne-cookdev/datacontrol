import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetProductsQuery } from "../../../features/api/productsApi";
import { useGetWarehousesQuery } from "../../../features/api/warehousesApi";
import { useGetStockQuery, useUpdateStockMutation } from "../../../features/api/stocksApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./StocksPage.css";

type StockParams = {
  stockId: string;
};

export const UpdateStockPage = () => {
  const navigate = useNavigate();

  // Получение параметров из ссылки
  const { stockId } = useParams<StockParams>();
  const stockIdNumber = parseInt(stockId ?? "", 10);

  // запрос списка товаров с бэка
  const { data: products, isSuccess: isProductsSuccess } = useGetProductsQuery();
  // запрос списка складов с бэка
  const { data: warehouses, isSuccess: isWarehousesSuccess } = useGetWarehousesQuery();

  // запрос распределения товара с бэка
  const { data: stock, isSuccess: isStockSuccess } = useGetStockQuery(stockIdNumber);

  // запрос на обновление распределения товара
  const [updateStock] = useUpdateStockMutation();
  const handleSubmitProcess = async (data: { warehouse_id: number; product_id: number; quantity: number }) => {
    try {
      await updateStock({
        id: stockIdNumber,
        ...data,
      }).unwrap();
      navigate("/stocks");
    } catch (error) {
      console.log("Ошибка при обновлении распределения товара:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ warehouse_id: number; product_id: number; quantity: number }>({
    defaultValues: {
      warehouse_id: 0,
      product_id: 0,
      quantity: 0,
    },
  });

  // Эффект для заполнения формы при загрузке данных
  useEffect(() => {
    if (isStockSuccess && stock) {
      reset({
        warehouse_id: stock.warehouse.id,
        product_id: stock.product.id,
        quantity: stock.quantity,
      });
    }
  }, [isStockSuccess, stock, reset]);

  return (
    <>
      <main className="stockspage_form_background">
        <Header />
        <div className="stockspage_form_container">
          <div className="stockspage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="stockspage_form_h3 mb-8">
                Редактирование <span>распределения товара</span>
              </h3>
              <div className={`w-full ${errors.product_id ? "mb-3" : "mb-8"}`}>
                <Label text="Товар" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <select onChange={onChange} value={value || ""} className="stockspage_form_select" id="product_id" name="product_id">
                        <option value="" disabled>
                          Выберите товар...
                        </option>
                        {isProductsSuccess &&
                          products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </select>
                    )}
                    name="product_id"
                  />
                  {errors.product_id && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.product_id && <p className="auth_error_text">{errors.product_id.message}</p>}
                </div>
              </div>
              <div className={`w-full ${errors.warehouse_id ? "mb-3" : "mb-8"}`}>
                <Label text="Склад" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <select onChange={onChange} value={value || ""} className="stockspage_form_select" id="warehouse_id" name="warehouse_id">
                        <option value="" disabled>
                          Выберите склад...
                        </option>
                        {isWarehousesSuccess &&
                          warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                      </select>
                    )}
                    name="warehouse_id"
                  />
                  {errors.warehouse_id && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.warehouse_id && <p className="auth_error_text">{errors.warehouse_id.message}</p>}
                </div>
              </div>
              <div className={`w-full ${errors.quantity ? "mb-3" : "mb-8"}`}>
                <Label text="Количество товара" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="quantity" name="quantity" isError={!!errors.quantity} placeholder="Введите кол-во товара..." />}
                    name="quantity"
                  />
                  {errors.quantity && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.quantity && <p className="auth_error_text">{errors.quantity.message}</p>}
                </div>
              </div>
              <Button type="submit" text="Готово" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
