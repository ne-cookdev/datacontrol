import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetOrdersQuery } from "../../../features/api/ordersApi";
import { useGetCarriersQuery } from "../../../features/api/carriersApi";
import { useGetShipmentQuery, useUpdateShipmentMutation } from "../../../features/api/shipmentsApi";

import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { Button } from "../../../components/Button/Button";

import "./ShipmentsPage.css";

type ShipmentParams = {
  shipmentTrackingNumber: string;
};

export const UpdateShipmentPage = () => {
  // Получение параметров из ссылки
  const { shipmentTrackingNumber } = useParams<ShipmentParams>();
  const shipmentTrackingNum = parseInt(shipmentTrackingNumber ?? "", 10);

  // запрос списка заказов с бэка
  const { data: orders, isSuccess: isOrdersSuccess } = useGetOrdersQuery();
  // запрос списка доставщиков с бэка
  const { data: carriers, isSuccess: isCarriersSuccess } = useGetCarriersQuery();

  // запрос доставки с бэка
  const { data: shipment, isSuccess: isShipmentSuccess } = useGetShipmentQuery(shipmentTrackingNum);

  // запрос на обновление доставки
  const navigate = useNavigate();
  const [updateShipment] = useUpdateShipmentMutation();
  const handleSubmitProcess = async (data: { order_id: number; carrier_id: number }) => {
    try {
      await updateShipment({
        tracking_number: shipmentTrackingNum,
        ...data,
      }).unwrap();
      navigate("/shipments");
    } catch (error) {
      console.log("Ошибка при обновлении доставки:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ order_id: number; carrier_id: number }>({
    defaultValues: {
      order_id: 0,
      carrier_id: 0,
    },
  });

  // Эффект для заполнения формы при загрузке данных
  useEffect(() => {
    if (isShipmentSuccess && shipment) {
      reset({
        order_id: shipment.order.number,
        carrier_id: shipment.carrier.id,
      });
    }
  }, [isShipmentSuccess, shipment, reset]);

  return (
    <>
      <main className="shipmentspage_form_background">
        <Header />
        <div className="shipmentspage_form_background">
          <div className="shipmentspage_form_bg">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
            >
              <h3 className="shipmentspage_form_h3 mb-8">
                Редактирование <span>доставки</span>
              </h3>
              <div className={`w-full ${errors.order_id ? "mb-3" : "mb-8"}`}>
                <Label text="Заказ" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <select onChange={onChange} value={value || ""} className="shipmentspage_form_select" id="order_id" name="order_id">
                        <option value="" disabled>
                          Выберите заказ...
                        </option>
                        {isOrdersSuccess &&
                          orders.map((order) => (
                            <option key={order.number} value={order.number}>
                              Заказ №{order.number}
                            </option>
                          ))}
                      </select>
                    )}
                    name="order_id"
                  />
                  {errors.order_id && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.order_id && <p className="auth_error_text">{errors.order_id.message}</p>}
                </div>
              </div>
              <div className={`w-full ${errors.carrier_id ? "mb-3" : "mb-8"}`}>
                <Label text="Доставщик" />
                <div className="auth_div_for_input">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <select onChange={onChange} value={value || ""} className="shipmentspage_form_select" id="carrier_id" name="carrier_id">
                        <option value="" disabled>
                          Выберите доставщика...
                        </option>
                        {isCarriersSuccess &&
                          carriers.map((carrier) => (
                            <option key={carrier.id} value={carrier.id}>
                              {carrier.name}
                            </option>
                          ))}
                      </select>
                    )}
                    name="carrier_id"
                  />
                  {errors.carrier_id && (
                    <div className="auth_div_svg">
                      <ErrorIcon className="auth_error_svg" />
                    </div>
                  )}
                  {errors.carrier_id && <p className="auth_error_text">{errors.carrier_id.message}</p>}
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
