import { useForm as useBaseForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "ramda";

export const useForm = (options) => {
  return useBaseForm({
    mode: "onTouched",
    ...(options?.validationSchema && {
      resolver: yupResolver(options.validationSchema),
    }),
    ...(options && omit(["validationSchema"], options)),
  });
};
