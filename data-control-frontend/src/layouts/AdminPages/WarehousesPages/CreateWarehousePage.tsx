import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useCreateWarehouseMutation } from "../../../features/api/warehousesApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import type { CreateWarehouseArgs } from "../../../entities/tables/model/types";

import "./WarehousesPage.css";

export const CreateWarehousePage = () => {
  const navigate = useNavigate();

  // запрос на создание склада
  const [createWarehouse] = useCreateWarehouseMutation();
  const handleSubmitProcess = async (data: CreateWarehouseArgs) => {
    try {
      const name = data.name;
      const location = data.location;
      await createWarehouse({ name, location }).unwrap();
      navigate("/warehouses");
    } catch (error) {
      console.log("Ошибка при создании склада:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWarehouseArgs>();

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
                Добавление <span>склада</span>
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
