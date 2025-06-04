import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetCategoryQuery, useUpdateCategoryMutation } from "../../../features/api/categoriesApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./CategoriesPage.css";

type CategoryParams = {
  categoryId: string;
};

export const UpdateCategoryPage = () => {
  const navigate = useNavigate();

  // Получение параметров из ссылки
  const { categoryId } = useParams<CategoryParams>();
  const categoryIdNumber = parseInt(categoryId ?? "", 10);

  // запрос категории с бэка
  const { data: category, isSuccess: isCategorySuccess } = useGetCategoryQuery(categoryIdNumber);

  // запрос на обновление категории
  const [updateCategory] = useUpdateCategoryMutation();
  const handleSubmitProcess = async (data: { name: string }) => {
    try {
      await updateCategory({
        id: categoryIdNumber,
        ...data,
      }).unwrap();
      navigate("/categories");
    } catch (error) {
      console.log("Ошибка при обновлении категории:", error);
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
    if (isCategorySuccess && category) {
      reset({
        name: category.name,
      });
    }
  }, [isCategorySuccess, category, reset]);

  return (
    <>
      <main className="categoriespage_form_background">
        <Header />
        <div className="categoriespage_form_container">
          <div className="categoriespage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="categoriespage_form_h3 mb-8">
                Редактирование <span>категории</span>
              </h3>
              <div className={`w-full ${errors.name ? "mb-3" : "mb-8"}`}>
                <Label text="Название категории" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="name" name="name" isError={!!errors.name} placeholder="Введите название категории..." />}
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
