"use client";

import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Link,
  RadioGroup,
  Radio,
  CheckboxGroup,
} from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useCreatorFormContext } from "./context/use-creator-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { modulesFormSchema, ModulesFormValues } from "./context/schema";
import { Controller, useForm } from "react-hook-form";

export type ChooseModulesFormProps = React.HTMLAttributes<HTMLFormElement>;

const ChooseModulesForm = React.forwardRef<
  HTMLFormElement,
  ChooseModulesFormProps
>(({ className, ...props }, ref) => {
  const radioClassNames = {
    base: cn(
      "inline-flex m-0 bg-default-100 items-center justify-between",
      "flex-row-reverse w-full max-w-full cursor-pointer rounded-lg p-4 border-medium border-transparent",
      "data-[selected=true]:border-secondary data-[invalid=true]:border-danger"
    ),
    wrapper: "group-data-[selected=true]:border-secondary",
    label: "text-small text-default-500 font-medium",
  };

  const { submitTrigger, setSubmitTrigger, onNext, setFormValues, formValues } =
    useCreatorFormContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ModulesFormValues>({
    resolver: zodResolver(modulesFormSchema),
    defaultValues: {
      modules: formValues.modules ? formValues.modules : ["binary-operations"],
    },
  });

  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  useEffect(() => {
    if (successfullySubmitted && !submitTrigger) {
      onNext();
    }
  }, [successfullySubmitted, submitTrigger, onNext]);
  
  useEffect(() => {
    const onSubmit = (data: ModulesFormValues) => {
      setFormValues((prev) => ({
        ...prev,
        ...data,
      }));
      setSuccessfullySubmitted(true);
    };

    if (submitTrigger) {
      setSubmitTrigger(false);
      handleSubmit(onSubmit)();
    }
  }, [submitTrigger, handleSubmit, setSubmitTrigger, setFormValues, onNext]);

  return (
    <>
      <div className="text-3xl font-bold leading-9 text-default-foreground">
        Выбор модулей
      </div>
      <div className="py-4 text-base leading-5 text-default-500">
        Выберите модули которые должны быть включены в задание
      </div>
      <form
        ref={ref}
        className={cn("flex grid grid-cols-12 flex-col py-8", className)}
        {...props}
      >
        <Controller
          name="modules"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              className="col-span-12"
              classNames={{
                wrapper: "gap-4",
              }}
              defaultValue={field.value ? [`${field.value}`] : undefined}
              isInvalid={!!errors.modules}
              errorMessage={errors.modules?.message}
              {...field}
              name="address"
              color="secondary"
            >
              <Checkbox classNames={radioClassNames} value="binary-operations">
                Бинарные операции
              </Checkbox>
              <Checkbox classNames={radioClassNames} value="shortest-path">
                Кратчайший путь
              </Checkbox>
              <Checkbox classNames={radioClassNames} value="planar">
                Планарный граф
              </Checkbox>
            </CheckboxGroup>
          )}
        />
      </form>
    </>
  );
});

ChooseModulesForm.displayName = "ChooseAddressForm";

export default ChooseModulesForm;
