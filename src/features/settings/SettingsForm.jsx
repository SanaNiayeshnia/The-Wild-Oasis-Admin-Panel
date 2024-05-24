import Form from "../../ui/form/Form";
import Input from "../../ui/form/Input";
import FormField from "../../ui/form/FormField";
import Error from "../../ui/Error";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import styled from "styled-components";
import useUpdateSettings from "./useUpdateSettings";

const UpdateButton = styled(Button)`
  border-radius: 0;
`;

function SettingsForm() {
  const [isUpdated, setIsUpdated] = useState(false);
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    onError: (err) => toast.error(err),
  });
  const { register, handleSubmit, reset, formState, control } = useForm();
  const watchedValues = useWatch({ control });

  const { isUpdaing, mutate } = useUpdateSettings();
  useEffect(() => {
    //settingDefaultValues
    if (settings) reset(settings);
  }, [settings, reset]);

  useEffect(() => {
    if (settings && watchedValues) {
      const hasChanged = Object.keys(settings).some(
        (key) => watchedValues[key] != settings[key]
      );
      setIsUpdated(hasChanged);
    }
  }, [watchedValues, settings]);

  function onSubmit(settingsData) {
    mutate(settingsData);
  }

  return (
    <>
      {isLoading ? (
        <Spinner type="primary" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Minimum Nights/Bookings">
            <Input
              type="number"
              id="minBookingLength"
              {...register("minBookingLength")}
            />
            <Error />
          </FormField>
          <FormField label="Maximum Nights/Bookings">
            <Input
              type="number"
              id="maxBookingLength"
              {...register("maxBookingLength")}
            />
            <Error />
          </FormField>
          <FormField label="Maximum Guests/Bookings">
            <Input
              type="number"
              id="maxGuestsPerBooking"
              {...register("maxGuestsPerBooking")}
            />
            <Error />
          </FormField>
          <FormField label="Breakfast Price">
            <Input
              type="number"
              id="breakfastPrice"
              {...register("breakfastPrice")}
            />
            <Error />
          </FormField>

          {isUpdated && (
            <UpdateButton className="secondary" disabled={isUpdaing}>
              {isUpdaing && <Spinner type="secondary" />}
              <span>{!isUpdaing ? "Update" : "Updating"}</span>
            </UpdateButton>
          )}
        </Form>
      )}
    </>
  );
}

export default SettingsForm;
