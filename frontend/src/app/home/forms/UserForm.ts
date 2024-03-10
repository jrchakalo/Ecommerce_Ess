import * as z from "zod";

//const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const UserFormSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  cpf: z
    .string()
    .length(11, { message: "O campo CPF deve ter 11 caracteres" }),
  dataNascimento: z
    .string(),
    //.regex(dateRegExp, { message: "O campo data de nascimento deve ter o formato dd/mm/aaaa" }),
  email: z
    .string()
    .email({ message: "O email inserido não é válido" }),
  login: z.string(),
  senha: z
    .string()
    .min(6, { message: "A senha não pode conter a data de nascimento ou o nome e deve ter no mínimo 6 caracteres" })
});

export type UserFormType = z.infer<typeof UserFormSchema>;

