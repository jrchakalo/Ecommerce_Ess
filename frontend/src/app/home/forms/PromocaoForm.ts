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
    if (!(value == "clientes com cadastro de 3 meses ou menos" || value == "clientes com cadastros com mais de 3 meses" || value == "clientes com cadastro com mais de 1 ano OU terem efetuado 12 compras no mínimo")) {
        return false; // Se tipo não é igual a uma das possibilidades cadastradas
    }

    return true; // Se validade é igual a uma das possibilidades cadastradas
};

export const PromocaoFormSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  valor: z
    .string()
    .refine((value) => isValorValid(value), { message: "Informe um valor de 10 a 70" }),
  tipo: z
    .string()
    .refine((value) => isTipoValid(value), { message: "Informe um tipo válido" }),
  validade: z
    .string()
    .refine((value) => isValidadeValid(value), { message: "Informe um tipo válido" }),
});

export type PromocaoFormType = z.infer<typeof PromocaoFormSchema>;
