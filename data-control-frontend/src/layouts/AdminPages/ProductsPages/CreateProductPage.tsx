import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetCategoriesQuery } from "../../../features/api/categoriesApi";
import { useCreateProductMutation } from "../../../features/api/productsApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input } from "../../../components/Input/Input";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import { CreateProductArgs } from "../../../entities/tables/model/types";

import "./ProductsPage.css";

export const CreateProductPage = () => {
  const navigate = useNavigate();

  // запрос списка категорий с бэка
  const { data: categories, isSuccess: isCategoriesSuccess } = useGetCategoriesQuery();

  // запрос на создание товара
  const [createProduct] = useCreateProductMutation();
  const handleSubmitProcess = async (data: CreateProductArgs) => {
    try {
      const name = data.name;
      const price = data.price;
      const weight = data.weight;
      const width = data.width;
      const height = data.height;
      const length = data.length;
      const category_id = data.category_id;
      const description = data.description;
      const image_ref = data.image_ref;
      await createProduct({ name, price, weight, width, height, length, category_id, description, image_ref }).unwrap();
      navigate("/products");
    } catch (error) {
      console.log("Ошибка при создании товара:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductArgs>();

  return (
    <>
      <main className="productspage_form_background">
        <Header />
        <div className="productspage_form_container">
          <div className="productspage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="productspage_form_h3 mb-8">
                Добавление <span>товара</span>
              </h3>
              <div className="productspage_form_inputgroup">
                <div className={`w-full ${errors.name ? "mb-3" : "mb-8"}`}>
                  <Label text="Название товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="name" name="name" isError={!!errors.name} placeholder="Введите название товара..." />}
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
                <div className={`w-full ${errors.image_ref ? "mb-3" : "mb-8"}`}>
                  <Label text="Изображение товара" />
                  <div className="auth_div_for_input">
                    <Controller control={control} render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value || ""} type="text" id="image_ref" name="image_ref" isError={!!errors.image_ref} placeholder="Введите ссылку изображения..." />} name="image_ref" />
                    {errors.image_ref && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.image_ref && <p className="auth_error_text">{errors.image_ref.message}</p>}
                  </div>
                </div>
              </div>
              <div className={`w-full ${errors.description ? "mb-3" : "mb-8"}`}>
                <Label text="Описание товара" />
                <div className="auth_div_for_input">
                  <Controller control={control} render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value || ""} type="text" id="description" name="description" isError={!!errors.description} placeholder="Введите описание товара..." />} name="description" />
                  {errors.description && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.description && <p className="auth_error_text">{errors.description.message}</p>}
                </div>
              </div>
              <div className={`w-full ${errors.category_id ? "mb-3" : "mb-8"}`}>
                <Label text="Категория товара" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <select onChange={onChange} value={value || ""} className="productspage_form_select" id="category_id" name="category_id">
                        <option value="" disabled>
                          Выберите категорию...
                        </option>
                        {isCategoriesSuccess &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    )}
                    name="category_id"
                  />
                  {errors.category_id && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.category_id && <p className="auth_error_text">{errors.category_id.message}</p>}
                </div>
              </div>
              <div className="productspage_form_inputgroup">
                <div className={`w-full ${errors.price ? "mb-3" : "mb-8"}`}>
                  <Label text="Цена товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="price" name="price" isError={!!errors.price} />}
                      name="price"
                    />
                    {errors.price && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.price && <p className="auth_error_text">{errors.price.message}</p>}
                  </div>
                </div>
                <div className={`w-full ${errors.weight ? "mb-3" : "mb-8"}`}>
                  <Label text="Вес товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="weight" name="weight" isError={!!errors.weight} />}
                      name="weight"
                    />
                    {errors.weight && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.weight && <p className="auth_error_text">{errors.weight.message}</p>}
                  </div>
                </div>
              </div>
              <div className="productspage_form_inputgroup">
                <div className={`w-full ${errors.width ? "mb-3" : "mb-8"}`}>
                  <Label text="Ширина товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="width" name="width" isError={!!errors.width} />}
                      name="width"
                    />
                    {errors.width && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.width && <p className="auth_error_text">{errors.width.message}</p>}
                  </div>
                </div>
                <div className={`w-full ${errors.height ? "mb-3" : "mb-8"}`}>
                  <Label text="Высота товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="height" name="height" isError={!!errors.height} />}
                      name="height"
                    />
                    {errors.height && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.height && <p className="auth_error_text">{errors.height.message}</p>}
                  </div>
                </div>
                <div className={`w-full ${errors.length ? "mb-3" : "mb-8"}`}>
                  <Label text="Длина товара" />
                  <div className="auth_div_for_input">
                    <Controller
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="number" id="length" name="length" isError={!!errors.length} />}
                      name="length"
                    />
                    {errors.length && (
                      <div className="auth_div_svg">
                        <ErrorIcon className="auth_error_svg" />
                      </div>
                    )}
                    {errors.length && <p className="auth_error_text">{errors.length.message}</p>}
                  </div>
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
