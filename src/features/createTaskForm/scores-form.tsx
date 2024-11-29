import type { InputProps } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scoresFormSchema, ScoresFormValues } from "./context/schema";
import { useCreatorFormContext } from "./context/use-creator-form-context";

const labelMap = {
  "binary-operations": "Бинарные операции",
  "shortest-path": "Кратчайший путь",
  planar: "Планарный граф",
};

export type ScoresFormProps = React.HTMLAttributes<HTMLFormElement>;

const ScoresForm = React.forwardRef<HTMLFormElement, ScoresFormProps>(
  ({ className, ...props }, ref) => {
    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      },
    };

    const {
      submitTrigger,
      setSubmitTrigger,
      onNext,
      setFormValues,
      formValues,
    } = useCreatorFormContext();

    const {
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<ScoresFormValues>({
      resolver: zodResolver(scoresFormSchema),
      defaultValues: {
        scores: formValues.modules
          ? formValues.modules.map((module) => ({
              module,
              score:
                formValues.scores?.find((item) => item.module === module)
                  ?.score || 20,
            }))
          : [],
      },
    });

    const { fields } = useFieldArray({
      control,
      name: "scores",
    });

    const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
    useEffect(() => {
      if (successfullySubmitted && !submitTrigger) {
        onNext();
      }
    }, [successfullySubmitted, submitTrigger, onNext]);
    useEffect(() => {
      const onSubmit = (data: ScoresFormValues) => {
        setFormValues((prev) => ({
          ...prev,
          ...data,
        }));
        setSuccessfullySubmitted(true);
      };

      console.log(submitTrigger);

      if (submitTrigger) {
        handleSubmit(onSubmit)();
        setSubmitTrigger(false);
      }
    }, [submitTrigger, handleSubmit, setSubmitTrigger, setFormValues, onNext]);

    return (
      <>
        <div className="text-3xl font-bold leading-9 text-default-foreground">
          Назначьте максимальные баллы
        </div>
        <div className="py-4 text-default-500">
          Которые дает каждое из заданий
        </div>
        <form
          ref={ref}
          className={cn(
            "flex grid grid-cols-12 flex-col gap-4 py-8",
            className
          )}
          {...props}
        >
          {fields.map((arrayField, index) => (
            <Controller
              key={arrayField.module}
              name={`scores.${index}.score`}
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  type="number"
                  {...field}
                  label={labelMap[arrayField.module as keyof typeof labelMap]}
                  className="col-span-12 md:col-span-6"
                  placeholder="20"
                  isInvalid={!!errors.scores?.[index]?.score}
                  errorMessage={errors.scores?.[index]?.score?.message}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={`${value}`}
                  {...inputProps}
                />
              )}
            />
          ))}
        </form>
      </>
    );
  }
);

ScoresForm.displayName = "CompanyInformationForm";

export default ScoresForm;
