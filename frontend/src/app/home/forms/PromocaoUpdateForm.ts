import * as z from "zod";

const isValorValid = (value: string): boolean => {
    // Verificar se valor é um número de 10 a 70
    const valor = Number(value);
    if (Number(valor) < 10 || (Number(valor) > 70)) {
        return false; // Se valor não for um número de 10 a 70, retornar false
    }
    return true; // Se valor for um número de 10 a 70, retornar true
};

const isTipoValid = (value: string): boolean => {
    // Verificar se tipo é igual a uma das possibilidades cadastradas
    if (!(value == "HQ" || value == "Livro" || value == "Mangá" || value == "Revista" || value == "Geral")) {
        return false; // Se tipo não é igual a uma das possibilidades cadastradas
    }

    return true; // Se tipo é igual a uma das possibilidades cadastradas
};

const isValidadeValid = (value: string): boolean => {
    // Verificar se validade é igual a uma das possibilidades cadastradas
    if (!(value == "<3M" || value == ">3M" || value == "min12")) {
        return false; // Se tipo não é igual a uma das possibilidades cadastradas
    }

    return true; // Se validade é igual a uma das possibilidades cadastradas
};

export const PromocaoUpdateFormSchema = z.object({
  valor: z
  .string()
  .refine((value) => isValorValid(value), { message: "Informe um valor de 10 a 70" }),
tipo: z
  .string()
  .refine((value) => isTipoValid(value), { message: "Informe um tipo válido: HQ, Livro, Mangá, Revista, Geral" }),
validade: z
  .string()
  .refine((value) => isValidadeValid(value), { message: "Informe um tipo válido: <3M, >3M, min12" }),
});

export type PromocaoUpdateFormType = z.infer<typeof PromocaoUpdateFormSchema>;

