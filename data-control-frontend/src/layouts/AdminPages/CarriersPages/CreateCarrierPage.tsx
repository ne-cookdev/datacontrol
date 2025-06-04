import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useCreateCarrierMutation } from "../../../features/api/carriersApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./CarriersPage.css";

export const CreateCarrierPage = () => {
  const navigate = useNavigate();

  // запрос на создание доставщика
  const [createCarrier] = useCreateCarrierMutation();
  const handleSubmitProcess = async (data: { name: string }) => {
    try {
      const name = data.name;
      await createCarrier({ name }).unwrap();
      navigate("/carriers");
    } catch (error) {
      console.log("Ошибка при создании доставщика:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

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
                Добавление <span>доставщика</span>
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
