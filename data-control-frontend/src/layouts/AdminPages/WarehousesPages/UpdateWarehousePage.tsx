import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetWarehouseQuery, useUpdateWarehouseMutation } from "../../../features/api/warehousesApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./WarehousesPage.css";

type WarehouseParams = {
  warehouseId: string;
};

export const UpdateWarehousePage = () => {
  const navigate = useNavigate();

  // Получение параметров из ссылки
  const { warehouseId } = useParams<WarehouseParams>();
  const warehouseIdNumber = parseInt(warehouseId ?? "", 10);

  // запрос склада с бэка
  const { data: warehouse, isSuccess: isWarehouseSuccess } = useGetWarehouseQuery(warehouseIdNumber);

  // запрос на обновление склада
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const handleSubmitProcess = async (data: { name: string; location: string }) => {
    try {
      await updateWarehouse({
        id: warehouseIdNumber,
        ...data,
      }).unwrap();
      navigate("/warehouses");
    } catch (error) {
      console.log("Ошибка при обновлении склада:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; location: string }>({
    defaultValues: {
      name: "",
      location: "",
    },
  });

  // Эффект для заполнения формы при загрузке данных
  useEffect(() => {
    if (isWarehouseSuccess && warehouse) {
      reset({
        name: warehouse.name,
        location: warehouse.location,
      });
    }
  }, [isWarehouseSuccess, warehouse, reset]);

  return (
    <>
      <main className="warehousespage_form_background">
        <Header />
        <div className="warehousespage_form_container">
          <div className="warehousespage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="warehousespage_form_h3 mb-8">
                Редактирование <span>склада</span>
              </h3>
              <div className={`w-full ${errors.name ? "mb-3" : "mb-8"}`}>
                <Label text="Название склада" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="name" name="name" isError={!!errors.name} placeholder="Введите название склада..." />}
                    name="name"
                  />
                  {errors.name && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.name && <p className="auth_error_text">{errors.name.message}</p>}
                </div>
              </div>
              <div className={`w-full ${errors.location ? "mb-3" : "mb-8"}`}>
                <Label text="Адрес" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="location" name="location" isError={!!errors.location} placeholder="Введите адрес склада..." />}
                    name="location"
                  />
                  {errors.location && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.location && <p className="auth_error_text">{errors.location.message}</p>}
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
