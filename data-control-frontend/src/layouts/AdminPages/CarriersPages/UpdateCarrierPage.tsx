import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetCarrierQuery, useUpdateCarrierMutation } from "../../../features/api/carriersApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./CarriersPage.css";

type CarrierParams = {
  carrierId: string;
};

export const UpdateCarrierPage = () => {
  const navigate = useNavigate();

  // Получение параметров из ссылки
  const { carrierId } = useParams<CarrierParams>();
  const carrierIdNumber = parseInt(carrierId ?? "", 10);

  // запрос доставщика с бэка
  const { data: carrier, isSuccess: isCarrierSuccess } = useGetCarrierQuery(carrierIdNumber);

  // запрос на обновление доставщика
  const [updateCarrier] = useUpdateCarrierMutation();
  const handleSubmitProcess = async (data: { name: string }) => {
    try {
      await updateCarrier({
        id: carrierIdNumber,
        ...data,
      }).unwrap();
      navigate("/carriers");
    } catch (error) {
      console.log("Ошибка при обновлении доставщика:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  // Эффект для заполнения формы при загрузке данных
  useEffect(() => {
    if (isCarrierSuccess && carrier) {
      reset({
        name: carrier.name,
      });
    }
  }, [isCarrierSuccess, carrier, reset]);

  return (
    <>
      <main className="carrierspage_form_background">
        <Header />
        <div className="carrierspage_form_container">
          <div className="carrierspage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="carrierspage_form_h3 mb-8">
                Редактирование <span>доставщика</span>
              </h3>
              <div className={`w-full ${errors.name ? "mb-3" : "mb-8"}`}>
                <Label text="Название доставщика" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="name" name="name" isError={!!errors.name} placeholder="Введите название доставщика..." />}
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
              <Button type="submit" text="Готово" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
