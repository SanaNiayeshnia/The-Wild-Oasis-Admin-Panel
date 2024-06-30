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
import useSettings from "./useSettings";

const UpdateButton = styled(Button)`
  border-radius: 0;
`;
const StyledSettingsForm = styled(Form)`
  border: 1px solid var(--color-Gray-200);
`;

function SettingsForm() {
  const [isUpdated, setIsUpdated] = useState(false);
  const { settings, isLoading } = useSettings();
  const { register, handleSubmit, reset, formState, control } = useForm();
  const watchedValues = useWatch({ control });
  const { errors } = formState;
  const { isUpdating, mutate } = useUpdateSettings();
  useEffect(() => {
    //setting default values
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
        <StyledSettingsForm onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Minimum Nights/Bookings">
            <Input
              type="number"
              id="minBookingLength"
              {...register("minBookingLength", {
                required: "This field can't be empty!",
                min: {
                  value: 1,
                  message: "Minimum booking nights should be greater than 1!",
                },
              })}
            />
            <Error>{errors?.minBookingLength?.message}</Error>
          </FormField>
          <FormField label="Maximum Nights/Bookings">
            <Input
              type="number"
              id="maxBookingLength"
              {...register("maxBookingLength", {
                required: "This field can't be empty!",
                min: {
                  value: 1,
                  message: "Maximum booking nights should be greater than 1!",
                },
                validate: (value) =>
                  value >= watchedValues.minBookingLength ||
                  "Maximum booking nights should be greater or equal to minimum booking nights!",
              })}
            />
            <Error>{errors?.maxBookingLength?.message}</Error>
          </FormField>
          <FormField label="Maximum Guests/Bookings">
            <Input
              type="number"
              id="maxGuestsPerBooking"
              {...register("maxGuestsPerBooking", {
                required: "This field can't be empty!",
                min: {
                  value: 1,
                  message:
                    "Maximum guests per booking shiuld be greater than 1!",
                },
              })}
            />
            <Error>{errors?.maxGuestsPerBooking?.message}</Error>
          </FormField>
          <FormField label="Breakfast Price">
            <Input
              type="number"
              id="breakfastPrice"
              {...register("breakfastPrice", {
                required: "This field can't be empty!",
                min: {
                  value: 0,
                  message: "Breakfast price can't be a negative amount!",
                },
              })}
            />
            <Error>{errors?.breakfastPrice?.message}</Error>
          </FormField>

          {isUpdated && (
            <UpdateButton className="secondary" disabled={isUpdating}>
              {isUpdating && <Spinner type="secondary" />}
              <span>{!isUpdating ? "Update" : "Updating"}</span>
            </UpdateButton>
          )}
        </StyledSettingsForm>
      )}
    </>
  );
}

export default SettingsForm;
