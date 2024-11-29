import { z } from "zod";

export const generalFormSchema = z.object({
  modules: z
    .array(z.string())
    .min(1, "Необходимо выбрать хотя бы один модуль."),
  scores: z.array(z.object({ module: z.string(), score: z.number() })),
  // countryId: z.coerce.number({ message: "Field is required." }),
  // age: z.coerce
  //   .number({ message: "Field is required." })
  //   .int({ message: "Number is not an integer." })
  //   .positive({ message: "Number is not positive." })
  //   .finite({ message: "Number must not be Infinity." })
  //   .safe({ message: "Number must be a safe integer lower than 100." })
  //   .min(17, { message: "Number must be at least 17." })
  //   .max(100, { message: "Number must be at most 100." })
  //   .transform((age) => Math.floor(age)),
  // gender: z.enum(["man", "woman"]),
});

export const modulesFormSchema = z.object({
  modules: z
    .array(z.string())
    .min(1, "Необходимо выбрать хотя бы один модуль."),
});

export type ModulesFormValues = z.infer<typeof modulesFormSchema>;

export const scoresFormSchema = z.object({
  scores: z.array(
    z.object({
      module: z.string(),
      score: z.coerce
        .number()
        .min(1, "Значение должно быть больше 1")
        .max(100, "Значение должно быть меньше 100"),
    })
  ),
});

export type ScoresFormValues = z.infer<typeof scoresFormSchema>;

// export const profileFormSchema = z.object({
//   name: z.string().min(1, "Field is required."),
//   handle: z
//     .string({ message: "Field is required." })
//     .min(1, "Field is required.")
//     .max(30),
//   bio: z.string().min(1, "Field is required.").max(50, "Field is too long."),
//   profileImg: z
//     .instanceof(File, {
//       message: "Avatar picture is required.",
//     })
//     .refine(
//       (file: File) => {
//         const acceptedExtensions = ALLOWED_IMAGE_FORMATS;
//         const fileExtension = file?.name.split(".").pop()?.toLowerCase() ?? "";
//         return acceptedExtensions.includes(fileExtension);
//       },
//       {
//         message: "Please select a valid file.",
//       }
//     ),
//   coverImg: z
//     .instanceof(File)
//     .optional()
//     .refine(
//       (file: File | undefined) => {
//         if (!file) {
//           return true; // Allow undefined value
//         }

//         const acceptedExtensions = ALLOWED_IMAGE_FORMATS;
//         const fileExtension = file?.name.split(".").pop()?.toLowerCase() ?? "";

//         return acceptedExtensions.includes(fileExtension);
//       },
//       {
//         message: "Please select a valid file.",
//       }
//     ),
// });

// export const subscriptionFormSchema = z.object({
//   subscriptionPrice: z.coerce
//     .number()
//     .min(3.49)
//     .max(100)
//     .multipleOf(
//       0.01,
//       "Number must have two or less digits after decimal point."
//     ),
//   paypalEmail: z.string().email().optional(),
// });

// export type SocialMedia = z.infer<typeof socialsFormSchema>;

export const combinedFormSchema = generalFormSchema
  .merge(modulesFormSchema)
  .merge(scoresFormSchema);
// .merge(subscriptionFormSchema)
// .merge(socialsFormSchema);

export type CombinedFormValues = z.infer<typeof combinedFormSchema>;

// export type GeneralFormValues = z.infer<typeof generalFormSchema>;
// export type TagsFormValues = z.infer<typeof tagsFormSchema>;
// export type ProfileFormValues = z.infer<typeof profileFormSchema>;
// export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;
// export type SocialsFormValues = z.infer<typeof socialsFormSchema>;
export type CombinedFormValuesPartial = Partial<CombinedFormValues>;
